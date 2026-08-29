import { Language } from '@/types';

export interface CountryFlagItem {
  code: string; // ISO 3166-1 alpha-2 lowercase (e.g. 'de', 'fr', 'jp')
  continent: 'europa' | 'asien' | 'afrika' | 'nordamerika' | 'suedamerika' | 'ozeanien';
  name: Record<Language, string>;
  capital: Record<Language, string>;
}

export interface ContinentInfo {
  id: 'europa' | 'asien' | 'afrika' | 'nordamerika' | 'suedamerika' | 'ozeanien';
  name: Record<Language, string>;
}

export const CONTINENTS_INFO: ContinentInfo[] = [
  {
    id: 'europa',
    name: {
      de: 'Europa',
      en: 'Europe',
      fr: 'Europe',
      es: 'Europa',
      it: 'Europa',
    },
  },
  {
    id: 'asien',
    name: {
      de: 'Asien',
      en: 'Asia',
      fr: 'Asie',
      es: 'Asia',
      it: 'Asia',
    },
  },
  {
    id: 'afrika',
    name: {
      de: 'Afrika',
      en: 'Africa',
      fr: 'Afrique',
      es: 'África',
      it: 'Africa',
    },
  },
  {
    id: 'nordamerika',
    name: {
      de: 'Nordamerika',
      en: 'North America',
      fr: 'Amérique du Nord',
      es: 'América del Norte',
      it: 'Nord America',
    },
  },
  {
    id: 'suedamerika',
    name: {
      de: 'Südamerika',
      en: 'South America',
      fr: 'Amérique du Sud',
      es: 'América del Sur',
      it: 'Sud America',
    },
  },
  {
    id: 'ozeanien',
    name: {
      de: 'Ozeanien',
      en: 'Oceania',
      fr: 'Océanie',
      es: 'Oceanía',
      it: 'Oceania',
    },
  },
];

