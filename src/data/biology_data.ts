// BiologieArena - Multilingual Tier- und Pflanzendaten (5 Sprachen, keine Emojis)
import { Language } from '@/types';

export interface MultilingualText {
  de: string;
  en: string;
  fr: string;
  es: string;
  it: string;
}

export interface BiologieItem {
  id: string;
  name: MultilingualText;
  kategorie: 'saeugetiere' | 'voegel' | 'fische' | 'reptilien' | 'amphibien' | 'wirbellose' | 'baeume' | 'straeucher' | 'pflanzen';
  kategorieGroup: 'tiere' | 'pflanzen';
  file: string;
}

export interface CategoryInfo {
  id: string;
  group: 'tiere' | 'pflanzen';
  icon: string;
  name: MultilingualText;
  description: MultilingualText;
}

export interface AnimalClassInfo {
  id: string;
  categoryKey: string;
  name: MultilingualText;
}

export const BIOLOGIE_CATEGORIES: CategoryInfo[] = [
  {
    id: 'saeugetiere',
    group: 'tiere',
    icon: 'PawPrint',
    name: {
      de: 'Säugetiere',
      en: 'Mammals',
      fr: 'Mammifères',
      es: 'Mamíferos',
      it: 'Mammiferi'
    },
    description: {
      de: 'Warmblütige Wirbeltiere mit Fell und Milchdrüsen',
      en: 'Warm-blooded vertebrates with fur and mammary glands',
      fr: 'Vertébrés à sang chaud avec poils et mamelles',
      es: 'Vertebrados de sangre caliente con pelo y glándulas mamarias',
      it: 'Vertebrati a sangue caldo con pelo e ghiandole mammarie'
    }
  },
  {
    id: 'voegel',
    group: 'tiere',
    icon: 'Bird',
    name: {
      de: 'Vögel',
      en: 'Birds',
      fr: 'Oiseaux',
      es: 'Aves',
      it: 'Uccelli'
    },
    description: {
      de: 'Gefiederte Wirbeltiere mit Flügeln und Schnabel',
      en: 'Feathered vertebrates with wings and beaks',
      fr: 'Vertébrés à plumes dotés d\'ailes et d\'un bec',
      es: 'Vertebrados con plumas, alas y pico',
      it: 'Vertebrati piumati con ali e becco'
    }
  },
  {
    id: 'fische',
    group: 'tiere',
    icon: 'Fish',
    name: {
      de: 'Fische',
      en: 'Fish',
      fr: 'Poissons',
      es: 'Peces',
      it: 'Pesci'
    },
    description: {
      de: 'Im Wasser lebende Wirbeltiere mit Kiemen und Flossen',
      en: 'Aquatic vertebrates with gills and fins',
      fr: 'Vertébrés aquatiques munis de branchies et de nageoires',
      es: 'Vertebrados acuáticos con branquias y aletas',
      it: 'Vertebrati acquatici con branchie e pinne'
    }
  },
  {
    id: 'reptilien',
    group: 'tiere',
    icon: 'Shield',
    name: {
      de: 'Reptilien',
      en: 'Reptiles',
      fr: 'Reptiles',
      es: 'Reptiles',
      it: 'Rettili'
    },
    description: {
      de: 'Kriechende Wirbeltiere mit Hornschuppen',
      en: 'Crawling vertebrates with scaly skin',
      fr: 'Vertébrés rampants à peau écailleuse',
      es: 'Vertebrados terrestres con piel escamosa',
      it: 'Vertebrati striscianti con pelle squamosa'
    }
  },
  {
    id: 'amphibien',
    group: 'tiere',
    icon: 'Waves',
    name: {
      de: 'Amphibien',
      en: 'Amphibians',
      fr: 'Amphibiens',
      es: 'Anfibios',
      it: 'Anfibi'
    },
    description: {
      de: 'Lurchtiere mit Metamorphose zwischen Wasser und Land',
      en: 'Cold-blooded vertebrates living between water and land',
      fr: 'Vertébrés vivants entre l\'eau et la terre ferme',
      es: 'Vertebrados adaptados al agua y a la tierra',
      it: 'Vertebrati con metamorfosi tra acqua e terra'
    }
  },
  {
    id: 'wirbellose',
    group: 'tiere',
    icon: 'Bug',
    name: {
      de: 'Wirbellose',
      en: 'Invertebrates',
      fr: 'Invertébrés',
      es: 'Invertebrados',
      it: 'Invertebrati'
    },
    description: {
      de: 'Tiere ohne Wirbelsäule wie Insekten, Spinnen und Weichtiere',
      en: 'Animals without a backbone such as insects and spiders',
      fr: 'Animaux sans colonne vertébrale (insectes, araignées, mollusques)',
      es: 'Animales sin columna vertebral como insectos y arácnidos',
      it: 'Animali senza spina dorsale come insetti, ragni e molluschi'
    }
  },
  {
    id: 'baeume',
    group: 'pflanzen',
    icon: 'Trees',
    name: {
      de: 'Bäume',
      en: 'Trees',
      fr: 'Arbres',
      es: 'Árboles',
      it: 'Alberi'
    },
    description: {
      de: 'Verholzte Pflanzen mit ausgeprägtem Stamm und Krone',
      en: 'Woody perennial plants with an elongated trunk',
      fr: 'Végétaux ligneux avec tronc principal et cime',
      es: 'Plantas leñosas perennes con tronco definido',
      it: 'Piante legnose perenni con tronco e chioma'
    }
  },
  {
    id: 'straeucher',
    group: 'pflanzen',
    icon: 'TreePine',
    name: {
      de: 'Sträucher',
      en: 'Shrubs',
      fr: 'Arbustes',
      es: 'Arbustos',
      it: 'Arbusti'
    },
    description: {
      de: 'Holzpflanzen mit bodennaher Verzweigung ohne Hauptstamm',
      en: 'Woody plants branching from the ground without a trunk',
      fr: 'Plantes ligneuses ramifiées dès la base',
      es: 'Plantas leñosas que se ramifican desde la base',
      it: 'Piante legnose ramificate dalla base'
    }
  },
  {
    id: 'pflanzen',
    group: 'pflanzen',
    icon: 'Flower2',
    name: {
      de: 'Blumen & Kräuter',
      en: 'Flowers & Herbs',
      fr: 'Fleurs et herbes',
      es: 'Flores y hierbas',
      it: 'Fiori ed erbe'
    },
    description: {
      de: 'Krautige Blütenpflanzen, Nutzkräuter und Kletterer',
      en: 'Flowering herbs, wild plants, and climbing flora',
      fr: 'Plantes à fleurs, herbes aromatiques et grimpantes',
      es: 'Hierbas con flores, aromáticas y trepadoras',
      it: 'Piante fiorite erbacee, erbe aromatiche e rampicanti'
    }
  }
];

export const ANIMAL_CLASSES: AnimalClassInfo[] = [
  {
    id: 'saeugetiere',
    categoryKey: 'saeugetiere',
    name: {
      de: 'Säugetier',
      en: 'Mammal',
      fr: 'Mammifère',
      es: 'Mamífero',
      it: 'Mammifero'
    }
  },
  {
    id: 'voegel',
    categoryKey: 'voegel',
    name: {
      de: 'Vogel',
      en: 'Bird',
      fr: 'Oiseau',
      es: 'Ave',
      it: 'Uccello'
    }
  },
  {
    id: 'fische',
    categoryKey: 'fische',
    name: {
      de: 'Fisch',
      en: 'Fish',
      fr: 'Poisson',
      es: 'Pez',
      it: 'Pesce'
    }
  },
  {
    id: 'reptilien',
    categoryKey: 'reptilien',
    name: {
      de: 'Reptil',
      en: 'Reptile',
      fr: 'Reptile',
      es: 'Reptil',
      it: 'Rettile'
    }
  },
  {
    id: 'amphibien',
    categoryKey: 'amphibien',
    name: {
      de: 'Amphibie',
      en: 'Amphibian',
      fr: 'Amphibien',
      es: 'Anfibio',
      it: 'Anfibio'
    }
  },
  {
    id: 'wirbellose',
    categoryKey: 'wirbellose',
    name: {
      de: 'Wirbelloses Tier',
      en: 'Invertebrate',
      fr: 'Invertébré',
      es: 'Invertebrado',
      it: 'Invertebrato'
    }
  }
];

