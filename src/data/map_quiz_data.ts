import { Language } from '@/types';

export type MapQuizMode = 'countries' | 'regions' | 'cities';
export type MapQuestionType = 'find_on_map' | 'spotlight' | 'satellite_detective';

export interface MultilingualText {
  de: string;
  en: string;
  fr: string;
  es: string;
  it: string;
}

export interface MapRegionSet {
  id: string;
  countryCode: string;
  name: MultilingualText;
  subdivisionType: MultilingualText;
  count: number;
  geojsonFile: string;
  defaultCenter: [number, number]; // [lat, lng]
  defaultZoom: number;
}

export interface MapCityItem {
  id: string;
  name: MultilingualText;
  country: MultilingualText;
  countryCode: string;
  continent: 'europa' | 'asien' | 'afrika' | 'nordamerika' | 'suedamerika' | 'ozeanien';
  coordinates: [number, number]; // [lat, lng]
  population?: string;
  landmarkHint?: MultilingualText;
}

export interface MapQuizQuestion {
  id: string;
  mode: MapQuizMode;
  targetId: string; // ISO code or region ID
  targetName: MultilingualText;
  secondaryInfo?: MultilingualText; // e.g. "Hauptstadt: München", "Land: Japan"
  flagCode?: string;
  continent?: string;
  countryCode?: string;
  center: [number, number];
  zoom: number;
  bounds?: [[number, number], [number, number]];
  options?: {
    id: string;
    name: MultilingualText;
    isCorrect: boolean;
  }[];
  questionType: MapQuestionType;
  geojsonFile?: string;
  coordinates?: [number, number]; // for cities
}

export const MAP_CONTINENTS: { id: string; name: MultilingualText; center: [number, number]; zoom: number; geojsonFile: string }[] = [
  {
    id: 'alle',
    name: { de: 'Alle Kontinente (Welt)', en: 'All Continents (World)', fr: 'Tous les continents (Monde)', es: 'Todos los continentes (Mundo)', it: 'Tutti i continenti (Mondo)' },
    center: [20, 0],
    zoom: 2,
    geojsonFile: '/data/geojson/world_countries.json'
  },
  {
    id: 'europa',
    name: { de: 'Europa', en: 'Europe', fr: 'Europe', es: 'Europa', it: 'Europa' },
    center: [54, 15],
    zoom: 4,
    geojsonFile: '/data/geojson/countries_europa.json'
  },
  {
    id: 'asien',
    name: { de: 'Asien', en: 'Asia', fr: 'Asie', es: 'Asia', it: 'Asia' },
    center: [34, 90],
    zoom: 3,
    geojsonFile: '/data/geojson/countries_asien.json'
  },
  {
    id: 'afrika',
    name: { de: 'Afrika', en: 'Africa', fr: 'Afrique', es: 'África', it: 'Africa' },
    center: [2, 20],
    zoom: 3,
    geojsonFile: '/data/geojson/countries_afrika.json'
  },
  {
    id: 'nordamerika',
    name: { de: 'Nordamerika', en: 'North America', fr: 'Amérique du Nord', es: 'América del Norte', it: 'Nord America' },
    center: [45, -100],
    zoom: 3,
    geojsonFile: '/data/geojson/countries_nordamerika.json'
  },
  {
    id: 'suedamerika',
    name: { de: 'Südamerika', en: 'South America', fr: 'Amérique du Sud', es: 'América del Sur', it: 'Sud America' },
    center: [-20, -60],
    zoom: 3,
    geojsonFile: '/data/geojson/countries_suedamerika.json'
  },
  {
    id: 'ozeanien',
    name: { de: 'Ozeanien', en: 'Oceania', fr: 'Océanie', es: 'Oceanía', it: 'Oceania' },
    center: [-25, 140],
    zoom: 4,
    geojsonFile: '/data/geojson/countries_ozeanien.json'
  }
];

