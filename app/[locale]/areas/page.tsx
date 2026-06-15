import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "../../components/content-page-shell";
import { getLocale, getLocaleBasePath, locales, type Locale } from "../../i18n/translations";
import { getLanguageAlternates, getLocalizedPath, getPageRobots } from "../../lib/seo";

type AreasPageProps = {
  params: Promise<{ locale: string }>;
};

type AreaGuide = {
  area: string;
  lifestyle: string;
  property: string;
  vibe: string;
};

const baseGuides: AreaGuide[] = [
  {
    area: "Benahavis",
    vibe: "A mountain village between Marbella and Estepona, surrounded by nature, valleys and a quieter Andalusian rhythm.",
    property: "A prime choice for buyers seeking privacy, views, gated communities and luxury homes away from the busiest coastal zones.",
    lifestyle: "Ideal for space, hiking, golf access, traditional restaurants and a calmer lifestyle close to Marbella.",
  },
  {
    area: "Elviria",
    vibe: "A Marbella East coastal community with quick access to the town centre and a more residential beachside feel.",
    property: "Strong for family homes, beachside apartments and high-quality villas in a quieter setting outside central Marbella.",
    lifestyle: "Known for sandy beaches, beach clubs, Nikki Beach, international services and relaxed coastal living.",
  },
  {
    area: "Estepona",
    vibe: "A lively coastal town west of Marbella with an old town, marina, beach promenade and fast-improving residential areas.",
    property: "Often offers better value than the most expensive Marbella addresses, with growing new-build and modern apartment supply.",
    lifestyle: "Family-friendly, walkable and practical, with schools, healthcare, golf, beaches and a strong year-round Spanish feel.",
  },
  {
    area: "Golden Mile",
    vibe: "The prestigious corridor between Marbella town and Puerto Banus, associated with privacy, beach clubs and landmark hotels.",
    property: "One of the highest-value Costa del Sol addresses, focused on luxury villas, prime apartments and branded residences.",
    lifestyle: "Close to Puente Romano, Marbella Club, fine dining, beach restaurants and quick access to both Marbella and Puerto Banus.",
  },
  {
    area: "Marbella",
    vibe: "A walkable city centre with beaches, the old town, Plaza de los Naranjos, services and year-round urban life.",
    property: "A varied market of central apartments, frontline beach homes and older properties with renovation potential.",
    lifestyle: "Good for buyers wanting restaurants, shops, healthcare, beach walks and everyday convenience without relying on a car.",
  },
  {
    area: "Mijas Costa",
    vibe: "A broad coastal and hillside municipality mixing La Cala, Mijas Costa and the white village of Mijas Pueblo.",
    property: "Popular with international buyers looking for golf homes, coastal apartments and more accessible price points.",
    lifestyle: "A mix of beaches, family attractions, golf, hiking, traditional village life and easy access to Malaga airport.",
  },
  {
    area: "La Quinta",
    vibe: "An inland golf and residential enclave in Benahavis, above the coast and close to Nueva Andalucia.",
    property: "Attractive for premium hill homes with golf, mountain and sea-view potential.",
    lifestyle: "Quiet and residential, with golf on the doorstep and quick routes to Puerto Banus, Marbella and San Pedro.",
  },
  {
    area: "La Zagaleta",
    vibe: "A private ultra-luxury estate in Benahavis and one of the most exclusive addresses in southern Spain.",
    property: "Focused on large plots, privacy, security, landmark villas and high-end mountain living.",
    lifestyle: "Designed for discretion, space, nature, gated access, golf and panoramic surroundings.",
  },
  {
    area: "Puerto Banus",
    vibe: "A world-famous luxury marina west of the Golden Mile, known for yachts, designer shopping and nightlife.",
    property: "Dominated by prime apartments and penthouses, with strong holiday-rental appeal in the right buildings.",
    lifestyle: "High-energy living with restaurants, beach clubs, nightlife, marina views and luxury retail.",
  },
  {
    area: "Nueva Andalucia",
    vibe: "A family-friendly district north of Puerto Banus, widely known as Golf Valley.",
    property: "A broad market from apartments to high-end villas, with strong demand from lifestyle and investment buyers.",
    lifestyle: "Golf courses, international schools, restaurants, Turtle Lake and quick access to Puerto Banus and Marbella.",
  },
];

