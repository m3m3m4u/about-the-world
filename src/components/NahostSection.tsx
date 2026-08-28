'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { H5PPlayer } from '@/components/H5PPlayer';
import { ModuleItem } from '@/types';
import { 
  History, 
  ShieldAlert, 
  Scale, 
  Users, 
  Globe2, 
  HeartHandshake,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

interface NahostLesson {
  id: string;
  title: Record<string, string>;
  desc: Record<string, string>;
  h5pSlug: Record<string, string>;
  text: Record<string, string>;
}

interface NahostChapter {
  id: string;
  icon: any;
  title: Record<string, string>;
  desc: Record<string, string>;
  lessons: NahostLesson[];
}

interface NahostSectionProps {
  initialChapterId?: string;
}

export function NahostSection({ initialChapterId }: NahostSectionProps = {}) {
  const { language } = useLanguage();

  const chapters: NahostChapter[] = [
    {
      id: 'geschichte',
      icon: History,
      title: {
        de: '1. Geschichte Israels und Palästinas',
        en: '1. History of Israel and Palestine',
        fr: '1. Histoire d\'Israël et de la Palestine',
        es: '1. Historia de Israel y Palestina',
        it: '1. Storia di Israele e della Palestina',
      },
      desc: {
        de: 'Die historischen Wurzeln des Konflikts, Zionismus, Balfour-Deklaration, Teilung und Staatsgründung Israels.',
        en: 'Historical roots of the conflict, Zionism, Balfour declaration, partition and founding of Israel.',
        fr: 'Les racines historiques du conflit, le sionisme, la déclaration Balfour et la création de l\'État.',
        es: 'Las raíces históricas del conflicto, el sionismo, la declaración Balfour y la creación del Estado.',
        it: 'Le radici storiche del conflitto, il sionismo, la dichiarazione Balfour e la fondazione dello Stato.',
      },
      lessons: [
        {
          id: 'wurzeln',
          title: {
            de: 'Die Wurzeln des Konflikts',
            en: 'The Roots of the Conflict',
            fr: 'Les Racines du Conflit',
            es: 'Las Raíces del Conflicto',
            it: 'Le Radici del Conflitto',
          },
          desc: {
            de: 'Historische Hintergründe und das Zusammenleben vor dem 20. Jahrhundert.',
            en: 'Historical background and coexistence before the 20th century.',
            fr: 'Contexte historique et coexistence avant le XXe siècle.',
            es: 'Antecedentes históricos y convivencia antes del siglo XX.',
            it: 'Contesto storico e convivenza prima del XX secolo.',
          },
          h5pSlug: {
            de: 'nao-wurz-29',
            en: 'nao-wurz-en-153',
            fr: 'nao-wurz-2-88',
            it: 'nao-wurz-3-119',
            es: 'nao-wurz-4-150',
          },
          text: {
            de: 'Der Nahostkonflikt zwischen Israelis und Palästinensern hat tiefe historische Wurzeln. Vor Beginn des 20. Jahrhunderts lebten Juden, Muslime und Christen im Osmanischen Reich über Jahrhunderte hinweg weitgehend friedlich in Palästina zusammen.',
            en: 'The Middle East conflict between Israelis and Palestinians has deep historical roots. Before the 20th century, Jews, Muslims, and Christians lived together in Palestine under Ottoman rule.',
            fr: 'Le conflit au Proche-Orient a de profondes racines historiques. Avant le XXe siècle, Juifs, Musulmans et Chrétiens coexistaient en Palestine sous l\'Empire ottoman.',
            es: 'El conflicto de Oriente Próximo tiene profundas raíces históricas. Antes del siglo XX, judíos, musulmanes y cristianos convivían en Palestina.',
            it: 'Il conflitto in Medio Oriente ha profonde radici storiche. Prima del XX secolo, ebrei, musulmani e cristiani convivevano in Palestina.',
          }
        },
        {
          id: 'zionismus',
          title: {
            de: 'Zionismus & Einwanderung',
            en: 'Zionism & Immigration',
            fr: 'Sionisme & Immigration',
            es: 'Sionismo e Inmigración',
            it: 'Sionismo e Immigrazione',
          },
          desc: {
            de: 'Die Entstehung der zionistischen Bewegung durch Theodor Herzl und die Einwanderungswellen.',
            en: 'The emergence of the Zionist movement and immigration waves.',
            fr: 'L\'émergence du mouvement sioniste et les vagues d\'immigration.',
            es: 'El surgimiento del movimiento sionista y las olas de inmigración.',
            it: 'La nascita del movimento sionista e le ondate migratorie.',
          },
          h5pSlug: {
            de: 'nao-zionismus-30',
            en: 'nao-zionismus-2-58',
            fr: 'nao-zionismus-3-89',
            it: 'nao-zionismus-4-120',
            es: 'nao-zionismus-5-151',
          },
          text: {
            de: 'Ende des 19. Jahrhunderts begründete Theodor Herzl den modernen politischen Zionismus mit dem Ziel, einen eigenen jüdischen Staat als Zufluchtsort vor Verfolgung und Antisemitismus in Europa zu schaffen.',
            en: 'In the late 19th century, Theodor Herzl founded modern political Zionism aimed at establishing a Jewish national home.',
            fr: 'À la fin du XIXe siècle, Theodor Herzl fonda le sionisme politique moderne.',
            es: 'A finales del siglo XIX, Theodor Herzl fundó el sionismo político moderno.',
            it: 'Alla fine del XIX secolo, Theodor Herzl fondò il sionismo politico moderno.',
          }
        },
        {
          id: 'balfour',
          title: {
            de: 'Die Balfour-Deklaration',
            en: 'The Balfour Declaration',
            fr: 'La Déclaration Balfour',
            es: 'La Declaración Balfour',
            it: 'La Dichiarazione Balfour',
          },
          desc: {
            de: 'Das britische Mandat über Palästina und die Zusicherung einer nationalen Heimstätte 1917.',
            en: 'The British Mandate over Palestine and the promise of a national home in 1917.',
            fr: 'Le mandat britannique en Palestine et la promesse d\'un foyer national en 1917.',
            es: 'El mandato británico sobre Palestina y la promesa de un hogar nacional en 1917.',
            it: 'Il mandato britannico in Palestina e la promessa di un focolare nazionale nel 1917.',
          },
          h5pSlug: {
            de: 'nao-balfour-4',
            en: 'nao-balfour-2-33',
            fr: 'nao-balfour-3-63',
            it: 'nao-balfour-4-94',
            es: 'nao-balfour-4-94',
          },
          text: {
            de: 'Mit der Balfour-Deklaration von 1917 erklärte sich Großbritannien mit der Schaffung einer nationalen Heimstätte für das jüdische Volk in Palästina einverstanden, was zu zunehmenden Spannungen mit der arabischen Bevölkerung führte.',
            en: 'The 1917 Balfour Declaration expressed British support for establishing a national home for the Jewish people in Palestine.',
            fr: 'La Déclaration Balfour de 1917 a exprimé le soutien britannique à l\'établissement d\'un foyer national pour le peuple juif.',
            es: 'La Declaración Balfour de 1917 expresó el apoyo británico al establecimiento de un hogar nacional judío.',
            it: 'La Dichiarazione Balfour del 1917 espresse il sostegno britannico alla creazione di un focolare nazionale ebraico.',
          }
        },
        {
          id: 'staatsgruendung',
          title: {
            de: 'Teilung & Staatsgründung Israels (1947/48)',
            en: 'Partition & Founding of Israel (1947/48)',
            fr: 'Partage & Création d\'Israël (1947/48)',
            es: 'Partición y Fundación de Israel (1947/48)',
            it: 'Spartizione e Fondazione di Israele (1947/48)',
          },
          desc: {
            de: 'Der UN-Teilungsplan 1947, die Unabhängigkeitserklärung durch David Ben-Gurion und die Nakba.',
            en: 'UN partition plan 1947, declaration of independence by David Ben-Gurion and the Nakba.',
            fr: 'Plan de partage de l\'ONU 1947, déclaration d\'indépendance et la Nakba.',
            es: 'Plan de partición de la ONU 1947, declaración de independencia y la Nakba.',
            it: 'Piano di spartizione ONU 1947, dichiarazione di indipendenza e la Nakba.',
          },
          h5pSlug: {
            de: 'nao-staatsgrundung-24',
            en: 'nao-staatsgrundung-2-53',
            fr: 'nao-staatsgrundung-3-83',
            it: 'nao-staatsgrundung-4-114',
            es: 'nao-staatsgrundung-5-145',
          },
          text: {
            de: 'Am 29. November 1947 verabschiedete die UN-Generalversammlung die Resolution 181 zur Teilung Palästinas. Am 14. Mai 1948 rief David Ben-Gurion den Staat Israel aus. Daraufhin erklärten arabische Staaten Israel den Krieg.',
            en: 'On May 14, 1948, David Ben-Gurion proclaimed the establishment of the State of Israel following the UN Partition Resolution 181.',
            fr: 'Le 14 mai 1948, David Ben-Gourion proclame l\'indépendance de l\'État d\'Israël.',
            es: 'El 14 de mayo de 1948, David Ben-Gurión proclamó la independencia del Estado de Israel.',
            it: 'Il 14 maggio 1948, David Ben Gurion proclamò la nascita dello Stato di Israele.',
          }
        },
      ]
    },
    {
      id: 'kriege',
      icon: ShieldAlert,
      title: {
        de: '2. Kriege und Krisen',
        en: '2. Wars and Crises',
        fr: '2. Crises et Guerres',
        es: '2. Guerras y Crisis',
        it: '2. Guerre e Crisi',
      },
      desc: {
        de: 'Der Sechs-Tage-Krieg, der Jom-Kippur-Krieg, die Suezkrise, die erste und zweite Intifada sowie PLO und Hamas.',
        en: 'The Six-Day War, Yom Kippur War, Suez Crisis, Intifadas, and the roles of the PLO and Hamas.',
        fr: 'La guerre des Six Jours, guerre du Kippour, crise de Suez, Intifadas et les rôles de l\'OLP et du Hamas.',
        es: 'La Guerra de los Seis Días, Guerra de Yom Kipur, crisis de Suez, Intifadas y el papel de la OLP y Hamás.',
        it: 'La Guerra dei Sei Giorni, Guerra del Kippur, crisi di Suez, Intifade e il ruolo dell\'OLP e di Hamas.',
      },
      lessons: [
        {
          id: 'sechstagekrieg',
          title: {
            de: 'Der Sechs-Tage-Krieg (1967)',
            en: 'The Six-Day War (1967)',
            fr: 'La Guerre des Six Jours (1967)',
            es: 'La Guerra de los Seis Días (1967)',
            it: 'La Guerra dei Sei Giorni (1967)',
          },
          desc: {
            de: 'Der Krieg im Juni 1967 und die Besetzung von Westjordanland, Gazastreifen, Ostjerusalem und Golanhöhen.',
            en: 'The war of June 1967 and the occupation of the West Bank, Gaza, East Jerusalem, and Golan Heights.',
            fr: 'La guerre de juin 1967 et l\'occupation de la Cisjordanie, Gaza, Jérusalem-Est et du Golan.',
            es: 'La guerra de junio de 1967 y la ocupación de Cisjordania, Gaza, Jerusalén Este y los Altos del Golán.',
            it: 'La guerra del giugno 1967 e l\'occupazione di Cisgiordania, Gaza, Gerusalemme Est e Golan.',
          },
          h5pSlug: {
            de: 'nao-6tage-de-121',
            en: 'nao-6tage-2-60',
            fr: 'nao-6tage-3-61',
            it: 'nao-6tage-4-91',
            es: 'nao-6tage-122',
          },
          text: {
            de: 'Im Juni 1967 führte Israel einen Präventivschlag gegen ägyptische und syrische Streitkräfte durch. Innerhalb von sechs Tagen eroberte Israel die Sinai-Halbinsel, den Gazastreifen, das Westjordanland, Ostjerusalem und die Golanhöhen.',
            en: 'In June 1967, Israel fought Egypt, Jordan, and Syria, capturing the Sinai, Gaza, West Bank, East Jerusalem, and Golan Heights.',
            fr: 'En juin 1967, la guerre des Six Jours modifie radicalement les équilibres territoriaux.',
            es: 'En junio de 1967, la Guerra de los Seis Días cambió radicalmente el mapa de la región.',
            it: 'Nel giugno 1967, la Guerra dei Sei Giorni cambiò radicalmente la geografia della regione.',
          }
        },
        {
          id: 'jomkippur',
          title: {
            de: 'Der Jom-Kippur-Krieg (1973)',
            en: 'The Yom Kippur War (1973)',
            fr: 'La Guerre du Kippour (1973)',
            es: 'La Guerra de Yom Kipur (1973)',
            it: 'La Guerra del Kippur (1973)',
          },
          desc: {
            de: 'Der Überraschungsangriff an Jom Kippur und der Weg zum Friedensvertrag von Camp David 1979.',
            en: 'The surprise attack on Yom Kippur and the path to the Camp David Peace Treaty in 1979.',
            fr: 'L\'attaque surprise de Kippour et la voie vers le traité de paix de Camp David en 1979.',
            es: 'El ataque sorpresa de Yom Kipur y el camino hacia el Tratado de Paz de Camp David en 1979.',
            it: 'L\'attacco a sorpresa dello Yom Kippur e la strada verso il Trattato di pace di Camp David nel 1979.',
          },
          h5pSlug: {
            de: 'nao-jkkrieg-16',
            en: 'nao-jkkrieg-2-45',
            fr: 'nao-jkkrieg-3-75',
            it: 'nao-jkkrieg-4-106',
            es: 'nao-jkkrieg-5-137',
          },
          text: {
            de: 'Am 6. Oktober 1973 griffen Ägypten und Syrien Israel am höchsten jüdischen Feiertag überraschend an. Der Krieg führte zu weltweiten politischen Spannungen und schließlich 1979 zum ersten Friedensvertrag zwischen Israel und Ägypten.',
            en: 'On October 6, 1973, Egypt and Syria launched a surprise attack on Israel on Yom Kippur, leading to Camp David in 1979.',
            fr: 'Le 6 octobre 1973, l\'Égypte et la Syrie lancent une attaque surprise contre Israël le jour du Kippour.',
            es: 'El 6 de octubre de 1973, Egipto y Siria lanzaron un ataque sorpresa contra Israel.',
            it: 'Il 6 ottobre 1973, Egitto e Siria lanciarono un attacco a sorpresa contro Israele.',
          }
        },
        {
          id: 'suez',
          title: {
            de: 'Die Suezkrise (1956)',
            en: 'The Suez Crisis (1956)',
            fr: 'La Crise de Suez (1956)',
            es: 'La Crisis de Suez (1956)',
            it: 'La Crisis de Suez (1956)',
          },
          desc: {
            de: 'Verstaatlichung des Suezkanals durch Nasser und die militärische Intervention.',
            en: 'Nationalization of the Suez Canal by Nasser and the international crisis.',
            fr: 'La nationalisation du canal de Suez par Nasser et l\'intervention militaire.',
            es: 'La nacionalización del canal de Suez por Nasser y la intervención militar.',
            it: 'La nazionalizzazione del canale di Suez da parte di Nasser e l\'intervento militare.',
          },
          h5pSlug: {
            de: 'nao-sues-25',
            en: 'nao-sues-2-54',
            fr: 'nao-sues-3-84',
            it: 'nao-sues-4-115',
            es: 'nao-sues-5-146',
          },
          text: {
            de: '1956 verstaatlichte der ägyptische Präsident Gamal Abdel Nasser den strategisch wichtigen Suezkanal, was zu einer militärischen Intervention Israels, Großbritanniens und Frankreichs führte.',
            en: 'In 1956, Egyptian President Nasser nationalized the Suez Canal, triggering a major international crisis.',
            fr: 'En 1956, la nationalisation du canal de Suez par Nasser déclencha une intervention internationale.',
            es: 'En 1956, la nationalisation du canal de Suez provocó una grave crisis internacional.',
            it: 'Nel 1956, la nazionalizzazione del canale di Suez portò a una grande crisi internazionale.',
          }
        },
        {
          id: 'hamas_plo',
          title: {
            de: 'PLO, Hamas & Intifada',
            en: 'PLO, Hamas & Intifadas',
            fr: 'OLP, Hamas & Intifadas',
            es: 'OLP, Hamás e Intifadas',
            it: 'OLP, Hamas e Intifade',
          },
          desc: {
            de: 'Die Entstehung der Palästinensischen Befreiungsorganisation (PLO), die Hamas und die Volksaufstände.',
            en: 'The Palestinian Liberation Organization (PLO), Hamas, and popular uprisings.',
            fr: 'L\'Organisation de libération de la Palestine (OLP), le Hamas et les soulèvements.',
            es: 'La Organización para la Liberación de Palestina (OLP), Hamás y los levantamientos populares.',
            it: 'L\'Organizzazione per la Liberazione della Palestina (OLP), Hamas e le rivolte popolari.',
          },
          h5pSlug: {
            de: 'nao-hamas-12',
            en: 'nao-hamas-2-41',
            fr: 'nao-hamas-3-71',
            it: 'nao-hamas-4-102',
            es: 'nao-hamas-5-133',
          },
          text: {
            de: 'Die PLO unter Jassir Arafat und die 1987 gegründete islamistische Hamas prägten den palästinensischen Widerstand. Die erste Intifada (1987–1993) und zweite Intifada (2000–2005) markierten Höhepunkte gewaltsamer Auseinandersetzungen.',
            en: 'The PLO under Yasser Arafat and Hamas played central roles in the Palestinian movement and the Intifadas.',
            fr: 'L\'OLP de Yasser Arafat et le Hamas ont joué un rôle central dans les soulèvements populaires.',
            es: 'La OLP de Yasir Arafat y Hamás desempeñaron un papel clave en los levantamientos populares.',
            it: 'L\'OLP di Yasser Arafat e Hamas hanno svolto ruoli centrali nelle rivolte delle Intifade.',
          }
        }
      ]
    },
    {
      id: 'gruende',
      icon: Scale,
      title: {
        de: '3. Gründe für den Konflikt',
        en: '3. Reasons for the Conflict',
        fr: '3. Raisons du Conflit',
        es: '3. Motivos del Conflicto',
        it: '3. Motivi del Conflitto',
      },
      desc: {
        de: 'Jerusalem als heilige Stadt dreier Religionen, Grenzziehungen, Siedlungspolitik und Ressourcen.',
        en: 'Jerusalem as a holy city for three faiths, borders, settlement policy, and water resources.',
        fr: 'Jérusalem, ville sainte de trois religions, frontières, colonies et ressources en eau.',
        es: 'Jerusalén como ciudad santa de tres religiones, fronteras, asentamientos y recursos.',
        it: 'Gerusalemme città santa di tre religioni, confini, insediamenti e risorse idriche.',
      },
      lessons: [
        {
          id: 'hauptkonflikt',
          title: {
            de: 'Die Hauptkonfliktpunkte',
            en: 'The Main Points of Conflict',
            fr: 'Les Principaux Points de Conflit',
            es: 'Los Principales Puntos del Conflicto',
            it: 'I Principali Punti di Conflitto',
          },
          desc: {
            de: 'Kernstreitfragen: Grenzen von 1967, Status von Jerusalem, Rückkehrrecht der Flüchtlinge und Sicherheit.',
            en: 'Core disputes: 1967 borders, Jerusalem status, refugees return, and security.',
            fr: 'Litiges fondamentaux: frontières de 1967, statut de Jérusalem, réfugiés et sécurité.',
            es: 'Disputas centrales: fronteras de 1967, estatus de Jerusalén, refugiados y seguridad.',
            it: 'Controversie centrali: confini del 1967, status di Gerusalemme, profughi e sicurezza.',
          },
          h5pSlug: {
            de: 'nao-hauptkonf-13',
            en: 'nao-hauptkonf-2-42',
            fr: 'nao-hauptkonf-3-72',
            it: 'nao-hauptkonf-4-103',
            es: 'nao-hauptkonf-5-134',
          },
          text: {
            de: 'Zu den ungelösten Kernfragen gehören der endgültige Grenzverlauf, der völkerrechtliche Status Jerusalems, das Schicksal von Millionen palästinensischen Flüchtlingen und der Anspruch Israels auf sichere Grenzen.',
            en: 'Key unresolved issues include final borders, the status of Jerusalem, Palestinian refugees, and Israel\'s security guarantees.',
            fr: 'Les questions clés non résolues incluent les frontières définitives, le statut de Jérusalem et les réfugiés.',
            es: 'Las cuestiones clave no resueltas incluyen las fronteras definitivas, Jerusalén y los refugiados.',
            it: 'Le questioni centrali irrisolte includono i confini definitivi, Gerusalemme e i profughi.',
          }
        },
        {
          id: 'jerusalem_rel',
          title: {
            de: '1 Land – 3 Religionen',
            en: '1 Land – 3 Religions',
            fr: '1 Terre – 3 Religions',
            es: '1 Tierra – 3 Religiones',
            it: '1 Terra – 3 Religioni',
          },
          desc: {
            de: 'Die religiöse Bedeutung von Jerusalem für Judentum, Christentum und Islam.',
            en: 'The religious significance of Jerusalem for Judaism, Christianity, and Islam.',
            fr: 'La signification religieuse de Jérusalem pour le judaïsme, le christianisme et l\'islam.',
            es: 'La importancia religiosa de Jerusalén para el judaísmo, cristianismo e islam.',
            it: 'L\'importanza religiosa di Gerusalemme per ebraismo, cristianesimo e islam.',
          },
          h5pSlug: {
            de: 'nao-rel-22',
            en: 'nao-rel-2-51',
            fr: 'nao-rel-3-81',
            it: 'nao-rel-4-112',
            es: 'nao-rel-5-143',
          },
          text: {
            de: 'Jerusalem beherbergt heilige Stätten dreier Weltreligionen: die Klagemauer (Judentum), die Grabeskirche (Christentum) und den Felsendom sowie die Al-Aqsa-Moschee (Islam). Dies macht die Stadt zum emotionalsten Streitpunkt des Konflikts.',
            en: 'Jerusalem contains sacred sites for three major world religions: Western Wall, Church of the Holy Sepulchre, and Al-Aqsa Mosque.',
            fr: 'Jérusalem abrite des lieux saints majeurs pour le judaïsme, le christianisme et l\'islam.',
            es: 'Jerusalén alberga lugares sagrados para el judaísmo, cristianismo e islam.',
            it: 'Gerusalemme ospita luoghi sacri per ebraismo, cristianesimo e islam.',
          }
        },
        {
          id: 'siedlungspolitik',
          title: {
            de: 'Siedlungspolitik im Westjordanland',
            en: 'Settlement Policy in the West Bank',
            fr: 'Politique de Colonisation en Cisjordanie',
            es: 'Política de Asentamientos en Cisjordania',
            it: 'Politica degli Insediamenti in Cisgiordania',
          },
          desc: {
            de: 'Der Bau israelischer Siedlungen seit 1967 und seine Auswirkungen auf eine Friedenslösung.',
            en: 'The construction of Israeli settlements since 1967 and its impact on peace.',
            fr: 'La construction de colonies israéliennes depuis 1967 et son impact sur la paix.',
            es: 'La construcción de asentamientos israelíes desde 1967 y su impacto en la paz.',
            it: 'La costruzione di insediamenti israeliani dal 1967 e il suo impatto sulla pace.',
          },
          h5pSlug: {
            de: 'nao-sied-23',
            en: 'nao-sied-2-52',
            fr: 'nao-sied-3-82',
            it: 'nao-sied-4-113',
            es: 'nao-sied-5-144',
          },
          text: {
            de: 'Seit 1967 hat Israel hunderte Siedlungen im Westjordanland und in Ostjerusalem errichtet, in denen heute über 700.000 Israelis leben. Völkerrechtlich gelten diese Siedlungen nach UN-Resolutionen als illegal und erschweren einen zusammenhängenden palästinensischen Staat.',
            en: 'Since 1967, Israeli settlements built in the West Bank and East Jerusalem have become a major obstacle to a contiguous Palestinian state.',
            fr: 'Depuis 1967, la construction de colonies en Cisjordanie constitue un obstacle majeur à la création d\'un État palestinien.',
            es: 'Desde 1967, los asentamientos israelíes en Cisjordania representan un desafío central para la paz.',
            it: 'Dal 1967, gli insediamenti israeliani in Cisgiordania rappresentano un ostacolo chiave alla pace.',
          }
        }
      ]
    },
    {
      id: 'bevoelkerung',
      icon: Users,
      title: {
        de: '4. Lage der Bevölkerung',
        en: '4. Situation of the Population',
        fr: '4. Situation de la Population',
        es: '4. Situación de la Población',
        it: '4. Situazione della Popolazione',
      },
      desc: {
        de: 'Perspektiven der Jugendlichen, Rolle der Frauen, Alltag im Westjordanland, in Gaza und in Jerusalem.',
        en: 'Perspectives of youth, role of women, daily life in the West Bank, Gaza, and Jerusalem.',
        fr: 'Perspectives de la jeunesse, rôle des femmes, quotidien en Cisjordanie, à Gaza et à Jérusalem.',
        es: 'Perspectivas de los jóvenes, papel de las mujeres, vida cotidiana en Cisjordania, Gaza y Jerusalén.',
        it: 'Prospettive dei giovani, ruolo delle donne, vita quotidiana in Cisgiordania, a Gaza e a Gerusalemme.',
      },
      lessons: [
        {
          id: 'jugend',
          title: {
            de: 'Jugendliche im Konflikt',
            en: 'Youth in Conflict',
            fr: 'La Jeunesse dans le Conflit',
            es: 'Los Jóvenes en el Conflicto',
            it: 'I Giovani nel Conflitto',
          },
          desc: {
            de: 'Wie junge Israelis und Palästinenser den Konflikt erleben und aufwachsen.',
            en: 'How young Israelis and Palestinians experience growing up in conflict.',
            fr: 'Comment les jeunes Israéliens et Palestiniens vivent le conflit au quotidien.',
            es: 'Cómo viven el conflicto los jóvenes israelíes y palestinos.',
            it: 'Come i giovani israeliani e palestinesi vivono il conflitto.',
          },
          h5pSlug: {
            de: 'nao-jugend-17',
            en: 'nao-jugend-2-46',
            fr: 'nao-jugend-3-76',
            it: 'nao-jugend-4-107',
            es: 'nao-jugend-5-138',
          },
          text: {
            de: 'Junge Menschen auf beiden Seiten wachsen im Schatten von Militärdienst, Kontrollpunkten, Raketenalarmen und wirtschaftlichen Einschränkungen auf. Vorurteile und mangelnder persönlicher Kontakt prägen oft die gegenseitige Wahrnehmung.',
            en: 'Young people on both sides grow up in the shadow of checkpoints, military service, and sirens, yet many seek dialogue.',
            fr: 'Les jeunes des deux côtés grandissent sous l\'ombre des tensions et des checkpoints.',
            es: 'Los jóvenes de ambos lados crecen bajo la sombra de tensiones constantes.',
            it: 'I giovani di entrambe le parti crescono all\'ombra delle tensioni quotidiane.',
          }
        },
        {
          id: 'frauen',
          title: {
            de: 'Die Rolle der Frauen',
            en: 'The Role of Women',
            fr: 'Le Rôle des Femmes',
            es: 'El Papel de las Mujeres',
            it: 'Il Ruolo delle Donne',
          },
          desc: {
            de: 'Frauen als Brückenbauerinnen, Friedensaktivistinnen und Betroffene des Konflikts.',
            en: 'Women as bridge builders, peace activists, and affected communities.',
            fr: 'Les femmes comme artisanes de paix et actrices du changement.',
            es: 'Las mujeres como constructoras de paz y agentes de cambio.',
            it: 'Le donne come costruttrici di pace e attrici del cambiamento.',
          },
          h5pSlug: {
            de: 'nao-frau-9',
            en: 'nao-frau-2-38',
            fr: 'nao-frau-3-68',
            it: 'nao-frau-4-99',
            es: 'nao-frau-5-130',
          },
          text: {
            de: 'Frauenorganisationen wie "Women Wage Peace" in Israel und palästinensische Fraueninitiativen setzen sich aktiv für gewaltfreie Dialoge und friedliche Verhandlungslösungen ein.',
            en: 'Women-led initiatives like Women Wage Peace demonstrate vital cross-community efforts for non-violence and dialogue.',
            fr: 'Des initiatives féminines s\'engagent activement pour un dialogue pacifique.',
            es: 'Organizaciones de mujeres trabajan activamente por el diálogo pacífico.',
            it: 'Organizzazioni di donne lavorano attivamente per il dialogo di pace.',
          }
        },
        {
          id: 'alltag_gaza_westjo',
          title: {
            de: 'Alltag im Westjordanland & Gaza',
            en: 'Daily Life in West Bank & Gaza',
            fr: 'Quotidien en Cisjordanie & Gaza',
            es: 'Vida Cotidiana en Cisjordania y Gaza',
            it: 'Vita Quotidiana in Cisgiordania e Gaza',
          },
          desc: {
            de: 'Checkpoints, Sperranlagen, Blockaden und humanitäre Herausforderungen.',
            en: 'Checkpoints, barriers, blockades, and humanitarian conditions.',
            fr: 'Checkpoints, barrières de séparation et conditions humanitaires.',
            es: 'Puntos de control, barreras y condiciones humanitarias.',
            it: 'Posti di blocco, barriere e condizioni umanitarie.',
          },
          h5pSlug: {
            de: 'nao-gaza-10',
            en: 'nao-gaza-2-11',
            fr: 'nao-gaza-3-39',
            it: 'nao-gaza-4-69',
            es: 'nao-gaza-5-100',
          },
          text: {
            de: 'Im Westjordanland regelt ein System von Checkpoints, Sperranlagen und getrennten Straßen den Alltag der Palästinenser. Der Gazastreifen leidet unter wiederkehrenden Kriegsausbrüchen und schwerer Blockade mit dramatischen humanitären Folgen.',
            en: 'Daily life in the West Bank is shaped by checkpoints and barriers, while Gaza faces severe blockades and humanitarian crises.',
            fr: 'La vie quotidienne en Cisjordanie et à Gaza est marquée par de sévères restrictions et des défis humanitaires.',
            es: 'La vida cotidiana en Cisjordania y Gaza está marcada por restricciones y desafíos humanitarios.',
            it: 'La vita quotidiana in Cisgiordania e a Gaza è segnata da restrizioni e gravi sfide umanitarie.',
          }
        }
      ]
    },
    {
      id: 'akteure',
      icon: Globe2,
      title: {
        de: '5. Weitere Akteure der Krise',
        en: '5. Other Players in the Crisis',
        fr: '5. Autres Acteurs de la Crise',
        es: '5. Otros Actores de la Crisis',
        it: '5. Altri Attori della Crisi',
      },
      desc: {
        de: 'Die Rolle der USA, der arabischen Nachbarstaaten (Ägypten, Jordanien, Iran) und die Medienberichterstattung.',
        en: 'The role of the United States, neighboring Arab states (Egypt, Jordan, Iran), and media coverage.',
        fr: 'Le rôle des États-Unis, des États arabes voisins (Égypte, Jordanie, Iran) et des médias.',
        es: 'El papel de Estados Unidos, los países vecinos (Egipto, Jordania, Irán) y los medios.',
        it: 'Il ruolo degli Stati Uniti, dei paesi vicini (Egitto, Giordania, Iran) e dei media.',
      },
      lessons: [
        {
          id: 'usa_rolle',
          title: {
            de: 'Die Rolle der USA',
            en: 'The Role of the USA',
            fr: 'Le Rôle des États-Unis',
            es: 'El Papel de EE. UU.',
            it: 'Il Ruolo degli USA',
          },
          desc: {
            de: 'Strategische Partnerschaft, Militärhilfe und Vermittlerrolle bei Friedensverhandlungen.',
            en: 'Strategic partnership, military aid, and mediation in peace talks.',
            fr: 'Partenariat stratégique, aide militaire et rôle de médiateur dans les négociations.',
            es: 'Asociación estratégica, ayuda militar y papel mediador.',
            it: 'Partenariato strategico, aiuti militari e ruolo di mediazione.',
          },
          h5pSlug: {
            de: 'nao-usa-27',
            en: 'nao-usa-2-56',
            fr: 'nao-usa-3-86',
            it: 'nao-usa-4-117',
            es: 'nao-usa-5-148',
          },
          text: {
            de: 'Die Vereinigten Staaten sind der engste Verbündete Israels und stellen jährliche Militärhilfe in Milliardenhöhe bereit. Gleichzeitig traten US-Präsidenten historisch immer wieder als Schlichter und Vermittler (Camp David, Oslo, Abraham Accords) auf.',
            en: 'The United States is Israel\'s closest ally and major military partner, while also acting as mediator in historic accords.',
            fr: 'Les États-Unis sont le principal allié stratégique d\'Israël tout en jouant un rôle d\'intermédiaire historique.',
            es: 'Estados Unidos es el principal aliado estratégico de Israel y mediador histórico.',
            it: 'Gli Stati Uniti sono il principale alleato strategico di Israele e mediatore storico.',
          }
        },
        {
          id: 'nachbarn',
          title: {
            de: 'Die Rolle der Nachbarstaaten',
            en: 'The Role of Neighboring States',
            fr: 'Le Rôle des Pays Voisins',
            es: 'El Papel de los Países Vecinos',
            it: 'Il Ruolo dei Paesi Vicini',
          },
          desc: {
            de: 'Ägypten, Jordanien, Syrien, Libanon, die Golfstaaten und der Einfluss des Iran.',
            en: 'Egypt, Jordan, Syria, Lebanon, Gulf States, and Iran\'s influence.',
            fr: 'L\'Égypte, la Jordanie, la Syrie, le Liban, les pays du Golfe et l\'Iran.',
            es: 'Egipto, Jordania, Siria, Líbano, los países del Golfo y la influencia de Irán.',
            it: 'Egitto, Giordania, Siria, Libano, paesi del Golfo e influenza dell\'Iran.',
          },
          h5pSlug: {
            de: 'nao-nachbarn-19',
            en: 'nao-nachbarn-2-48',
            fr: 'nao-nachbarn-3-78',
            it: 'nao-nachbarn-4-109',
            es: 'nao-nachbarn-5-140',
          },
          text: {
            de: 'Während Ägypten (1979) und Jordanien (1994) Friedensverträge mit Israel schlossen und die Abraham-Abkommen (2020) die Normalisierung mit Golfstaaten brachten, unterstützen der Iran, die Hisbollah im Libanon und syrische Kräfte weiterhin militante Gruppen.',
            en: 'Regional dynamics range from peace treaties with Egypt and Jordan and normalization via the Abraham Accords to proxy conflicts involving Iran.',
            fr: 'La dynamique régionale comprend des traités de paix historiques et de nouvelles alliances.',
            es: 'La dinámica regional combina acuerdos de paz históricos y nuevas alianzas estratégicas.',
            it: 'La dinamica regionale comprende accordi di pace storici e nuove alleanze strategiche.',
          }
        },
        {
          id: 'medien',
          title: {
            de: 'Die Rolle der Medien',
            en: 'The Role of Media',
            fr: 'Le Rôle des Médias',
            es: 'El Papel de los Medios',
            it: 'Il Ruolo dei Media',
          },
          desc: {
            de: 'Informationskriege, soziale Medien, Sprache und journalistische Neutralität.',
            en: 'Information warfare, social media narratives, language, and journalistic neutrality.',
            fr: 'Guerre de l\'information, réseaux sociaux et neutralité journalistique.',
            es: 'Guerra informativa, redes sociales y neutralidad periodística.',
            it: 'Guerra informativa, social media e neutralità giornalistica.',
          },
          h5pSlug: {
            de: 'nao-medien-18',
            en: 'nao-medien-2-47',
            fr: 'nao-medien-3-77',
            it: 'nao-medien-4-108',
            es: 'nao-medien-5-139',
          },
          text: {
            de: 'Die Berichterstattung über den Nahostkonflikt ist stark polarisiert. Soziale Medien und digitale Kanäle dienen beiden Konfliktparteien als Werkzeuge der Meinungsbildung, was sachliche Differenzierung oft erschwert.',
            en: 'Coverage of the conflict is heavily contested, with digital platforms playing a crucial role in narrative building.',
            fr: 'La couverture médiatique du conflit fait l\'objet d\'intenses batailles narratives sur les réseaux sociaux.',
            es: 'La cobertura mediática del conflicto está muy polarizada en las plataformas digitales.',
            it: 'La copertura mediatica del conflitto è fortemente polarizzata sui canali digitali.',
          }
        }
      ]
    },
    {
      id: 'frieden',
      icon: HeartHandshake,
      title: {
        de: '6. Chancen für den Frieden',
        en: '6. Opportunities for Peace',
        fr: '6. Opportunités pour la Paix',
        es: '6. Oportunidades para la Paz',
        it: '6. Opportunità di Pace',
      },
      desc: {
        de: 'Das Oslo-Abkommen, Friedensmodelle (1-, 2-, 3-Staaten-Lösung) und zivilgesellschaftliche Koexistenz.',
        en: 'Oslo Accords, peace models (1-, 2-, 3-state solutions), and grassroots coexistence.',
        fr: 'Les accords d\'Oslo, les modèles de paix (solutions à 1, 2 ou 3 États) et la coexistence.',
        es: 'Los acuerdos de Oslo, modelos de paz (soluciones de 1, 2 o 3 Estados) y coexistencia.',
        it: 'Gli accordi di Oslo, modelli di pace (soluzioni a 1, 2 o 3 Stati) e coesistenza.',
      },
      lessons: [
        {
          id: 'oslo',
          title: {
            de: 'Das Oslo-Abkommen (1993)',
            en: 'The Oslo Accords (1993)',
            fr: 'Les Accords d\'Oslo (1993)',
            es: 'Los Acuerdos de Oslo (1993)',
            it: 'Gli Accordi di Oslo (1993)',
          },
          desc: {
            de: 'Der historische Handschlag zwischen Jitzchak Rabin und Jassir Arafat in Washington.',
            en: 'Historic handshake between Yitzhak Rabin and Yasser Arafat in Washington.',
            fr: 'La poignée de main historique entre Yitzhak Rabin et Yasser Arafat.',
            es: 'El apretón de manos histórico entre Yitzhak Rabin y Yasir Arafat.',
            it: 'La storica stretta di mano tra Yitzhak Rabin e Yasser Arafat.',
          },
          h5pSlug: {
            de: 'nao-oslo-20',
            en: 'nao-oslo-2-49',
            fr: 'nao-oslo-3-79',
            it: 'nao-oslo-4-110',
            es: 'nao-oslo-5-141',
          },
          text: {
            de: '1993 einigten sich Israel und die PLO auf eine gegenseitige Anerkennung und die Schaffung einer palästinensischen Selbstverwaltung. Trotz des Friedensnobelpreises für Rabin, Peres und Arafat stockte der Prozess nach der Ermordung Rabins 1995.',
            en: 'In 1993, Israel and the PLO recognized each other in Oslo, establishing the Palestinian Authority towards eventual peace.',
            fr: 'En 1993, la signature des accords d\'Oslo a ouvert une période d\'espoir historique pour la paix.',
            es: 'En 1993, los Acuerdos de Oslo marcaron un hito histórico de reconocimiento mutuo.',
            it: 'Nel 1993, gli Accordi di Oslo segnarono un momento storico di riconoscimento reciproco.',
          }
        },
        {
          id: 'loesungsmodelle',
          title: {
            de: '1-, 2- oder 3-Staaten-Lösung?',
            en: '1-, 2-, or 3-State Solution?',
            fr: 'Solution à 1, 2 ou 3 États ?',
            es: '¿Solución de 1, 2 o 3 Estados?',
            it: 'Soluzione a 1, 2 o 3 Stati?',
          },
          desc: {
            de: 'Die verschiedenen politischen Modelle für eine dauerhafte Friedensordnung im Nahen Osten.',
            en: 'Different political models for lasting peace in the Middle East.',
            fr: 'Les différents modèles politiques pour une paix durable au Proche-Orient.',
            es: 'Los diferentes modelos políticos para una paz duradera en Oriente Próximo.',
            it: 'I diversi modelli politici per una pace duratura in Medio Oriente.',
          },
          h5pSlug: {
            de: 'nao-123staaten-2',
            en: 'nao-123staaten-2-5',
            fr: 'nao-123staaten-3-6',
            it: 'nao-123staaten-4-31',
            es: 'nao-123staaten-5-92',
          },
          text: {
            de: 'Die internationale Gemeinschaft befürwortet überwiegend die Zweistaatenlösung mit einem unabhängigen Palästina neben Israel. Alternative Modelle diskutieren einen gemeinsamen demokratischen binationalen Staat (Einstaatenlösung) oder Föderationsmodelle.',
            en: 'The two-state solution remains the primary international framework, alongside debates on bi-national federation models.',
            fr: 'La solution à deux États reste le cadre privilégié par la communauté internationale.',
            es: 'La solución de dos Estados sigue siendo el marco principal respaldado internacionalmente.',
            it: 'La soluzione a due Stati rimane il modello principale sostenuto dalla comunità internazionale.',
          }
        },
        {
          id: 'versoehnung',
          title: {
            de: 'Initiativen für Versöhnung',
            en: 'Initiatives for Reconciliation',
            fr: 'Initiatives de Réconciliation',
            es: 'Iniciativas de Reconciliación',
            it: 'Iniziative di Riconciliazione',
          },
          desc: {
            de: 'Gemeinsame Schulen, Kulturprojekte, Umweltschutz (EcoPeace) und Friedensinitiativen.',
            en: 'Joint schools, cultural exchange, EcoPeace, and grassroots coexistence.',
            fr: 'Écoles bilingues, projets culturels et initiatives de coopération écologique.',
            es: 'Escuelas bilingües, proyectos culturales y cooperación ecológica.',
            it: 'Scuole bilingui, progetti culturali e cooperazione ecologica.',
          },
          h5pSlug: {
            de: 'nao-bspverso-7',
            en: 'nao-bspverso-2-36',
            fr: 'nao-bspverso-3-66',
            it: 'nao-bspverso-4-97',
            es: 'nao-bspverso-5-128',
          },
          text: {
            de: 'Zahlreiche zivilgesellschaftliche Initiativen wie das Dorf "Neve Shalom / Wahat al-Salam", zweisprachige Schulen und das West-Eastern Divan Orchestra von Daniel Barenboim beweisen, dass friedliche Koexistenz und gegenseitiger Respekt im Alltag gelingen können.',
            en: 'Grassroots projects like Neve Shalom / Wahat al-Salam and the West-Eastern Divan Orchestra prove that peaceful coexistence is possible.',
            fr: 'Des projets citoyens comme Neve Shalom et le West-Eastern Divan Orchestra montrent que la coexistence est possible.',
            es: 'Proyectos como Neve Shalom demuestran que la convivencia pacífica es posible.',
            it: 'Progetti come Neve Shalom dimostrano che la convivenza pacifica è possibile.',
          }
        }
      ]
    }
  ];

  // Selected chapter: null = Overview Page with 6 cards; string = Chapter detail page
  const [activeChapterId, setActiveChapterId] = useState<string | null>(initialChapterId || null);
  const activeChapter = chapters.find(c => c.id === activeChapterId) || null;
  
  const [activeLessonId, setActiveLessonId] = useState<string>('wurzeln');
  const activeLesson = activeChapter ? (activeChapter.lessons.find(l => l.id === activeLessonId) || activeChapter.lessons[0]) : null;

  const currentH5pSlug = activeLesson ? (activeLesson.h5pSlug[language] || activeLesson.h5pSlug.de) : '';

  const currentModule: ModuleItem | null = activeLesson && activeChapter ? {
    id: `nahost-${activeChapter.id}-${activeLesson.id}`,
    slug: currentH5pSlug,
    title: {
      de: activeLesson.title.de,
      en: activeLesson.title.en,
      fr: activeLesson.title.fr,
      es: activeLesson.title.es,
      it: activeLesson.title.it,
    },
    type: 'CoursePresentation',
  } : null;

  const handleSelectChapter = (chapterId: string) => {
    const ch = chapters.find(c => c.id === chapterId);
    setActiveChapterId(chapterId);
    if (ch && ch.lessons.length > 0) {
      setActiveLessonId(ch.lessons[0].id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* 1. ÜBERSICHTSSEITE DES FACHPORTALS (ZWISCHENSEITE) */}
      {!activeChapter ? (
        <div>
          
          {/* Header Info Box */}
          <div className="info-box-section">
            <h2>
              {language === 'de' && 'Fachportal: Der Nahostkonflikt'}
              {language === 'en' && 'Dossier: The Middle East Conflict'}
              {language === 'fr' && 'Dossier : Le Conflit au Proche-Orient'}
              {language === 'es' && 'Dossier: El Conflicto de Oriente Próximo'}
              {language === 'it' && 'Dossier: Il Conflitto in Medio Oriente'}
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-color)', marginTop: 8 }}>
              {language === 'de' && 'Umfassendes multimediales Lernportal mit allen 6 Fachkapiteln, Lektionstexten und 149 interaktiven H5P-Lerneinheiten aus der Datenbank. Wählen Sie ein Kapitel und eine Lerneinheit, um den Fachtext zu lesen und die interaktive Übung zu starten.'}
              {language === 'en' && 'Comprehensive learning portal covering all 6 core chapters, lesson texts, and 149 interactive H5P modules from the database. Select a chapter and lesson to begin.'}
              {language === 'fr' && 'Portail d\'apprentissage multimédia complet avec 6 chapitres et 149 modules interactifs H5P issus de la base de données.'}
              {language === 'es' && 'Portal educativo multimedia completo con 6 capítulos y 149 módulos interactivos H5P.'}
              {language === 'it' && 'Portale educativo multimediale completo con 6 capitoli e 149 moduli interattivi H5P.'}
            </p>
          </div>

          {/* Die 6 Fachkapitel-Kacheln */}
          <div className="section-block">
            <h3 className="section-main-heading">Die 6 Fachkapitel</h3>

            <div className="cards-grid cards-grid-3-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {chapters.map((ch) => {
                const Icon = ch.icon;
                const chapterSlugMap: Record<string, string> = {
                  geschichte: 'geschichte-israels-und-palaestinas',
                  kriege: 'kriege-und-krisen',
                  gruende: 'gruende-fuer-konflikt',
                  lage: 'lage-der-bevoelkerung',
                  akteure: 'die-rolle-von-aussenstehenden-parteien',
                  chancen: 'chancen-fuer-den-frieden',
                };
                const chapterUrl = `/der-nahostkonflikt/${chapterSlugMap[ch.id] || ch.id}`;

                return (
                  <Link
                    key={ch.id}
                    href={chapterUrl}
                    className="tile-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      background: 'var(--bg-white)',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 6,
                        background: 'var(--green-light)',
                        color: 'var(--green-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 12
                      }}>
                        <Icon style={{ width: 22, height: 22 }} />
                      </div>

                      <h3 className="tile-title" style={{ textAlign: 'left', marginBottom: 6, fontSize: '16px' }}>
                        {ch.title[language] || ch.title.de}
                      </h3>

                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 16 }}>
                        {ch.desc[language] || ch.desc.de}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                        {ch.lessons.map((les) => (
                          <span
                            key={les.id}
                            style={{
                              fontSize: '11px',
                              padding: '2px 8px',
                              background: 'var(--bg-body)',
                              border: '1px solid var(--border-light)',
                              borderRadius: 4,
                              color: 'var(--text-color)'
                            }}
                          >
                            {les.title[language] || les.title.de}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--green-dark)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: 12,
                      width: '100%'
                    }}>
                      <span>Kapitel öffnen ({ch.lessons.length} Lerneinheiten)</span>
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* 2. KAPITELSEITE (OHNE DIE DOPPELTE LEISTE, NUR DAS AKTIVE KAPITEL MIT LEKTIONEN) */
        <div>
          
          {/* Zurück zur Kapitelübersicht */}
          <div style={{ marginBottom: 16 }}>
            <Link
              href="/der-nahostkonflikt"
              className="nav-btn"
              style={{
                border: '1px solid var(--green-border)',
                background: 'var(--bg-white)',
                color: 'var(--green-dark)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 4,
                textDecoration: 'none'
              }}
            >
              <span>← Zurück zur Kapitelübersicht</span>
            </Link>
          </div>

          {/* Titel-Box des gewählten Kapitels */}
          <div className="info-box-section" style={{ padding: '16px 20px', marginBottom: 20 }}>
            <h2 style={{ fontSize: '18px', color: 'var(--green-dark)', margin: '0 0 6px 0', fontWeight: 700 }}>
              {activeChapter.title[language] || activeChapter.title.de}
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-color)', margin: 0, lineHeight: 1.5 }}>
              {activeChapter.desc[language] || activeChapter.desc.de}
            </p>
          </div>

          {/* Lektionen-Navigation des geöffneten Kapitels */}
          <div className="section-block" style={{ margin: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              {activeChapter.lessons.map((lesson, idx) => {
                const isLessonActive = lesson.id === activeLessonId;
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`nav-btn ${isLessonActive ? 'active' : ''}`}
                    style={{
                      border: isLessonActive ? '1px solid var(--green-dark)' : '1px solid var(--border-light)',
                      background: isLessonActive ? 'var(--green-light)' : 'var(--bg-white)',
                      color: isLessonActive ? 'var(--green-dark)' : 'var(--text-color)',
                      fontWeight: isLessonActive ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      borderRadius: 4
                    }}
                  >
                    <PlayCircle style={{ width: 14, height: 14, color: isLessonActive ? 'var(--green-primary)' : 'var(--text-muted)' }} />
                    <span>{idx + 1}. {lesson.title[language] || lesson.title.de}</span>
                  </button>
                );
              })}
            </div>

            {/* Fachtext der aktiven Lektion */}
            {activeLesson && (
              <div className="h5p-player-card" style={{ margin: '0 0 20px 0', textAlign: 'left', padding: '18px 22px' }}>
                <h4 style={{ fontSize: '16px', color: 'var(--green-dark)', marginBottom: 8, fontWeight: 700 }}>
                  {activeLesson.title[language] || activeLesson.title.de}
                </h4>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--text-color)', margin: 0 }}>
                  {activeLesson.text[language] || activeLesson.text.de}
                </p>
              </div>
            )}

            {/* Interaktiver H5P-Player */}
            {currentModule && (
              <div>
                <H5PPlayer
                  key={currentModule.id}
                  module={currentModule}
                  onComplete={() => {}}
                />
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