export const MAP_REGION_SETS: MapRegionSet[] = [
  {
    id: 'de',
    countryCode: 'de',
    name: { de: 'Deutschland', en: 'Germany', fr: 'Allemagne', es: 'Alemania', it: 'Germania' },
    subdivisionType: { de: '16 Bundesländer', en: '16 Federal States', fr: '16 États fédéraux', es: '16 Estados federados', it: '16 Stati federati' },
    count: 16,
    geojsonFile: '/data/geojson/de_bundeslaender.json',
    defaultCenter: [51.1657, 10.4515],
    defaultZoom: 6
  },
  {
    id: 'ch',
    countryCode: 'ch',
    name: { de: 'Schweiz', en: 'Switzerland', fr: 'Suisse', es: 'Suiza', it: 'Svizzera' },
    subdivisionType: { de: '26 Kantone', en: '26 Cantons', fr: '26 Cantons', es: '26 Cantones', it: '26 Cantoni' },
    count: 26,
    geojsonFile: '/data/geojson/ch_kantone.json',
    defaultCenter: [46.8182, 8.2275],
    defaultZoom: 7
  },
  {
    id: 'at',
    countryCode: 'at',
    name: { de: 'Österreich', en: 'Austria', fr: 'Autriche', es: 'Austria', it: 'Austria' },
    subdivisionType: { de: '9 Bundesländer', en: '9 Federal States', fr: '9 États fédéraux', es: '9 Estados federados', it: '9 Stati federati' },
    count: 9,
    geojsonFile: '/data/geojson/at_bundeslaender.json',
    defaultCenter: [47.5162, 14.5501],
    defaultZoom: 7
  },
  {
    id: 'us',
    countryCode: 'us',
    name: { de: 'USA', en: 'United States', fr: 'États-Unis', es: 'Estados Unidos', it: 'Stati Uniti' },
    subdivisionType: { de: '50 Bundesstaaten', en: '50 States', fr: '50 États', es: '50 Estados', it: '50 Stati' },
    count: 50,
    geojsonFile: '/data/geojson/us_states.json',
    defaultCenter: [39.8283, -98.5795],
    defaultZoom: 4
  },
  {
    id: 'ca',
    countryCode: 'ca',
    name: { de: 'Kanada', en: 'Canada', fr: 'Canada', es: 'Canadá', it: 'Canada' },
    subdivisionType: { de: '13 Provinzen & Territorien', en: '13 Provinces & Territories', fr: '13 Provinces & Territoires', es: '13 Provincias y Territorios', it: '13 Province e Territori' },
    count: 13,
    geojsonFile: '/data/geojson/ca_provinces.json',
    defaultCenter: [56.1304, -106.3468],
    defaultZoom: 3
  },
  {
    id: 'au',
    countryCode: 'au',
    name: { de: 'Australien', en: 'Australia', fr: 'Australie', es: 'Australia', it: 'Australia' },
    subdivisionType: { de: '8 Staaten & Territorien', en: '8 States & Territories', fr: '8 États & Territoires', es: '8 Estados y Territorios', it: '8 Stati e Territori' },
    count: 8,
    geojsonFile: '/data/geojson/au_states.json',
    defaultCenter: [-25.2744, 133.7751],
    defaultZoom: 4
  },
  {
    id: 'fr',
    countryCode: 'fr',
    name: { de: 'Frankreich', en: 'France', fr: 'France', es: 'Francia', it: 'Francia' },
    subdivisionType: { de: '13 Regionen', en: '13 Regions', fr: '13 Régions', es: '13 Regiones', it: '13 Regioni' },
    count: 13,
    geojsonFile: '/data/geojson/fr_regions.json',
    defaultCenter: [46.6034, 1.8883],
    defaultZoom: 6
  },
  {
    id: 'es',
    countryCode: 'es',
    name: { de: 'Spanien', en: 'Spain', fr: 'Espagne', es: 'España', it: 'Spagna' },
    subdivisionType: { de: '17 Autonome Gemeinschaften', en: '17 Autonomous Communities', fr: '17 Communautés autonomes', es: '17 Comunidades autónomas', it: '17 Comunità autonome' },
    count: 17,
    geojsonFile: '/data/geojson/es_comunidades.json',
    defaultCenter: [40.4637, -3.7492],
    defaultZoom: 6
  },
  {
    id: 'it',
    countryCode: 'it',
    name: { de: 'Italien', en: 'Italy', fr: 'Italie', es: 'Italia', it: 'Italia' },
    subdivisionType: { de: '20 Regionen', en: '20 Regions', fr: '20 Régions', es: '20 Regioni', it: '20 Regioni' },
    count: 20,
    geojsonFile: '/data/geojson/it_regioni.json',
    defaultCenter: [41.8719, 12.5674],
    defaultZoom: 6
  },
  {
    id: 'br',
    countryCode: 'br',
    name: { de: 'Brasilien', en: 'Brazil', fr: 'Brésil', es: 'Brasil', it: 'Brasile' },
    subdivisionType: { de: '27 Bundesstaaten', en: '27 States', fr: '27 États', es: '27 Estados', it: '27 Stati' },
    count: 27,
    geojsonFile: '/data/geojson/br_states.json',
    defaultCenter: [-14.235, -51.9253],
    defaultZoom: 4
  },
  {
    id: 'mx',
    countryCode: 'mx',
    name: { de: 'Mexiko', en: 'Mexico', fr: 'Mexique', es: 'México', it: 'Messico' },
    subdivisionType: { de: '32 Bundesstaaten', en: '32 States', fr: '32 États', es: '32 Estados', it: '32 Stati' },
    count: 32,
    geojsonFile: '/data/geojson/mx_states.json',
    defaultCenter: [23.6345, -102.5528],
    defaultZoom: 5
  },
  {
    id: 'in',
    countryCode: 'in',
    name: { de: 'Indien', en: 'India', fr: 'Inde', es: 'India', it: 'India' },
    subdivisionType: { de: '28 Bundesstaaten', en: '28 States', fr: '28 États', es: '28 Estados', it: '28 Stati' },
    count: 28,
    geojsonFile: '/data/geojson/in_states.json',
    defaultCenter: [20.5937, 78.9629],
    defaultZoom: 5
  },
  {
    id: 'pl',
    countryCode: 'pl',
    name: { de: 'Polen', en: 'Poland', fr: 'Pologne', es: 'Polonia', it: 'Polonia' },
    subdivisionType: { de: '16 Woiwodschaften', en: '16 Voivodeships', fr: '16 Voïvodies', es: '16 Voivodatos', it: '16 Voivodati' },
    count: 16,
    geojsonFile: '/data/geojson/pl_voivodeships.json',
    defaultCenter: [51.9194, 19.1451],
    defaultZoom: 6
  }
];