const localizedGuides: Partial<Record<Locale, AreaGuide[]>> = {
  fr: [
    {
      area: "Benahavis",
      vibe: "Village de montagne entre Marbella et Estepona, entoure de nature, de vallees et d'un rythme andalou plus calme.",
      property: "Un choix fort pour les acheteurs cherchant intimite, vues, domaines fermes et villas de luxe loin des zones cotieres les plus actives.",
      lifestyle: "Ideal pour l'espace, la randonnee, le golf, les restaurants traditionnels et une vie plus calme pres de Marbella.",
    },
    {
      area: "Elviria",
      vibe: "Communaute cotiere de Marbella Est avec acces rapide au centre et une ambiance residentielle proche de la plage.",
      property: "Interessante pour les familles, les appartements pres de la mer et les villas de qualite dans un cadre plus tranquille.",
      lifestyle: "Connue pour ses plages de sable, beach clubs, Nikki Beach, services internationaux et vie cotiere detendue.",
    },
    {
      area: "Estepona",
      vibe: "Ville cotiere vivante a l'ouest de Marbella avec vieille ville, marina, promenade maritime et quartiers modernes en croissance.",
      property: "Souvent un meilleur rapport qualite-prix que les adresses les plus cheres de Marbella, avec une offre moderne importante.",
      lifestyle: "Familiale, pratique et vivante toute l'annee, avec ecoles, sante, golf, plages et ambiance espagnole.",
    },
    {
      area: "Golden Mile",
      vibe: "Couloir prestigieux entre Marbella centre et Puerto Banus, associe a la confidentialite, aux beach clubs et aux hotels iconiques.",
      property: "L'une des zones les plus valorisees de la Costa del Sol, avec villas de luxe, appartements prime et residences de marque.",
      lifestyle: "Proche de Puente Romano, Marbella Club, restaurants, plages et acces rapide a Marbella comme a Puerto Banus.",
    },
    {
      area: "Marbella",
      vibe: "Centre-ville agreable a pied avec plages, vieille ville, Plaza de los Naranjos, services et vie urbaine toute l'annee.",
      property: "Marche varie avec appartements centraux, biens en front de mer et proprietes anciennes a renover.",
      lifestyle: "Pour ceux qui veulent restaurants, commerces, sante, promenades en bord de mer et confort quotidien sans voiture permanente.",
    },
    {
      area: "Mijas Costa",
      vibe: "Grande commune entre cote et collines, reunissant La Cala, Mijas Costa et le village blanc de Mijas Pueblo.",
      property: "Populaire aupres des acheteurs internationaux recherchant golf, appartements cotiers et prix plus accessibles.",
      lifestyle: "Plages, loisirs familiaux, golf, randonnee, vie de village et acces facile a l'aeroport de Malaga.",
    },
    {
      area: "La Quinta",
      vibe: "Enclave residentielle et golfique de Benahavis, au-dessus de la cote et proche de Nueva Andalucia.",
      property: "Attractive pour des maisons premium en colline avec potentiel de vues golf, montagne et mer.",
      lifestyle: "Calme et residentielle, avec golf a proximite et routes rapides vers Puerto Banus, Marbella et San Pedro.",
    },
    {
      area: "La Zagaleta",
      vibe: "Domaine prive ultra-luxe a Benahavis, parmi les adresses les plus exclusives du sud de l'Espagne.",
      property: "Grandes parcelles, intimite, securite, villas remarquables et vie haut de gamme en montagne.",
      lifestyle: "Pensee pour discretion, espace, nature, acces securise, golf et vues panoramiques.",
    },
    {
      area: "Puerto Banus",
      vibe: "Marina de luxe mondialement connue a l'ouest de la Golden Mile, avec yachts, boutiques de createurs et vie nocturne.",
      property: "Dominee par appartements et penthouses prime, avec bon potentiel locatif dans les bons immeubles.",
      lifestyle: "Vie dynamique avec restaurants, beach clubs, nightlife, vues marina et shopping luxe.",
    },
    {
      area: "Nueva Andalucia",
      vibe: "Quartier familial au nord de Puerto Banus, connu comme la Golf Valley.",
      property: "Marche large, des appartements aux villas haut de gamme, tres demande par les acheteurs lifestyle et investisseurs.",
      lifestyle: "Golfs, ecoles internationales, restaurants, Turtle Lake et acces rapide a Puerto Banus et Marbella.",
    },
  ],
  de: [
    {
      area: "Benahavis",
      vibe: "Bergdorf zwischen Marbella und Estepona, umgeben von Natur, Talern und einem ruhigeren andalusischen Rhythmus.",
      property: "Stark fur Kaufer, die Privatsphare, Ausblicke, geschlossene Anlagen und Luxusimmobilien abseits der lebhaften Kuste suchen.",
      lifestyle: "Ideal fur Raum, Wandern, Golf, traditionelle Restaurants und ein ruhigeres Leben nahe Marbella.",
    },
    {
      area: "Elviria",
      vibe: "Kustennahe Wohnlage in Marbella Ost mit schnellem Zugang zum Zentrum und entspanntem Beachside-Gefuhl.",
      property: "Gut fur Familienhauser, Strandapartments und hochwertige Villen in einer ruhigeren Lage ausserhalb des Zentrums.",
      lifestyle: "Bekannt fur Sandstrande, Beach Clubs, Nikki Beach, internationale Services und entspanntes Kustenleben.",
    },
    {
      area: "Estepona",
      vibe: "Lebendige Kustenstadt westlich von Marbella mit Altstadt, Hafen, Promenade und stark wachsenden Wohnlagen.",
      property: "Bietet oft besseren Gegenwert als die teuersten Marbella-Adressen, mit viel moderner und Neubau-Auswahl.",
      lifestyle: "Familienfreundlich und praktisch, mit Schulen, Gesundheitsversorgung, Golf, Stranden und spanischem Ganzjahresleben.",
    },
    {
      area: "Golden Mile",
      vibe: "Prestige-Korridor zwischen Marbella Zentrum und Puerto Banus, verbunden mit Privatsphare, Beach Clubs und ikonischen Hotels.",
      property: "Eine der wertvollsten Lagen der Costa del Sol, mit Luxusvillen, Prime-Apartments und Markenresidenzen.",
      lifestyle: "Nahe Puente Romano, Marbella Club, Fine Dining, Strandrestaurants und schnellem Zugang zu Marbella und Puerto Banus.",
    },
    {
      area: "Marbella",
      vibe: "Gut begehbares Zentrum mit Stranden, Altstadt, Plaza de los Naranjos, Services und urbanem Leben.",
      property: "Vielfaltiger Markt aus zentralen Apartments, Frontline-Beach-Wohnungen und alteren Immobilien mit Renovierungspotenzial.",
      lifestyle: "Fur Kaufer, die Restaurants, Shops, Gesundheit, Strandpromenade und Alltag ohne standiges Auto mochten.",
    },
    {
      area: "Mijas Costa",
      vibe: "Breite Gemeinde zwischen Kuste und Hugeln mit La Cala, Mijas Costa und dem weissen Dorf Mijas Pueblo.",
      property: "Beliebt bei internationalen Kaufern fur Golfimmobilien, Kustenapartments und zuganglichere Preise.",
      lifestyle: "Strande, Familienangebote, Golf, Wandern, Dorfleben und gute Verbindung zum Flughafen Malaga.",
    },
    {
      area: "La Quinta",
      vibe: "Golf- und Wohnlage in Benahavis, oberhalb der Kuste und nahe Nueva Andalucia.",
      property: "Attraktiv fur Premium-Hauser am Hang mit Potenzial fur Golf-, Berg- und Meerblick.",
      lifestyle: "Ruhig und wohnlich, mit Golf vor der Tur und schneller Verbindung nach Puerto Banus, Marbella und San Pedro.",
    },
    {
      area: "La Zagaleta",
      vibe: "Private Ultra-Luxus-Anlage in Benahavis und eine der exklusivsten Adressen Sudspaniens.",
      property: "Grosse Grundstucke, Privatsphare, Sicherheit, Landmark-Villen und High-End-Berglage.",
      lifestyle: "Fur Diskretion, Raum, Natur, gesicherten Zugang, Golf und Panoramablicke.",
    },
    {
      area: "Puerto Banus",
      vibe: "Weltbekannte Luxusmarina westlich der Golden Mile mit Yachten, Designer-Shopping und Nachtleben.",
      property: "Gepragt von Prime-Apartments und Penthouses, mit starkem Ferienvermietungspotenzial in passenden Gebauden.",
      lifestyle: "Energiegeladen mit Restaurants, Beach Clubs, Nightlife, Marina-Blick und Luxusmarken.",
    },
    {
      area: "Nueva Andalucia",
      vibe: "Familienfreundlicher Bezirk nordlich von Puerto Banus, bekannt als Golf Valley.",
      property: "Breiter Markt von Apartments bis zu High-End-Villen, gefragt bei Lifestyle- und Investmentkaufern.",
      lifestyle: "Golfplatze, internationale Schulen, Restaurants, Turtle Lake und schneller Zugang zu Puerto Banus und Marbella.",
    },
  ],
  ru: [
    {
      area: "Benahavis",
      vibe: "Горная деревня между Marbella и Estepona, окруженная природой, долинами и более спокойным андалусским ритмом.",
      property: "Подходит покупателям, которым нужны приватность, виды, закрытые урбанизации и элитные дома вдали от активной береговой линии.",
      lifestyle: "Хороший выбор для пространства, прогулок, гольфа, традиционных ресторанов и спокойной жизни рядом с Marbella.",
    },
    {
      area: "Elviria",
      vibe: "Прибрежный район Marbella East с быстрым доступом к центру и более жилой атмосферой у моря.",
      property: "Силен для семейных домов, пляжных апартаментов и качественных вилл в более тихой среде.",
      lifestyle: "Песчаные пляжи, beach clubs, Nikki Beach, международные сервисы и расслабленная прибрежная жизнь.",
    },
    {
      area: "Estepona",
      vibe: "Живой прибрежный город к западу от Marbella со старым центром, портом, променадом и развивающимися зонами.",
      property: "Часто дает лучшую стоимость по сравнению с самыми дорогими адресами Marbella, с сильным предложением новостроек.",
      lifestyle: "Удобен для семей: школы, медицина, гольф, пляжи и настоящая испанская жизнь круглый год.",
    },
    {
      area: "Golden Mile",
      vibe: "Престижный коридор между центром Marbella и Puerto Banus, связанный с приватностью, пляжными клубами и знаковыми отелями.",
      property: "Один из самых дорогих адресов Costa del Sol: люксовые виллы, prime-апартаменты и брендированные резиденции.",
      lifestyle: "Рядом Puente Romano, Marbella Club, рестораны, пляжи и быстрый доступ к Marbella и Puerto Banus.",
    },
    {
      area: "Marbella",
      vibe: "Пешеходный городской центр с пляжами, старым городом, Plaza de los Naranjos, сервисами и жизнью круглый год.",
      property: "Разнообразный рынок: центральные апартаменты, объекты у моря и старые квартиры с потенциалом ремонта.",
      lifestyle: "Для тех, кому важны рестораны, магазины, медицина, прогулки у моря и удобство без постоянной машины.",
    },
    {
      area: "Mijas Costa",
      vibe: "Большой муниципалитет между побережьем и холмами, включая La Cala, Mijas Costa и белую деревню Mijas Pueblo.",
      property: "Популярен у международных покупателей благодаря гольфу, апартаментам у моря и более доступным ценам.",
      lifestyle: "Пляжи, семейный досуг, гольф, хайкинг, деревенская атмосфера и удобный доступ к аэропорту Malaga.",
    },
    {
      area: "La Quinta",
      vibe: "Жилой и гольф-анклав в Benahavis, выше побережья и рядом с Nueva Andalucia.",
      property: "Интересен для премиальных домов на холмах с видами на гольф, горы и море.",
      lifestyle: "Тихая жилая среда, гольф рядом и быстрые маршруты к Puerto Banus, Marbella и San Pedro.",
    },
    {
      area: "La Zagaleta",
      vibe: "Частная ультра-люксовая территория в Benahavis, один из самых эксклюзивных адресов юга Испании.",
      property: "Большие участки, приватность, безопасность, знаковые виллы и элитная жизнь в горах.",
      lifestyle: "Для приватности, пространства, природы, закрытого доступа, гольфа и панорамных видов.",
    },
    {
      area: "Puerto Banus",
      vibe: "Всемирно известная люксовая марина к западу от Golden Mile: яхты, дизайнерские бутики и ночная жизнь.",
      property: "Преобладают prime-апартаменты и пентхаусы, с сильным арендным потенциалом в правильных зданиях.",
      lifestyle: "Высокая энергия: рестораны, beach clubs, nightlife, виды на марину и люксовый шопинг.",
    },
    {
      area: "Nueva Andalucia",
      vibe: "Семейный район к северу от Puerto Banus, известный как Golf Valley.",
      property: "Широкий рынок от апартаментов до элитных вилл, востребованный у lifestyle и investment покупателей.",
      lifestyle: "Гольф-поля, международные школы, рестораны, Turtle Lake и быстрый доступ к Puerto Banus и Marbella.",
    },
  ],
  pl: [
    {
      area: "Benahavis",
      vibe: "Gorska miejscowosc miedzy Marbella i Estepona, otoczona natura, dolinami i spokojniejszym andaluzyjskim rytmem.",
      property: "Dobra dla kupujacych szukajacych prywatnosci, widokow, zamknietych osiedli i luksusowych domow poza najbardziej ruchliwym wybrzezem.",
      lifestyle: "Idealna na przestrzen, piesze trasy, golf, tradycyjne restauracje i spokojniejsze zycie blisko Marbella.",
    },
    {
      area: "Elviria",
      vibe: "Nadmorska spolecznosc Marbella East z szybkim dojazdem do centrum i bardziej mieszkalnym klimatem przy plazy.",
      property: "Mocna lokalizacja dla rodzinnych domow, apartamentow przy plazy i dobrych willi w spokojniejszym otoczeniu.",
      lifestyle: "Znana z piaszczystych plaz, beach clubow, Nikki Beach, uslug miedzynarodowych i swobodnego zycia nad morzem.",
    },
    {
      area: "Estepona",
      vibe: "Zywe miasto nad morzem na zachod od Marbella, ze starym miastem, marina, promenada i rozwijajacymi sie dzielnicami.",
      property: "Czesto oferuje lepsza wartosc niz najdrozsze adresy Marbella, z rosnaca podaza nowoczesnych projektow.",
      lifestyle: "Rodzinna i praktyczna lokalizacja: szkoly, opieka zdrowotna, golf, plaze i hiszpanski klimat caly rok.",
    },
    {
      area: "Golden Mile",
      vibe: "Prestiżowy korytarz miedzy centrum Marbella i Puerto Banus, kojarzony z prywatnoscia, beach clubami i kultowymi hotelami.",
      property: "Jedna z najdrozszych lokalizacji Costa del Sol: luksusowe wille, apartamenty prime i branded residences.",
      lifestyle: "Blisko Puente Romano, Marbella Club, restauracji, plaz i szybkiego dostepu do Marbella oraz Puerto Banus.",
    },
    {
      area: "Marbella",
      vibe: "Centrum wygodne pieszo, z plazami, starym miastem, Plaza de los Naranjos, uslugami i zyciem przez caly rok.",
      property: "Zroznicowany rynek: centralne apartamenty, nieruchomosci przy plazy i starsze lokale do remontu.",
      lifestyle: "Dla kupujacych, ktorzy chca restauracji, sklepow, opieki zdrowotnej, spacerow nad morzem i codziennej wygody.",
    },
    {
      area: "Mijas Costa",
      vibe: "Szeroka gmina miedzy wybrzezem i wzgorzami, laczaca La Cala, Mijas Costa i biala wioske Mijas Pueblo.",
      property: "Popularna wsrod zagranicznych kupujacych szukajacych golfa, apartamentow nad morzem i bardziej dostepnych cen.",
      lifestyle: "Plaze, atrakcje rodzinne, golf, szlaki, zycie wioski i dobry dostep do lotniska Malaga.",
    },
    {
      area: "La Quinta",
      vibe: "Golfowa i mieszkalna enklawa w Benahavis, ponad wybrzezem i blisko Nueva Andalucia.",
      property: "Atrakcyjna dla domow premium na wzgorzach z potencjalem widokow na golf, gory i morze.",
      lifestyle: "Spokojna i mieszkalna, z golfem obok i szybkim dojazdem do Puerto Banus, Marbella i San Pedro.",
    },
    {
      area: "La Zagaleta",
      vibe: "Prywatna ultra-luksusowa posiadlosc w Benahavis, jeden z najbardziej ekskluzywnych adresow poludniowej Hiszpanii.",
      property: "Duze dzialki, prywatnosc, ochrona, wyjatkowe wille i luksusowe zycie w gorach.",
      lifestyle: "Dla dyskrecji, przestrzeni, natury, zamknietego dostepu, golfa i panoramicznych widokow.",
    },
    {
      area: "Puerto Banus",
      vibe: "Swiatowo znana luksusowa marina na zachod od Golden Mile, z jachtami, butikami i zyciem nocnym.",
      property: "Dominuja apartamenty i penthouse'y prime, z dobrym potencjalem najmu wakacyjnego w odpowiednich budynkach.",
      lifestyle: "Wysoka energia: restauracje, beach cluby, nightlife, widoki na marine i luksusowe marki.",
    },
    {
      area: "Nueva Andalucia",
      vibe: "Rodzinna dzielnica na polnoc od Puerto Banus, znana jako Golf Valley.",
      property: "Szeroki rynek od apartamentow po wille premium, popularny wsrod kupujacych lifestyle i inwestorow.",
      lifestyle: "Pola golfowe, szkoly miedzynarodowe, restauracje, Turtle Lake i szybki dostep do Puerto Banus oraz Marbella.",
    },
  ],
  hu: [
    {
      area: "Benahavis",
      vibe: "Hegyi andaluz falu Marbella es Estepona kozott, termeszetes volgyekkel es nyugodtabb ritmussal.",
      property: "Jo valasztas azoknak, akik privat szferat, kilatast, zart urbanizaciot es luxusingatlant keresnek a nyuzsgo parttol tavolabb.",
      lifestyle: "Ter, turazas, golf, hagyomanyos ettermek es nyugodtabb elet Marbella kozeleben.",
    },
    {
      area: "Elviria",
      vibe: "Marbella keleti parti kozossege, gyors bejutassal a kozpontba es lakohangulatu beachside kornyezettel.",
      property: "Eros csaladi hazakban, tengerparti apartmanokban es minosegi villakban egy nyugodtabb lokacioban.",
      lifestyle: "Homokos strandok, beach clubok, Nikki Beach, nemzetkozi szolgaltatasok es laza tengerparti elet.",
    },
    {
      area: "Estepona",
      vibe: "Elénk parti varos Marbellatol nyugatra, ovarossal, kikotovel, setannyal es gyorsan fejlodo lakoreszekkel.",
      property: "Gyakran jobb ar-ertek aranyt ad, mint Marbella legdragabb cimei, sok modern es ujepitesu opcioval.",
      lifestyle: "Csaladbarat, praktikus, egesz evben elo varos iskolakkal, egeszseguggyel, golfpalyakkal es strandokkal.",
    },
    {
      area: "Golden Mile",
      vibe: "Presztizs folyosó Marbella kozpontja es Puerto Banus kozott, beach clubokkal, ikonikus hotelekkel es privat hangulattal.",
      property: "A Costa del Sol egyik legertekesebb cime luxusvillakkal, prime apartmanokkal es branded residence projektekkel.",
      lifestyle: "Kozel van Puente Romano, Marbella Club, fine dining, strandettermek, Marbella es Puerto Banus.",
    },
    {
      area: "Marbella",
      vibe: "Gyalog jol bejarhato varoskozpont strandokkal, ovarossal, Plaza de los Naranjosszal es egesz eves varosi elettel.",
      property: "Valtozatos piac kozponti apartmanokkal, frontline beach lakasokkal es felujithato regi ingatlanokkal.",
      lifestyle: "Azoknak jo, akik ettermeket, uzleteket, egeszsegugyet, tengerparti setakat es auto nelkuli kenyelmet keresnek.",
    },
    {
      area: "Mijas Costa",
      vibe: "Sokszinu kornyek a part es a hegyek kozott, La Cala, Mijas Costa es Mijas Pueblo kombinaciojaval.",
      property: "Népszeru nemzetkozi vevoknel golfingatlanok, parti apartmanok es elerhetobb arszintek miatt.",
      lifestyle: "Strandok, csaladi programok, golf, turautak, feher falu hangulat es jo eleres Malaga repulotererol.",
    },
    {
      area: "La Quinta",
      vibe: "Golfos, lakohangulatu enklave Benahavisban, a part felett es kozel Nueva Andaluciahoz.",
      property: "Premium domboldali otthonokhoz vonzo, golf-, hegy- es tengerkilatas lehetoseggel.",
      lifestyle: "Csendes, rezidencialis, golffal a kozelben es gyors kapcsolattal Puerto Banus, Marbella es San Pedro fele.",
    },
    {
      area: "La Zagaleta",
      vibe: "Privat ultra-luxus birtok Benahavisban, Del-Spanyolorszag egyik legexkluzivabb cime.",
      property: "Nagy telkek, privat szfera, biztonsag, ikonikus villak es magas szintu hegyi elet.",
      lifestyle: "Diszkrecio, ter, termeszet, zart beleptetes, golf es panoramas kornyezet.",
    },
    {
      area: "Puerto Banus",
      vibe: "Vilaghiru luxus marina a Golden Mile nyugati oldalan, jachtokkal, designer uzletekkel es ejszakai elettel.",
      property: "Prime apartmanok es penthouse-ok dominaljak, jo nyaralasi kiadasi potenciallal a megfelelo epuletekben.",
      lifestyle: "Magas energia: ettermek, beach clubok, nightlife, kikotoi kilatas es luxusmarkak.",
    },
    {
      area: "Nueva Andalucia",
      vibe: "Csaladbarat kornyek Puerto Banustol eszakra, Golf Valley neven ismert.",
      property: "Szeles piac apartmanoktol premium villakig, eros lifestyle es befektetoi kereslettel.",
      lifestyle: "Golfpalyak, nemzetkozi iskolak, ettermek, Turtle Lake es gyors eleres Puerto Banus es Marbella fele.",
    },
  ],
};