export const BIOLOGIE_ITEMS: BiologieItem[] = [
  {
    "id": "bio_1_alpaka",
    "name": {
      "de": "Alpaka",
      "en": "Alpaca",
      "fr": "Alpaga",
      "es": "Alpaca",
      "it": "Alpaca"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Alpaka.jpg"
  },
  {
    "id": "bio_2_baummarder",
    "name": {
      "de": "Baummarder",
      "en": "Pine Marten",
      "fr": "Martre des pins",
      "es": "Marta",
      "it": "Martora"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Baummarder.jpg"
  },
  {
    "id": "bio_3_biber",
    "name": {
      "de": "Biber",
      "en": "Beaver",
      "fr": "Castor",
      "es": "Castor",
      "it": "Castoro"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Biber.jpg"
  },
  {
    "id": "bio_4_bison",
    "name": {
      "de": "Bison",
      "en": "Bison",
      "fr": "Bison",
      "es": "Bisonte",
      "it": "Bisonte"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Bison.jpg"
  },
  {
    "id": "bio_5_blauwal",
    "name": {
      "de": "Blauwal",
      "en": "Blue Whale",
      "fr": "Baleine bleue",
      "es": "Ballena azul",
      "it": "Balenottera azzurra"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Blauwal.jpg"
  },
  {
    "id": "bio_6_braunb_r",
    "name": {
      "de": "Braunbär",
      "en": "Brown Bear",
      "fr": "Ours brun",
      "es": "Oso pardo",
      "it": "Orso bruno"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Braunbaer.jpg"
  },
  {
    "id": "bio_7_buckelwal",
    "name": {
      "de": "Buckelwal",
      "en": "Humpback Whale",
      "fr": "Baleine à bosse",
      "es": "Ballena jorobada",
      "it": "Megattera"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Buckelwal.jpg"
  },
  {
    "id": "bio_8_dachs",
    "name": {
      "de": "Dachs",
      "en": "Badger",
      "fr": "Blaireau",
      "es": "Tejón",
      "it": "Tasso"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Dachs.jpg"
  },
  {
    "id": "bio_9_delfin",
    "name": {
      "de": "Delfin",
      "en": "Dolphin",
      "fr": "Dauphin",
      "es": "Delfín",
      "it": "Delfino"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Delfin.jpg"
  },
  {
    "id": "bio_10_dromedar",
    "name": {
      "de": "Dromedar",
      "en": "Dromedary",
      "fr": "Dromadaire",
      "es": "Dromedario",
      "it": "Dromedario"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Dromedar.jpg"
  },
  {
    "id": "bio_11_eichh_rnchen",
    "name": {
      "de": "Eichhörnchen",
      "en": "Squirrel",
      "fr": "Écureuil",
      "es": "Ardilla",
      "it": "Scoiattolo"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Eichhoernchen.jpg"
  },
  {
    "id": "bio_12_eisb_r",
    "name": {
      "de": "Eisbär",
      "en": "Polar Bear",
      "fr": "Ours polaire",
      "es": "Oso polar",
      "it": "Orso polare"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Eisbaer.jpg"
  },
  {
    "id": "bio_13_elch",
    "name": {
      "de": "Elch",
      "en": "Moose",
      "fr": "Élan",
      "es": "Alce",
      "it": "Alce"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Elch.jpg"
  },
  {
    "id": "bio_14_elefant",
    "name": {
      "de": "Elefant",
      "en": "Elephant",
      "fr": "Éléphant",
      "es": "Elefante",
      "it": "Elefante"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Elefant.jpg"
  },
  {
    "id": "bio_15_esel",
    "name": {
      "de": "Esel",
      "en": "Donkey",
      "fr": "Âne",
      "es": "Burro",
      "it": "Asino"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Esel.jpg"
  },
  {
    "id": "bio_16_fledermaus",
    "name": {
      "de": "Fledermaus",
      "en": "Bat",
      "fr": "Chauve-souris",
      "es": "Murciélago",
      "it": "Pipistrello"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Fledermaus.jpg"
  },
  {
    "id": "bio_17_flughund",
    "name": {
      "de": "Flughund",
      "en": "Fruit Bat",
      "fr": "Roussette",
      "es": "Zorro volador",
      "it": "Volpe volante"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Flughund.jpg"
  },
  {
    "id": "bio_18_flusspferd",
    "name": {
      "de": "Flusspferd",
      "en": "Hippopotamus",
      "fr": "Hippopotame",
      "es": "Hipopótamo",
      "it": "Ippopotamo"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Flusspferd.jpg"
  },
  {
    "id": "bio_19_fuchs",
    "name": {
      "de": "Fuchs",
      "en": "Fox",
      "fr": "Renard",
      "es": "Zorro",
      "it": "Volpe"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Fuchs.jpg"
  },
  {
    "id": "bio_20_gepard",
    "name": {
      "de": "Gepard",
      "en": "Cheetah",
      "fr": "Guépard",
      "es": "Guepardo",
      "it": "Ghepardo"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Gepard.jpg"
  },
  {
    "id": "bio_21_gibbon",
    "name": {
      "de": "Gibbon",
      "en": "Gibbon",
      "fr": "Gibbon",
      "es": "Gibón",
      "it": "Gibbone"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Gibbon.jpg"
  },
  {
    "id": "bio_22_giraffe",
    "name": {
      "de": "Giraffe",
      "en": "Giraffe",
      "fr": "Girafe",
      "es": "Jirafa",
      "it": "Giraffa"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Giraffe.jpg"
  },
  {
    "id": "bio_23_gorilla",
    "name": {
      "de": "Gorilla",
      "en": "Gorilla",
      "fr": "Gorille",
      "es": "Gorila",
      "it": "Gorilla"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Gorilla.jpg"
  },
  {
    "id": "bio_24_grauwolf",
    "name": {
      "de": "Grauwolf",
      "en": "Grey Wolf",
      "fr": "Loup gris",
      "es": "Lobo gris",
      "it": "Lupo grigio"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Grauwolf.jpg"
  },
  {
    "id": "bio_25_grizzlyb_r",
    "name": {
      "de": "Grizzlybär",
      "en": "Grizzly Bear",
      "fr": "Grizzly",
      "es": "Oso grizzly",
      "it": "Orso grizzly"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Grizzlybaer.jpg"
  },
  {
    "id": "bio_26_haushund",
    "name": {
      "de": "Haushund",
      "en": "Dog",
      "fr": "Chien domestique",
      "es": "Perro",
      "it": "Cane"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Haushund.jpg"
  },
  {
    "id": "bio_27_hauskatze",
    "name": {
      "de": "Hauskatze",
      "en": "Cat",
      "fr": "Chat domestique",
      "es": "Gato",
      "it": "Gatto"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Hauskatze.jpg"
  },
  {
    "id": "bio_28_hausmaus",
    "name": {
      "de": "Hausmaus",
      "en": "House Mouse",
      "fr": "Souris domestique",
      "es": "Ratón doméstico",
      "it": "Topo domestico"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Hausmaus.jpg"
  },
  {
    "id": "bio_29_hausrind",
    "name": {
      "de": "Hausrind",
      "en": "Domestic Cattle",
      "fr": "Bovin domestique",
      "es": "Vaca / Toro",
      "it": "Bovino domestico"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Hausrind.jpg"
  },
  {
    "id": "bio_30_hausschwein",
    "name": {
      "de": "Hausschwein",
      "en": "Domestic Pig",
      "fr": "Cochon domestique",
      "es": "Cerdo",
      "it": "Maiale domestico"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Hausschwein.jpg"
  },
  {
    "id": "bio_31_jaguar",
    "name": {
      "de": "Jaguar",
      "en": "Jaguar",
      "fr": "Jaguar",
      "es": "Jaguar",
      "it": "Giaguaro"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Jaguar.jpg"
  },
  {
    "id": "bio_32_kamel",
    "name": {
      "de": "Kamel",
      "en": "Camel",
      "fr": "Chameau",
      "es": "Camello",
      "it": "Cammello"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Kamel.jpg"
  },
  {
    "id": "bio_33_kapuzineraffe",
    "name": {
      "de": "Kapuzineraffe",
      "en": "Capuchin Monkey",
      "fr": "Capucin",
      "es": "Mono capuchino",
      "it": "Cebino"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Kapuzineraffe.jpg"
  },
  {
    "id": "bio_34_koala",
    "name": {
      "de": "Koala",
      "en": "Koala",
      "fr": "Koala",
      "es": "Koala",
      "it": "Koala"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Koala.jpg"
  },
  {
    "id": "bio_35_k_nguru",
    "name": {
      "de": "Känguru",
      "en": "Kangaroo",
      "fr": "Kangourou",
      "es": "Canguro",
      "it": "Canguro"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Kaenguru.jpg"
  },
  {
    "id": "bio_36_leopard",
    "name": {
      "de": "Leopard",
      "en": "Leopard",
      "fr": "Léopard",
      "es": "Leopardo",
      "it": "Leopardo"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Leopard.jpg"
  },
  {
    "id": "bio_37_luchs",
    "name": {
      "de": "Luchs",
      "en": "Lynx",
      "fr": "Lynx",
      "es": "Lince",
      "it": "Lince"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Luchs.jpg"
  },
  {
    "id": "bio_38_l_we",
    "name": {
      "de": "Löwe",
      "en": "Lion",
      "fr": "Lion",
      "es": "León",
      "it": "Leone"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Loewe.jpg"
  },
  {
    "id": "bio_39_maulwurf",
    "name": {
      "de": "Maulwurf",
      "en": "Mole",
      "fr": "Taupe",
      "es": "Topo",
      "it": "Talpa"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Maulwurf.jpg"
  },
  {
    "id": "bio_40_meerschweinchen",
    "name": {
      "de": "Meerschweinchen",
      "en": "Guinea Pig",
      "fr": "Cochon d’Inde",
      "es": "Cobaya",
      "it": "Porcellino d’India"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Meerschweinchen.jpg"
  },
  {
    "id": "bio_41_mensch",
    "name": {
      "de": "Mensch",
      "en": "Human",
      "fr": "Humain",
      "es": "Humano",
      "it": "Umano"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Mensch.jpg"
  },
  {
    "id": "bio_42_murmeltier",
    "name": {
      "de": "Murmeltier",
      "en": "Marmot",
      "fr": "Marmotte",
      "es": "Marmota",
      "it": "Marmotta"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Murmeltier.jpg"
  },
  {
    "id": "bio_43_nashorn",
    "name": {
      "de": "Nashorn",
      "en": "Rhinoceros",
      "fr": "Rhinocéros",
      "es": "Rinoceronte",
      "it": "Rinoceronte"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Nashorn.jpg"
  },
  {
    "id": "bio_44_okapi",
    "name": {
      "de": "Okapi",
      "en": "Okapi",
      "fr": "Okapi",
      "es": "Okapi",
      "it": "Okapi"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Okapi.jpg"
  },
  {
    "id": "bio_45_opossum",
    "name": {
      "de": "Opossum",
      "en": "Opossum",
      "fr": "Opossum",
      "es": "Zarigüeya",
      "it": "Opossum"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Opossum.jpg"
  },
  {
    "id": "bio_46_orang_utan",
    "name": {
      "de": "Orang-Utan",
      "en": "Orangutan",
      "fr": "Orang-outan",
      "es": "Orangután",
      "it": "Orangotango"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Orang-Utan.jpg"
  },
  {
    "id": "bio_47_orca",
    "name": {
      "de": "Orca",
      "en": "Orca (Killer Whale)",
      "fr": "Orque",
      "es": "Orca",
      "it": "Orca"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Orca.jpg"
  },
  {
    "id": "bio_48_panda",
    "name": {
      "de": "Panda",
      "en": "Giant Panda",
      "fr": "Panda géant",
      "es": "Panda gigante",
      "it": "Panda gigante"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Panda.jpg"
  },
  {
    "id": "bio_49_pavian",
    "name": {
      "de": "Pavian",
      "en": "Baboon",
      "fr": "Babouin",
      "es": "Papión",
      "it": "Babbuino"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Pavian.jpg"
  },
  {
    "id": "bio_50_pferd",
    "name": {
      "de": "Pferd",
      "en": "Horse",
      "fr": "Cheval",
      "es": "Caballo",
      "it": "Cavallo"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Pferd.jpg"
  },
  {
    "id": "bio_51_polarfuchs",
    "name": {
      "de": "Polarfuchs",
      "en": "Arctic Fox",
      "fr": "Renard polaire",
      "es": "Zorro ártico",
      "it": "Volpe artica"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Polarfuchs.jpg"
  },
  {
    "id": "bio_52_reh",
    "name": {
      "de": "Reh",
      "en": "Roe Deer",
      "fr": "Chevreuil",
      "es": "Corzo",
      "it": "Capriolo"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Reh.jpg"
  },
  {
    "id": "bio_53_rentier",
    "name": {
      "de": "Rentier",
      "en": "Reindeer",
      "fr": "Renne",
      "es": "Reno",
      "it": "Renna"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Rentier.jpg"
  },
  {
    "id": "bio_54_robbe",
    "name": {
      "de": "Robbe",
      "en": "Seal",
      "fr": "Phoque",
      "es": "Foca",
      "it": "Foca"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Robbe.jpg"
  },
  {
    "id": "bio_55_rothirsch",
    "name": {
      "de": "Rothirsch",
      "en": "Red Deer",
      "fr": "Cerf élaphe",
      "es": "Ciervo común",
      "it": "Cervo nobile"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Rothirsch.jpg"
  },
  {
    "id": "bio_56_schaf",
    "name": {
      "de": "Schaf",
      "en": "Sheep",
      "fr": "Mouton",
      "es": "Oveja",
      "it": "Pecora"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Schaf.jpg"
  },
  {
    "id": "bio_57_schakal",
    "name": {
      "de": "Schakal",
      "en": "Jackal",
      "fr": "Chacal",
      "es": "Chacal",
      "it": "Sciacallo"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Schakal.jpg"
  },
  {
    "id": "bio_58_schimpanse",
    "name": {
      "de": "Schimpanse",
      "en": "Chimpanzee",
      "fr": "Chimpanzé",
      "es": "Chimpancé",
      "it": "Scimpanzé"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Schimpanse.jpg"
  },
  {
    "id": "bio_59_seehund",
    "name": {
      "de": "Seehund",
      "en": "Harbor Seal",
      "fr": "Veau marin",
      "es": "Foca común",
      "it": "Foca comune"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Seehund.jpg"
  },
  {
    "id": "bio_60_seekuh",
    "name": {
      "de": "Seekuh",
      "en": "Manatee",
      "fr": "Lamantin",
      "es": "Manatí",
      "it": "Lamantino"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Seekuh.jpg"
  },
  {
    "id": "bio_61_seeotter",
    "name": {
      "de": "Seeotter",
      "en": "Sea Otter",
      "fr": "Loutre de mer",
      "es": "Nutria marina",
      "it": "Lontra marina"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Seeotter.jpg"
  },
  {
    "id": "bio_62_spitzmaus",
    "name": {
      "de": "Spitzmaus",
      "en": "Shrew",
      "fr": "Musaraigne",
      "es": "Musaraña",
      "it": "Toporagno"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Spitzmaus.jpg"
  },
  {
    "id": "bio_63_stachelschwein",
    "name": {
      "de": "Stachelschwein",
      "en": "Porcupine",
      "fr": "Porc-épic",
      "es": "Puercoespín",
      "it": "Istrice"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Stachelschwein.jpg"
  },
  {
    "id": "bio_64_steinbock",
    "name": {
      "de": "Steinbock",
      "en": "Alpine Ibex",
      "fr": "Bouquetin",
      "es": "Íbice",
      "it": "Stambecco"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Steinbock.jpg"
  },
  {
    "id": "bio_65_tapir",
    "name": {
      "de": "Tapir",
      "en": "Tapir",
      "fr": "Tapir",
      "es": "Tapir",
      "it": "Tapiro"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Tapir.jpg"
  },
  {
    "id": "bio_66_tasmanischer_teufel",
    "name": {
      "de": "Tasmanischer Teufel",
      "en": "Tasmanian Devil",
      "fr": "Diable de Tasmanie",
      "es": "Demonio de Tasmania",
      "it": "Diavolo della Tasmania"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Tasmanischer_Teufel.jpg"
  },
  {
    "id": "bio_67_tiger",
    "name": {
      "de": "Tiger",
      "en": "Tiger",
      "fr": "Tigre",
      "es": "Tigre",
      "it": "Tigre"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Tiger.jpg"
  },
  {
    "id": "bio_68_walross",
    "name": {
      "de": "Walross",
      "en": "Walrus",
      "fr": "Morse",
      "es": "Morsa",
      "it": "Tricheco"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Walross.jpg"
  },
  {
    "id": "bio_69_wanderratte",
    "name": {
      "de": "Wanderratte",
      "en": "Brown Rat",
      "fr": "Rat brun",
      "es": "Rata parda",
      "it": "Ratto delle chiaviche"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Wanderratte.jpg"
  },
  {
    "id": "bio_70_waschb_r",
    "name": {
      "de": "Waschbär",
      "en": "Raccoon",
      "fr": "Raton laveur",
      "es": "Mapache",
      "it": "Procione"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Waschbaer.jpg"
  },
  {
    "id": "bio_71_wasserschwein",
    "name": {
      "de": "Wasserschwein",
      "en": "Capybara",
      "fr": "Capybara",
      "es": "Capibara",
      "it": "Capibara"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Wasserschwein.jpg"
  },
  {
    "id": "bio_72_wildschwein",
    "name": {
      "de": "Wildschwein",
      "en": "Wild Boar",
      "fr": "Sanglier",
      "es": "Jabalí",
      "it": "Cinghiale"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Wildschwein.jpg"
  },
  {
    "id": "bio_73_wolf",
    "name": {
      "de": "Wolf",
      "en": "Wolf",
      "fr": "Loup",
      "es": "Lobo",
      "it": "Lupo"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Wolf.jpg"
  },
  {
    "id": "bio_74_wombat",
    "name": {
      "de": "Wombat",
      "en": "Wombat",
      "fr": "Wombat",
      "es": "Wómbat",
      "it": "Vombato"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Wombat.jpg"
  },
  {
    "id": "bio_75_w_stenfuchs",
    "name": {
      "de": "Wüstenfuchs",
      "en": "Fennec Fox",
      "fr": "Fennec",
      "es": "Fénec",
      "it": "Fennec"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Wuestenfuchs.jpg"
  },
  {
    "id": "bio_76_yak",
    "name": {
      "de": "Yak",
      "en": "Yak",
      "fr": "Yack",
      "es": "Yak",
      "it": "Yak"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Yak.jpg"
  },
  {
    "id": "bio_77_zebra",
    "name": {
      "de": "Zebra",
      "en": "Zebra",
      "fr": "Zèbre",
      "es": "Cebra",
      "it": "Zebra"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Zebra.jpg"
  },
  {
    "id": "bio_78_ziege",
    "name": {
      "de": "Ziege",
      "en": "Goat",
      "fr": "Chèvre",
      "es": "Cabra",
      "it": "Capra"
    },
    "kategorie": "saeugetiere",
    "kategorieGroup": "tiere",
    "file": "saeugetiere/Ziege.jpg"
  },
  {
    "id": "bio_79_albatros",
    "name": {
      "de": "Albatros",
      "en": "Albatross",
      "fr": "Albatros",
      "es": "Albatros",
      "it": "Albatro"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Albatros.jpg"
  },
  {
    "id": "bio_80_amsel",
    "name": {
      "de": "Amsel",
      "en": "Blackbird",
      "fr": "Merle noir",
      "es": "Mirlo común",
      "it": "Merlo"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Amsel.jpg"
  },
  {
    "id": "bio_81_auerhuhn",
    "name": {
      "de": "Auerhuhn",
      "en": "Western Capercaillie",
      "fr": "Grand Tétras",
      "es": "Urogallo",
      "it": "Gallo cedrone"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Auerhuhn.jpg"
  },
  {
    "id": "bio_82_bienenfresser",
    "name": {
      "de": "Bienenfresser",
      "en": "Bee-eater",
      "fr": "Guêpier d’Europe",
      "es": "Abejaruco europeo",
      "it": "Gruccione"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Bienenfresser.jpg"
  },
  {
    "id": "bio_83_birkhuhn",
    "name": {
      "de": "Birkhuhn",
      "en": "Black Grouse",
      "fr": "Tétras lyre",
      "es": "Gallo lira",
      "it": "Fagiano di monte"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Birkhuhn.jpg"
  },
  {
    "id": "bio_84_blaumeise",
    "name": {
      "de": "Blaumeise",
      "en": "Blue Tit",
      "fr": "Mésange bleue",
      "es": "Herrerillo común",
      "it": "Cincia azzurra"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Blaumeise.jpg"
  },
  {
    "id": "bio_85_buchfink",
    "name": {
      "de": "Buchfink",
      "en": "Common Chaffinch",
      "fr": "Pinson des arbres",
      "es": "Pinzón vulgar",
      "it": "Fringuello"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Buchfink.jpg"
  },
  {
    "id": "bio_86_buntspecht",
    "name": {
      "de": "Buntspecht",
      "en": "Great Spotted Woodpecker",
      "fr": "Pic épeiche",
      "es": "Pico picapinos",
      "it": "Picchio rosso maggiore"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Buntspecht.jpg"
  },
  {
    "id": "bio_87_dompfaff",
    "name": {
      "de": "Dompfaff",
      "en": "Eurasian Bullfinch",
      "fr": "Bouvreuil pivoine",
      "es": "Camachuelo común",
      "it": "Ciuffolotto"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Dompfaff.jpg"
  },
  {
    "id": "bio_88_eichelh_her",
    "name": {
      "de": "Eichelhäher",
      "en": "Eurasian Jay",
      "fr": "Geai des chênes",
      "es": "Arrendajo euroasiático",
      "it": "Ghiandaia"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Eichelhaeher.jpg"
  },
  {
    "id": "bio_89_elster",
    "name": {
      "de": "Elster",
      "en": "Eurasian Magpie",
      "fr": "Pie bavarde",
      "es": "Urraca común",
      "it": "Gazza"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Elster.jpg"
  },
  {
    "id": "bio_90_emu",
    "name": {
      "de": "Emu",
      "en": "Emu",
      "fr": "Émeu d’Australie",
      "es": "Emú común",
      "it": "Emù"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Emu.jpg"
  },
  {
    "id": "bio_91_ente",
    "name": {
      "de": "Ente",
      "en": "Duck",
      "fr": "Canard",
      "es": "Pato",
      "it": "Anatra"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Ente.jpg"
  },
  {
    "id": "bio_92_falke",
    "name": {
      "de": "Falke",
      "en": "Falcon",
      "fr": "Faucon",
      "es": "Halcón",
      "it": "Falco"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Falke.jpg"
  },
  {
    "id": "bio_93_fasan",
    "name": {
      "de": "Fasan",
      "en": "Pheasant",
      "fr": "Faisan de Colchide",
      "es": "Faisán común",
      "it": "Fagiano"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Fasan.jpg"
  },
  {
    "id": "bio_94_flamingo",
    "name": {
      "de": "Flamingo",
      "en": "Flamingo",
      "fr": "Flamant rose",
      "es": "Flamenco",
      "it": "Fenicottero"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Flamingo.jpg"
  },
  {
    "id": "bio_95_flussseeschwalbe",
    "name": {
      "de": "Flussseeschwalbe",
      "en": "Common Tern",
      "fr": "Sterne pierregarin",
      "es": "Charrán común",
      "it": "Sterna comune"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Flussseeschwalbe.jpg"
  },
  {
    "id": "bio_96_gans",
    "name": {
      "de": "Gans",
      "en": "Goose",
      "fr": "Oie",
      "es": "Ganso",
      "it": "Oca"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Gans.jpg"
  },
  {
    "id": "bio_97_graupapagei",
    "name": {
      "de": "Graupapagei",
      "en": "Grey Parrot",
      "fr": "Perroquet jaco",
      "es": "Loro gris",
      "it": "Pappagallo cenerino"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Graupapagei.jpg"
  },
  {
    "id": "bio_98_graureiher",
    "name": {
      "de": "Graureiher",
      "en": "Grey Heron",
      "fr": "Héron cendré",
      "es": "Garza real",
      "it": "Airone cenerino"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Graureiher.jpg"
  },
  {
    "id": "bio_99_gr_nfink",
    "name": {
      "de": "Grünfink",
      "en": "European Greenfinch",
      "fr": "Verdier d’Europe",
      "es": "Verderón común",
      "it": "Verdone"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Gruenfink.jpg"
  },
  {
    "id": "bio_100_habicht",
    "name": {
      "de": "Habicht",
      "en": "Eurasian Goshawk",
      "fr": "Autour des palombes",
      "es": "Azor común",
      "it": "Astore"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Habicht.jpg"
  },
  {
    "id": "bio_101_haushuhn",
    "name": {
      "de": "Haushuhn",
      "en": "Chicken",
      "fr": "Poule / Coq",
      "es": "Gallina / Gallo",
      "it": "Gallina / Gallo"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Haushuhn.jpg"
  },
  {
    "id": "bio_102_kakadu",
    "name": {
      "de": "Kakadu",
      "en": "Cockatoo",
      "fr": "Cacatoès",
      "es": "Cacatúa",
      "it": "Cacatua"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Kakadu.jpg"
  },
  {
    "id": "bio_103_kiwi",
    "name": {
      "de": "Kiwi",
      "en": "Kiwi",
      "fr": "Kiwi",
      "es": "Kiwi",
      "it": "Kiwi"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Kiwi.jpg"
  },
  {
    "id": "bio_104_kohlmeise",
    "name": {
      "de": "Kohlmeise",
      "en": "Great Tit",
      "fr": "Mésange charbonnière",
      "es": "Carbonero común",
      "it": "Cinciallegra"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Kohlmeise.jpg"
  },
  {
    "id": "bio_105_kolibri",
    "name": {
      "de": "Kolibri",
      "en": "Hummingbird",
      "fr": "Colibri",
      "es": "Colibrí",
      "it": "Colibrì"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Kolibri.jpg"
  },
  {
    "id": "bio_106_kolkrabe",
    "name": {
      "de": "Kolkrabe",
      "en": "Common Raven",
      "fr": "Grand Corbeau",
      "es": "Cuervo grande",
      "it": "Corvo imperiale"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Kolkrabe.jpg"
  },
  {
    "id": "bio_107_kormoran",
    "name": {
      "de": "Kormoran",
      "en": "Great Cormorant",
      "fr": "Grand Cormoran",
      "es": "Cormorán grande",
      "it": "Cormorano"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Kormoran.jpg"
  },
  {
    "id": "bio_108_kranich",
    "name": {
      "de": "Kranich",
      "en": "Common Crane",
      "fr": "Grue cendrée",
      "es": "Grulla común",
      "it": "Gru cenerina"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Kranich.jpg"
  },
  {
    "id": "bio_109_kr_he",
    "name": {
      "de": "Krähe",
      "en": "Crow",
      "fr": "Corneille",
      "es": "Corneja",
      "it": "Cornacchia"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Kraehe.jpg"
  },
  {
    "id": "bio_110_kuckuck",
    "name": {
      "de": "Kuckuck",
      "en": "Common Cuckoo",
      "fr": "Coucou gris",
      "es": "Cuco común",
      "it": "Cuculo"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Kuckuck.jpg"
  },
  {
    "id": "bio_111_mauersegler",
    "name": {
      "de": "Mauersegler",
      "en": "Common Swift",
      "fr": "Martinet noir",
      "es": "Vencejo común",
      "it": "Rondone comune"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Mauersegler.jpg"
  },
  {
    "id": "bio_112_moorschneehuhn",
    "name": {
      "de": "Moorschneehuhn",
      "en": "Willow Ptarmigan",
      "fr": "Lagopède des saules",
      "es": "Lagópodo común",
      "it": "Pernice bianca nordica"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Moorschneehuhn.jpg"
  },
  {
    "id": "bio_113_m_usebussard",
    "name": {
      "de": "Mäusebussard",
      "en": "Common Buzzard",
      "fr": "Buse variable",
      "es": "Busardo ratonero",
      "it": "Poiana comune"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Maeusebussard.jpg"
  },
  {
    "id": "bio_114_m_we",
    "name": {
      "de": "Möwe",
      "en": "Gull (Seagull)",
      "fr": "Mouette / Goéland",
      "es": "Gaviota",
      "it": "Gabbiano"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Moewe.jpg"
  },
  {
    "id": "bio_115_paradiesvogel",
    "name": {
      "de": "Paradiesvogel",
      "en": "Bird-of-paradise",
      "fr": "Oiseau de paradis",
      "es": "Ave del paraíso",
      "it": "Uccello del paradiso"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Paradiesvogel.jpg"
  },
  {
    "id": "bio_116_pelikan",
    "name": {
      "de": "Pelikan",
      "en": "Pelican",
      "fr": "Pélican",
      "es": "Pelícano",
      "it": "Pellicano"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Pelikan.jpg"
  },
  {
    "id": "bio_117_perlhuhn",
    "name": {
      "de": "Perlhuhn",
      "en": "Guineafowl",
      "fr": "Pintade",
      "es": "Gallina de Guinea",
      "it": "Faraona"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Perlhuhn.jpg"
  },
  {
    "id": "bio_118_pfau",
    "name": {
      "de": "Pfau",
      "en": "Peacock",
      "fr": "Paon",
      "es": "Pavo real",
      "it": "Pavone"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Pfau.jpg"
  },
  {
    "id": "bio_119_pinguin",
    "name": {
      "de": "Pinguin",
      "en": "Penguin",
      "fr": "Manchot / Pingouin",
      "es": "Pingüino",
      "it": "Pinguino"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Pinguin.jpg"
  },
  {
    "id": "bio_120_rebhuhn",
    "name": {
      "de": "Rebhuhn",
      "en": "Grey Partridge",
      "fr": "Perdrix grise",
      "es": "Perdiz pardilla",
      "it": "Starna"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Rebhuhn.jpg"
  },
  {
    "id": "bio_121_reiher",
    "name": {
      "de": "Reiher",
      "en": "Heron",
      "fr": "Héron",
      "es": "Garza",
      "it": "Airone"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Reiher.jpg"
  },
  {
    "id": "bio_122_rotkehlchen",
    "name": {
      "de": "Rotkehlchen",
      "en": "European Robin",
      "fr": "Rouge-gorge familier",
      "es": "Petirrojo europeo",
      "it": "Pettirosso"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Rotkehlchen.jpg"
  },
  {
    "id": "bio_123_schleiereule",
    "name": {
      "de": "Schleiereule",
      "en": "Barn Owl",
      "fr": "Chouette effraie",
      "es": "Lechuza común",
      "it": "Barbagianni"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Schleiereule.jpg"
  },
  {
    "id": "bio_124_schneeeule",
    "name": {
      "de": "Schneeeule",
      "en": "Snowy Owl",
      "fr": "Harfang des neiges",
      "es": "Búho nival",
      "it": "Civetta delle nevi"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Schneeeule.jpg"
  },
  {
    "id": "bio_125_schwalbe",
    "name": {
      "de": "Schwalbe",
      "en": "Swallow",
      "fr": "Hirondelle",
      "es": "Golondrina",
      "it": "Rondine"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Schwalbe.jpg"
  },
  {
    "id": "bio_126_schwan",
    "name": {
      "de": "Schwan",
      "en": "Swan",
      "fr": "Cygne",
      "es": "Cisne",
      "it": "Cigno"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Schwan.jpg"
  },
  {
    "id": "bio_127_schwarzspecht",
    "name": {
      "de": "Schwarzspecht",
      "en": "Black Woodpecker",
      "fr": "Pic noir",
      "es": "Picamaderos negro",
      "it": "Picchio nero"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Schwarzspecht.jpg"
  },
  {
    "id": "bio_128_seeadler",
    "name": {
      "de": "Seeadler",
      "en": "White-tailed Eagle",
      "fr": "Pygargue à queue blanche",
      "es": "Pigargo europeo",
      "it": "Aquila di mare"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Seeadler.jpg"
  },
  {
    "id": "bio_129_sekret_r",
    "name": {
      "de": "Sekretär",
      "en": "Secretarybird",
      "fr": "Messager sagittaire",
      "es": "Secretario",
      "it": "Serpentario"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Sekretaer.jpg"
  },
  {
    "id": "bio_130_silberm_we",
    "name": {
      "de": "Silbermöwe",
      "en": "Herring Gull",
      "fr": "Goéland argenté",
      "es": "Gaviota argéntea",
      "it": "Gabbiano reale nordico"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Silbermoewe.jpg"
  },
  {
    "id": "bio_131_singdrossel",
    "name": {
      "de": "Singdrossel",
      "en": "Song Thrush",
      "fr": "Grive musicienne",
      "es": "Zorzal común",
      "it": "Tordo bottaccio"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Singdrossel.jpg"
  },
  {
    "id": "bio_132_sperling",
    "name": {
      "de": "Sperling",
      "en": "House Sparrow",
      "fr": "Moineau domestique",
      "es": "Gorrión común",
      "it": "Passero"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Sperling.jpg"
  },
  {
    "id": "bio_133_sperlingskauz",
    "name": {
      "de": "Sperlingskauz",
      "en": "Eurasian Pygmy Owl",
      "fr": "Chevêchette d’Europe",
      "es": "Mochuelo alpino",
      "it": "Civetta nana"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Sperlingskauz.jpg"
  },
  {
    "id": "bio_134_star",
    "name": {
      "de": "Star",
      "en": "Common Starling",
      "fr": "Étourneau sansonnet",
      "es": "Estornino pinto",
      "it": "Storno comune"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Star.jpg"
  },
  {
    "id": "bio_135_steinadler",
    "name": {
      "de": "Steinadler",
      "en": "Golden Eagle",
      "fr": "Aigle royal",
      "es": "Águila real",
      "it": "Aquila reale"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Steinadler.jpg"
  },
  {
    "id": "bio_136_storch",
    "name": {
      "de": "Storch",
      "en": "White Stork",
      "fr": "Cigogne blanche",
      "es": "Cigüeña blanca",
      "it": "Cicogna bianca"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Storch.jpg"
  },
  {
    "id": "bio_137_strau_",
    "name": {
      "de": "Strauß",
      "en": "Common Ostrich",
      "fr": "Autruche d’Afrique",
      "es": "Avestruz común",
      "it": "Struzzo"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Strauss.jpg"
  },
  {
    "id": "bio_138_taube",
    "name": {
      "de": "Taube",
      "en": "Pigeon / Dove",
      "fr": "Pigeon / Colombe",
      "es": "Paloma",
      "it": "Piccione"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Taube.jpg"
  },
  {
    "id": "bio_139_truthahn",
    "name": {
      "de": "Truthahn",
      "en": "Wild Turkey",
      "fr": "Dindon sauvage",
      "es": "Pavo salvaje",
      "it": "Tacchino selvatico"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Truthahn.jpg"
  },
  {
    "id": "bio_140_tukan",
    "name": {
      "de": "Tukan",
      "en": "Toucan",
      "fr": "Toucan",
      "es": "Tucán",
      "it": "Tucano"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Tukan.jpg"
  },
  {
    "id": "bio_141_uhu",
    "name": {
      "de": "Uhu",
      "en": "Eurasian Eagle-owl",
      "fr": "Grand-duc d’Europe",
      "es": "Búho real",
      "it": "Gufo reale"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Uhu.jpg"
  },
  {
    "id": "bio_142_waldkauz",
    "name": {
      "de": "Waldkauz",
      "en": "Tawny Owl",
      "fr": "Chouette hulotte",
      "es": "Cárabo común",
      "it": "Allocco comune"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Waldkauz.jpg"
  },
  {
    "id": "bio_143_wellensittich",
    "name": {
      "de": "Wellensittich",
      "en": "Budgerigar",
      "fr": "Perruche ondulée",
      "es": "Periquito australiano",
      "it": "Parrocchetto ondulato"
    },
    "kategorie": "voegel",
    "kategorieGroup": "tiere",
    "file": "voegel/Wellensittich.jpg"
  },
  {
    "id": "bio_144_barsch",
    "name": {
      "de": "Barsch",
      "en": "European Perch",
      "fr": "Perche commune",
      "es": "Perca de río",
      "it": "Pesce persico"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Barsch.jpg"
  },
  {
    "id": "bio_145_clownfisch",
    "name": {
      "de": "Clownfisch",
      "en": "Clownfish",
      "fr": "Poisson-clown",
      "es": "Pez payaso",
      "it": "Pesce pagliaccio"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Clownfisch.jpg"
  },
  {
    "id": "bio_146_doktorfisch",
    "name": {
      "de": "Doktorfisch",
      "en": "Surgeonfish",
      "fr": "Chirurgien",
      "es": "Pez cirujano",
      "it": "Pesce chirurgo"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Doktorfisch.jpg"
  },
  {
    "id": "bio_147_europ_ischer_aal",
    "name": {
      "de": "Europäischer Aal",
      "en": "European Eel",
      "fr": "Anguille d’Europe",
      "es": "Anguila europea",
      "it": "Anguilla europea"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Europaeischer_Aal.jpg"
  },
  {
    "id": "bio_148_forelle",
    "name": {
      "de": "Forelle",
      "en": "Trout",
      "fr": "Truite",
      "es": "Trucha",
      "it": "Trota"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Forelle.jpg"
  },
  {
    "id": "bio_149_goldfisch",
    "name": {
      "de": "Goldfisch",
      "en": "Goldfish",
      "fr": "Poisson rouge",
      "es": "Pez dorado",
      "it": "Pesce rosso"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Goldfisch.jpg"
  },
  {
    "id": "bio_150_guppy",
    "name": {
      "de": "Guppy",
      "en": "Guppy",
      "fr": "Guppy",
      "es": "Guppy",
      "it": "Guppy"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Guppy.jpg"
  },
  {
    "id": "bio_151_hammerhai",
    "name": {
      "de": "Hammerhai",
      "en": "Hammerhead Shark",
      "fr": "Requin-marteau",
      "es": "Tiburón martillo",
      "it": "Squalo martello"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Hammerhai.jpg"
  },
  {
    "id": "bio_152_hecht",
    "name": {
      "de": "Hecht",
      "en": "Northern Pike",
      "fr": "Brochet",
      "es": "Lucio",
      "it": "Luccio"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Hecht.jpg"
  },
  {
    "id": "bio_153_heilbutt",
    "name": {
      "de": "Heilbutt",
      "en": "Halibut",
      "fr": "Flétan",
      "es": "Fletán",
      "it": "Ippoglosso"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Heilbutt.jpg"
  },
  {
    "id": "bio_154_hering",
    "name": {
      "de": "Hering",
      "en": "Atlantic Herring",
      "fr": "Hareng",
      "es": "Arenque",
      "it": "Aringa"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Hering.jpg"
  },
  {
    "id": "bio_155_kabeljau",
    "name": {
      "de": "Kabeljau",
      "en": "Atlantic Cod",
      "fr": "Cabillaud / Morue",
      "es": "Bacalao",
      "it": "Merluzzo bianco"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Kabeljau.jpg"
  },
  {
    "id": "bio_156_kaiserfisch",
    "name": {
      "de": "Kaiserfisch",
      "en": "Angelfish (Marine)",
      "fr": "Poisson-ange",
      "es": "Pez ángel marino",
      "it": "Pesce angelo"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Kaiserfisch.jpg"
  },
  {
    "id": "bio_157_karpfen",
    "name": {
      "de": "Karpfen",
      "en": "Common Carp",
      "fr": "Carpe commune",
      "es": "Carpa común",
      "it": "Carpa comune"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Karpfen.jpg"
  },
  {
    "id": "bio_158_kugelfisch",
    "name": {
      "de": "Kugelfisch",
      "en": "Pufferfish",
      "fr": "Poisson-globe",
      "es": "Pez globo",
      "it": "Pesce palla"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Kugelfisch.jpg"
  },
  {
    "id": "bio_159_lachs",
    "name": {
      "de": "Lachs",
      "en": "Atlantic Salmon",
      "fr": "Saumon atlantique",
      "es": "Salmón común",
      "it": "Salmone atlantico"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Lachs.jpg"
  },
  {
    "id": "bio_160_makrele",
    "name": {
      "de": "Makrele",
      "en": "Atlantic Mackerel",
      "fr": "Maquereau",
      "es": "Caballa",
      "it": "Sgombro"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Makrele.jpg"
  },
  {
    "id": "bio_161_manta",
    "name": {
      "de": "Manta",
      "en": "Manta Ray",
      "fr": "Raie manta",
      "es": "Manta raya",
      "it": "Manta"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Manta.jpg"
  },
  {
    "id": "bio_162_mur_ne",
    "name": {
      "de": "Muräne",
      "en": "Moray Eel",
      "fr": "Murène",
      "es": "Morena",
      "it": "Murena"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Muraene.jpg"
  },
  {
    "id": "bio_163_neonfisch",
    "name": {
      "de": "Neonfisch",
      "en": "Neon Tetra",
      "fr": "Néon bleu",
      "es": "Tetra neón",
      "it": "Pesce neon"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Neonfisch.jpg"
  },
  {
    "id": "bio_164_regenbogenfisch",
    "name": {
      "de": "Regenbogenfisch",
      "en": "Rainbowfish",
      "fr": "Poisson arc-en-ciel",
      "es": "Pez arcoíris",
      "it": "Pesce arcobaleno"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Regenbogenfisch.jpg"
  },
  {
    "id": "bio_165_rochen",
    "name": {
      "de": "Rochen",
      "en": "Stingray / Ray",
      "fr": "Raie",
      "es": "Raya",
      "it": "Razza"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Rochen.jpg"
  },
  {
    "id": "bio_166_rotfeuerfisch",
    "name": {
      "de": "Rotfeuerfisch",
      "en": "Red Lionfish",
      "fr": "Rascasse volante",
      "es": "Pez león rojo",
      "it": "Pesce scorpione"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Rotfeuerfisch.jpg"
  },
  {
    "id": "bio_167_sardine",
    "name": {
      "de": "Sardine",
      "en": "European Pilchard / Sardine",
      "fr": "Sardine",
      "es": "Sardina",
      "it": "Sardina"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Sardine.jpg"
  },
  {
    "id": "bio_168_schleierschwanzfisch",
    "name": {
      "de": "Schleierschwanzfisch",
      "en": "Veiltail Goldfish",
      "fr": "Queue-de-voile",
      "es": "Cola de velo",
      "it": "Coda a velo"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Schleierschwanzfisch.jpg"
  },
  {
    "id": "bio_169_scholle",
    "name": {
      "de": "Scholle",
      "en": "European Plaice",
      "fr": "Plie commune",
      "es": "Solla común",
      "it": "Platessa"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Scholle.jpg"
  },
  {
    "id": "bio_170_schwertfisch",
    "name": {
      "de": "Schwertfisch",
      "en": "Swordfish",
      "fr": "Espadon",
      "es": "Pez espada",
      "it": "Pesce spada"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Schwertfisch.jpg"
  },
  {
    "id": "bio_171_seebrasse",
    "name": {
      "de": "Seebrasse",
      "en": "Sea Bream",
      "fr": "Dorade / Daurade",
      "es": "Dorada",
      "it": "Orata"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Seebrasse.jpg"
  },
  {
    "id": "bio_172_seeteufel",
    "name": {
      "de": "Seeteufel",
      "en": "Monkfish (Anglerfish)",
      "fr": "Baudroie / Lotte",
      "es": "Rape común",
      "it": "Rana pescatrice"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Seeteufel.jpg"
  },
  {
    "id": "bio_173_thunfisch",
    "name": {
      "de": "Thunfisch",
      "en": "Tuna",
      "fr": "Thon",
      "es": "Atún",
      "it": "Tonno"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Thunfisch.jpg"
  },
  {
    "id": "bio_174_tigerhai",
    "name": {
      "de": "Tigerhai",
      "en": "Tiger Shark",
      "fr": "Requin-tigre",
      "es": "Tiburón tigre",
      "it": "Squalo tigre"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Tigerhai.jpg"
  },
  {
    "id": "bio_175_wei_er_hai",
    "name": {
      "de": "Weißer Hai",
      "en": "Great White Shark",
      "fr": "Grand requin blanc",
      "es": "Gran tiburón blanco",
      "it": "Grande squalo bianco"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Weisser_Hai.jpg"
  },
  {
    "id": "bio_176_wels",
    "name": {
      "de": "Wels",
      "en": "Wels Catfish",
      "fr": "Silure glane",
      "es": "Siluro",
      "it": "Siluro"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Wels.jpg"
  },
  {
    "id": "bio_177_zander",
    "name": {
      "de": "Zander",
      "en": "Zander (Pikeperch)",
      "fr": "Sandre",
      "es": "Lucioperca",
      "it": "Lucioperca"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Zander.jpg"
  },
  {
    "id": "bio_178_zitteraal",
    "name": {
      "de": "Zitteraal",
      "en": "Electric Eel",
      "fr": "Anguille électrique",
      "es": "Anguila eléctrica",
      "it": "Anguilla elettrica"
    },
    "kategorie": "fische",
    "kategorieGroup": "tiere",
    "file": "fische/Zitteraal.jpg"
  },
  {
    "id": "bio_179_bartagame",
    "name": {
      "de": "Bartagame",
      "en": "Bearded Dragon",
      "fr": "Agame barbu",
      "es": "Dragón barbudo",
      "it": "Drago barbuto"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Bartagame.jpg"
  },
  {
    "id": "bio_180_blindschleiche",
    "name": {
      "de": "Blindschleiche",
      "en": "Slow Worm",
      "fr": "Orvet fragile",
      "es": "Lución",
      "it": "Orbettino"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Blindschleiche.jpg"
  },
  {
    "id": "bio_181_boa_constrictor",
    "name": {
      "de": "Boa constrictor",
      "en": "Boa Constrictor",
      "fr": "Boa constricteur",
      "es": "Boa constrictor",
      "it": "Boa costrittore"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Boa_constrictor.jpg"
  },
  {
    "id": "bio_182_cham_leon",
    "name": {
      "de": "Chamäleon",
      "en": "Chameleon",
      "fr": "Caméléon",
      "es": "Camaleón",
      "it": "Camaleonte"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Chamaeleon.jpg"
  },
  {
    "id": "bio_183_eidechse",
    "name": {
      "de": "Eidechse",
      "en": "Lizard",
      "fr": "Lézard",
      "es": "Lagartija / Lagarto",
      "it": "Lucertola"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Eidechse.jpg"
  },
  {
    "id": "bio_184_gecko",
    "name": {
      "de": "Gecko",
      "en": "Gecko",
      "fr": "Gecko",
      "es": "Gecko",
      "it": "Geco"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Gecko.jpg"
  },
  {
    "id": "bio_185_klapperschlange",
    "name": {
      "de": "Klapperschlange",
      "en": "Rattlesnake",
      "fr": "Serpent à sonnette",
      "es": "Serpiente de cascabel",
      "it": "Serpente a sonagli"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Klapperschlange.jpg"
  },
  {
    "id": "bio_186_krokodil",
    "name": {
      "de": "Krokodil",
      "en": "Crocodile",
      "fr": "Crocodile",
      "es": "Cocodrilo",
      "it": "Coccodrillo"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Krokodil.jpg"
  },
  {
    "id": "bio_187_leguan",
    "name": {
      "de": "Leguan",
      "en": "Iguana",
      "fr": "Iguane",
      "es": "Iguana",
      "it": "Iguana"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Leguan.jpg"
  },
  {
    "id": "bio_188_python",
    "name": {
      "de": "Python",
      "en": "Python",
      "fr": "Python",
      "es": "Pitón",
      "it": "Pitone"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Python.jpg"
  },
  {
    "id": "bio_189_ringelnatter",
    "name": {
      "de": "Ringelnatter",
      "en": "Grass Snake",
      "fr": "Couleuvre à collier",
      "es": "Culebra de collar",
      "it": "Biscia dal collare"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Ringelnatter.jpg"
  },
  {
    "id": "bio_190_schildkr_te",
    "name": {
      "de": "Schildkröte",
      "en": "Turtle / Tortoise",
      "fr": "Tortue",
      "es": "Tortuga",
      "it": "Tartaruga"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Schildkroete.jpg"
  },
  {
    "id": "bio_191_skink",
    "name": {
      "de": "Skink",
      "en": "Skink",
      "fr": "Scinque",
      "es": "Escinco",
      "it": "Scinco"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Skink.jpg"
  },
  {
    "id": "bio_192_waran",
    "name": {
      "de": "Waran",
      "en": "Monitor Lizard",
      "fr": "Varan",
      "es": "Varano",
      "it": "Varano"
    },
    "kategorie": "reptilien",
    "kategorieGroup": "tiere",
    "file": "reptilien/Waran.jpg"
  },
  {
    "id": "bio_193_alpensalamander",
    "name": {
      "de": "Alpensalamander",
      "en": "Alpine Salamander",
      "fr": "Salamandre noire",
      "es": "Salamandra alpina",
      "it": "Salamandra alpina"
    },
    "kategorie": "amphibien",
    "kategorieGroup": "tiere",
    "file": "amphibien/Alpensalamander.jpg"
  },
  {
    "id": "bio_194_axolotl",
    "name": {
      "de": "Axolotl",
      "en": "Axolotl",
      "fr": "Axolotl",
      "es": "Ajolote",
      "it": "Axolotl"
    },
    "kategorie": "amphibien",
    "kategorieGroup": "tiere",
    "file": "amphibien/Axolotl.jpg"
  },
  {
    "id": "bio_195_erdkr_te",
    "name": {
      "de": "Erdkröte",
      "en": "Common Toad",
      "fr": "Crapaud commun",
      "es": "Sapo común",
      "it": "Rospo comune"
    },
    "kategorie": "amphibien",
    "kategorieGroup": "tiere",
    "file": "amphibien/Erdkroete.jpg"
  },
  {
    "id": "bio_196_feuersalamander",
    "name": {
      "de": "Feuersalamander",
      "en": "Fire Salamander",
      "fr": "Salamandre tachetée",
      "es": "Salamandra común",
      "it": "Salamandra pezzata"
    },
    "kategorie": "amphibien",
    "kategorieGroup": "tiere",
    "file": "amphibien/Feuersalamander.jpg"
  },
  {
    "id": "bio_197_frosch",
    "name": {
      "de": "Frosch",
      "en": "Frog",
      "fr": "Grenouille",
      "es": "Rana",
      "it": "Rana"
    },
    "kategorie": "amphibien",
    "kategorieGroup": "tiere",
    "file": "amphibien/Frosch.jpg"
  },
  {
    "id": "bio_198_gelbbauchunke",
    "name": {
      "de": "Gelbbauchunke",
      "en": "Yellow-bellied Toad",
      "fr": "Sonneur à ventre jaune",
      "es": "Sapo de vientre amarillo",
      "it": "Ululone dal ventre giallo"
    },
    "kategorie": "amphibien",
    "kategorieGroup": "tiere",
    "file": "amphibien/Gelbbauchunke.jpg"
  },
  {
    "id": "bio_199_molch",
    "name": {
      "de": "Molch",
      "en": "Newt",
      "fr": "Triton",
      "es": "Tritón",
      "it": "Tritone"
    },
    "kategorie": "amphibien",
    "kategorieGroup": "tiere",
    "file": "amphibien/Molch.jpg"
  },
  {
    "id": "bio_200_rotbauchunke",
    "name": {
      "de": "Rotbauchunke",
      "en": "European Fire-bellied Toad",
      "fr": "Sonneur à ventre de feu",
      "es": "Sapo de vientre rojo",
      "it": "Ululone dal ventre rosso"
    },
    "kategorie": "amphibien",
    "kategorieGroup": "tiere",
    "file": "amphibien/Rotbauchunke.jpg"
  },
  {
    "id": "bio_201_ameise",
    "name": {
      "de": "Ameise",
      "en": "Ant",
      "fr": "Fourmi",
      "es": "Hormiga",
      "it": "Formica"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Ameise.jpg"
  },
  {
    "id": "bio_202_assel",
    "name": {
      "de": "Assel",
      "en": "Woodlouse",
      "fr": "Cloporte",
      "es": "Cochinilla de humedad",
      "it": "Porcellino di terra"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Assel.jpg"
  },
  {
    "id": "bio_203_auster",
    "name": {
      "de": "Auster",
      "en": "Oyster",
      "fr": "Huître",
      "es": "Ostra",
      "it": "Ostrica"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Auster.jpg"
  },
  {
    "id": "bio_204_biene",
    "name": {
      "de": "Biene",
      "en": "Bee",
      "fr": "Abeille",
      "es": "Abeja",
      "it": "Ape"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Biene.jpg"
  },
  {
    "id": "bio_205_blattlaus",
    "name": {
      "de": "Blattlaus",
      "en": "Aphid",
      "fr": "Puceron",
      "es": "Pulgón",
      "it": "Afide"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Blattlaus.jpg"
  },
  {
    "id": "bio_206_borkenk_fer",
    "name": {
      "de": "Borkenkäfer",
      "en": "Bark Beetle",
      "fr": "Scolyte",
      "es": "Escarabajo barrenador",
      "it": "Scolitide"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Borkenkaefer.jpg"
  },
  {
    "id": "bio_207_engerling",
    "name": {
      "de": "Engerling",
      "en": "White Grub (Larva)",
      "fr": "Ver blanc (Larve)",
      "es": "Gusano blanco (Larva)",
      "it": "Larva di maggiolino"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Engerling.jpg"
  },
  {
    "id": "bio_208_feldgrille",
    "name": {
      "de": "Feldgrille",
      "en": "Field Cricket",
      "fr": "Grillon champêtre",
      "es": "Grillo campestre",
      "it": "Grillo campestre"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Feldgrille.jpg"
  },
  {
    "id": "bio_209_fliege",
    "name": {
      "de": "Fliege",
      "en": "Fly (Housefly)",
      "fr": "Mouche",
      "es": "Mosca",
      "it": "Mosca"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Fliege.jpg"
  },
  {
    "id": "bio_210_garnele",
    "name": {
      "de": "Garnele",
      "en": "Shrimp / Prawn",
      "fr": "Crevette",
      "es": "Camarón / Gamba",
      "it": "Gamberetto"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Garnele.jpg"
  },
  {
    "id": "bio_211_gl_hw_rmchen",
    "name": {
      "de": "Glühwürmchen",
      "en": "Firefly / Glow-worm",
      "fr": "Luciole / Ver luisant",
      "es": "Luciérnaga",
      "it": "Lucciola"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Gluehwuermchen.jpg"
  },
  {
    "id": "bio_212_grash_pfer",
    "name": {
      "de": "Grashüpfer",
      "en": "Grasshopper",
      "fr": "Criquet",
      "es": "Saltamontes",
      "it": "Cavalletta"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Grashuepfer.jpg"
  },
  {
    "id": "bio_213_hausspinne",
    "name": {
      "de": "Hausspinne",
      "en": "House Spider",
      "fr": "Tégénaire domestique",
      "es": "Araña doméstica",
      "it": "Tegenaria domestica"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Hausspinne.jpg"
  },
  {
    "id": "bio_214_heuschrecke",
    "name": {
      "de": "Heuschrecke",
      "en": "Locust",
      "fr": "Sauterelle",
      "es": "Langosta",
      "it": "Locusta"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Heuschrecke.jpg"
  },
  {
    "id": "bio_215_honigbiene",
    "name": {
      "de": "Honigbiene",
      "en": "Western Honey Bee",
      "fr": "Abeille européenne",
      "es": "Abeja melífera",
      "it": "Ape europea"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Honigbiene.jpg"
  },
  {
    "id": "bio_216_hornisse",
    "name": {
      "de": "Hornisse",
      "en": "European Hornet",
      "fr": "Frelon européen",
      "es": "Avispón europeo",
      "it": "Calabrone"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Hornisse.jpg"
  },
  {
    "id": "bio_217_hummel",
    "name": {
      "de": "Hummel",
      "en": "Bumblebee",
      "fr": "Bourdon",
      "es": "Abejorro",
      "it": "Bombo"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Hummel.jpg"
  },
  {
    "id": "bio_218_hummer",
    "name": {
      "de": "Hummer",
      "en": "Lobster",
      "fr": "Homard",
      "es": "Bogavante / Langosta",
      "it": "Astice"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Hummer.jpg"
  },
  {
    "id": "bio_219_krabbe",
    "name": {
      "de": "Krabbe",
      "en": "Crab",
      "fr": "Crabe",
      "es": "Cangrejo",
      "it": "Granchio"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Krabbe.jpg"
  },
  {
    "id": "bio_220_krebs",
    "name": {
      "de": "Krebs",
      "en": "Crayfish",
      "fr": "Écrevisse",
      "es": "Cangrejo de río",
      "it": "Gambero di fiume"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Krebs.jpg"
  },
  {
    "id": "bio_221_kreuzspinne",
    "name": {
      "de": "Kreuzspinne",
      "en": "European Garden Spider",
      "fr": "Épeire diadème",
      "es": "Araña de jardín",
      "it": "Ragno crociato"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Kreuzspinne.jpg"
  },
  {
    "id": "bio_222_libelle",
    "name": {
      "de": "Libelle",
      "en": "Dragonfly",
      "fr": "Libellule",
      "es": "Libélula",
      "it": "Libellula"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Libelle.jpg"
  },
  {
    "id": "bio_223_maik_fer",
    "name": {
      "de": "Maikäfer",
      "en": "Cockchafer (Maybug)",
      "fr": "Hanneton commun",
      "es": "Escarabajo sanjuanero",
      "it": "Maggiolino"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Maikaefer.jpg"
  },
  {
    "id": "bio_224_marienk_fer",
    "name": {
      "de": "Marienkäfer",
      "en": "Ladybird / Ladybug",
      "fr": "Coccinelle",
      "es": "Mariquita",
      "it": "Coccinella"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Marienkaefer.jpg"
  },
  {
    "id": "bio_225_meeresschnecke",
    "name": {
      "de": "Meeresschnecke",
      "en": "Sea Snail",
      "fr": "Escargot de mer",
      "es": "Caracol marino",
      "it": "Chiocciola di mare"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Meeresschnecken.jpg"
  },
  {
    "id": "bio_226_milbe",
    "name": {
      "de": "Milbe",
      "en": "Mite",
      "fr": "Acarien",
      "es": "Ácaro",
      "it": "Acaro"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Milbe.jpg"
  },
  {
    "id": "bio_227_mistk_fer",
    "name": {
      "de": "Mistkäfer",
      "en": "Dung Beetle",
      "fr": "Bousier",
      "es": "Escarabajo pelotero",
      "it": "Scarabeo stercorario"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Mistkaefer.jpg"
  },
  {
    "id": "bio_228_muschel",
    "name": {
      "de": "Muschel",
      "en": "Mussel / Clam",
      "fr": "Moule / Bivalve",
      "es": "Mejillón / Almeja",
      "it": "Cozza / Vongola"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Muschel.jpg"
  },
  {
    "id": "bio_229_nachtfalter",
    "name": {
      "de": "Nachtfalter",
      "en": "Moth",
      "fr": "Papillon de nuit",
      "es": "Polilla",
      "it": "Falena"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Nachtfalter.jpg"
  },
  {
    "id": "bio_230_nacktschnecke",
    "name": {
      "de": "Nacktschnecke",
      "en": "Slug",
      "fr": "Limace",
      "es": "Babosa",
      "it": "Lumaca senza guscio"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Nacktschnecke.jpg"
  },
  {
    "id": "bio_231_schmetterling",
    "name": {
      "de": "Schmetterling",
      "en": "Butterfly",
      "fr": "Papillon",
      "es": "Mariposa",
      "it": "Farfalla"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Schmetterling.jpg"
  },
  {
    "id": "bio_232_silberfischchen",
    "name": {
      "de": "Silberfischchen",
      "en": "Silverfish",
      "fr": "Poisson d’argent",
      "es": "Pececillo de plata",
      "it": "Pesciolino d’argento"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Silberfischchen.jpg"
  },
  {
    "id": "bio_233_skorpion",
    "name": {
      "de": "Skorpion",
      "en": "Scorpion",
      "fr": "Scorpion",
      "es": "Escorpión",
      "it": "Scorpione"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Skorpion.jpg"
  },
  {
    "id": "bio_234_stechm_cke",
    "name": {
      "de": "Stechmücke",
      "en": "Mosquito",
      "fr": "Moustique",
      "es": "Mosquito",
      "it": "Zanzara"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Stechmuecke.jpg"
  },
  {
    "id": "bio_235_tintenfisch",
    "name": {
      "de": "Tintenfisch",
      "en": "Squid / Cuttlefish",
      "fr": "Seiche / Calmar",
      "es": "Calamar / Sepia",
      "it": "Calamaro / Seppia"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Tintenfisch.jpg"
  },
  {
    "id": "bio_236_vogelspinne",
    "name": {
      "de": "Vogelspinne",
      "en": "Tarantula",
      "fr": "Mygale",
      "es": "Tarántula",
      "it": "Tarantola"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Vogelspinne.jpg"
  },
  {
    "id": "bio_237_wasserl_ufer",
    "name": {
      "de": "Wasserläufer",
      "en": "Water Strider",
      "fr": "Gerris (Punaise d’eau)",
      "es": "Zapatero (Gérrido)",
      "it": "Gerride (Pattinatore d’acqua)"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Wasserlaeufer.jpg"
  },
  {
    "id": "bio_238_weberknecht",
    "name": {
      "de": "Weberknecht",
      "en": "Harvestman (Daddy Longlegs)",
      "fr": "Opilion (Faucheur)",
      "es": "Segador (Opilión)",
      "it": "Opilione"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Weberknecht.jpg"
  },
  {
    "id": "bio_239_weinbergschnecke",
    "name": {
      "de": "Weinbergschnecke",
      "en": "Roman Snail",
      "fr": "Escargot de Bourgogne",
      "es": "Caracol de Borgoña",
      "it": "Chiocciola romana"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Weinbergschnecke.jpg"
  },
  {
    "id": "bio_240_wespe",
    "name": {
      "de": "Wespe",
      "en": "Wasp",
      "fr": "Guêpe",
      "es": "Avispa",
      "it": "Vespa"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Wespe.jpg"
  },
  {
    "id": "bio_241_zecke",
    "name": {
      "de": "Zecke",
      "en": "Tick",
      "fr": "Tique",
      "es": "Garrapata",
      "it": "Zecca"
    },
    "kategorie": "wirbellose",
    "kategorieGroup": "tiere",
    "file": "wirbellose/Zecke.jpg"
  },
  {
    "id": "bio_242_ahorn",
    "name": {
      "de": "Ahorn",
      "en": "Maple",
      "fr": "Érable",
      "es": "Arce",
      "it": "Acero"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Ahorn.jpg"
  },
  {
    "id": "bio_243_apfelbaum",
    "name": {
      "de": "Apfelbaum",
      "en": "Apple Tree",
      "fr": "Pommier",
      "es": "Manzano",
      "it": "Melo"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Apfelbaum.jpg"
  },
  {
    "id": "bio_244_bergahorn",
    "name": {
      "de": "Bergahorn",
      "en": "Sycamore Maple",
      "fr": "Érable sycomore",
      "es": "Falso plátano",
      "it": "Acero di monte"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Bergahorn.jpg"
  },
  {
    "id": "bio_245_birke",
    "name": {
      "de": "Birke",
      "en": "Birch",
      "fr": "Bouleau",
      "es": "Abedul",
      "it": "Betulla"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Birke.jpg"
  },
  {
    "id": "bio_246_birnbaum",
    "name": {
      "de": "Birnbaum",
      "en": "Pear Tree",
      "fr": "Poirier",
      "es": "Peral",
      "it": "Pero"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Birnbaum.jpg"
  },
  {
    "id": "bio_247_buche",
    "name": {
      "de": "Buche",
      "en": "Beech",
      "fr": "Hêtre",
      "es": "Haya",
      "it": "Faggio"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Buche.jpg"
  },
  {
    "id": "bio_248_douglasie",
    "name": {
      "de": "Douglasie",
      "en": "Douglas Fir",
      "fr": "Sapin de Douglas",
      "es": "Abeto de Douglas",
      "it": "Abete di Douglas"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Douglasie.jpg"
  },
  {
    "id": "bio_249_eibe",
    "name": {
      "de": "Eibe",
      "en": "Yew",
      "fr": "If commun",
      "es": "Tejo",
      "it": "Tasso comune"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Eibe.jpg"
  },
  {
    "id": "bio_250_eiche",
    "name": {
      "de": "Eiche",
      "en": "Oak",
      "fr": "Chêne",
      "es": "Roble",
      "it": "Quercia"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Eiche.jpg"
  },
  {
    "id": "bio_251_esche",
    "name": {
      "de": "Esche",
      "en": "Ash",
      "fr": "Frêne",
      "es": "Fresno",
      "it": "Frassino"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Esche.jpg"
  },
  {
    "id": "bio_252_eukalyptus",
    "name": {
      "de": "Eukalyptus",
      "en": "Eucalyptus",
      "fr": "Eucalyptus",
      "es": "Eucalipto",
      "it": "Eucalipto"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Eukalyptus.jpg"
  },
  {
    "id": "bio_253_feige",
    "name": {
      "de": "Feige",
      "en": "Fig Tree",
      "fr": "Figuier",
      "es": "Higuera",
      "it": "Fico"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Feige.jpg"
  },
  {
    "id": "bio_254_fichte",
    "name": {
      "de": "Fichte",
      "en": "Spruce",
      "fr": "Épicéa",
      "es": "Pícea",
      "it": "Abete rosso"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Fichte.jpg"
  },
  {
    "id": "bio_255_ginkgo",
    "name": {
      "de": "Ginkgo",
      "en": "Ginkgo",
      "fr": "Ginkgo biloba",
      "es": "Ginkgo",
      "it": "Ginkgo biloba"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Ginkgo.jpg"
  },
  {
    "id": "bio_256_hainbuche",
    "name": {
      "de": "Hainbuche",
      "en": "Hornbeam",
      "fr": "Charme commun",
      "es": "Carpe blanco",
      "it": "Carpino bianco"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Hainbuche.jpg"
  },
  {
    "id": "bio_257_kastanie",
    "name": {
      "de": "Kastanie",
      "en": "Chestnut",
      "fr": "Châtaignier / Marronnier",
      "es": "Castaño",
      "it": "Castagno / Ippocastano"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Kastanie.jpg"
  },
  {
    "id": "bio_258_kiefer",
    "name": {
      "de": "Kiefer",
      "en": "Pine",
      "fr": "Pin",
      "es": "Pino",
      "it": "Pino"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Kiefer.jpg"
  },
  {
    "id": "bio_259_kirsche",
    "name": {
      "de": "Kirsche",
      "en": "Cherry Tree",
      "fr": "Cerisier",
      "es": "Cerezo",
      "it": "Ciliegio"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Kirsche.jpg"
  },
  {
    "id": "bio_260_linde",
    "name": {
      "de": "Linde",
      "en": "Linden (Lime Tree)",
      "fr": "Tilleul",
      "es": "Tilo",
      "it": "Tiglio"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Linde.jpg"
  },
  {
    "id": "bio_261_l_rche",
    "name": {
      "de": "Lärche",
      "en": "Larch",
      "fr": "Mélèze",
      "es": "Alerce",
      "it": "Larice"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Laerche.jpg"
  },
  {
    "id": "bio_262_magnolie",
    "name": {
      "de": "Magnolie",
      "en": "Magnolia",
      "fr": "Magnolia",
      "es": "Magnolia",
      "it": "Magnolia"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Magnolie.jpg"
  },
  {
    "id": "bio_263_mahagoni",
    "name": {
      "de": "Mahagoni",
      "en": "Mahogany",
      "fr": "Acajou",
      "es": "Caoba",
      "it": "Mogano"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Mahagoni.jpg"
  },
  {
    "id": "bio_264_mammutbaum",
    "name": {
      "de": "Mammutbaum",
      "en": "Sequoia (Redwood)",
      "fr": "Séquoia géant",
      "es": "Secuoya gigante",
      "it": "Sequoia gigante"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Mammutbaum.jpg"
  },
  {
    "id": "bio_265_mandelbaum",
    "name": {
      "de": "Mandelbaum",
      "en": "Almond Tree",
      "fr": "Amandier",
      "es": "Almendro",
      "it": "Mandorlo"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Mandelbaum.jpg"
  },
  {
    "id": "bio_266_olivenbaum",
    "name": {
      "de": "Olivenbaum",
      "en": "Olive Tree",
      "fr": "Olivier",
      "es": "Olivo",
      "it": "Olivo"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Olivenbaum.jpg"
  },
  {
    "id": "bio_267_pflaumenbaum",
    "name": {
      "de": "Pflaumenbaum",
      "en": "Plum Tree",
      "fr": "Prunier",
      "es": "Ciruelo",
      "it": "Prugno / Susino"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Pflaumenbaum.jpg"
  },
  {
    "id": "bio_268_platane",
    "name": {
      "de": "Platane",
      "en": "Plane Tree",
      "fr": "Platane",
      "es": "Plátano de sombra",
      "it": "Platano"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Platane.jpg"
  },
  {
    "id": "bio_269_robinie",
    "name": {
      "de": "Robinie",
      "en": "Black Locust",
      "fr": "Robinier faux-acacia",
      "es": "Falsa acacia",
      "it": "Robinia"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Robinie.jpg"
  },
  {
    "id": "bio_270_spitzahorn",
    "name": {
      "de": "Spitzahorn",
      "en": "Norway Maple",
      "fr": "Érable plane",
      "es": "Arce real",
      "it": "Acero riccio"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Spitzahorn.jpg"
  },
  {
    "id": "bio_271_tanne",
    "name": {
      "de": "Tanne",
      "en": "Fir",
      "fr": "Sapin",
      "es": "Abeto",
      "it": "Abete bianco"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Tanne.jpg"
  },
  {
    "id": "bio_272_teak",
    "name": {
      "de": "Teak",
      "en": "Teak",
      "fr": "Teck",
      "es": "Teca",
      "it": "Teak"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Teak.jpg"
  },
  {
    "id": "bio_273_ulme",
    "name": {
      "de": "Ulme",
      "en": "Elm",
      "fr": "Orme",
      "es": "Olmo",
      "it": "Olmo"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Ulme.jpg"
  },
  {
    "id": "bio_274_walnuss",
    "name": {
      "de": "Walnuss",
      "en": "Walnut Tree",
      "fr": "Noyer",
      "es": "Nogal",
      "it": "Noce"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Walnuss.jpg"
  },
  {
    "id": "bio_275_zeder",
    "name": {
      "de": "Zeder",
      "en": "Cedar",
      "fr": "Cèdre",
      "es": "Cedro",
      "it": "Cedro"
    },
    "kategorie": "baeume",
    "kategorieGroup": "pflanzen",
    "file": "baeume/Zeder.jpg"
  },
  {
    "id": "bio_276_berberitze",
    "name": {
      "de": "Berberitze",
      "en": "Barberry",
      "fr": "Épine-vinette",
      "es": "Agracejo",
      "it": "Crespino"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Berberitze.jpg"
  },
  {
    "id": "bio_277_brombeere",
    "name": {
      "de": "Brombeere",
      "en": "Blackberry Bush",
      "fr": "Ronce commune (Mûrier)",
      "es": "Zarzamora",
      "it": "Rovo (Mora)"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Brombeere.jpg"
  },
  {
    "id": "bio_278_feuerdorn",
    "name": {
      "de": "Feuerdorn",
      "en": "Firethorn",
      "fr": "Buisson ardent",
      "es": "Espino de fuego",
      "it": "Agazzino"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Feuerdorn.jpg"
  },
  {
    "id": "bio_279_forsythie",
    "name": {
      "de": "Forsythie",
      "en": "Forsythia",
      "fr": "Forsythia",
      "es": "Forsitia",
      "it": "Forsizia"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Forsythie.jpg"
  },
  {
    "id": "bio_280_haselnussstrauch",
    "name": {
      "de": "Haselnussstrauch",
      "en": "Hazel Bush",
      "fr": "Noisetier",
      "es": "Avellano",
      "it": "Nocciolo"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Haselnussstrauch.jpg"
  },
  {
    "id": "bio_281_heidelbeere",
    "name": {
      "de": "Heidelbeere",
      "en": "Bilberry / Blueberry",
      "fr": "Myrtille",
      "es": "Arándano",
      "it": "Mirtillo"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Heidelbeere.jpg"
  },
  {
    "id": "bio_282_himbeere",
    "name": {
      "de": "Himbeere",
      "en": "Raspberry Bush",
      "fr": "Framboisier",
      "es": "Frambueso",
      "it": "Lampone"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Himbeere.jpg"
  },
  {
    "id": "bio_283_holunder",
    "name": {
      "de": "Holunder",
      "en": "Elderberry",
      "fr": "Sureau noir",
      "es": "Saúco",
      "it": "Sambuco"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Holunder.jpg"
  },
  {
    "id": "bio_284_hortensie",
    "name": {
      "de": "Hortensie",
      "en": "Hydrangea",
      "fr": "Hortensia",
      "es": "Hortensia",
      "it": "Ortensia"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Hortensie.jpg"
  },
  {
    "id": "bio_285_johannisbeere",
    "name": {
      "de": "Johannisbeere",
      "en": "Currant Bush",
      "fr": "Groseillier",
      "es": "Grosellero",
      "it": "Ribes"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Johannisbeere.jpg"
  },
  {
    "id": "bio_286_kirschlorbeer",
    "name": {
      "de": "Kirschlorbeer",
      "en": "Cherry Laurel",
      "fr": "Laurier-cerise",
      "es": "Laurel cerezo",
      "it": "Lauroceraso"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Kirschlorbeer.jpg"
  },
  {
    "id": "bio_287_liguster",
    "name": {
      "de": "Liguster",
      "en": "Privet",
      "fr": "Troène",
      "es": "Aligustre",
      "it": "Ligustro"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Liguster.jpg"
  },
  {
    "id": "bio_288_preiselbeere",
    "name": {
      "de": "Preiselbeere",
      "en": "Lingonberry",
      "fr": "Airelle rouge",
      "es": "Arándano rojo",
      "it": "Mirtillo rosso"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Preiselbeere.jpg"
  },
  {
    "id": "bio_289_rhododendron",
    "name": {
      "de": "Rhododendron",
      "en": "Rhododendron",
      "fr": "Rhododendron",
      "es": "Rododendro",
      "it": "Rododendro"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Rhododendron.jpg"
  },
  {
    "id": "bio_290_rosenstrauch",
    "name": {
      "de": "Rosenstrauch",
      "en": "Rose Bush",
      "fr": "Rosier",
      "es": "Rosal",
      "it": "Rosaio"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Rosenstrauch.jpg"
  },
  {
    "id": "bio_291_sanddorn",
    "name": {
      "de": "Sanddorn",
      "en": "Sea Buckthorn",
      "fr": "Argousier",
      "es": "Espino amarillo",
      "it": "Olivello spinoso"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Sanddorn.jpg"
  },
  {
    "id": "bio_292_schlehe",
    "name": {
      "de": "Schlehe",
      "en": "Blackthorn (Sloe)",
      "fr": "Prunellier",
      "es": "Endrino",
      "it": "Prugnolo selvatico"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Schlehe.jpg"
  },
  {
    "id": "bio_293_stachelbeere",
    "name": {
      "de": "Stachelbeere",
      "en": "Gooseberry Bush",
      "fr": "Groseillier à maquereau",
      "es": "Grosellero espinoso",
      "it": "Uva spina"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Stachelbeere.jpg"
  },
  {
    "id": "bio_294_weide",
    "name": {
      "de": "Weide",
      "en": "Willow Bush",
      "fr": "Saule",
      "es": "Sauce",
      "it": "Salice"
    },
    "kategorie": "straeucher",
    "kategorieGroup": "pflanzen",
    "file": "straeucher/Weide.jpg"
  },
  {
    "id": "bio_295_astern",
    "name": {
      "de": "Astern",
      "en": "Asters",
      "fr": "Asters",
      "es": "Ásteres",
      "it": "Astri"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Astern.jpg"
  },
  {
    "id": "bio_296_basilikum",
    "name": {
      "de": "Basilikum",
      "en": "Basil",
      "fr": "Basilic",
      "es": "Albahaca",
      "it": "Basilico"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Basilikum.jpg"
  },
  {
    "id": "bio_297_begonie",
    "name": {
      "de": "Begonie",
      "en": "Begonia",
      "fr": "Bégonia",
      "es": "Begonia",
      "it": "Begonia"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Begonie.jpg"
  },
  {
    "id": "bio_298_clematis",
    "name": {
      "de": "Clematis",
      "en": "Clematis",
      "fr": "Clématite",
      "es": "Clemátide",
      "it": "Clematide"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Clematis.jpg"
  },
  {
    "id": "bio_299_dahlie",
    "name": {
      "de": "Dahlie",
      "en": "Dahlia",
      "fr": "Dahlia",
      "es": "Dalia",
      "it": "Dalia"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Dahlie.jpg"
  },
  {
    "id": "bio_300_dill",
    "name": {
      "de": "Dill",
      "en": "Dill",
      "fr": "Aneth",
      "es": "Eneldo",
      "it": "Aneto"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Dill.jpg"
  },
  {
    "id": "bio_301_efeu",
    "name": {
      "de": "Efeu",
      "en": "Ivy",
      "fr": "Lierre grimpant",
      "es": "Hiedra común",
      "it": "Edera"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Efeu.jpg"
  },
  {
    "id": "bio_302_estragon",
    "name": {
      "de": "Estragon",
      "en": "Tarragon",
      "fr": "Estragon",
      "es": "Estragón",
      "it": "Dragoncello"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Estragon.jpg"
  },
  {
    "id": "bio_303_farn",
    "name": {
      "de": "Farn",
      "en": "Fern",
      "fr": "Fougère",
      "es": "Helecho",
      "it": "Felce"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Farn.jpg"
  },
  {
    "id": "bio_304_frauenmantel",
    "name": {
      "de": "Frauenmantel",
      "en": "Lady’s Mantle",
      "fr": "Alchémille",
      "es": "Alquimila",
      "it": "Alchemilla"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Frauenmantel.jpg"
  },
  {
    "id": "bio_305_glockenblume",
    "name": {
      "de": "Glockenblume",
      "en": "Bellflower",
      "fr": "Campanule",
      "es": "Campanilla",
      "it": "Campanula"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Glockenblume.jpg"
  },
  {
    "id": "bio_306_g_nsebl_mchen",
    "name": {
      "de": "Gänseblümchen",
      "en": "Common Daisy",
      "fr": "Pâquerette",
      "es": "Margarita común",
      "it": "Pratolina comune"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Gaensebluemchen.jpg"
  },
  {
    "id": "bio_307_hahnenfu_",
    "name": {
      "de": "Hahnenfuß",
      "en": "Buttercup",
      "fr": "Renoncule",
      "es": "Botón de oro",
      "it": "Ranuncolo"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Hahnenfuss.jpg"
  },
  {
    "id": "bio_308_hopfen",
    "name": {
      "de": "Hopfen",
      "en": "Hop",
      "fr": "Houblon",
      "es": "Lúpulo",
      "it": "Luppolo"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Hopfen.jpg"
  },
  {
    "id": "bio_309_jasmin",
    "name": {
      "de": "Jasmin",
      "en": "Jasmine",
      "fr": "Jasmin",
      "es": "Jazmín",
      "it": "Gelsomino"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Jasmin.jpg"
  },
  {
    "id": "bio_310_kiwipflanze",
    "name": {
      "de": "Kiwipflanze",
      "en": "Kiwi Vine",
      "fr": "Actinidier (Kiwi)",
      "es": "Planta de kiwi",
      "it": "Pianta di kiwi"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Kiwipflanze.jpg"
  },
  {
    "id": "bio_311_klee",
    "name": {
      "de": "Klee",
      "en": "Clover",
      "fr": "Trèfle",
      "es": "Trébol",
      "it": "Trifoglio"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Klee.jpg"
  },
  {
    "id": "bio_312_klettergurke",
    "name": {
      "de": "Klettergurke",
      "en": "Chocolate Vine (Akebia)",
      "fr": "Akebia",
      "es": "Akebia quinata",
      "it": "Akebia quinata"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Klettergurke.jpg"
  },
  {
    "id": "bio_313_kletterhortensie",
    "name": {
      "de": "Kletterhortensie",
      "en": "Climbing Hydrangea",
      "fr": "Hortensia grimpant",
      "es": "Hortensia trepadora",
      "it": "Ortensia rampicante"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Kletterhortensie.jpg"
  },
  {
    "id": "bio_314_klettertrompete",
    "name": {
      "de": "Klettertrompete",
      "en": "Trumpet Vine",
      "fr": "Bignone",
      "es": "Trompeta trepadora",
      "it": "Bignonia"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Klettertrompete.jpg"
  },
  {
    "id": "bio_315_koriander",
    "name": {
      "de": "Koriander",
      "en": "Coriander (Cilantro)",
      "fr": "Coriandre",
      "es": "Cilantro",
      "it": "Coriandolo"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Koriander.jpg"
  },
  {
    "id": "bio_316_kornblume",
    "name": {
      "de": "Kornblume",
      "en": "Cornflower",
      "fr": "Bleuet des champs",
      "es": "Aciano",
      "it": "Fiordaliso"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Kornblume.jpg"
  },
  {
    "id": "bio_317_lavendel",
    "name": {
      "de": "Lavendel",
      "en": "Lavender",
      "fr": "Lavande",
      "es": "Lavanda",
      "it": "Lavanda"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Lavendel.jpg"
  },
  {
    "id": "bio_318_liebst_ckel",
    "name": {
      "de": "Liebstöckel",
      "en": "Lovage",
      "fr": "Livèche",
      "es": "Levístico",
      "it": "Levistico"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Liebstoeckel.jpg"
  },
  {
    "id": "bio_319_lilie",
    "name": {
      "de": "Lilie",
      "en": "Lily",
      "fr": "Lys",
      "es": "Lirio",
      "it": "Giglio"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Lilie.jpg"
  },
  {
    "id": "bio_320_l_wenmaul",
    "name": {
      "de": "Löwenmaul",
      "en": "Snapdragon",
      "fr": "Gueule-de-loup",
      "es": "Boca de dragón",
      "it": "Bocca di leone"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Loewenmaul.jpg"
  },
  {
    "id": "bio_321_l_wenzahn",
    "name": {
      "de": "Löwenzahn",
      "en": "Dandelion",
      "fr": "Pissenlit",
      "es": "Diente de león",
      "it": "Dente di leone"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Loewenzahn.jpg"
  },
  {
    "id": "bio_322_majoran",
    "name": {
      "de": "Majoran",
      "en": "Marjoram",
      "fr": "Marjolaine",
      "es": "Mejorana",
      "it": "Maggiorana"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Majoran.jpg"
  },
  {
    "id": "bio_323_margerite",
    "name": {
      "de": "Margerite",
      "en": "Oxeye Daisy",
      "fr": "Marguerite commune",
      "es": "Margarita mayor",
      "it": "Margherita comune"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Margerite.jpg"
  },
  {
    "id": "bio_324_melisse",
    "name": {
      "de": "Melisse",
      "en": "Lemon Balm",
      "fr": "Mélisse officinale",
      "es": "Toronjil / Melisa",
      "it": "Melissa"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Melisse.jpg"
  },
  {
    "id": "bio_325_minze",
    "name": {
      "de": "Minze",
      "en": "Mint",
      "fr": "Menthe",
      "es": "Menta",
      "it": "Menta"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Minze.jpg"
  },
  {
    "id": "bio_326_mohn",
    "name": {
      "de": "Mohn",
      "en": "Poppy",
      "fr": "Coquelicot / Pavot",
      "es": "Amapola",
      "it": "Papavero"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Mohn.jpg"
  },
  {
    "id": "bio_327_narzisse",
    "name": {
      "de": "Narzisse",
      "en": "Daffodil (Narcissus)",
      "fr": "Narcisse / Jonquille",
      "es": "Narciso",
      "it": "Narciso"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Narzisse.jpg"
  },
  {
    "id": "bio_328_oregano",
    "name": {
      "de": "Oregano",
      "en": "Oregano",
      "fr": "Origan",
      "es": "Orégano",
      "it": "Origano"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Oregano.jpg"
  },
  {
    "id": "bio_329_petersilie",
    "name": {
      "de": "Petersilie",
      "en": "Parsley",
      "fr": "Persil",
      "es": "Perejil",
      "it": "Prezzemolo"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Petersilie.jpg"
  },
  {
    "id": "bio_330_petunie",
    "name": {
      "de": "Petunie",
      "en": "Petunia",
      "fr": "Pétunia",
      "es": "Petunia",
      "it": "Petunia"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Petunie.jpg"
  },
  {
    "id": "bio_331_pfingstrose",
    "name": {
      "de": "Pfingstrose",
      "en": "Peony",
      "fr": "Pivoine",
      "es": "Peonía",
      "it": "Peonia"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Pfingstrose.jpg"
  },
  {
    "id": "bio_332_primel",
    "name": {
      "de": "Primel",
      "en": "Primrose",
      "fr": "Primevère",
      "es": "Prímula",
      "it": "Primula"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Primel.jpg"
  },
  {
    "id": "bio_333_rispengras",
    "name": {
      "de": "Rispengras",
      "en": "Meadow Grass (Poa)",
      "fr": "Pâturin",
      "es": "Pasto azul (Poa)",
      "it": "Fienarola"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Rispengras.jpg"
  },
  {
    "id": "bio_334_rittersporn",
    "name": {
      "de": "Rittersporn",
      "en": "Delphinium (Larkspur)",
      "fr": "Pied-d’alouette",
      "es": "Espuela de caballero",
      "it": "Speronella"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Rittersporn.jpg"
  },
  {
    "id": "bio_335_rohrkolben",
    "name": {
      "de": "Rohrkolben",
      "en": "Bulrush / Cattail",
      "fr": "Massette",
      "es": "Espadaña / Totora",
      "it": "Tifa"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Rohrkolben.jpg"
  },
  {
    "id": "bio_336_rosmarin",
    "name": {
      "de": "Rosmarin",
      "en": "Rosemary",
      "fr": "Romarin",
      "es": "Romero",
      "it": "Rosmarino"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Rosmarin.jpg"
  },
  {
    "id": "bio_337_salbei",
    "name": {
      "de": "Salbei",
      "en": "Sage",
      "fr": "Sauge",
      "es": "Salvia",
      "it": "Salvia"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Salbei.jpg"
  },
  {
    "id": "bio_338_schafgarbe",
    "name": {
      "de": "Schafgarbe",
      "en": "Yarrow",
      "fr": "Achillée millefeuille",
      "es": "Milenrama",
      "it": "Millefoglio"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Schafgarbe.jpg"
  },
  {
    "id": "bio_339_schnittlauch",
    "name": {
      "de": "Schnittlauch",
      "en": "Chives",
      "fr": "Ciboulette",
      "es": "Cebollino",
      "it": "Erba cipollina"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Schnittlauch.jpg"
  },
  {
    "id": "bio_340_schwertlilie",
    "name": {
      "de": "Schwertlilie",
      "en": "Iris",
      "fr": "Iris",
      "es": "Lirio común",
      "it": "Giaggiolo (Iris)"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Schwertlilie.jpg"
  },
  {
    "id": "bio_341_sonnenblume",
    "name": {
      "de": "Sonnenblume",
      "en": "Sunflower",
      "fr": "Tournesol",
      "es": "Girasol",
      "it": "Girasole"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Sonnenblume.jpg"
  },
  {
    "id": "bio_342_stiefm_tterchen",
    "name": {
      "de": "Stiefmütterchen",
      "en": "Pansy",
      "fr": "Pensée sauvage",
      "es": "Pensamiento",
      "it": "Viola del pensiero"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Stiefmuetterchen.jpg"
  },
  {
    "id": "bio_343_sumpfdotterblume",
    "name": {
      "de": "Sumpfdotterblume",
      "en": "Marsh Marigold",
      "fr": "Populage des marais",
      "es": "Hierba centella",
      "it": "Calta palustre"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Sumpfdotterblume.jpg"
  },
  {
    "id": "bio_344_thymian",
    "name": {
      "de": "Thymian",
      "en": "Thyme",
      "fr": "Thym",
      "es": "Tomillo",
      "it": "Timo"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Thymian.jpg"
  },
  {
    "id": "bio_345_trompetenblume",
    "name": {
      "de": "Trompetenblume",
      "en": "Trumpet Flower",
      "fr": "Fleur trompette",
      "es": "Flor de trompeta",
      "it": "Bignonia arancio"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Trompetenblume.jpg"
  },
  {
    "id": "bio_346_tulpe",
    "name": {
      "de": "Tulpe",
      "en": "Tulip",
      "fr": "Tulipe",
      "es": "Tulipán",
      "it": "Tulipano"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Tulpe.jpg"
  },
  {
    "id": "bio_347_wasserminze",
    "name": {
      "de": "Wasserminze",
      "en": "Water Mint",
      "fr": "Menthe aquatique",
      "es": "Menta acuática",
      "it": "Menta acquatica"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Wasserminze.jpg"
  },
  {
    "id": "bio_348_weinrebe",
    "name": {
      "de": "Weinrebe",
      "en": "Grapevine",
      "fr": "Vigne cultivée",
      "es": "Vid común",
      "it": "Vite comune"
    },
    "kategorie": "pflanzen",
    "kategorieGroup": "pflanzen",
    "file": "pflanzen/Weinrebe.jpg"
  }
];

export const ALL_ANIMALS = BIOLOGIE_ITEMS.filter((i) => i.kategorieGroup === 'tiere');
export const ALL_PLANTS = BIOLOGIE_ITEMS.filter((i) => i.kategorieGroup === 'pflanzen');

export function getBiologyImageUrl(file: string): string {
  return `/medien/uploads/biologie/${file}`;
}

export function getItemName(item: BiologieItem, lang: Language): string {
  return item.name[lang] || item.name.de;
}

export function getCategoryName(catId: string, lang: Language): string {
  const cat = BIOLOGIE_CATEGORIES.find((c) => c.id === catId);
  if (!cat) return catId;
  return cat.name[lang] || cat.name.de;
}

export function getAnimalClassName(catId: string, lang: Language): string {
  const cls = ANIMAL_CLASSES.find((c) => c.id === catId);
  if (!cls) return catId;
  return cls.name[lang] || cls.name.de;
}
