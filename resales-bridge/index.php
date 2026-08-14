<?php

declare(strict_types=1);

$configPath = __DIR__ . '/config.php';
$config = loadConfig($configPath);

handleCors();
requireSecret($config);

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$path = preg_replace('#^/index\.php#', '', $path) ?: '/';
$path = trim($path, '/');
$segments = $path === '' ? [] : explode('/', $path);

try {
    if ($segments === ['health']) {
        sendJson(['ok' => true, 'service' => 'move2marbella-resales-bridge']);
    }

    if ($segments === ['diagnostics']) {
        sendJson([
            'ok' => true,
            'php_version' => PHP_VERSION,
            'curl_loaded' => extension_loaded('curl'),
            'json_loaded' => extension_loaded('json'),
            'openssl_loaded' => extension_loaded('openssl'),
            'config' => [
                'api_base_url' => (string)($config['api_base_url'] ?? ''),
                'api_p1_set' => trim((string)($config['api_p1'] ?? '')) !== '',
                'api_p2_set' => trim((string)($config['api_p2'] ?? '')) !== '',
                'filter_ids_set' => getConfiguredFilterModes($config),
                'bridge_secret_set' => trim((string)($config['bridge_secret'] ?? '')) !== '',
                'sandbox' => !empty($config['sandbox']),
            ],
        ]);
    }

    if ($segments === ['ping-resales']) {
        $params = buildCommonParams($config) + ['P_PageSize' => '1'];
        $baseUrl = rtrim((string)($config['api_base_url'] ?? ''), '/');
        $url = $baseUrl . '/SearchProperties?' . http_build_query($params);
        [$status, $body, $transportError] = httpGet($url);

        sendJson([
            'ok' => $status >= 200 && $status < 300 && is_string($body),
            'status' => $status,
            'transport_error' => $transportError,
            'body_length' => is_string($body) ? strlen($body) : 0,
            'body_preview' => is_string($body) ? substr($body, 0, 400) : '',
        ], $status >= 200 && $status < 300 ? 200 : 502);
    }

    if ($segments === ['ping-dns']) {
        $host = parse_url((string)($config['api_base_url'] ?? ''), PHP_URL_HOST) ?: 'webapi.resales-online.com';

        sendJson([
            'ok' => true,
            'host' => $host,
            'ip' => gethostbyname($host),
        ]);
    }

    if ($segments === ['ping-external']) {
        [$status, $body, $transportError] = httpGet('https://example.com/');

        sendJson([
            'ok' => $status >= 200 && $status < 300 && is_string($body),
            'status' => $status,
            'transport_error' => $transportError,
            'body_length' => is_string($body) ? strlen($body) : 0,
        ], $status >= 200 && $status < 300 ? 200 : 502);
    }

    if ($segments === ['search']) {
        sendJson(callResales('SearchProperties', buildSearchParams($config), $config));
    }

    if (count($segments) === 2 && $segments[0] === 'property') {
        $ref = strtoupper(trim($segments[1]));
        if (!preg_match('/^R\d+$/', $ref)) {
            sendJson(['error' => 'Invalid property reference.'], 400);
        }

        sendJson(callResales('PropertyDetails', buildPropertyParams($ref, $config), $config));
    }

    if ($segments === ['features']) {
        sendJson(callResales('SearchFeatures', buildCommonParams($config), $config));
    }

    if ($segments === ['locations']) {
        sendJson(callResales('SearchLocations', buildCommonParams($config), $config));
    }

    if ($segments === ['types']) {
        sendJson(callResales('SearchPropertyTypes', buildCommonParams($config), $config));
    }

    sendJson(['error' => 'Endpoint not found.'], 404);
} catch (Throwable $error) {
    error_log('[m2m-resales-bridge] ' . $error->getMessage());
    sendJson(['error' => 'Resales bridge request failed.'], 502);
}