const areaContent: Record<
  Locale,
  {
    body: string;
    cardEyebrow: string;
    headings: {
      lifestyle: string;
      property: string;
      vibe: string;
    };
    metaDescription: string;
    title: string;
    eyebrow: string;
    viewProperties: string;
    guides: AreaGuide[];
  }
> = {
  en: {
    body: "Choose the right area before choosing the property. These compact guides compare lifestyle, property logic and buyer fit across Marbella, Estepona, Benahavis and the wider Costa del Sol.",
    cardEyebrow: "Costa del Sol",
    eyebrow: "Area guides",
    headings: {
      lifestyle: "Amenities & lifestyle",
      property: "Property & investment",
      vibe: "Location & vibe",
    },
    metaDescription:
      "Compact Move2Marbella area guides for Marbella, Estepona, Benahavis and the Costa del Sol property market.",
    title: "Where to buy on the Costa del Sol",
    viewProperties: "View properties",
    guides: baseGuides,
  },
  es: {
    body: "Elige la zona correcta antes de elegir la vivienda. Estas guías comparan estilo de vida, lógica inmobiliaria y perfil de comprador en Marbella, Estepona, Benahavis y la Costa del Sol.",
    cardEyebrow: "Costa del Sol",
    eyebrow: "Guías de zonas",
    headings: {
      lifestyle: "Servicios y estilo de vida",
      property: "Propiedad e inversión",
      vibe: "Ubicación y ambiente",
    },
    metaDescription:
      "Guías compactas de Move2Marbella sobre Marbella, Estepona, Benahavis y el mercado inmobiliario de la Costa del Sol.",
    title: "Dónde comprar en la Costa del Sol",
    viewProperties: "Ver propiedades",
    guides: [
      {
        area: "Benahavis",
        vibe: "Pueblo de montaña entre Marbella y Estepona, rodeado de naturaleza, valles y un ritmo andaluz más tranquilo.",
        property: "Muy buscado por compradores que quieren privacidad, vistas, urbanizaciones cerradas y viviendas de lujo fuera de las zonas costeras más activas.",
        lifestyle: "Ideal para espacio, senderismo, golf, restaurantes tradicionales y una vida tranquila cerca de Marbella.",
      },
      {
        area: "Elviria",
        vibe: "Comunidad costera de Marbella Este con acceso rápido al centro y un ambiente residencial junto a la playa.",
        property: "Interesante para familias, apartamentos de playa y villas de calidad en una zona más tranquila que el centro.",
        lifestyle: "Conocida por sus playas de arena, beach clubs, Nikki Beach, servicios internacionales y vida costera relajada.",
      },
      {
        area: "Estepona",
        vibe: "Ciudad costera al oeste de Marbella con casco antiguo, puerto, paseo marítimo y zonas residenciales en crecimiento.",
        property: "Suele ofrecer mejor valor que las direcciones más caras de Marbella, con mucha oferta moderna y obra nueva.",
        lifestyle: "Familiar, práctica y con vida todo el año: colegios, sanidad, golf, playas y ambiente español.",
      },
      {
        area: "Golden Mile",
        vibe: "El corredor de prestigio entre Marbella centro y Puerto Banus, ligado a privacidad, beach clubs y hoteles emblemáticos.",
        property: "Una de las zonas de mayor valor de la Costa del Sol, con villas de lujo, apartamentos prime y residencias de marca.",
        lifestyle: "Cerca de Puente Romano, Marbella Club, restaurantes, playa y acceso rápido a Marbella y Puerto Banus.",
      },
      {
        area: "Marbella",
        vibe: "Centro urbano caminable con playas, casco antiguo, Plaza de los Naranjos, servicios y vida durante todo el año.",
        property: "Mercado variado con apartamentos céntricos, viviendas frente al mar y propiedades antiguas para reformar.",
        lifestyle: "Para compradores que quieren restaurantes, tiendas, sanidad, paseos marítimos y comodidad diaria sin depender siempre del coche.",
      },
      {
        area: "Mijas Costa",
        vibe: "Municipio amplio que mezcla La Cala, Mijas Costa y el pueblo blanco de Mijas Pueblo.",
        property: "Popular entre compradores internacionales que buscan golf, apartamentos costeros y precios más accesibles.",
        lifestyle: "Playas, ocio familiar, golf, senderismo, vida de pueblo y buen acceso al aeropuerto de Malaga.",
      },
      {
        area: "La Quinta",
        vibe: "Enclave residencial y de golf en Benahavis, por encima de la costa y cerca de Nueva Andalucia.",
        property: "Atractiva para viviendas premium en colina con potencial de vistas al golf, montaña y mar.",
        lifestyle: "Tranquila y residencial, con golf al lado y rutas rápidas a Puerto Banus, Marbella y San Pedro.",
      },
      {
        area: "La Zagaleta",
        vibe: "Finca privada de ultra lujo en Benahavis y una de las direcciones más exclusivas del sur de España.",
        property: "Grandes parcelas, privacidad, seguridad, villas singulares y vida de montaña de alto nivel.",
        lifestyle: "Pensada para discreción, espacio, naturaleza, acceso cerrado, golf y vistas panorámicas.",
      },
      {
        area: "Puerto Banus",
        vibe: "Marina de lujo mundialmente conocida al oeste de la Golden Mile, con yates, tiendas de diseñador y vida nocturna.",
        property: "Dominada por apartamentos y áticos prime, con buen potencial vacacional en los edificios correctos.",
        lifestyle: "Energía alta: restaurantes, beach clubs, ocio nocturno, vistas al puerto y marcas de lujo.",
      },
      {
        area: "Nueva Andalucia",
        vibe: "Distrito familiar al norte de Puerto Banus, conocido como Golf Valley.",
        property: "Mercado amplio, desde apartamentos hasta villas de alto nivel, con demanda de compradores de estilo de vida e inversión.",
        lifestyle: "Campos de golf, colegios internacionales, restaurantes, Turtle Lake y acceso rápido a Puerto Banus y Marbella.",
      },
    ],
  },
  fr: {
    body: "Choisissez le bon secteur avant de choisir le bien. Ces guides comparent style de vie, logique immobiliere et profil d'acheteur a Marbella, Estepona, Benahavis et sur la Costa del Sol.",
    cardEyebrow: "Costa del Sol",
    eyebrow: "Guides de secteurs",
    headings: {
      lifestyle: "Services et style de vie",
      property: "Immobilier et investissement",
      vibe: "Localisation et ambiance",
    },
    metaDescription:
      "Guides compacts Move2Marbella pour Marbella, Estepona, Benahavis et le marche immobilier de la Costa del Sol.",
    title: "Ou acheter sur la Costa del Sol",
    viewProperties: "Voir les biens",
    guides: localizedGuides.fr ?? baseGuides,
  },
  de: {
    body: "Wahlen Sie zuerst die richtige Lage und erst danach die Immobilie. Diese kompakten Guides vergleichen Lebensstil, Immobilienlogik und Kauferprofil in Marbella, Estepona, Benahavis und an der Costa del Sol.",
    cardEyebrow: "Costa del Sol",
    eyebrow: "Gebietsfuhrer",
    headings: {
      lifestyle: "Angebot und Lebensstil",
      property: "Immobilie und Investment",
      vibe: "Lage und Atmosphare",
    },
    metaDescription:
      "Kompakte Move2Marbella-Guides fur Marbella, Estepona, Benahavis und den Immobilienmarkt der Costa del Sol.",
    title: "Wo kaufen an der Costa del Sol",
    viewProperties: "Immobilien ansehen",
    guides: localizedGuides.de ?? baseGuides,
  },
  ru: {
    body: "Сначала выберите правильный район, затем объект. Эти краткие гиды сравнивают стиль жизни, логику рынка и профиль покупателя в Marbella, Estepona, Benahavis и на Costa del Sol.",
    cardEyebrow: "Costa del Sol",
    eyebrow: "Гиды по районам",
    headings: {
      lifestyle: "Инфраструктура и стиль жизни",
      property: "Недвижимость и инвестиции",
      vibe: "Локация и атмосфера",
    },
    metaDescription:
      "Краткие гиды Move2Marbella по Marbella, Estepona, Benahavis и рынку недвижимости Costa del Sol.",
    title: "Где покупать на Costa del Sol",
    viewProperties: "Смотреть объекты",
    guides: localizedGuides.ru ?? baseGuides,
  },
  pl: {
    body: "Najpierw wybierz odpowiednia okolice, dopiero potem nieruchomosc. Te krotkie przewodniki porownuja styl zycia, logike rynku i profil kupujacego w Marbella, Estepona, Benahavis i na Costa del Sol.",
    cardEyebrow: "Costa del Sol",
    eyebrow: "Przewodniki po lokalizacjach",
    headings: {
      lifestyle: "Udogodnienia i styl zycia",
      property: "Nieruchomosci i inwestycje",
      vibe: "Lokalizacja i klimat",
    },
    metaDescription:
      "Krotkie przewodniki Move2Marbella po Marbella, Estepona, Benahavis i rynku nieruchomosci Costa del Sol.",
    title: "Gdzie kupic na Costa del Sol",
    viewProperties: "Zobacz nieruchomosci",
    guides: localizedGuides.pl ?? baseGuides,
  },
  hu: {
    body: "Eloszor a megfelelo kornyeket valaszd ki, es csak utana az ingatlant. Ezek a rovid guide-ok eletmod, ingatlanlogika es vevoi profil alapjan hasonlitjak ossze Marbella, Estepona, Benahavis es a Costa del Sol kiemelt teruleteit.",
    cardEyebrow: "Costa del Sol",
    eyebrow: "Kornyek guide-ok",
    headings: {
      lifestyle: "Szolgaltatasok es eletmod",
      property: "Ingatlan es befektetes",
      vibe: "Elhelyezkedes es hangulat",
    },
    metaDescription:
      "Kompakt Move2Marbella kornyek guide-ok Marbella, Estepona, Benahavis es a Costa del Sol ingatlanpiacahoz.",
    title: "Hol erdemes vasarolni a Costa del Solon",
    viewProperties: "Ingatlanok megnezese",
    guides: localizedGuides.hu ?? baseGuides,
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: AreasPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const page = areaContent[locale];

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: getLocalizedPath(locale, "/areas"),
      languages: getLanguageAlternates("/areas"),
    },
    robots: getPageRobots(),
  };
}

