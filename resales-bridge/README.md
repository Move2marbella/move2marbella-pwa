# Move2Marbella Resales Bridge

Standalone PHP bridge for `api.move2marbella.com`.

## Upload

Upload these files to the SiteGround subdomain document root:

```text
/public_html/api.move2marbella.com/
```

Files:

```text
index.php
config.php
```

Create `config.php` from `config.example.php` and fill the credentials there. Do not commit `config.php`.

## Example config

```php
<?php

return [
    'api_base_url' => 'https://webapi.resales-online.com/V6',
    'api_p1' => 'YOUR_P1',
    'api_p2' => 'YOUR_P2',
    'filter_ids' => [
        'sale' => 'YOUR_SALE_FILTER_ID',
        'long_term_rental' => 'YOUR_LONG_TERM_RENTAL_FILTER_ID',
        'short_term_rental' => 'YOUR_SHORT_TERM_RENTAL_FILTER_ID',
        'featured' => 'YOUR_FEATURED_FILTER_ID',
    ],
    'bridge_secret' => 'LONG_RANDOM_SECRET',
    'sandbox' => false,
    'cache_dir' => __DIR__ . '/cache',
    'cache_ttl_seconds' => 300,
];
```

## Test

```bash
curl -H 'X-M2M-Bridge-Secret: LONG_RANDOM_SECRET' \
  'https://api.move2marbella.com/health'
```

```bash
curl -H 'X-M2M-Bridge-Secret: LONG_RANDOM_SECRET' \
  'https://api.move2marbella.com/search?pageSize=5&location=Marbella'
```

```bash
curl -H 'X-M2M-Bridge-Secret: LONG_RANDOM_SECRET' \
  'https://api.move2marbella.com/search?mode=featured&pageSize=5'
```

```bash
curl -H 'X-M2M-Bridge-Secret: LONG_RANDOM_SECRET' \
  'https://api.move2marbella.com/property/R5357449'
```

## Supported endpoints

- `/health`
- `/search`
- `/property/R5357449`
- `/features`
- `/locations`
- `/types`

## Notes

- The bridge only accepts requests with the `X-M2M-Bridge-Secret` header.
- The Resales credentials stay on SiteGround.
- The cache folder must be writable by PHP.