function handleCors(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowedOrigins = [
        'https://app.move2marbella.com',
        'https://move2marbella.com',
    ];

    if (in_array($origin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Headers: X-M2M-Bridge-Secret, Content-Type');
    header('Access-Control-Allow-Methods: GET, OPTIONS');

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function loadConfig(string $configPath): array
{
    if (!is_file($configPath)) {
        sendJson(['error' => 'Bridge config is missing.'], 500);
    }

    try {
        $config = require $configPath;
    } catch (Throwable $error) {
        sendJson([
            'error' => 'Bridge config could not be loaded.',
            'type' => get_class($error),
            'message' => $error->getMessage(),
        ], 500);
    }

    if (!is_array($config)) {
        sendJson(['error' => 'Bridge config is invalid.'], 500);
    }

    return $config;
}

function requireSecret(array $config): void
{
    $secret = trim((string)($config['bridge_secret'] ?? ''));

    if ($secret === '') {
        sendJson(['error' => 'Bridge secret is not configured.'], 500);
    }

    $received = $_SERVER['HTTP_X_M2M_BRIDGE_SECRET'] ?? '';

    if (!hash_equals($secret, $received)) {
        sendJson(['error' => 'Unauthorized.'], 401);
    }
}

function buildCommonParams(array $config): array
{
    $params = [
        'p_apiid' => getFilterId($config),
        'p1' => requiredConfig($config, 'api_p1'),
        'p2' => requiredConfig($config, 'api_p2'),
    ];

    if (!empty($config['sandbox'])) {
        $params['P_sandbox'] = 'true';
    }

    $lang = cleanCsv($_GET['lang'] ?? $_GET['P_Lang'] ?? '2');
    if ($lang !== '') {
        $params['P_Lang'] = $lang;
    }

    return $params;
}

function buildSearchParams(array $config): array
{
    $params = buildCommonParams($config);
    $map = [
        'page' => 'P_PageNo',
        'pageSize' => 'P_PageSize',
        'location' => 'P_Location',
        'propertyTypes' => 'P_PropertyTypes',
        'bedrooms' => 'P_Beds',
        'bathrooms' => 'P_Baths',
        'minPrice' => 'P_Min',
        'maxPrice' => 'P_Max',
        'ref' => 'P_RefId',
        'mustHaveFeatures' => 'P_MustHaveFeatures',
        'rta' => 'p_RTA',
    ];

    foreach ($map as $input => $apiParam) {
        if (isset($_GET[$input]) && trim((string)$_GET[$input]) !== '') {
            $params[$apiParam] = cleanQueryValue((string)$_GET[$input]);
        }
    }

    foreach ($_GET as $key => $value) {
        if (preg_match('/^\d+[A-Za-z]+\d+$/', (string)$key)) {
            $params[(string)$key] = cleanQueryValue((string)$value);
        }
    }

    return $params;
}

function buildPropertyParams(string $ref, array $config): array
{
    return buildCommonParams($config) + [
        'p_agency_filterid' => '1',
        'P_RefId' => $ref,
        'P_ShowGPSCoords' => 'TRUE',
        'P_showdecree218' => 'YES',
    ];
}

function callResales(string $endpoint, array $params, array $config): array
{
    $baseUrl = rtrim((string)($config['api_base_url'] ?? ''), '/');

    if ($baseUrl === '') {
        throw new RuntimeException('Missing api_base_url.');
    }

    $url = $baseUrl . '/' . $endpoint . '?' . http_build_query($params);
    $cacheKey = sha1($url);
    $cached = readCache($cacheKey, $config);

    if ($cached !== null) {
        header('X-M2M-Bridge-Cache: HIT');
        return $cached;
    }

    [$status, $body, $transportError] = httpGet($url);

    if ($body === false || $status < 200 || $status >= 300) {
        throw new RuntimeException('Resales request failed: ' . ($transportError ?: 'HTTP ' . $status));
    }

    $decoded = json_decode($body, true);

    if (!is_array($decoded)) {
        throw new RuntimeException('Resales returned invalid JSON.');
    }

    writeCache($cacheKey, $decoded, $config);
    header('X-M2M-Bridge-Cache: MISS');

    return $decoded;
}

function httpGet(string $url): array
{
    if (extension_loaded('curl')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 25,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_USERAGENT => 'Move2Marbella Resales Bridge/1.0',
            CURLOPT_HTTPHEADER => ['Accept: application/json'],
        ]);

        $body = curl_exec($ch);
        $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        return [$status, $body, $curlError];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => "Accept: application/json\r\n",
            'timeout' => 25,
            'ignore_errors' => true,
        ],
    ]);
    $body = file_get_contents($url, false, $context);
    $status = 0;

    foreach ($http_response_header ?? [] as $header) {
        if (preg_match('/^HTTP\/\S+\s+(\d+)/', $header, $matches)) {
            $status = (int)$matches[1];
            break;
        }
    }

    return [$status, $body, $body === false ? 'file_get_contents failed' : ''];
}