export const COUNTRIES_FLAG_DATA: CountryFlagItem[] = [
  // ==========================================
  // EUROPA (45 Länder)
  // ==========================================
  {
    code: 'de',
    continent: 'europa',
    name: { de: 'Deutschland', en: 'Germany', fr: 'Allemagne', es: 'Alemania', it: 'Germania' },
    capital: { de: 'Berlin', en: 'Berlin', fr: 'Berlin', es: 'Berlín', it: 'Berlino' },
  },
  {
    code: 'fr',
    continent: 'europa',
    name: { de: 'Frankreich', en: 'France', fr: 'France', es: 'Francia', it: 'Francia' },
    capital: { de: 'Paris', en: 'Paris', fr: 'Paris', es: 'París', it: 'Parigi' },
  },
  {
    code: 'it',
    continent: 'europa',
    name: { de: 'Italien', en: 'Italy', fr: 'Italie', es: 'Italia', it: 'Italia' },
    capital: { de: 'Rom', en: 'Rome', fr: 'Rome', es: 'Roma', it: 'Roma' },
  },
  {
    code: 'es',
    continent: 'europa',
    name: { de: 'Spanien', en: 'Spain', fr: 'Espagne', es: 'España', it: 'Spagna' },
    capital: { de: 'Madrid', en: 'Madrid', fr: 'Madrid', es: 'Madrid', it: 'Madrid' },
  },
  {
    code: 'gb',
    continent: 'europa',
    name: { de: 'Großbritannien', en: 'United Kingdom', fr: 'Royaume-Uni', es: 'Reino Unido', it: 'Regno Unito' },
    capital: { de: 'London', en: 'London', fr: 'Londres', es: 'Londres', it: 'Londra' },
  },
  {
    code: 'at',
    continent: 'europa',
    name: { de: 'Österreich', en: 'Austria', fr: 'Autriche', es: 'Austria', it: 'Austria' },
    capital: { de: 'Wien', en: 'Vienna', fr: 'Vienne', es: 'Viena', it: 'Vienna' },
  },
  {
    code: 'ch',
    continent: 'europa',
    name: { de: 'Schweiz', en: 'Switzerland', fr: 'Suisse', es: 'Suiza', it: 'Svizzera' },
    capital: { de: 'Bern', en: 'Bern', fr: 'Berne', es: 'Berna', it: 'Berna' },
  },
  {
    code: 'nl',
    continent: 'europa',
    name: { de: 'Niederlande', en: 'Netherlands', fr: 'Pays-Bas', es: 'Países Bajos', it: 'Paesi Bassi' },
    capital: { de: 'Amsterdam', en: 'Amsterdam', fr: 'Amsterdam', es: 'Ámsterdam', it: 'Amsterdam' },
  },
  {
    code: 'be',
    continent: 'europa',
    name: { de: 'Belgien', en: 'Belgium', fr: 'Belgique', es: 'Bélgica', it: 'Belgio' },
    capital: { de: 'Brüssel', en: 'Brussels', fr: 'Bruxelles', es: 'Bruselas', it: 'Bruxelles' },
  },
  {
    code: 'pt',
    continent: 'europa',
    name: { de: 'Portugal', en: 'Portugal', fr: 'Portugal', es: 'Portugal', it: 'Portogallo' },
    capital: { de: 'Lissabon', en: 'Lisbon', fr: 'Lisbonne', es: 'Lisboa', it: 'Lisbona' },
  },
  {
    code: 'pl',
    continent: 'europa',
    name: { de: 'Polen', en: 'Poland', fr: 'Pologne', es: 'Polonia', it: 'Polonia' },
    capital: { de: 'Warschau', en: 'Warsaw', fr: 'Varsovie', es: 'Varsovia', it: 'Varsavia' },
  },
  {
    code: 'se',
    continent: 'europa',
    name: { de: 'Schweden', en: 'Sweden', fr: 'Suède', es: 'Suecia', it: 'Svezia' },
    capital: { de: 'Stockholm', en: 'Stockholm', fr: 'Stockholm', es: 'Estocolmo', it: 'Stoccolma' },
  },
  {
    code: 'no',
    continent: 'europa',
    name: { de: 'Norwegen', en: 'Norway', fr: 'Norvège', es: 'Noruega', it: 'Norvegia' },
    capital: { de: 'Oslo', en: 'Oslo', fr: 'Oslo', es: 'Oslo', it: 'Oslo' },
  },
  {
    code: 'dk',
    continent: 'europa',
    name: { de: 'Dänemark', en: 'Denmark', fr: 'Danemark', es: 'Dinamarca', it: 'Danimarca' },
    capital: { de: 'Kopenhagen', en: 'Copenhagen', fr: 'Copenhague', es: 'Copenhague', it: 'Copenaghen' },
  },
  {
    code: 'fi',
    continent: 'europa',
    name: { de: 'Finnland', en: 'Finland', fr: 'Finlande', es: 'Finlandia', it: 'Finlandia' },
    capital: { de: 'Helsinki', en: 'Helsinki', fr: 'Helsinki', es: 'Helsinki', it: 'Helsinki' },
  },
  {
    code: 'ie',
    continent: 'europa',
    name: { de: 'Irland', en: 'Ireland', fr: 'Irlande', es: 'Irlanda', it: 'Irlanda' },
    capital: { de: 'Dublin', en: 'Dublin', fr: 'Dublin', es: 'Dublín', it: 'Dublino' },
  },
  {
    code: 'is',
    continent: 'europa',
    name: { de: 'Island', en: 'Iceland', fr: 'Islande', es: 'Islandia', it: 'Islanda' },
    capital: { de: 'Reykjavik', en: 'Reykjavik', fr: 'Reykjavik', es: 'Reikiavik', it: 'Reykjavik' },
  },
  {
    code: 'gr',
    continent: 'europa',
    name: { de: 'Griechenland', en: 'Greece', fr: 'Grèce', es: 'Grecia', it: 'Grecia' },
    capital: { de: 'Athen', en: 'Athens', fr: 'Athènes', es: 'Atenas', it: 'Atene' },
  },
  {
    code: 'hr',
    continent: 'europa',
    name: { de: 'Kroatien', en: 'Croatia', fr: 'Croatie', es: 'Croacia', it: 'Croazia' },
    capital: { de: 'Zagreb', en: 'Zagreb', fr: 'Zagreb', es: 'Zagreb', it: 'Zagabria' },
  },
  {
    code: 'cz',
    continent: 'europa',
    name: { de: 'Tschechien', en: 'Czech Republic', fr: 'Tchéquie', es: 'República Checa', it: 'Repubblica Ceca' },
    capital: { de: 'Prag', en: 'Prague', fr: 'Prague', es: 'Praga', it: 'Praga' },
  },
  {
    code: 'hu',
    continent: 'europa',
    name: { de: 'Ungarn', en: 'Hungary', fr: 'Hongrie', es: 'Hungría', it: 'Ungheria' },
    capital: { de: 'Budapest', en: 'Budapest', fr: 'Budapest', es: 'Budapest', it: 'Budapest' },
  },
  {
    code: 'ro',
    continent: 'europa',
    name: { de: 'Rumänien', en: 'Romania', fr: 'Roumanie', es: 'Rumania', it: 'Romania' },
    capital: { de: 'Bukarest', en: 'Bucharest', fr: 'Bucarest', es: 'Bucarest', it: 'Bucarest' },
  },
  {
    code: 'bg',
    continent: 'europa',
    name: { de: 'Bulgarien', en: 'Bulgaria', fr: 'Bulgarie', es: 'Bulgaria', it: 'Bulgaria' },
    capital: { de: 'Sofia', en: 'Sofia', fr: 'Sofia', es: 'Sofía', it: 'Sofia' },
  },
  {
    code: 'sk',
    continent: 'europa',
    name: { de: 'Slowakei', en: 'Slovakia', fr: 'Slovaquie', es: 'Eslovaquia', it: 'Slovacchia' },
    capital: { de: 'Bratislava', en: 'Bratislava', fr: 'Bratislava', es: 'Bratislava', it: 'Bratislava' },
  },
  {
    code: 'si',
    continent: 'europa',
    name: { de: 'Slowenien', en: 'Slovenia', fr: 'Slovénie', es: 'Eslovenia', it: 'Slovenia' },
    capital: { de: 'Ljubljana', en: 'Ljubljana', fr: 'Ljubljana', es: 'Liubliana', it: 'Lubiana' },
  },
  {
    code: 'rs',
    continent: 'europa',
    name: { de: 'Serbien', en: 'Serbia', fr: 'Serbie', es: 'Serbia', it: 'Serbia' },
    capital: { de: 'Belgrad', en: 'Belgrade', fr: 'Belgrade', es: 'Belgrado', it: 'Belgrado' },
  },
  {
    code: 'ba',
    continent: 'europa',
    name: { de: 'Bosnien und Herzegowina', en: 'Bosnia and Herzegovina', fr: 'Bosnie-Herzégovine', es: 'Bosnia y Herzegovina', it: 'Bosnia ed Erzegovina' },
    capital: { de: 'Sarajevo', en: 'Sarajevo', fr: 'Sarajevo', es: 'Sarajevo', it: 'Sarajevo' },
  },
  {
    code: 'me',
    continent: 'europa',
    name: { de: 'Montenegro', en: 'Montenegro', fr: 'Monténégro', es: 'Montenegro', it: 'Montenegro' },
    capital: { de: 'Podgorica', en: 'Podgorica', fr: 'Podgorica', es: 'Podgorica', it: 'Podgorica' },
  },
  {
    code: 'al',
    continent: 'europa',
    name: { de: 'Albanien', en: 'Albania', fr: 'Albanie', es: 'Albania', it: 'Albania' },
    capital: { de: 'Tirana', en: 'Tirana', fr: 'Tirana', es: 'Tirana', it: 'Tirana' },
  },
  {
    code: 'mk',
    continent: 'europa',
    name: { de: 'Nordmazedonien', en: 'North Macedonia', fr: 'Macédoine du Nord', es: 'Macedonia del Norte', it: 'Macedonia del Nord' },
    capital: { de: 'Skopje', en: 'Skopje', fr: 'Skopje', es: 'Skopie', it: 'Skopje' },
  },
  {
    code: 'ua',
    continent: 'europa',
    name: { de: 'Ukraine', en: 'Ukraine', fr: 'Ukraine', es: 'Ucrania', it: 'Ucraina' },
    capital: { de: 'Kiew', en: 'Kyiv', fr: 'Kiev', es: 'Kiev', it: 'Kiev' },
  },
  {
    code: 'ee',
    continent: 'europa',
    name: { de: 'Estland', en: 'Estonia', fr: 'Estonie', es: 'Estonia', it: 'Estonia' },
    capital: { de: 'Tallinn', en: 'Tallinn', fr: 'Tallinn', es: 'Tallin', it: 'Tallinn' },
  },
  {
    code: 'lv',
    continent: 'europa',
    name: { de: 'Lettland', en: 'Latvia', fr: 'Lettonie', es: 'Letonia', it: 'Lettonia' },
    capital: { de: 'Riga', en: 'Riga', fr: 'Riga', es: 'Riga', it: 'Riga' },
  },
  {
    code: 'lt',
    continent: 'europa',
    name: { de: 'Litauen', en: 'Lithuania', fr: 'Lituanie', es: 'Lituania', it: 'Lituania' },
    capital: { de: 'Vilnius', en: 'Vilnius', fr: 'Vilnius', es: 'Vilna', it: 'Vilnius' },
  },
  {
    code: 'lu',
    continent: 'europa',
    name: { de: 'Luxemburg', en: 'Luxembourg', fr: 'Luxembourg', es: 'Luxemburgo', it: 'Lussemburgo' },
    capital: { de: 'Luxemburg', en: 'Luxembourg', fr: 'Luxembourg', es: 'Luxemburgo', it: 'Lussemburgo' },
  },
  {
    code: 'mt',
    continent: 'europa',
    name: { de: 'Malta', en: 'Malta', fr: 'Malte', es: 'Malta', it: 'Malta' },
    capital: { de: 'Valletta', en: 'Valletta', fr: 'La Valette', es: 'La Valeta', it: 'La Valletta' },
  },
  {
    code: 'cy',
    continent: 'europa',
    name: { de: 'Zypern', en: 'Cyprus', fr: 'Chypre', es: 'Chipre', it: 'Cipro' },
    capital: { de: 'Nikosia', en: 'Nicosia', fr: 'Nicosie', es: 'Nicosia', it: 'Nicosia' },
  },
  {
    code: 'ad',
    continent: 'europa',
    name: { de: 'Andorra', en: 'Andorra', fr: 'Andorre', es: 'Andorra', it: 'Andorra' },
    capital: { de: 'Andorra la Vella', en: 'Andorra la Vella', fr: 'Andorre-la-Vieille', es: 'Andorra la Vieja', it: 'Andorra la Vella' },
  },
  {
    code: 'li',
    continent: 'europa',
    name: { de: 'Liechtenstein', en: 'Liechtenstein', fr: 'Liechtenstein', es: 'Liechtenstein', it: 'Liechtenstein' },
    capital: { de: 'Vaduz', en: 'Vaduz', fr: 'Vaduz', es: 'Vaduz', it: 'Vaduz' },
  },
  {
    code: 'mc',
    continent: 'europa',
    name: { de: 'Monaco', en: 'Monaco', fr: 'Monaco', es: 'Mónaco', it: 'Monaco' },
    capital: { de: 'Monaco', en: 'Monaco', fr: 'Monaco', es: 'Mónaco', it: 'Monaco' },
  },
  {
    code: 'sm',
    continent: 'europa',
    name: { de: 'San Marino', en: 'San Marino', fr: 'Saint-Marin', es: 'San Marino', it: 'San Marino' },
    capital: { de: 'San Marino', en: 'San Marino', fr: 'Saint-Marin', es: 'San Marino', it: 'San Marino' },
  },
  {
    code: 'va',
    continent: 'europa',
    name: { de: 'Vatikanstadt', en: 'Vatican City', fr: 'Vatican', es: 'Ciudad del Vaticano', it: 'Città del Vaticano' },
    capital: { de: 'Vatikanstadt', en: 'Vatican City', fr: 'Vatican', es: 'Ciudad del Vaticano', it: 'Città del Vaticano' },
  },

  // ==========================================
  // ASIEN (35 Länder)
  // ==========================================
  {
    code: 'jp',
    continent: 'asien',
    name: { de: 'Japan', en: 'Japan', fr: 'Japon', es: 'Japón', it: 'Giappone' },
    capital: { de: 'Tokio', en: 'Tokyo', fr: 'Tokyo', es: 'Tokio', it: 'Tokyo' },
  },
  {
    code: 'cn',
    continent: 'asien',
    name: { de: 'China', en: 'China', fr: 'Chine', es: 'China', it: 'Cina' },
    capital: { de: 'Peking', en: 'Beijing', fr: 'Pékin', es: 'Pekín', it: 'Pechino' },
  },
  {
    code: 'in',
    continent: 'asien',
    name: { de: 'Indien', en: 'India', fr: 'Inde', es: 'India', it: 'India' },
    capital: { de: 'Neu-Delhi', en: 'New Delhi', fr: 'New Delhi', es: 'Nueva Delhi', it: 'Nuova Delhi' },
  },
  {
    code: 'kr',
    continent: 'asien',
    name: { de: 'Südkorea', en: 'South Korea', fr: 'Corée du Sud', es: 'Corea del Sur', it: 'Corea del Sud' },
    capital: { de: 'Seoul', en: 'Seoul', fr: 'Séoul', es: 'Seúl', it: 'Seul' },
  },
  {
    code: 'id',
    continent: 'asien',
    name: { de: 'Indonesien', en: 'Indonesia', fr: 'Indonésie', es: 'Indonesia', it: 'Indonesia' },
    capital: { de: 'Jakarta', en: 'Jakarta', fr: 'Jakarta', es: 'Yakarta', it: 'Giacarta' },
  },
  {
    code: 'vn',
    continent: 'asien',
    name: { de: 'Vietnam', en: 'Vietnam', fr: 'Vietnam', es: 'Vietnam', it: 'Vietnam' },
    capital: { de: 'Hanoi', en: 'Hanoi', fr: 'Hanoï', es: 'Hanói', it: 'Hanoi' },
  },
  {
    code: 'th',
    continent: 'asien',
    name: { de: 'Thailand', en: 'Thailand', fr: 'Thaïlande', es: 'Tailandia', it: 'Thailandia' },
    capital: { de: 'Bangkok', en: 'Bangkok', fr: 'Bangkok', es: 'Bangkok', it: 'Bangkok' },
  },
  {
    code: 'ph',
    continent: 'asien',
    name: { de: 'Philippinen', en: 'Philippines', fr: 'Philippines', es: 'Filipinas', it: 'Filippine' },
    capital: { de: 'Manila', en: 'Manila', fr: 'Manille', es: 'Manila', it: 'Manila' },
  },
  {
    code: 'my',
    continent: 'asien',
    name: { de: 'Malaysia', en: 'Malaysia', fr: 'Malaisie', es: 'Malasia', it: 'Malesia' },
    capital: { de: 'Kuala Lumpur', en: 'Kuala Lumpur', fr: 'Kuala Lumpur', es: 'Kuala Lumpur', it: 'Kuala Lumpur' },
  },
  {
    code: 'sg',
    continent: 'asien',
    name: { de: 'Singapur', en: 'Singapore', fr: 'Singapour', es: 'Singapur', it: 'Singapore' },
    capital: { de: 'Singapur', en: 'Singapore', fr: 'Singapour', es: 'Singapur', it: 'Singapore' },
  },
  {
    code: 'pk',
    continent: 'asien',
    name: { de: 'Pakistan', en: 'Pakistan', fr: 'Pakistan', es: 'Pakistán', it: 'Pakistan' },
    capital: { de: 'Islamabad', en: 'Islamabad', fr: 'Islamabad', es: 'Islamabad', it: 'Islamabad' },
  },
  {
    code: 'bd',
    continent: 'asien',
    name: { de: 'Bangladesch', en: 'Bangladesh', fr: 'Bangladesh', es: 'Bangladés', it: 'Bangladesh' },
    capital: { de: 'Dhaka', en: 'Dhaka', fr: 'Dacca', es: 'Daca', it: 'Dacca' },
  },
  {
    code: 'tr',
    continent: 'asien',
    name: { de: 'Türkei', en: 'Turkey', fr: 'Turquie', es: 'Turquía', it: 'Turchia' },
    capital: { de: 'Ankara', en: 'Ankara', fr: 'Ankara', es: 'Ankara', it: 'Ankara' },
  },
  {
    code: 'sa',
    continent: 'asien',
    name: { de: 'Saudi-Arabien', en: 'Saudi Arabia', fr: 'Arabie saoudite', es: 'Arabia Saudita', it: 'Arabia Saudita' },
    capital: { de: 'Riad', en: 'Riyadh', fr: 'Riyad', es: 'Riad', it: 'Riad' },
  },
  {
    code: 'ae',
    continent: 'asien',
    name: { de: 'Vereinigte Arabische Emirate', en: 'United Arab Emirates', fr: 'Émirats arabes unis', es: 'Emiratos Árabes Unidos', it: 'Emirati Arabi Uniti' },
    capital: { de: 'Abu Dhabi', en: 'Abu Dhabi', fr: 'Abou Dabi', es: 'Abu Dabi', it: 'Abu Dhabi' },
  },
  {
    code: 'il',
    continent: 'asien',
    name: { de: 'Israel', en: 'Israel', fr: 'Israël', es: 'Israel', it: 'Israele' },
    capital: { de: 'Jerusalem', en: 'Jerusalem', fr: 'Jérusalem', es: 'Jerusalén', it: 'Gerusalemme' },
  },
  {
    code: 'jo',
    continent: 'asien',
    name: { de: 'Jordanien', en: 'Jordan', fr: 'Jordanie', es: 'Jordania', it: 'Giordania' },
    capital: { de: 'Amman', en: 'Amman', fr: 'Amman', es: 'Amán', it: 'Amman' },
  },
  {
    code: 'lb',
    continent: 'asien',
    name: { de: 'Libanon', en: 'Lebanon', fr: 'Liban', es: 'Líbano', it: 'Libano' },
    capital: { de: 'Beirut', en: 'Beirut', fr: 'Beyrouth', es: 'Beirut', it: 'Beirut' },
  },
  {
    code: 'ir',
    continent: 'asien',
    name: { de: 'Iran', en: 'Iran', fr: 'Iran', es: 'Irán', it: 'Iran' },
    capital: { de: 'Teheran', en: 'Tehran', fr: 'Téhéran', es: 'Teherán', it: 'Teheran' },
  },
  {
    code: 'iq',
    continent: 'asien',
    name: { de: 'Irak', en: 'Iraq', fr: 'Irak', es: 'Irak', it: 'Iraq' },
    capital: { de: 'Bagdad', en: 'Baghdad', fr: 'Bagdad', es: 'Bagdad', it: 'Baghdad' },
  },
  {
    code: 'qa',
    continent: 'asien',
    name: { de: 'Katar', en: 'Qatar', fr: 'Qatar', es: 'Catar', it: 'Qatar' },
    capital: { de: 'Doha', en: 'Doha', fr: 'Doha', es: 'Doha', it: 'Doha' },
  },
  {
    code: 'kw',
    continent: 'asien',
    name: { de: 'Kuwait', en: 'Kuwait', fr: 'Koweït', es: 'Kuwait', it: 'Kuwait' },
    capital: { de: 'Kuwait-Stadt', en: 'Kuwait City', fr: 'Koweït', es: 'Ciudad de Kuwait', it: 'Al Kuwait' },
  },
  {
    code: 'om',
    continent: 'asien',
    name: { de: 'Oman', en: 'Oman', fr: 'Oman', es: 'Omán', it: 'Oman' },
    capital: { de: 'Maskat', en: 'Muscat', fr: 'Mascate', es: 'Mascate', it: 'Mascate' },
  },
  {
    code: 'lk',
    continent: 'asien',
    name: { de: 'Sri Lanka', en: 'Sri Lanka', fr: 'Sri Lanka', es: 'Sri Lanka', it: 'Sri Lanka' },
    capital: { de: 'Colombo', en: 'Colombo', fr: 'Colombo', es: 'Colombo', it: 'Colombo' },
  },
  {
    code: 'np',
    continent: 'asien',
    name: { de: 'Nepal', en: 'Nepal', fr: 'Népal', es: 'Nepal', it: 'Nepal' },
    capital: { de: 'Kathmandu', en: 'Kathmandu', fr: 'Katmandou', es: 'Katmandú', it: 'Kathmandu' },
  },
  {
    code: 'kz',
    continent: 'asien',
    name: { de: 'Kasachstan', en: 'Kazakhstan', fr: 'Kazakhstan', es: 'Kazajistán', it: 'Kazakistan' },
    capital: { de: 'Astana', en: 'Astana', fr: 'Astana', es: 'Astaná', it: 'Astana' },
  },
  {
    code: 'uz',
    continent: 'asien',
    name: { de: 'Usbekistan', en: 'Uzbekistan', fr: 'Ouzbékistan', es: 'Uzbekistán', it: 'Uzbekistan' },
    capital: { de: 'Taschkent', en: 'Tashkent', fr: 'Tachkent', es: 'Taskent', it: 'Tashkent' },
  },
  {
    code: 'ge',
    continent: 'asien',
    name: { de: 'Georgien', en: 'Georgia', fr: 'Géorgie', es: 'Georgia', it: 'Georgia' },
    capital: { de: 'Tiflis', en: 'Tbilisi', fr: 'Tbilissi', es: 'Tiflis', it: 'Tbilisi' },
  },
  {
    code: 'am',
    continent: 'asien',
    name: { de: 'Armenien', en: 'Armenia', fr: 'Arménie', es: 'Armenia', it: 'Armenia' },
    capital: { de: 'Jerewan', en: 'Yerevan', fr: 'Erevan', es: 'Ereván', it: 'Erevan' },
  },
  {
    code: 'az',
    continent: 'asien',
    name: { de: 'Aserbaidschan', en: 'Azerbaijan', fr: 'Azerbaïdjan', es: 'Azerbaiyán', it: 'Azerbaigian' },
    capital: { de: 'Baku', en: 'Baku', fr: 'Bakou', es: 'Bakú', it: 'Baku' },
  },
  {
    code: 'mn',
    continent: 'asien',
    name: { de: 'Mongolei', en: 'Mongolia', fr: 'Mongolie', es: 'Mongolia', it: 'Mongolia' },
    capital: { de: 'Ulaanbaatar', en: 'Ulaanbaatar', fr: 'Oulan-Bator', es: 'Ulán Bator', it: 'Ulan Bator' },
  },
  {
    code: 'mm',
    continent: 'asien',
    name: { de: 'Myanmar', en: 'Myanmar', fr: 'Birmanie', es: 'Birmania', it: 'Birmania' },
    capital: { de: 'Naypyidaw', en: 'Naypyidaw', fr: 'Naypyidaw', es: 'Naipyidó', it: 'Naypyidaw' },
  },
  {
    code: 'kh',
    continent: 'asien',
    name: { de: 'Kambodscha', en: 'Cambodia', fr: 'Cambodge', es: 'Camboya', it: 'Cambogia' },
    capital: { de: 'Phnom Penh', en: 'Phnom Penh', fr: 'Phnom Penh', es: 'Nom Pen', it: 'Phnom Penh' },
  },
  {
    code: 'la',
    continent: 'asien',
    name: { de: 'Laos', en: 'Laos', fr: 'Laos', es: 'Laos', it: 'Laos' },
    capital: { de: 'Vientiane', en: 'Vientiane', fr: 'Vientiane', es: 'Vientián', it: 'Vientiane' },
  },
  {
    code: 'tw',
    continent: 'asien',
    name: { de: 'Taiwan', en: 'Taiwan', fr: 'Taïwan', es: 'Taiwán', it: 'Taiwan' },
    capital: { de: 'Taipeh', en: 'Taipei', fr: 'Taipei', es: 'Taipéi', it: 'Taipei' },
  },

  // ==========================================
  // AFRIKA (25 Länder)
  // ==========================================
  {
    code: 'za',
    continent: 'afrika',
    name: { de: 'Südafrika', en: 'South Africa', fr: 'Afrique du Sud', es: 'Sudáfrica', it: 'Sudafrica' },
    capital: { de: 'Pretoria', en: 'Pretoria', fr: 'Pretoria', es: 'Pretoria', it: 'Pretoria' },
  },
  {
    code: 'eg',
    continent: 'afrika',
    name: { de: 'Ägypten', en: 'Egypt', fr: 'Égypte', es: 'Egipto', it: 'Egitto' },
    capital: { de: 'Kairo', en: 'Cairo', fr: 'Le Caire', es: 'El Cairo', it: 'Il Cairo' },
  },
  {
    code: 'ng',
    continent: 'afrika',
    name: { de: 'Nigeria', en: 'Nigeria', fr: 'Nigeria', es: 'Nigeria', it: 'Nigeria' },
    capital: { de: 'Abuja', en: 'Abuja', fr: 'Abuja', es: 'Abuya', it: 'Abuja' },
  },
  {
    code: 'ke',
    continent: 'afrika',
    name: { de: 'Kenia', en: 'Kenya', fr: 'Kenya', es: 'Kenia', it: 'Kenya' },
    capital: { de: 'Nairobi', en: 'Nairobi', fr: 'Nairobi', es: 'Nairobi', it: 'Nairobi' },
  },
  {
    code: 'ma',
    continent: 'afrika',
    name: { de: 'Marokko', en: 'Morocco', fr: 'Maroc', es: 'Marruecos', it: 'Marocco' },
    capital: { de: 'Rabat', en: 'Rabat', fr: 'Rabat', es: 'Rabat', it: 'Rabat' },
  },
  {
    code: 'dz',
    continent: 'afrika',
    name: { de: 'Algerien', en: 'Algeria', fr: 'Algérie', es: 'Argelia', it: 'Algeria' },
    capital: { de: 'Algier', en: 'Algiers', fr: 'Alger', es: 'Argel', it: 'Algeri' },
  },
  {
    code: 'tn',
    continent: 'afrika',
    name: { de: 'Tunesien', en: 'Tunisia', fr: 'Tunisie', es: 'Túnez', it: 'Tunisia' },
    capital: { de: 'Tunis', en: 'Tunis', fr: 'Tunis', es: 'Túnez', it: 'Tunisi' },
  },
  {
    code: 'gh',
    continent: 'afrika',
    name: { de: 'Ghana', en: 'Ghana', fr: 'Ghana', es: 'Ghana', it: 'Ghana' },
    capital: { de: 'Accra', en: 'Accra', fr: 'Accra', es: 'Acra', it: 'Accra' },
  },
  {
    code: 'sn',
    continent: 'afrika',
    name: { de: 'Senegal', en: 'Senegal', fr: 'Sénégal', es: 'Senegal', it: 'Senegal' },
    capital: { de: 'Dakar', en: 'Dakar', fr: 'Dakar', es: 'Dakar', it: 'Dakar' },
  },
  {
    code: 'tz',
    continent: 'afrika',
    name: { de: 'Tansania', en: 'Tanzania', fr: 'Tanzanie', es: 'Tanzania', it: 'Tanzania' },
    capital: { de: 'Dodoma', en: 'Dodoma', fr: 'Dodoma', es: 'Dodoma', it: 'Dodoma' },
  },
  {
    code: 'ao',
    continent: 'afrika',
    name: { de: 'Angola', en: 'Angola', fr: 'Angola', es: 'Angola', it: 'Angola' },
    capital: { de: 'Luanda', en: 'Luanda', fr: 'Luanda', es: 'Luanda', it: 'Luanda' },
  },
  {
    code: 'na',
    continent: 'afrika',
    name: { de: 'Namibia', en: 'Namibia', fr: 'Namibie', es: 'Namibia', it: 'Namibia' },
    capital: { de: 'Windhoek', en: 'Windhoek', fr: 'Windhoek', es: 'Windhoek', it: 'Windhoek' },
  },
  {
    code: 'mg',
    continent: 'afrika',
    name: { de: 'Madagaskar', en: 'Madagascar', fr: 'Madagascar', es: 'Madagascar', it: 'Madagascar' },
    capital: { de: 'Antananarivo', en: 'Antananarivo', fr: 'Antananarivo', es: 'Antananarivo', it: 'Antananarivo' },
  },
  {
    code: 'et',
    continent: 'afrika',
    name: { de: 'Äthiopien', en: 'Ethiopia', fr: 'Éthiopie', es: 'Etiopía', it: 'Etiopia' },
    capital: { de: 'Addis Abeba', en: 'Addis Ababa', fr: 'Addis-Abeba', es: 'Adís Abeba', it: 'Addis Abeba' },
  },
  {
    code: 'cm',
    continent: 'afrika',
    name: { de: 'Kamerun', en: 'Cameroon', fr: 'Cameroun', es: 'Camerún', it: 'Camerun' },
    capital: { de: 'Jaunde', en: 'Yaounde', fr: 'Yaoundé', es: 'Yaundé', it: 'Yaoundé' },
  },
  {
    code: 'ci',
    continent: 'afrika',
    name: { de: 'Elfenbeinküste', en: 'Ivory Coast', fr: "Côte d'Ivoire", es: 'Costa de Marfil', it: "Costa d'Avorio" },
    capital: { de: 'Yamoussoukro', en: 'Yamoussoukro', fr: 'Yamoussoukro', es: 'Yamusukro', it: 'Yamoussoukro' },
  },
  {
    code: 'ug',
    continent: 'afrika',
    name: { de: 'Uganda', en: 'Uganda', fr: 'Ouganda', es: 'Uganda', it: 'Uganda' },
    capital: { de: 'Kampala', en: 'Kampala', fr: 'Kampala', es: 'Kampala', it: 'Kampala' },
  },
  {
    code: 'zw',
    continent: 'afrika',
    name: { de: 'Simbabwe', en: 'Zimbabwe', fr: 'Zimbabwe', es: 'Zimbabue', it: 'Zimbabwe' },
    capital: { de: 'Harare', en: 'Harare', fr: 'Harare', es: 'Harare', it: 'Harare' },
  },
  {
    code: 'bw',
    continent: 'afrika',
    name: { de: 'Botswana', en: 'Botswana', fr: 'Botswana', es: 'Botsuana', it: 'Botswana' },
    capital: { de: 'Gaborone', en: 'Gaborone', fr: 'Gaborone', es: 'Gaborone', it: 'Gaborone' },
  },
  {
    code: 'mz',
    continent: 'afrika',
    name: { de: 'Mosambik', en: 'Mozambique', fr: 'Mozambique', es: 'Mozambique', it: 'Mozambico' },
    capital: { de: 'Maputo', en: 'Maputo', fr: 'Maputo', es: 'Maputo', it: 'Maputo' },
  },
  {
    code: 'zm',
    continent: 'afrika',
    name: { de: 'Sambia', en: 'Zambia', fr: 'Zambie', es: 'Zambia', it: 'Zambia' },
    capital: { de: 'Lusaka', en: 'Lusaka', fr: 'Lusaka', es: 'Lusaka', it: 'Lusaka' },
  },
  {
    code: 'mu',
    continent: 'afrika',
    name: { de: 'Mauritius', en: 'Mauritius', fr: 'Maurice', es: 'Mauricio', it: 'Mauritius' },
    capital: { de: 'Port Louis', en: 'Port Louis', fr: 'Port-Louis', es: 'Port Louis', it: 'Port Louis' },
  },
  {
    code: 'rw',
    continent: 'afrika',
    name: { de: 'Ruanda', en: 'Rwanda', fr: 'Rwanda', es: 'Ruanda', it: 'Ruanda' },
    capital: { de: 'Kigali', en: 'Kigali', fr: 'Kigali', es: 'Kigali', it: 'Kigali' },
  },

  // ==========================================
  // NORDAMERIKA (15 Länder)
  // ==========================================
  {
    code: 'us',
    continent: 'nordamerika',
    name: { de: 'Vereinigte Staaten', en: 'United States', fr: 'États-Unis', es: 'Estados Unidos', it: 'Stati Uniti' },
    capital: { de: 'Washington, D.C.', en: 'Washington, D.C.', fr: 'Washington', es: 'Washington D.C.', it: 'Washington' },
  },
  {
    code: 'ca',
    continent: 'nordamerika',
    name: { de: 'Kanada', en: 'Canada', fr: 'Canada', es: 'Canadá', it: 'Canada' },
    capital: { de: 'Ottawa', en: 'Ottawa', fr: 'Ottawa', es: 'Ottawa', it: 'Ottawa' },
  },
  {
    code: 'mx',
    continent: 'nordamerika',
    name: { de: 'Mexiko', en: 'Mexico', fr: 'Mexique', es: 'México', it: 'Messico' },
    capital: { de: 'Mexiko-Stadt', en: 'Mexico City', fr: 'Mexico', es: 'Ciudad de México', it: 'Città del Messico' },
  },
  {
    code: 'cu',
    continent: 'nordamerika',
    name: { de: 'Kuba', en: 'Cuba', fr: 'Cuba', es: 'Cuba', it: 'Cuba' },
    capital: { de: 'Havanna', en: 'Havana', fr: 'La Havane', es: 'La Habana', it: 'L’Avana' },
  },
  {
    code: 'jm',
    continent: 'nordamerika',
    name: { de: 'Jamaika', en: 'Jamaica', fr: 'Jamaïque', es: 'Jamaica', it: 'Giamaica' },
    capital: { de: 'Kingston', en: 'Kingston', fr: 'Kingston', es: 'Kingston', it: 'Kingston' },
  },
  {
    code: 'pa',
    continent: 'nordamerika',
    name: { de: 'Panama', en: 'Panama', fr: 'Panama', es: 'Panamá', it: 'Panama' },
    capital: { de: 'Panama-Stadt', en: 'Panama City', fr: 'Panama', es: 'Ciudad de Panamá', it: 'Panama' },
  },
  {
    code: 'cr',
    continent: 'nordamerika',
    name: { de: 'Costa Rica', en: 'Costa Rica', fr: 'Costa Rica', es: 'Costa Rica', it: 'Costa Rica' },
    capital: { de: 'San José', en: 'San José', fr: 'San José', es: 'San José', it: 'San José' },
  },
  {
    code: 'gt',
    continent: 'nordamerika',
    name: { de: 'Guatemala', en: 'Guatemala', fr: 'Guatemala', es: 'Guatemala', it: 'Guatemala' },
    capital: { de: 'Guatemala-Stadt', en: 'Guatemala City', fr: 'Guatemala', es: 'Ciudad de Guatemala', it: 'Città del Guatemala' },
  },
  {
    code: 'do',
    continent: 'nordamerika',
    name: { de: 'Dominikanische Republik', en: 'Dominican Republic', fr: 'République dominicaine', es: 'República Dominicana', it: 'Repubblica Dominicana' },
    capital: { de: 'Santo Domingo', en: 'Santo Domingo', fr: 'Saint-Domingue', es: 'Santo Domingo', it: 'Santo Domingo' },
  },
  {
    code: 'hn',
    continent: 'nordamerika',
    name: { de: 'Honduras', en: 'Honduras', fr: 'Honduras', es: 'Honduras', it: 'Honduras' },
    capital: { de: 'Tegucigalpa', en: 'Tegucigalpa', fr: 'Tegucigalpa', es: 'Tegucigalpa', it: 'Tegucigalpa' },
  },
  {
    code: 'sv',
    continent: 'nordamerika',
    name: { de: 'El Salvador', en: 'El Salvador', fr: 'Salvador', es: 'El Salvador', it: 'El Salvador' },
    capital: { de: 'San Salvador', en: 'San Salvador', fr: 'San Salvador', es: 'San Salvador', it: 'San Salvador' },
  },
  {
    code: 'ni',
    continent: 'nordamerika',
    name: { de: 'Nicaragua', en: 'Nicaragua', fr: 'Nicaragua', es: 'Nicaragua', it: 'Nicaragua' },
    capital: { de: 'Managua', en: 'Managua', fr: 'Managua', es: 'Managua', it: 'Managua' },
  },
  {
    code: 'bs',
    continent: 'nordamerika',
    name: { de: 'Bahamas', en: 'Bahamas', fr: 'Bahamas', es: 'Bahamas', it: 'Bahamas' },
    capital: { de: 'Nassau', en: 'Nassau', fr: 'Nassau', es: 'Nassau', it: 'Nassau' },
  },
  {
    code: 'tt',
    continent: 'nordamerika',
    name: { de: 'Trinidad und Tobago', en: 'Trinidad and Tobago', fr: 'Trinité-et-Tobago', es: 'Trinidad y Tobago', it: 'Trinidad e Tobago' },
    capital: { de: 'Port of Spain', en: 'Port of Spain', fr: "Port-d'Espagne", es: 'Puerto España', it: 'Port of Spain' },
  },
  {
    code: 'ht',
    continent: 'nordamerika',
    name: { de: 'Haiti', en: 'Haiti', fr: 'Haïti', es: 'Haití', it: 'Haiti' },
    capital: { de: 'Port-au-Prince', en: 'Port-au-Prince', fr: 'Port-au-Prince', es: 'Puerto Príncipe', it: 'Port-au-Prince' },
  },

  // ==========================================
  // SÜDAMERIKA (12 Länder)
  // ==========================================
  {
    code: 'br',
    continent: 'suedamerika',
    name: { de: 'Brasilien', en: 'Brazil', fr: 'Brésil', es: 'Brasil', it: 'Brasile' },
    capital: { de: 'Brasília', en: 'Brasilia', fr: 'Brasilia', es: 'Brasilia', it: 'Brasilia' },
  },
  {
    code: 'ar',
    continent: 'suedamerika',
    name: { de: 'Argentinien', en: 'Argentina', fr: 'Argentine', es: 'Argentina', it: 'Argentina' },
    capital: { de: 'Buenos Aires', en: 'Buenos Aires', fr: 'Buenos Aires', es: 'Buenos Aires', it: 'Buenos Aires' },
  },
  {
    code: 'co',
    continent: 'suedamerika',
    name: { de: 'Kolumbien', en: 'Colombia', fr: 'Colombie', es: 'Colombia', it: 'Colombia' },
    capital: { de: 'Bogotá', en: 'Bogota', fr: 'Bogota', es: 'Bogotá', it: 'Bogotà' },
  },
  {
    code: 'cl',
    continent: 'suedamerika',
    name: { de: 'Chile', en: 'Chile', fr: 'Chili', es: 'Chile', it: 'Cile' },
    capital: { de: 'Santiago de Chile', en: 'Santiago', fr: 'Santiago', es: 'Santiago de Chile', it: 'Santiago del Cile' },
  },
  {
    code: 'pe',
    continent: 'suedamerika',
    name: { de: 'Peru', en: 'Peru', fr: 'Pérou', es: 'Perú', it: 'Perù' },
    capital: { de: 'Lima', en: 'Lima', fr: 'Lima', es: 'Lima', it: 'Lima' },
  },
  {
    code: 've',
    continent: 'suedamerika',
    name: { de: 'Venezuela', en: 'Venezuela', fr: 'Venezuela', es: 'Venezuela', it: 'Venezuela' },
    capital: { de: 'Caracas', en: 'Caracas', fr: 'Caracas', es: 'Caracas', it: 'Caracas' },
  },
  {
    code: 'ec',
    continent: 'suedamerika',
    name: { de: 'Ecuador', en: 'Ecuador', fr: 'Équateur', es: 'Ecuador', it: 'Ecuador' },
    capital: { de: 'Quito', en: 'Quito', fr: 'Quito', es: 'Quito', it: 'Quito' },
  },
  {
    code: 'bo',
    continent: 'suedamerika',
    name: { de: 'Bolivien', en: 'Bolivia', fr: 'Bolivie', es: 'Bolivia', it: 'Bolivia' },
    capital: { de: 'Sucre / La Paz', en: 'Sucre / La Paz', fr: 'Sucre / La Paz', es: 'Sucre / La Paz', it: 'Sucre / La Paz' },
  },
  {
    code: 'uy',
    continent: 'suedamerika',
    name: { de: 'Uruguay', en: 'Uruguay', fr: 'Uruguay', es: 'Uruguay', it: 'Uruguay' },
    capital: { de: 'Montevideo', en: 'Montevideo', fr: 'Montevideo', es: 'Montevideo', it: 'Montevideo' },
  },
  {
    code: 'py',
    continent: 'suedamerika',
    name: { de: 'Paraguay', en: 'Paraguay', fr: 'Paraguay', es: 'Paraguay', it: 'Paraguay' },
    capital: { de: 'Asunción', en: 'Asuncion', fr: 'Asuncion', es: 'Asunción', it: 'Asunción' },
  },
  {
    code: 'gy',
    continent: 'suedamerika',
    name: { de: 'Guyana', en: 'Guyana', fr: 'Guyana', es: 'Guyana', it: 'Guyana' },
    capital: { de: 'Georgetown', en: 'Georgetown', fr: 'Georgetown', es: 'Georgetown', it: 'Georgetown' },
  },
  {
    code: 'sr',
    continent: 'suedamerika',
    name: { de: 'Suriname', en: 'Suriname', fr: 'Suriname', es: 'Surinam', it: 'Suriname' },
    capital: { de: 'Paramaribo', en: 'Paramaribo', fr: 'Paramaribo', es: 'Paramaribo', it: 'Paramaribo' },
  },

  // ==========================================
  // OZEANIEN (10 Länder)
  // ==========================================
  {
    code: 'au',
    continent: 'ozeanien',
    name: { de: 'Australien', en: 'Australia', fr: 'Australie', es: 'Australia', it: 'Australia' },
    capital: { de: 'Canberra', en: 'Canberra', fr: 'Canberra', es: 'Canberra', it: 'Canberra' },
  },
  {
    code: 'nz',
    continent: 'ozeanien',
    name: { de: 'Neuseeland', en: 'New Zealand', fr: 'Nouvelle-Zélande', es: 'Nueva Zelanda', it: 'Nuova Zelanda' },
    capital: { de: 'Wellington', en: 'Wellington', fr: 'Wellington', es: 'Wellington', it: 'Wellington' },
  },
  {
    code: 'fj',
    continent: 'ozeanien',
    name: { de: 'Fidschi', en: 'Fiji', fr: 'Fidji', es: 'Fiyi', it: 'Figi' },
    capital: { de: 'Suva', en: 'Suva', fr: 'Suva', es: 'Suva', it: 'Suva' },
  },
  {
    code: 'pg',
    continent: 'ozeanien',
    name: { de: 'Papua-Neuguinea', en: 'Papua New Guinea', fr: 'Papouasie-Nouvelle-Guinée', es: 'Papúa Nueva Guinea', it: 'Papua Nuova Guinea' },
    capital: { de: 'Port Moresby', en: 'Port Moresby', fr: 'Port Moresby', es: 'Puerto Moresby', it: 'Port Moresby' },
  },
  {
    code: 'ws',
    continent: 'ozeanien',
    name: { de: 'Samoa', en: 'Samoa', fr: 'Samoa', es: 'Samoa', it: 'Samoa' },
    capital: { de: 'Apia', en: 'Apia', fr: 'Apia', es: 'Apia', it: 'Apia' },
  },
  {
    code: 'to',
    continent: 'ozeanien',
    name: { de: 'Tonga', en: 'Tonga', fr: 'Tonga', es: 'Tonga', it: 'Tonga' },
    capital: { de: 'Nukuʻalofa', en: 'Nukuʻalofa', fr: 'Nukuʻalofa', es: 'Nukualofa', it: 'Nukuʻalofa' },
  },
  {
    code: 'vu',
    continent: 'ozeanien',
    name: { de: 'Vanuatu', en: 'Vanuatu', fr: 'Vanuatu', es: 'Vanuatu', it: 'Vanuatu' },
    capital: { de: 'Port Vila', en: 'Port Vila', fr: 'Port-Vila', es: 'Port Vila', it: 'Port Vila' },
  },
  {
    code: 'sb',
    continent: 'ozeanien',
    name: { de: 'Salomonen', en: 'Solomon Islands', fr: 'Îles Salomon', es: 'Islas Salomón', it: 'Isole Salomone' },
    capital: { de: 'Honiara', en: 'Honiara', fr: 'Honiara', es: 'Honiara', it: 'Honiara' },
  },
  {
    code: 'pw',
    continent: 'ozeanien',
    name: { de: 'Palau', en: 'Palau', fr: 'Palaos', es: 'Palaos', it: 'Palau' },
    capital: { de: 'Ngerulmud', en: 'Ngerulmud', fr: 'Ngerulmud', es: 'Ngerulmud', it: 'Ngerulmud' },
  },
  {
    code: 'fm',
    continent: 'ozeanien',
    name: { de: 'Mikronesien', en: 'Micronesia', fr: 'Micronésie', es: 'Micronesia', it: 'Micronesia' },
    capital: { de: 'Palikir', en: 'Palikir', fr: 'Palikir', es: 'Palikir', it: 'Palikir' },
  },
];

export function getFlagUrl(code: string, size: 'w160' | 'w320' | 'w640' = 'w320'): string {
  return `https://flagcdn.com/${size}/${code.toLowerCase()}.png`;
}