export const MAP_CITIES_DATA: MapCityItem[] = [
  // Europa
  { id: 'berlin', name: { de: 'Berlin', en: 'Berlin', fr: 'Berlin', es: 'Berlín', it: 'Berlino' }, country: { de: 'Deutschland', en: 'Germany', fr: 'Allemagne', es: 'Alemania', it: 'Germania' }, countryCode: 'de', continent: 'europa', coordinates: [52.52, 13.405], population: '3,8 Mio.', landmarkHint: { de: 'Brandenburger Tor, Fernsehturm', en: 'Brandenburg Gate, TV Tower', fr: 'Porte de Brandebourg', es: 'Puerta de Brandeburgo', it: 'Porta di Brandeburgo' } },
  { id: 'paris', name: { de: 'Paris', en: 'Paris', fr: 'Paris', es: 'París', it: 'Parigi' }, country: { de: 'Frankreich', en: 'France', fr: 'France', es: 'Francia', it: 'Francia' }, countryCode: 'fr', continent: 'europa', coordinates: [48.8566, 2.3522], population: '2,1 Mio.', landmarkHint: { de: 'Eiffelturm, Louvre, Seine', en: 'Eiffel Tower, Louvre, Seine', fr: 'Tour Eiffel, Louvre', es: 'Torre Eiffel, Louvre', it: 'Torre Eiffel, Louvre' } },
  { id: 'london', name: { de: 'London', en: 'London', fr: 'Londres', es: 'Londres', it: 'Londra' }, country: { de: 'Großbritannien', en: 'United Kingdom', fr: 'Royaume-Uni', es: 'Reino Unido', it: 'Regno Unito' }, countryCode: 'gb', continent: 'europa', coordinates: [51.5074, -0.1278], population: '9,0 Mio.', landmarkHint: { de: 'Big Ben, Tower Bridge, Themse', en: 'Big Ben, Tower Bridge, Thames', fr: 'Big Ben, Tower Bridge', es: 'Big Ben, Tower Bridge', it: 'Big Ben, Tower Bridge' } },
  { id: 'rome', name: { de: 'Rom', en: 'Rome', fr: 'Rome', es: 'Roma', it: 'Roma' }, country: { de: 'Italien', en: 'Italy', fr: 'Italie', es: 'Italia', it: 'Italia' }, countryCode: 'it', continent: 'europa', coordinates: [41.9028, 12.4964], population: '2,8 Mio.', landmarkHint: { de: 'Kolosseum, Vatikan, Forum Romanum', en: 'Colosseum, Vatican, Roman Forum', fr: 'Colisée, Vatican', es: 'Coliseo, Vaticano', it: 'Colosseo, Vaticano' } },
  { id: 'madrid', name: { de: 'Madrid', en: 'Madrid', fr: 'Madrid', es: 'Madrid', it: 'Madrid' }, country: { de: 'Spanien', en: 'Spain', fr: 'Espagne', es: 'España', it: 'Spagna' }, countryCode: 'es', continent: 'europa', coordinates: [40.4168, -3.7038], population: '3,3 Mio.', landmarkHint: { de: 'Plaza Mayor, Königspalast', en: 'Plaza Mayor, Royal Palace', fr: 'Palais Royal', es: 'Plaza Mayor, Palacio Real', it: 'Palazzo Reale' } },
  { id: 'vienna', name: { de: 'Wien', en: 'Vienna', fr: 'Vienne', es: 'Viena', it: 'Vienna' }, country: { de: 'Österreich', en: 'Austria', fr: 'Autriche', es: 'Austria', it: 'Austria' }, countryCode: 'at', continent: 'europa', coordinates: [48.2082, 16.3738], population: '1,9 Mio.', landmarkHint: { de: 'Stephansdom, Schloss Schönbrunn', en: 'St. Stephen\'s Cathedral, Schönbrunn', fr: 'Château de Schönbrunn', es: 'Palacio de Schönbrunn', it: 'Castello di Schönbrunn' } },
  { id: 'bern', name: { de: 'Bern', en: 'Bern', fr: 'Berne', es: 'Berna', it: 'Berna' }, country: { de: 'Schweiz', en: 'Switzerland', fr: 'Suisse', es: 'Suiza', it: 'Svizzera' }, countryCode: 'ch', continent: 'europa', coordinates: [46.948, 7.4474], population: '135.000', landmarkHint: { de: 'Bundeshaus, Zytglogge, Aareschlaufe', en: 'Federal Palace, Zytglogge, Aare', fr: 'Palais fédéral, Zytglogge', es: 'Palacio Federal', it: 'Palazzo Federale' } },
  { id: 'zurich', name: { de: 'Zürich', en: 'Zurich', fr: 'Zurich', es: 'Zúrich', it: 'Zurigo' }, country: { de: 'Schweiz', en: 'Switzerland', fr: 'Suisse', es: 'Suiza', it: 'Svizzera' }, countryCode: 'ch', continent: 'europa', coordinates: [47.3769, 8.5417], population: '420.000', landmarkHint: { de: 'Zürichsee, Bahnhofstrasse, Grossmünster', en: 'Lake Zurich, Grossmünster', fr: 'Lac de Zurich', es: 'Lago de Zúrich', it: 'Lago di Zurigo' } },
  { id: 'munich', name: { de: 'München', en: 'Munich', fr: 'Munich', es: 'Múnich', it: 'Monaco di Baviera' }, country: { de: 'Deutschland', en: 'Germany', fr: 'Allemagne', es: 'Alemania', it: 'Germania' }, countryCode: 'de', continent: 'europa', coordinates: [48.1351, 11.582], population: '1,5 Mio.', landmarkHint: { de: 'Frauenkirche, Marienplatz, Olympiapark', en: 'Frauenkirche, Marienplatz', fr: 'Marienplatz', es: 'Marienplatz', it: 'Marienplatz' } },
  { id: 'hamburg', name: { de: 'Hamburg', en: 'Hamburg', fr: 'Hambourg', es: 'Hamburgo', it: 'Amburgo' }, country: { de: 'Deutschland', en: 'Germany', fr: 'Allemagne', es: 'Alemania', it: 'Germania' }, countryCode: 'de', continent: 'europa', coordinates: [53.5511, 9.9937], population: '1,9 Mio.', landmarkHint: { de: 'Elbphilharmonie, Speicherstadt, Hafen', en: 'Elbphilharmonie, Port of Hamburg', fr: 'Philharmonie de l\'Elbe', es: 'Filarmónica del Elba', it: 'Filarmonica dell\'Elba' } },
  { id: 'amsterdam', name: { de: 'Amsterdam', en: 'Amsterdam', fr: 'Amsterdam', es: 'Ámsterdam', it: 'Amsterdam' }, country: { de: 'Niederlande', en: 'Netherlands', fr: 'Pays-Bas', es: 'Países Bajos', it: 'Paesi Bassi' }, countryCode: 'nl', continent: 'europa', coordinates: [52.3676, 4.9041], population: '900.000', landmarkHint: { de: 'Grachten, Rijksmuseum', en: 'Canals, Rijksmuseum', fr: 'Canaux, Rijksmuseum', es: 'Canales, Rijksmuseum', it: 'Canali, Rijksmuseum' } },
  { id: 'brussels', name: { de: 'Brüssel', en: 'Brussels', fr: 'Bruxelles', es: 'Bruselas', it: 'Bruxelles' }, country: { de: 'Belgien', en: 'Belgium', fr: 'Belgique', es: 'Bélgica', it: 'Belgio' }, countryCode: 'be', continent: 'europa', coordinates: [50.8503, 4.3517], population: '1,2 Mio.', landmarkHint: { de: 'Atomium, Grand-Place, EU-Hauptquartier', en: 'Atomium, Grand Place, EU HQ', fr: 'Atomium, Grand-Place', es: 'Atomium, Grand-Place', it: 'Atomium, Grand-Place' } },
  { id: 'stockholm', name: { de: 'Stockholm', en: 'Stockholm', fr: 'Stockholm', es: 'Estocolmo', it: 'Stoccolma' }, country: { de: 'Schweden', en: 'Sweden', fr: 'Suède', es: 'Suecia', it: 'Svezia' }, countryCode: 'se', continent: 'europa', coordinates: [59.3293, 18.0686], population: '980.000', landmarkHint: { de: 'Gamla Stan, Vasa-Museum, Schären', en: 'Gamla Stan, Vasa Museum', fr: 'Gamla Stan', es: 'Gamla Stan', it: 'Gamla Stan' } },
  { id: 'oslo', name: { de: 'Oslo', en: 'Oslo', fr: 'Oslo', es: 'Oslo', it: 'Oslo' }, country: { de: 'Norwegen', en: 'Norway', fr: 'Norvège', es: 'Noruega', it: 'Norvegia' }, countryCode: 'no', continent: 'europa', coordinates: [59.9139, 10.7522], population: '700.000', landmarkHint: { de: 'Opernhaus, Holmenkollen, Oslofjord', en: 'Opera House, Oslofjord', fr: 'Opéra d\'Oslo', es: 'Ópera de Oslo', it: 'Opera di Oslo' } },
  { id: 'athens', name: { de: 'Athen', en: 'Athens', fr: 'Athènes', es: 'Atenas', it: 'Atene' }, country: { de: 'Griechenland', en: 'Greece', fr: 'Grèce', es: 'Grecia', it: 'Grecia' }, countryCode: 'gr', continent: 'europa', coordinates: [37.9838, 23.7275], population: '3,1 Mio.', landmarkHint: { de: 'Akropolis, Parthenon', en: 'Acropolis, Parthenon', fr: 'Acropole, Parthénon', es: 'Acrópolis, Partenón', it: 'Acropoli, Partenone' } },
  { id: 'warsaw', name: { de: 'Warschau', en: 'Warsaw', fr: 'Varsovie', es: 'Varsovia', it: 'Varsavia' }, country: { de: 'Polen', en: 'Poland', fr: 'Pologne', es: 'Polonia', it: 'Polonia' }, countryCode: 'pl', continent: 'europa', coordinates: [52.2297, 21.0122], population: '1,8 Mio.', landmarkHint: { de: 'Kulturpalast, Altstadt, Weichsel', en: 'Palace of Culture, Old Town', fr: 'Palais de la Culture', es: 'Palacio de la Cultura', it: 'Palazzo della Cultura' } },
  { id: 'lisbon', name: { de: 'Lissabon', en: 'Lisbon', fr: 'Lisbonne', es: 'Lisboa', it: 'Lisbona' }, country: { de: 'Portugal', en: 'Portugal', fr: 'Portugal', es: 'Portugal', it: 'Portogallo' }, countryCode: 'pt', continent: 'europa', coordinates: [38.7223, -9.1393], population: '550.000', landmarkHint: { de: 'Torre de Belém, Tejo, Tram 28', en: 'Belém Tower, Tagus River', fr: 'Tour de Belém', es: 'Torre de Belém', it: 'Torre di Belém' } },

  // Asien
  { id: 'tokyo', name: { de: 'Tokio', en: 'Tokyo', fr: 'Tokyo', es: 'Tokio', it: 'Tokyo' }, country: { de: 'Japan', en: 'Japan', fr: 'Japon', es: 'Japón', it: 'Giappone' }, countryCode: 'jp', continent: 'asien', coordinates: [35.6762, 139.6503], population: '37 Mio. (Metropolregion)', landmarkHint: { de: 'Shibuya Crossing, Tokyo Skytree, Fuji-Blick', en: 'Shibuya Crossing, Tokyo Skytree', fr: 'Shibuya Crossing, Skytree', es: 'Cruce de Shibuya, Skytree', it: 'Incrocio di Shibuya, Skytree' } },
  { id: 'beijing', name: { de: 'Peking', en: 'Beijing', fr: 'Pékin', es: 'Pekín', it: 'Pechino' }, country: { de: 'China', en: 'China', fr: 'Chine', es: 'China', it: 'Cina' }, countryCode: 'cn', continent: 'asien', coordinates: [39.9042, 116.4074], population: '21 Mio.', landmarkHint: { de: 'Verbotene Stadt, Tian\'anmen-Platz, Große Mauer', en: 'Forbidden City, Great Wall', fr: 'Cité interdite, Grande Muraille', es: 'Ciudad Prohibida, Gran Muralla', it: 'Città Proibita, Grande Muraglia' } },
  { id: 'bangkok', name: { de: 'Bangkok', en: 'Bangkok', fr: 'Bangkok', es: 'Bangkok', it: 'Bangkok' }, country: { de: 'Thailand', en: 'Thailand', fr: 'Thaïlande', es: 'Tailandia', it: 'Thailandia' }, countryCode: 'th', continent: 'asien', coordinates: [13.7563, 100.5018], population: '10,5 Mio.', landmarkHint: { de: 'Großer Palast, Wat Arun, Chao Phraya', en: 'Grand Palace, Wat Arun', fr: 'Grand Palais, Wat Arun', es: 'Gran Palacio, Wat Arun', it: 'Grande Palazzo, Wat Arun' } },
  { id: 'delhi', name: { de: 'Neu-Delhi', en: 'New Delhi', fr: 'New Delhi', es: 'Nueva Delhi', it: 'Nuova Delhi' }, country: { de: 'Indien', en: 'India', fr: 'Inde', es: 'India', it: 'India' }, countryCode: 'in', continent: 'asien', coordinates: [28.6139, 77.209], population: '32 Mio. (Metropolregion)', landmarkHint: { de: 'India Gate, Rotes Fort, Lotus-Tempel', en: 'India Gate, Red Fort', fr: 'India Gate, Fort Rouge', es: 'Puerta de la India, Fuerte Rojo', it: 'India Gate, Forte Rosso' } },
  { id: 'singapore', name: { de: 'Singapur', en: 'Singapore', fr: 'Singapour', es: 'Singapur', it: 'Singapore' }, country: { de: 'Singapur', en: 'Singapore', fr: 'Singapour', es: 'Singapur', it: 'Singapore' }, countryCode: 'sg', continent: 'asien', coordinates: [1.3521, 103.8198], population: '5,9 Mio.', landmarkHint: { de: 'Marina Bay Sands, Gardens by the Bay', en: 'Marina Bay Sands, Supertree Grove', fr: 'Marina Bay Sands', es: 'Marina Bay Sands', it: 'Marina Bay Sands' } },
  { id: 'seoul', name: { de: 'Seoul', en: 'Seoul', fr: 'Séoul', es: 'Seúl', it: 'Seul' }, country: { de: 'Südkorea', en: 'South Korea', fr: 'Corée du Sud', es: 'Corea del Sur', it: 'Corea del Sud' }, countryCode: 'kr', continent: 'asien', coordinates: [37.5665, 126.978], population: '9,7 Mio.', landmarkHint: { de: 'Gyeongbokgung-Palast, N Seoul Tower', en: 'Gyeongbokgung Palace, N Seoul Tower', fr: 'Palais de Gyeongbokgung', es: 'Palacio Gyeongbokgung', it: 'Palazzo Gyeongbokgung' } },
  { id: 'dubai', name: { de: 'Dubai', en: 'Dubai', fr: 'Dubaï', es: 'Dubái', it: 'Dubai' }, country: { de: 'VAE', en: 'UAE', fr: 'Émirats arabes unis', es: 'Emiratos Árabes', it: 'Emirati Arabi' }, countryCode: 'ae', continent: 'asien', coordinates: [25.2048, 55.2708], population: '3,5 Mio.', landmarkHint: { de: 'Burj Khalifa, Palm Jumeirah', en: 'Burj Khalifa, Palm Jumeirah', fr: 'Burj Khalifa, Palm Jumeirah', es: 'Burj Khalifa, Palm Jumeirah', it: 'Burj Khalifa, Palm Jumeirah' } },

  // Nordamerika
  { id: 'washington', name: { de: 'Washington, D.C.', en: 'Washington, D.C.', fr: 'Washington, D.C.', es: 'Washington D. C.', it: 'Washington, D.C.' }, country: { de: 'USA', en: 'USA', fr: 'États-Unis', es: 'Estados Unidos', it: 'Stati Uniti' }, countryCode: 'us', continent: 'nordamerika', coordinates: [38.9072, -77.0369], population: '700.000', landmarkHint: { de: 'Weißes Haus, Kapitol, Lincoln Memorial', en: 'White House, Capitol, Lincoln Memorial', fr: 'Maison-Blanche, Capitole', es: 'Casa Blanca, Capitolio', it: 'Casa Bianca, Campidoglio' } },
  { id: 'newyork', name: { de: 'New York City', en: 'New York City', fr: 'New York', es: 'Nueva York', it: 'New York' }, country: { de: 'USA', en: 'USA', fr: 'États-Unis', es: 'Estados Unidos', it: 'Stati Uniti' }, countryCode: 'us', continent: 'nordamerika', coordinates: [40.7128, -74.006], population: '8,4 Mio.', landmarkHint: { de: 'Freiheitsstatue, Manhattan, Central Park', en: 'Statue of Liberty, Manhattan, Central Park', fr: 'Statue de la Liberté, Central Park', es: 'Estatua de la Libertad, Central Park', it: 'Statua della Libertà, Central Park' } },
  { id: 'losangeles', name: { de: 'Los Angeles', en: 'Los Angeles', fr: 'Los Angeles', es: 'Los Ángeles', it: 'Los Angeles' }, country: { de: 'USA', en: 'USA', fr: 'États-Unis', es: 'Estados Unidos', it: 'Stati Uniti' }, countryCode: 'us', continent: 'nordamerika', coordinates: [34.0522, -118.2437], population: '3,9 Mio.', landmarkHint: { de: 'Hollywood Sign, Santa Monica Pier', en: 'Hollywood Sign, Santa Monica Pier', fr: 'Panneau Hollywood, Santa Monica', es: 'Cartel de Hollywood, Santa Mónica', it: 'Scritta Hollywood, Santa Monica' } },
  { id: 'sanfrancisco', name: { de: 'San Francisco', en: 'San Francisco', fr: 'San Francisco', es: 'San Francisco', it: 'San Francisco' }, country: { de: 'USA', en: 'USA', fr: 'États-Unis', es: 'Estados Unidos', it: 'Stati Uniti' }, countryCode: 'us', continent: 'nordamerika', coordinates: [37.7749, -122.4194], population: '870.000', landmarkHint: { de: 'Golden Gate Bridge, Alcatraz, Cable Cars', en: 'Golden Gate Bridge, Alcatraz', fr: 'Pont du Golden Gate, Alcatraz', es: 'Puente Golden Gate, Alcatraz', it: 'Golden Gate Bridge, Alcatraz' } },
  { id: 'chicago', name: { de: 'Chicago', en: 'Chicago', fr: 'Chicago', es: 'Chicago', it: 'Chicago' }, country: { de: 'USA', en: 'USA', fr: 'États-Unis', es: 'Estados Unidos', it: 'Stati Uniti' }, countryCode: 'us', continent: 'nordamerika', coordinates: [41.8781, -87.6298], population: '2,7 Mio.', landmarkHint: { de: 'Willis Tower, Lake Michigan, Cloud Gate', en: 'Willis Tower, Lake Michigan, The Bean', fr: 'Tour Willis, Lac Michigan', es: 'Torre Willis, Lago Míchigan', it: 'Willis Tower, Lago Michigan' } },
  { id: 'toronto', name: { de: 'Toronto', en: 'Toronto', fr: 'Toronto', es: 'Toronto', it: 'Toronto' }, country: { de: 'Kanada', en: 'Canada', fr: 'Canada', es: 'Canadá', it: 'Canada' }, countryCode: 'ca', continent: 'nordamerika', coordinates: [43.6532, -79.3832], population: '2,9 Mio.', landmarkHint: { de: 'CN Tower, Lake Ontario', en: 'CN Tower, Lake Ontario', fr: 'Tour CN, Lac Ontario', es: 'Torre CN, Lago Ontario', it: 'CN Tower, Lago Ontario' } },
  { id: 'mexicocity', name: { de: 'Mexiko-Stadt', en: 'Mexico City', fr: 'Mexico', es: 'Ciudad de México', it: 'Città del Messico' }, country: { de: 'Mexiko', en: 'Mexico', fr: 'Mexique', es: 'México', it: 'Messico' }, countryCode: 'mx', continent: 'nordamerika', coordinates: [19.4326, -99.1332], population: '9,2 Mio. (22 Mio. Metro)', landmarkHint: { de: 'Zócalo, Palacio de Bellas Artes, Teotihuacán', en: 'Zócalo, Bellas Artes Palace', fr: 'Zócalo, Palais des Beaux-Arts', es: 'Zócalo, Bellas Artes', it: 'Zócalo, Palazzo delle Belle Arti' } },

  // Südamerika
  { id: 'riodejaneiro', name: { de: 'Rio de Janeiro', en: 'Rio de Janeiro', fr: 'Rio de Janeiro', es: 'Río de Janeiro', it: 'Rio de Janeiro' }, country: { de: 'Brasilien', en: 'Brazil', fr: 'Brésil', es: 'Brasil', it: 'Brasile' }, countryCode: 'br', continent: 'suedamerika', coordinates: [-22.9068, -43.1729], population: '6,7 Mio.', landmarkHint: { de: 'Christusstatue (Corcovado), Copacabana, Zuckerhut', en: 'Christ the Redeemer, Copacabana, Sugarloaf', fr: 'Christ Rédempteur, Copacabana', es: 'Cristo Redentor, Copacabana', it: 'Cristo Redentore, Copacabana' } },
  { id: 'buenosaires', name: { de: 'Buenos Aires', en: 'Buenos Aires', fr: 'Buenos Aires', es: 'Buenos Aires', it: 'Buenos Aires' }, country: { de: 'Argentinien', en: 'Argentina', fr: 'Argentine', es: 'Argentina', it: 'Argentina' }, countryCode: 'ar', continent: 'suedamerika', coordinates: [-34.6037, -58.3816], population: '3,1 Mio. (15 Mio. Metro)', landmarkHint: { de: 'Obelisk, Plaza de Mayo, La Boca', en: 'Obelisco, Plaza de Mayo, La Boca', fr: 'Obélisque, La Boca', es: 'Obelisco, Plaza de Mayo, La Boca', it: 'Obelisco, Plaza de Mayo, La Boca' } },
  { id: 'bogota', name: { de: 'Bogotá', en: 'Bogota', fr: 'Bogota', es: 'Bogotá', it: 'Bogotà' }, country: { de: 'Kolumbien', en: 'Colombia', fr: 'Colombie', es: 'Colombia', it: 'Colombia' }, countryCode: 'co', continent: 'suedamerika', coordinates: [4.711, -74.0721], population: '7,9 Mio.', landmarkHint: { de: 'Monserrate, Plaza Bolívar, Anden-Hochplateau', en: 'Monserrate, Plaza Bolívar', fr: 'Monserrate, Plaza Bolívar', es: 'Monserrate, Plaza Bolívar', it: 'Monserrate, Plaza Bolívar' } },
  { id: 'lima', name: { de: 'Lima', en: 'Lima', fr: 'Lima', es: 'Lima', it: 'Lima' }, country: { de: 'Peru', en: 'Peru', fr: 'Pérou', es: 'Perú', it: 'Perù' }, countryCode: 'pe', continent: 'suedamerika', coordinates: [-12.0464, -77.0428], population: '10 Mio.', landmarkHint: { de: 'Plaza Mayor, Miraflores-Klippen am Pazifik', en: 'Plaza Mayor, Miraflores Cliffs', fr: 'Plaza Mayor, Miraflores', es: 'Plaza Mayor, Miraflores', it: 'Plaza Mayor, Miraflores' } },

  // Afrika
  { id: 'cairo', name: { de: 'Kairo', en: 'Cairo', fr: 'Le Caire', es: 'El Cairo', it: 'Il Cairo' }, country: { de: 'Ägypten', en: 'Egypt', fr: 'Égypte', es: 'Egipto', it: 'Egitto' }, countryCode: 'eg', continent: 'afrika', coordinates: [30.0444, 31.2357], population: '10 Mio. (21 Mio. Metro)', landmarkHint: { de: 'Pyramiden von Gizeh, Nil, Tahrir-Platz', en: 'Pyramids of Giza, Nile River', fr: 'Pyramides de Gizeh, Nil', es: 'Pirámides de Guiza, Nilo', it: 'Piramidi di Giza, Nilo' } },
  { id: 'capetown', name: { de: 'Kapstadt', en: 'Cape Town', fr: 'Le Cap', es: 'Ciudad del Cabo', it: 'Città del Capo' }, country: { de: 'Südafrika', en: 'South Africa', fr: 'Afrique du Sud', es: 'Sudáfrica', it: 'Sudafrica' }, countryCode: 'za', continent: 'afrika', coordinates: [-33.9249, 18.4241], population: '4,6 Mio.', landmarkHint: { de: 'Tafelberg, Kap der Guten Hoffnung', en: 'Table Mountain, Cape of Good Hope', fr: 'Montagne de la Table, Cap de Bonne-Espérance', es: 'Montaña de la Mesa, Cabo de Buena Esperanza', it: 'Table Mountain, Capo di Buona Speranza' } },
  { id: 'nairobi', name: { de: 'Nairobi', en: 'Nairobi', fr: 'Nairobi', es: 'Nairobi', it: 'Nairobi' }, country: { de: 'Kenia', en: 'Kenya', fr: 'Kenya', es: 'Kenia', it: 'Kenya' }, countryCode: 'ke', continent: 'afrika', coordinates: [-1.2921, 36.8219], population: '4,4 Mio.', landmarkHint: { de: 'Nairobi-Nationalpark vor der Skyline', en: 'Nairobi National Park skyline', fr: 'Parc national de Nairobi', es: 'Parque Nacional de Nairobi', it: 'Parco Nazionale di Nairobi' } },

  // Ozeanien
  { id: 'sydney', name: { de: 'Sydney', en: 'Sydney', fr: 'Sydney', es: 'Sídney', it: 'Sydney' }, country: { de: 'Australien', en: 'Australia', fr: 'Australie', es: 'Australia', it: 'Australia' }, countryCode: 'au', continent: 'ozeanien', coordinates: [-33.8688, 151.2093], population: '5,3 Mio.', landmarkHint: { de: 'Sydney Opera House, Harbour Bridge', en: 'Sydney Opera House, Harbour Bridge', fr: 'Opéra de Sydney, Harbour Bridge', es: 'Ópera de Sídney, Harbour Bridge', it: 'Opera di Sydney, Harbour Bridge' } },
  { id: 'melbourne', name: { de: 'Melbourne', en: 'Melbourne', fr: 'Melbourne', es: 'Melbourne', it: 'Melbourne' }, country: { de: 'Australien', en: 'Australia', fr: 'Australie', es: 'Australia', it: 'Australia' }, countryCode: 'au', continent: 'ozeanien', coordinates: [-37.8136, 144.9631], population: '5,1 Mio.', landmarkHint: { de: 'Flinders Street Station, Yarra River', en: 'Flinders Street, Yarra River', fr: 'Flinders Street, Rivière Yarra', es: 'Flinders Street, Río Yarra', it: 'Flinders Street, Fiume Yarra' } },
  { id: 'auckland', name: { de: 'Auckland', en: 'Auckland', fr: 'Auckland', es: 'Auckland', it: 'Auckland' }, country: { de: 'Neuseeland', en: 'New Zealand', fr: 'Nouvelle-Zélande', es: 'Nueva Zelanda', it: 'Nuova Zelanda' }, countryCode: 'nz', continent: 'ozeanien', coordinates: [-36.8485, 174.7633], population: '1,6 Mio.', landmarkHint: { de: 'Sky Tower, Waitemata Harbour', en: 'Sky Tower, Waitemata Harbour', fr: 'Sky Tower, Port de Waitemata', es: 'Sky Tower, Puerto de Waitemata', it: 'Sky Tower, Porto di Waitemata' } }
];

// Helper to calculate distance between two coordinates in kilometers (Haversine formula)
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