function getFilterId(array $config): string
{
    $mode = normalizeMode($_GET['mode'] ?? 'sale');
    $filterIds = is_array($config['filter_ids'] ?? null) ? $config['filter_ids'] : [];

    if (!empty($filterIds[$mode])) {
        return (string)$filterIds[$mode];
    }

    if ($mode === 'sale' && !empty($config['sale_filter_id'])) {
        return (string)$config['sale_filter_id'];
    }

    if ($mode === 'long_term_rental' && !empty($config['rental_filter_id'])) {
        return (string)$config['rental_filter_id'];
    }

    throw new RuntimeException('Missing filter ID for mode: ' . $mode);
}

function normalizeMode(mixed $mode): string
{
    $value = strtolower(trim((string)$mode));
    $value = str_replace(['-', ' '], '_', $value);

    return match ($value) {
        'featured' => 'featured',
        'long_term', 'long_term_rental', 'longterm', 'longterm_rental' => 'long_term_rental',
        'short_term', 'short_term_rental', 'shortterm', 'shortterm_rental' => 'short_term_rental',
        default => 'sale',
    };
}

function getConfiguredFilterModes(array $config): array
{
    $filterIds = is_array($config['filter_ids'] ?? null) ? $config['filter_ids'] : [];
    $modes = [];

    foreach (['sale', 'long_term_rental', 'short_term_rental', 'featured'] as $mode) {
        if (!empty($filterIds[$mode])) {
            $modes[] = $mode;
        }
    }

    if (!in_array('sale', $modes, true) && !empty($config['sale_filter_id'])) {
        $modes[] = 'sale';
    }

    return $modes;
}

function requiredConfig(array $config, string $key): string
{
    $value = trim((string)($config[$key] ?? ''));

    if ($value === '') {
        throw new RuntimeException('Missing config value: ' . $key);
    }

    return $value;
}

function cleanCsv(mixed $value): string
{
    return preg_replace('/[^0-9,]/', '', (string)$value) ?? '';
}

function cleanQueryValue(string $value): string
{
    return trim(strip_tags($value));
}

function readCache(string $key, array $config): ?array
{
    $file = getCacheFile($key, $config);
    $ttl = (int)($config['cache_ttl_seconds'] ?? 0);

    if ($ttl <= 0 || !is_file($file) || filemtime($file) + $ttl < time()) {
        return null;
    }

    $content = file_get_contents($file);
    $decoded = $content === false ? null : json_decode($content, true);

    return is_array($decoded) ? $decoded : null;
}

function writeCache(string $key, array $data, array $config): void
{
    $dir = (string)($config['cache_dir'] ?? '');

    if ($dir === '') {
        return;
    }

    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    file_put_contents(getCacheFile($key, $config), json_encode($data));
}

function getCacheFile(string $key, array $config): string
{
    return rtrim((string)($config['cache_dir'] ?? sys_get_temp_dir()), '/') . '/' . $key . '.json';
}

function sendJson(array $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