export default async function AreasPage({ params }: AreasPageProps) {
  const { locale: localeParam } = await params;
  const locale = getLocale(localeParam);
  const page = areaContent[locale];
  const basePath = getLocaleBasePath(locale);

  return (
    <ContentPageShell
      locale={locale}
      languagePath="/areas"
      eyebrow={page.eyebrow}
      title={page.title}
      body={page.body}
    >
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {page.guides.map((guide) => (
            <article
              id={guide.area.toLowerCase().replaceAll(" ", "-")}
              key={guide.area}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a3a]">
                {page.cardEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{guide.area}</h2>
              <div className="mt-4 grid gap-3">
                <div className="rounded-[6px] bg-[#f7f2ea] p-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f253d]">
                    {page.headings.vibe}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-[#4b4740]">
                    {guide.vibe}
                  </p>
                </div>
                <div className="rounded-[6px] bg-[#f7f2ea] p-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f253d]">
                    {page.headings.property}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-[#4b4740]">
                    {guide.property}
                  </p>
                </div>
                <div className="rounded-[6px] bg-[#f7f2ea] p-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f253d]">
                    {page.headings.lifestyle}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-[#4b4740]">
                    {guide.lifestyle}
                  </p>
                </div>
              </div>
              <Link
                href={basePath}
                className="mt-4 inline-flex rounded-full border border-[#0f253d] px-4 py-2 text-sm font-semibold text-[#0f253d]"
              >
                {page.viewProperties}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
}

export const revalidate = 300;
