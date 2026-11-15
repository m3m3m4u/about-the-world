import { Language } from '@/types';
import { BuchTipp } from './types';

export interface BuchtippsUIStrings {
  breadcrumbHome: string;
  breadcrumbBooks: string;
  pageTitle: string;
  pageDesc: string;
  pageNote: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  clearSearchAria: string;
  resultsCount: (count: number) => string;
  allTopics: string;
  emptyTitle: string;
  emptyDesc: string;
  resetFilterBtn: string;
  praxisTipLabel: string;
  authorPrefix: string;
  detailAuthorPrefix: string;
  readMoreLabel: string;
  amazonBtnShort: string;
  amazonBtnLong: string;
  amazonDeBtnShort: string;
  amazonBtnTitle: string;
  backToAllBooks: string;
  publishedPrefix: string;
  pagesSuffix: string;
  recommendedForLabel: string;
  whyReadableHeading: string;
  summaryHeading: string;
  topicsHeading: string;
  ctaHeading: string;
  ctaDesc: string;
  relatedHeading: string;
  affiliateBadgeNotice: string;
  legalHeading: string;
  legalBody: string;
  modalNewBadge: string;
  modalTeacherLabel: string;
  modalCloseAria: string;
  modalTitle: string;
  modalBody: string;
  modalHighlight1Title: string;
  modalHighlight1Desc: string;
  modalHighlight2Title: string;
  modalHighlight2Desc: string;
  modalHighlight3Title: string;
  modalHighlight3Desc: string;
  modalLaterBtn: string;
  modalGoBtn: string;
  homeBannerTitle: string;
  homeBannerDesc: string;
  homeBannerBtn: string;
}

export const BUCHTIPPS_UI: Record<Language, BuchtippsUIStrings> = {
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbBooks: 'Buchtipps',
    pageTitle: 'Buchtipps: Geographie, Weltwissen, Geschichte & Bildung',
    pageDesc:
      'Kuratierte Buchempfehlungen passend zu den Themen von About the World: Von Geographie und Geopolitik über den Nahostkonflikt, US-Präsidenten und Biologie bis hin zu KI und digitalem Lernen im Unterricht.',
    pageNote:
      'Sorgfältig ausgewählt mit Inhaltsüberblick, didaktischen Praxistipps und direkten Bestelllinks.',
    searchPlaceholder: 'Buch, Autor oder Stichwort suchen (z. B. Geographie, Nahost, KI)...',
    searchAriaLabel: 'Buchtipps durchsuchen',
    clearSearchAria: 'Suche leeren',
    resultsCount: (c) => `${c} ${c === 1 ? 'Buchempfehlung' : 'Buchempfehlungen'} gefunden`,
    allTopics: 'Alle Themen',
    emptyTitle: 'Keine passenden Bücher gefunden',
    emptyDesc:
      'Zu deiner aktuellen Such- und Filterauswahl wurden leider keine passenden Titel gefunden. Versuche es mit einem anderen Begriff.',
    resetFilterBtn: 'Filter zurücksetzen',
    praxisTipLabel: 'Lese- & Praxis-Tipp',
    authorPrefix: 'Von',
    detailAuthorPrefix: 'Autor/in:',
    readMoreLabel: 'Buchvorstellung lesen ➔',
    amazonBtnShort: 'Auf Amazon *',
    amazonBtnLong: 'Buch auf Amazon ansehen *',
    amazonDeBtnShort: 'Bei Amazon.de *',
    amazonBtnTitle: 'Buch auf Amazon ansehen (Partnerlink)',
    backToAllBooks: 'Zurück zu allen Buchtipps',
    publishedPrefix: 'Erschienen',
    pagesSuffix: 'Seiten',
    recommendedForLabel: 'Empfohlen für:',
    whyReadableHeading: 'Warum dieses Buch besonders lesenswert ist',
    summaryHeading: 'Inhalt & Überblick',
    topicsHeading: 'Themenschwerpunkte & Schlagworte',
    ctaHeading: 'Interesse an diesem Buch?',
    ctaDesc:
      'Jetzt bei Amazon Bewertungen prüfen, Blick ins Buch werfen oder als Print-Ausgabe bzw. eBook bestellen.',
    relatedHeading: 'Weitere Buchempfehlungen',
    affiliateBadgeNotice: '* Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.',
    legalHeading: 'Hinweis zu Partnerlinks & Transparenz',
    legalBody:
      '* Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Bei den mit einem Sternchen (*) gekennzeichneten Links handelt es sich um sogenannte Affiliate-Partnerlinks. Wenn du über diese Links bestellst, erhalten wir eine kleine Provision zur Unterstützung des Betriebs dieser Lernplattform. Für dich ändert sich am Preis selbstverständlich nichts. Alle Empfehlungen werden unabhängig und nach inhaltlichem Mehrwert ausgewählt.',
    modalNewBadge: 'Neu',
    modalTeacherLabel: 'Empfehlung für Lehrkräfte',
    modalCloseAria: 'Hinweis schließen',
    modalTitle: 'Buchtipps: Fachliteratur für Geographie, Politik & modernen Unterricht',
    modalBody:
      'Liebe Lehrperson, wir haben eine neue Bücherecke zusammengestellt: Handverlesene Buchempfehlungen zu Geographie, Weltpolitik, Biologie sowie digitaler Bildung – mit Inhaltsangaben und konkreten Tipps für den Unterricht.',
    modalHighlight1Title: 'Geographie & Geopolitik:',
    modalHighlight1Desc: 'Spannende Hintergrundwerke zu Weltregionen, Grenzen und dem Nahen Osten.',
    modalHighlight2Title: 'USA, Geschichte & Natur:',
    modalHighlight2Desc: 'Fundierte Überblicke zu US-Präsidenten, Evolution und Artenvielfalt.',
    modalHighlight3Title: 'KI & Medienerziehung:',
    modalHighlight3Desc: 'Praxiserprobte Leitfäden für digitalen Unterricht und Klassen-Chats.',
    modalLaterBtn: 'Später ansehen',
    modalGoBtn: 'Zu den Buchtipps ➔',
    homeBannerTitle: 'Buchtipps für Unterricht & Weltwissen: Geographie, Geschichte, Natur & KI',
    homeBannerDesc:
      'Kuratierte Buchempfehlungen passend zu unseren Themengebieten mit kompakten Zusammenfassungen, Praxistipps und direkten Buchlinks.',
    homeBannerBtn: 'Bücher ansehen',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbBooks: 'Book Tips',
    pageTitle: 'Book Recommendations: Geography, World History, Nature & Learning',
    pageDesc:
      'Curated reading recommendations matching the core topics of About the World: world geography, geopolitics and the Middle East, US history and presidents, biology, and modern education.',
    pageNote:
      'Independently selected with concise summaries, classroom tips, and direct book links.',
    searchPlaceholder: 'Search title, author, or keyword (e.g. Geography, Lincoln, AI)...',
    searchAriaLabel: 'Search book tips',
    clearSearchAria: 'Clear search',
    resultsCount: (c) => `${c} ${c === 1 ? 'book recommendation' : 'book recommendations'} found`,
    allTopics: 'All Topics',
    emptyTitle: 'No matching books found',
    emptyDesc:
      'No books matched your current search or category filter. Please try another keyword or reset the filters.',
    resetFilterBtn: 'Reset Filters',
    praxisTipLabel: 'Reading & Classroom Tip',
    authorPrefix: 'By',
    detailAuthorPrefix: 'Author:',
    readMoreLabel: 'Read overview ➔',
    amazonBtnShort: 'On Amazon *',
    amazonBtnLong: 'View book on Amazon *',
    amazonDeBtnShort: 'On Amazon.de *',
    amazonBtnTitle: 'View book on Amazon (Affiliate link)',
    backToAllBooks: 'Back to all book tips',
    publishedPrefix: 'Published',
    pagesSuffix: 'pages',
    recommendedForLabel: 'Recommended for:',
    whyReadableHeading: 'Why this book is worth reading',
    summaryHeading: 'Summary & Overview',
    topicsHeading: 'Key Topics & Tags',
    ctaHeading: 'Interested in this book?',
    ctaDesc:
      'Check reviews, preview chapters, or order the paperback, hardcover, or Kindle edition on Amazon.',
    relatedHeading: 'More Book Recommendations',
    affiliateBadgeNotice: '* As an Amazon Associate I earn from qualifying purchases.',
    legalHeading: 'Affiliate Disclosure & Transparency',
    legalBody:
      '* As an Amazon Associate I earn from qualifying purchases. Links marked with an asterisk (*) are affiliate links. If you purchase through these links, we receive a small commission that helps keep this educational platform free—at no extra cost to you. Every book is chosen independently for its educational value.',
    modalNewBadge: 'New',
    modalTeacherLabel: 'Teacher Recommendation',
    modalCloseAria: 'Close dialog',
    modalTitle: 'Book Tips: Essential Reading for Geography, History & Education',
    modalBody:
      'Dear teacher, we have curated a dedicated reading list covering world geography, geopolitics, US history, biology, and AI in education—complete with summaries and classroom insights.',
    modalHighlight1Title: 'Geography & Geopolitics:',
    modalHighlight1Desc: 'Insightful guides to borders, world regions, and Middle East history.',
    modalHighlight2Title: 'US History & Nature:',
    modalHighlight2Desc: 'Authoritative portraits of US presidents, biodiversity, and ecosystems.',
    modalHighlight3Title: 'AI & Modern Classrooms:',
    modalHighlight3Desc: 'Practical strategies for teaching with AI and digital wellbeing.',
    modalLaterBtn: 'Maybe later',
    modalGoBtn: 'Browse Book Tips ➔',
    homeBannerTitle: 'Book Tips for Geography, History, Biology & Modern Learning',
    homeBannerDesc:
      'Curated book recommendations matching About the World topics with summaries, teaching tips, and direct Amazon links.',
    homeBannerBtn: 'Browse Books',
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbBooks: 'Livres recommandés',
    pageTitle: 'Livres recommandés : Géographie, Géopolitique, Nature & Pédagogie',
    pageDesc:
      'Une sélection d’ouvrages de référence en lien avec les thèmes d’About the World : géographie mondiale, conflit israélo-palestinien, histoire américaine, biologie et pédagogie numérique.',
    pageNote:
      'Sélectionnés pour leur valeur pédagogique avec résumés, pistes de lecture et liens directs.',
    searchPlaceholder: 'Rechercher un titre, auteur ou mot-clé (ex. cartes, arbres, IA)...',
    searchAriaLabel: 'Rechercher dans les livres recommandés',
    clearSearchAria: 'Effacer la recherche',
    resultsCount: (c) => `${c} ${c > 1 ? 'livres recommandés' : 'livre recommandé'}`,
    allTopics: 'Tous les thèmes',
    emptyTitle: 'Aucun livre trouvé',
    emptyDesc:
      'Aucun ouvrage ne correspond à votre recherche actuelle. Essayez un autre mot-clé ou réinitialisez les filtres.',
    resetFilterBtn: 'Réinitialiser les filtres',
    praxisTipLabel: 'Conseil de lecture & classe',
    authorPrefix: 'Par',
    detailAuthorPrefix: 'Auteur(e) :',
    readMoreLabel: 'Lire la présentation ➔',
    amazonBtnShort: 'Sur Amazon *',
    amazonBtnLong: 'Voir sur Amazon *',
    amazonDeBtnShort: 'Sur Amazon.de *',
    amazonBtnTitle: 'Voir le livre sur Amazon (lien partenaire)',
    backToAllBooks: 'Retour à tous les livres',
    publishedPrefix: 'Publié en',
    pagesSuffix: 'pages',
    recommendedForLabel: 'Recommandé pour :',
    whyReadableHeading: 'Pourquoi ce livre est incontournable',
    summaryHeading: 'Résumé & Aperçu',
    topicsHeading: 'Thèmes clés & Mots-clés',
    ctaHeading: 'Ce livre vous intéresse ?',
    ctaDesc:
      'Consultez les avis des lecteurs ou commandez l’édition papier ou numérique sur Amazon.',
    relatedHeading: 'Autres recommandations',
    affiliateBadgeNotice:
      '* En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.',
    legalHeading: 'Information sur les liens partenaires & transparence',
    legalBody:
      '* En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises. Les liens suivis d’un astérisque (*) sont des liens d’affiliation : sans aucun surcoût pour vous, ils contribuent au financement de cette plateforme éducative gratuite.',
    modalNewBadge: 'Nouveau',
    modalTeacherLabel: 'Suggestion pour enseignants',
    modalCloseAria: 'Fermer la fenêtre',
    modalTitle: 'Livres recommandés : Géographie, Histoire & Pédagogie',
    modalBody:
      'Cher(ère) enseignant(e), découvrez notre sélection francophone de livres de référence sur la géopolitique, la nature, l’histoire des États-Unis et les sciences cognitives.',
    modalHighlight1Title: 'Géographie & Géopolitique :',
    modalHighlight1Desc: 'Atlas critiques, frontières mondiales et clés du Proche-Orient.',
    modalHighlight2Title: 'Nature & États-Unis :',
    modalHighlight2Desc: 'Ouvrages phares sur les forêts, l’évolution humaine et l’Amérique.',
    modalHighlight3Title: 'Sciences cognitives :',
    modalHighlight3Desc: 'Comprendre comment le cerveau apprend à l’ère numérique.',
    modalLaterBtn: 'Plus tard',
    modalGoBtn: 'Voir les livres ➔',
    homeBannerTitle: 'Livres recommandés : Géographie, Géopolitique, Nature & Pédagogie',
    homeBannerDesc:
      'Des ouvrages de référence sélectionnés pour approfondir nos dossiers et exercices interactifs.',
    homeBannerBtn: 'Découvrir les livres',
  },
  es: {
    breadcrumbHome: 'Inicio',
    breadcrumbBooks: 'Libros recomendados',
    pageTitle: 'Libros recomendados: Geografía, Historia, Naturaleza y Educación',
    pageDesc:
      'Lecturas seleccionadas que complementan los contenidos de About the World: geografía mundial, geopolítica, historia de Estados Unidos, biología y neuroeducación.',
    pageNote:
      'Selección editorial con resúmenes propios, recomendaciones prácticas y enlaces directos.',
    searchPlaceholder: 'Buscar libro, autor o tema (ej. geografía, árboles, historia)...',
    searchAriaLabel: 'Buscar libros recomendados',
    clearSearchAria: 'Limpiar búsqueda',
    resultsCount: (c) => `${c} ${c === 1 ? 'libro encontrado' : 'libros encontrados'}`,
    allTopics: 'Todos los temas',
    emptyTitle: 'No se encontraron libros',
    emptyDesc:
      'Ningún libro coincide con tu búsqueda actual. Prueba con otra palabra clave o restablece los filtros.',
    resetFilterBtn: 'Restablecer filtros',
    praxisTipLabel: 'Consejo de lectura y aula',
    authorPrefix: 'Por',
    detailAuthorPrefix: 'Autor/a:',
    readMoreLabel: 'Leer reseña ➔',
    amazonBtnShort: 'En Amazon *',
    amazonBtnLong: 'Ver libro en Amazon *',
    amazonDeBtnShort: 'En Amazon.de *',
    amazonBtnTitle: 'Ver libro en Amazon (enlace de afiliado)',
    backToAllBooks: 'Volver a todos los libros',
    publishedPrefix: 'Publicado en',
    pagesSuffix: 'páginas',
    recommendedForLabel: 'Recomendado para:',
    whyReadableHeading: 'Por qué merece la pena leer este libro',
    summaryHeading: 'Resumen y contenido',
    topicsHeading: 'Temas clave y etiquetas',
    ctaHeading: '¿Te interesa este libro?',
    ctaDesc:
      'Consulta opiniones de lectores o adquiere la edición impresa o digital en Amazon.',
    relatedHeading: 'Más libros recomendados',
    affiliateBadgeNotice: '* Como Afiliado de Amazon, obtengo ingresos por las compras adscritas.',
    legalHeading: 'Aviso sobre enlaces de afiliados y transparencia',
    legalBody:
      '* En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables. Los enlaces marcados con un asterisco (*) son enlaces de afiliados: el precio para ti no cambia, y nos ayudan a mantener esta plataforma educativa gratuita.',
    modalNewBadge: 'Nuevo',
    modalTeacherLabel: 'Recomendación docente',
    modalCloseAria: 'Cerrar aviso',
    modalTitle: 'Libros recomendados para geografía, historia y educación',
    modalBody:
      'Estimado/a docente, hemos preparado una biblioteca recomendada en español sobre geopolítica, biología, historia estadounidense y neuroeducación con guías prácticas.',
    modalHighlight1Title: 'Geografía y Geopolítica:',
    modalHighlight1Desc: 'Claves para entender las fronteras y regiones del mundo.',
    modalHighlight2Title: 'Historia y Naturaleza:',
    modalHighlight2Desc: 'Obras fundamentales sobre Estados Unidos, biología y ecología.',
    modalHighlight3Title: 'Neuroeducación:',
    modalHighlight3Desc: 'Cómo aprenden mejor nuestros estudiantes mediante la curiosidad.',
    modalLaterBtn: 'Ver más tarde',
    modalGoBtn: 'Ir a los libros ➔',
    homeBannerTitle: 'Libros recomendados: Geografía, Historia, Naturaleza y Educación',
    homeBannerDesc:
      'Selección editorial de lecturas esenciales para ampliar conocimientos y preparar clases.',
    homeBannerBtn: 'Ver libros',
  },
  it: {
    breadcrumbHome: 'Home',
    breadcrumbBooks: 'Libri consigliati',
    pageTitle: 'Libri consigliati: Geografia, Geopolitica, Natura e Scuola',
    pageDesc:
      'Letture selezionate in linea con i percorsi di About the World: geografia, conflitto mediorientale, storia degli Stati Uniti, botanica, biologia e didattica.',
    pageNote:
      'Selezionati con sintesi originali, consigli didattici e link diretti alle edizioni italiane.',
    searchPlaceholder: 'Cerca titolo, autore o parola chiave (es. mappe, piante, USA)...',
    searchAriaLabel: 'Cerca tra i libri consigliati',
    clearSearchAria: 'Cancella ricerca',
    resultsCount: (c) => `${c} ${c === 1 ? 'libro consigliato' : 'libri consigliati'}`,
    allTopics: 'Tutti gli argomenti',
    emptyTitle: 'Nessun libro trovato',
    emptyDesc:
      'Nessun titolo corrisponde ai criteri selezionati. Prova con un altro termine o reimposta i filtri.',
    resetFilterBtn: 'Reimposta filtri',
    praxisTipLabel: 'Consiglio di lettura e classe',
    authorPrefix: 'Di',
    detailAuthorPrefix: 'Autore:',
    readMoreLabel: 'Leggi la scheda ➔',
    amazonBtnShort: 'Su Amazon *',
    amazonBtnLong: 'Vedi su Amazon *',
    amazonDeBtnShort: 'Su Amazon.de *',
    amazonBtnTitle: 'Vedi il libro su Amazon (link affiliato)',
    backToAllBooks: 'Torna a tutti i libri',
    publishedPrefix: 'Pubblicato nel',
    pagesSuffix: 'pagine',
    recommendedForLabel: 'Consigliato per:',
    whyReadableHeading: 'Perché questo libro è fondamentale',
    summaryHeading: 'Contenuto e sintesi',
    topicsHeading: 'Temi principali e parole chiave',
    ctaHeading: 'Ti interessa questo libro?',
    ctaDesc:
      'Scopri le recensioni o ordina l’edizione cartacea o eBook su Amazon.',
    relatedHeading: 'Altri libri consigliati',
    affiliateBadgeNotice:
      '* In qualità di Affiliato Amazon io ricevo un guadagno dagli acquisti idonei.',
    legalHeading: 'Nota sui link di affiliazione e trasparenza',
    legalBody:
      '* In qualità di Affiliato Amazon io ricevo un guadagno dagli acquisti idonei. I collegamenti contrassegnati con un asterisco (*) sono link affiliati: per te il prezzo rimane invariato e contribuisci a sostenere gratuitamente questa piattaforma didattica.',
    modalNewBadge: 'Novità',
    modalTeacherLabel: 'Consiglio per docenti',
    modalCloseAria: 'Chiudi finestra',
    modalTitle: 'Libri consigliati per geografia, storia e didattica',
    modalBody:
      'Caro/a insegnante, abbiamo raccolto i migliori volumi in italiano su geopolitica, storia americana, biologia e pedagogia per approfondire i temi della piattaforma.',
    modalHighlight1Title: 'Geografia e Geopolitica:',
    modalHighlight1Desc: 'Mappe, confini mondiali e storia del Medio Oriente.',
    modalHighlight2Title: 'Storia USA e Natura:',
    modalHighlight2Desc: 'Testi di riferimento sugli Stati Uniti e sull’intelligenza vegetale.',
    modalHighlight3Title: 'Didattica e Neuroscienze:',
    modalHighlight3Desc: 'Metodi educativi da Maria Montessori alle neuroscienze moderne.',
    modalLaterBtn: 'Più tardi',
    modalGoBtn: 'Vai ai libri ➔',
    homeBannerTitle: 'Libri consigliati: Geografia, Geopolitica, Natura e Scuola',
    homeBannerDesc:
      'Letture selezionate per approfondire geografia, storia, scienze naturali e didattica.',
    homeBannerBtn: 'Scopri i libri',
  },
};

export const BUCH_TIPPS: BuchTipp[] = [
  // =========================================================================
  // DEUTSCH (de)
  // =========================================================================
  {
    id: 'de-die-macht-der-geographie',
    lang: 'de',
    title: 'Die Macht der Geographie',
    subtitle: 'Wie sich Weltpolitik anhand von 10 Karten erklären lässt',
    authorName: 'Tim Marshall',
    isbn: '9783423349079',
    publishYear: 2017,
    pages: 336,
    publisher: 'dtv',
    category: 'geopolitik-geschichte',
    summary:
      'Warum verfolgen Staaten über Jahrhunderte hinweg ähnliche geopolitische Strategien, unabhängig von wechselnden Regierungen? Der britische Journalist Tim Marshall zeigt anhand von zehn Regionen – von Russland, China und den USA bis zum Nahen Osten und Afrika –, wie Gebirge, Flüsse, Ebenen und Zugänge zu den Weltmeeren das Handeln der Staaten prägen.\n\nDas Buch verbindet physische Geographie direkt mit aktueller Weltpolitik und macht abstrakte Konfliktherde anhand anschaulicher Kartenbetrachtungen leicht greifbar.',
    whyRecommended:
      'Der perfekte Begleiter für unsere Themen „Geographie“ und „Länder der Erde“. Schüler und Lehrkräfte gewinnen sofort ein tiefes Verständnis dafür, warum Landesgrenzen und Topographie historische Entwicklungen bestimmen.',
    targetAudience: 'Lehrkräfte (Geographie & Politik), Oberstufe, Studierende & Weltpolitik-Interessierte',
    topics: ['Geopolitik', 'Weltkarten', 'Topographie', 'Weltregionen', 'Staatsgrenzen'],
  },
  {
    id: 'de-macht-der-geographie-21-jahrhundert',
    lang: 'de',
    title: 'Die Macht der Geographie im 21. Jahrhundert',
    subtitle: '10 neue Karten erklären unsere Welt von heute und morgen',
    authorName: 'Tim Marshall',
    isbn: '9783423282901',
    publishYear: 2021,
    pages: 416,
    publisher: 'dtv',
    category: 'geopolitik-geschichte',
    summary:
      'In der konsequenten Fortsetzung seines Bestsellers widmet sich Tim Marshall zehn aufstrebenden Regionen und Zukunftsarenen: Australien, Iran, Saudi-Arabien, Großbritannien, Griechenland, Türkei, Sahelzone, Äthiopien, Spanien sowie dem Weltraum als neuer geopolitischer Sphäre.\n\nAnschaulich erklärt er Wasserstreitigkeiten am Nil, Rohstoffkorridore in der Sahelzone und die strategische Lage zwischen Mittelmeer und Pazifik.',
    whyRecommended:
      'Ideal zur Vertiefung aktueller geopolitischer Brennpunkte in Ozeanien, Afrika und dem Nahen Osten – hervorragend nutzbar für Referate und Projektunterricht.',
    targetAudience: 'Geographie- und Geschichtslehrkräfte, Sekundarstufe II & allgemeinbildende Leser',
    topics: ['Geopolitik', 'Sahelzone', 'Naher Osten', 'Australien', 'Weltraum'],
  },
  {
    id: 'de-der-nahostkonflikt-asseburg',
    lang: 'de',
    title: 'Der Nahostkonflikt',
    subtitle: 'Geschichte, Positionen, Perspektiven',
    authorName: 'Muriel Asseburg, Jan Busse',
    isbn: '9783406793059',
    publishYear: 2023,
    pages: 144,
    publisher: 'C.H.Beck',
    category: 'geopolitik-geschichte',
    summary:
      'Auf kompaktem Raum ordnen die Nahostexpertin Muriel Asseburg und der Politikwissenschaftler Jan Busse den israelisch-palästinensischen Konflikt historisch und politisch ein. Das Buch rekonstruiert die Ereignisse vom Ende des Osmanischen Reiches über die Teilung 1947 und die Kriege 1948, 1967 und 1973 bis zur Gegenwart.\n\nSachlich und ausgewogen werden zentrale Streitpunkte wie Jerusalem, Siedlungsbau, Sicherheitsinteressen und Flüchtlingsfragen aus beiden Perspektiven beleuchtet.',
    whyRecommended:
      'Das kompakte deutschsprachige Standardwerk zur direkten Ergänzung unseres Dossiers „Der Nahostkonflikt“. Neutrale Faktenbasis für den Politik- und Geschichtsunterricht.',
    targetAudience: 'Lehrkräfte (Geschichte/Politik), Oberstufe & interessierte Leser',
    topics: ['Nahostkonflikt', 'Israel', 'Palästina', 'Geschichte', 'Friedensprozess'],
  },
  {
    id: 'de-wem-gehoert-das-heilige-land',
    lang: 'de',
    title: 'Wem gehört das Heilige Land?',
    subtitle: 'Die Wurzeln des Streits zwischen Juden und Arabern',
    authorName: 'Michael Wolffsohn',
    isbn: '9783570100189',
    publishYear: 2018,
    pages: 480,
    publisher: 'C. Bertelsmann',
    category: 'geopolitik-geschichte',
    summary:
      'Der Historiker Michael Wolffsohn analysiert die tiefen historischen, religiösen und völkerrechtlichen Wurzeln des Nahostkonflikts. Dabei zeigt er, wie unterschiedliche historische Narrative über Rechtmäßigkeit, Vertreibung, Sicherheit und Heimat bis heute das politische Handeln bestimmen.\n\nDurch zahlreiche Karten und Zeittafeln bietet das Buch eine präzise Grundlage zum Verständnis langfristiger Konfliktlinien.',
    whyRecommended:
      'Bietet eine tiefgehende historische Perspektive auf das Verhältnis zwischen jüdischer und arabischer Geschichte – sehr hilfreich für quellenkritische Unterrichtsreihen.',
    targetAudience: 'Geschichtslehrkräfte, Studierende & historisch Interessierte',
    topics: ['Heiliges Land', 'Geschichte', 'Naher Osten', 'Religionen', 'Völkerrecht'],
  },
  {
    id: 'de-atlas-der-abgelegenen-inseln',
    lang: 'de',
    title: 'Atlas der abgelegenen Inseln',
    subtitle: 'Fünfzig Inseln, auf denen ich nie war und niemals sein werde',
    authorName: 'Judith Schalansky',
    isbn: '9783596190126',
    publishYear: 2011,
    pages: 144,
    publisher: 'Fischer Taschenbuch',
    category: 'geographie-weltwissen',
    summary:
      'Fünfzig entlegene Inseln aus allen fünf Ozeanen werden jeweils mit einer präzisen kartographischen Zeichnung, geographischen Koordinaten, Fläche, Einwohnerzahl und einer literarischen Miniatur über Entdecker, Schiffbrüchige oder Vulkaninseln vorgestellt.\n\nEin poetischer und zugleich faktenreicher Zugang zu den entlegensten Winkeln des Globus.',
    whyRecommended:
      'Verbindet Geographie und Kartenkunde mit fesselnden Geschichten – weckt sofort Entdeckergeist vor oder nach dem Landkarten-Quiz.',
    targetAudience: 'Kartenfans, Geographie- und Deutschlehrkräfte sowie Jugendliche ab 14 Jahren',
    topics: ['Inseln', 'Kartographie', 'Ozeane', 'Weltatlas', 'Koordinaten'],
  },
  {
    id: 'de-laender-der-welt-dk',
    lang: 'de',
    title: 'Länder der Welt',
    subtitle: 'Alle Staaten und Kulturen unserer Erde im großen Porträt',
    authorName: 'DK Verlag',
    isbn: '9783831040292',
    publishYear: 2020,
    pages: 440,
    publisher: 'Dorling Kindersley',
    category: 'geographie-weltwissen',
    summary:
      'Dieser großformatige Bildband porträtiert sämtliche anerkannte Staaten der Erde nach Kontinenten geordnet. Jedes Land wird mit physischer Karte, Flagge, den wichtigsten Eckdaten zu Hauptstadt, Bevölkerung und Sprache sowie kulturellen Besonderheiten vorgestellt.\n\nInfografiken und Fotografien veranschaulichen Klima, Landschaftsformen und Lebensweisen weltweit.',
    whyRecommended:
      'Die gedruckte Ergänzung zur Rubrik „Länder der Erde“ und zum Flaggenquiz – ideal als Nachschlagewerk für Klassenräume und Familien.',
    targetAudience: 'Schülerinnen und Schüler, Familien, Schulbibliotheken & Quizbegeisterte',
    topics: ['Länder der Erde', 'Flaggen', 'Hauptstädte', 'Kontinente', 'Nachschlagewerk'],
  },
  {
    id: 'de-eine-kurze-geschichte-der-menschheit',
    lang: 'de',
    title: 'Eine kurze Geschichte der Menschheit',
    subtitle: 'Vom Homo sapiens bis ins 21. Jahrhundert',
    authorName: 'Yuval Noah Harari',
    isbn: '9783570552698',
    publishYear: 2015,
    pages: 528,
    publisher: 'Pantheon',
    category: 'geographie-weltwissen',
    summary:
      'Wie gelang es dem Homo sapiens, sich über alle Kontinente auszubreiten, gewaltige Imperien zu errichten und die Welt bis heute zu formen? Yuval Noah Harari führt entlang der kognitiven, landwirtschaftlichen und wissenschaftlichen Revolution durch die gesamte Globalgeschichte.\n\nDabei schlägt er mühelos Brücken zwischen Biologie, Geographie, Kulturgeschichte und Wirtschaft.',
    whyRecommended:
      'Fördert das fächerübergreifende Denken zwischen Geographie, Biologie und Geschichte und regt spannende Klassendiskussionen an.',
    targetAudience: 'Oberstufe, Studierende, Lehrkräfte & Allgemeinbildungs-Interessierte',
    topics: ['Weltgeschichte', 'Evolution', 'Globalisierung', 'Gesellschaft', 'Anthropologie'],
  },
  {
    id: 'de-diese-wahrheiten-usa',
    lang: 'de',
    title: 'Diese Wahrheiten',
    subtitle: 'Eine Geschichte der Vereinigten Staaten von Amerika',
    authorName: 'Jill Lepore',
    isbn: '9783406739880',
    publishYear: 2019,
    pages: 1086,
    publisher: 'C.H.Beck',
    category: 'usa-politik',
    summary:
      'Die Harvard-Historikerin Jill Lepore erzählt die Geschichte der USA von den ersten Begegnungen um 1492 bis in die Gegenwart als fortlaufenden Prüfstand amerikanischer Gründungsideale: politische Gleichheit, Rechtsstaatlichkeit und Volkssouveränität.\n\nLebendig schildert sie die Rolle der US-Präsidenten, Verfassungskonflikte, Bürgerrechtsbewegungen und technologische Umbrüche.',
    whyRecommended:
      'Das große moderne Standardwerk zur amerikanischen Geschichte – ideal zur Vertiefung unserer Bereiche „Präsidenten der USA“ und „US-Bundesstaaten“.',
    targetAudience: 'Geschichts- und Englischlehrkräfte, Sekundarstufe II & USA-Interessierte',
    topics: ['USA', 'US-Geschichte', 'Verfassung', 'Demokratie', 'US-Präsidenten'],
  },
  {
    id: 'de-die-praesidenten-der-usa',
    lang: 'de',
    title: 'Die Präsidenten der USA',
    subtitle: '46 historische Portraits von George Washington bis Joe Biden',
    authorName: 'Jürgen Heideking, Christof Mauch (Hrsg.)',
    isbn: '9783406767333',
    publishYear: 2021,
    pages: 560,
    publisher: 'C.H.Beck',
    category: 'usa-politik',
    summary:
      'Renommierte Historikerinnen und Historiker zeichnen präzise politische Biographien sämtlicher US-Präsidenten. Jedes Porträt beleuchtet Herkunft, Wahlkampf, innen- wie außenpolitische Entscheidungen und die langfristige historische Einordnung.\n\nEin umfassender Anhang erläutert zudem das amerikanische Wahlsystem und zentrale Verfassungsorgane.',
    whyRecommended:
      'Das perfekte Nachschlagewerk passend zu unserer interaktiven Präsidenten-Chronologie und dem Thema US-Wahlsystem.',
    targetAudience: 'Lehrkräfte (Geschichte/Politik), Schüler für Referate & politisch Interessierte',
    topics: ['US-Präsidenten', 'Biographien', 'Weißes Haus', 'Wahlsystem', 'Zeitgeschichte'],
  },
  {
    id: 'de-das-geheime-leben-der-baeume',
    lang: 'de',
    title: 'Das geheime Leben der Bäume',
    subtitle: 'Was sie fühlen, wie sie kommunizieren – die Entdeckung einer verborgenen Welt',
    authorName: 'Peter Wohlleben',
    isbn: '9783453280670',
    publishYear: 2015,
    pages: 224,
    publisher: 'Ludwig',
    category: 'biologie-natur',
    summary:
      'Der Förster Peter Wohlleben zeigt, dass ein Wald weit mehr ist als eine Ansammlung einzelner Bäume. Über Duftstoffe und unterirdische Pilznetzwerke tauschen Bäume Nährstoffe aus, warnen Nachbarbäume vor Schädlingen und versorgen schwächere Artgenossen.\n\nMit leicht verständlicher Sprache macht das Buch komplexe ökologische Zusammenhänge unmittelbar erlebbar.',
    whyRecommended:
      'Tolle Ergänzung für unseren Bereich Biologie & Pflanzen: Begeistert junge Lernende für Botanik, Waldökosysteme und Artenvielfalt.',
    targetAudience: 'Biologielehrkräfte, Schüler, Naturfreunde & Familien',
    topics: ['Biologie', 'Bäume', 'Ökosystem Wald', 'Botanik', 'Naturschutz'],
  },
  {
    id: 'de-was-blueht-denn-da',
    lang: 'de',
    title: 'Was blüht denn da?',
    subtitle: 'Der Klassiker – über 870 wildwachsende Blütenpflanzen sicher bestimmen',
    authorName: 'Margot Spohn, Dietmar Aichele',
    isbn: '9783440170731',
    publishYear: 2021,
    pages: 496,
    publisher: 'Kosmos',
    category: 'biologie-natur',
    summary:
      'Seit Generationen das verlässlichste Bestimmungsbuch für heimische Wildblumen, Kräuter und Sträucher. Durch die praktische Sortierung nach Blütenfarbe, Blütenform und Standort gelingt die sichere Artenbestimmung auch ohne botanisches Vorwissen.\n\nDetaillierte Farbzeichnungen heben die entscheidenden Erkennungsmerkmale hervor.',
    whyRecommended:
      'Die ideale analoge Ergänzung zu unserem interaktiven Pflanzen- und Biologie-Quiz für Exkursionen und Projektwochen.',
    targetAudience: 'Schulklassen, Biologielehrkräfte, Familien & Naturbeobachter',
    topics: ['Pflanzenbestimmung', 'Wildblumen', 'Botanik', 'Artenkenntnis', 'Exkursion'],
  },
  {
    id: 'de-wir-verlieren-unsere-kinder',
    lang: 'de',
    title: 'Wir verlieren unsere Kinder!',
    subtitle: 'Gewalt, Missbrauch, Rassismus – Der verstörende Alltag im Klassen-Chat',
    authorName: 'Silke Müller',
    isbn: '9783426278963',
    publishYear: 2023,
    pages: 240,
    publisher: 'Droemer',
    category: 'didaktik-schule',
    summary:
      'Schulleiterin Silke Müller gewährt einen ungeschönten Blick in die digitale Lebenswelt von Kindern und Jugendlichen zwischen Smartphone, Klassen-Chats und sozialen Medien. Anstatt digitale Geräte pauschal zu verbannen, plädiert sie für konsequente Medienbegleitung und klare Regeln.\n\nKonkrete Fallbeispiele und Leitfäden zeigen Wege für Schule und Elternhaus auf.',
    whyRecommended:
      'Pflichtlektüre für Lehrkräfte, Klassenleitungen und Elternabende zur digitalen Präventionsarbeit.',
    targetAudience: 'Lehrkräfte, Schulleitungen, Schulsozialarbeit & Eltern',
    topics: ['Medienerziehung', 'Klassen-Chat', 'Prävention', 'Smartphones', 'Schule'],
  },
  {
    id: 'de-warum-noch-lernen',
    lang: 'de',
    title: 'Warum noch lernen?',
    subtitle: 'Wie Schule in Zeiten von KI, Krisen und sozialer Ungerechtigkeit aussehen muss',
    authorName: 'Bob Blume',
    isbn: '9783442394234',
    publishYear: 2024,
    pages: 288,
    publisher: 'Mosaik',
    category: 'didaktik-schule',
    summary:
      'Der als Netzlehrer bekannte Gymnasiallehrer Bob Blume fragt, was Lernen wertvoll macht, wenn KI binnen Sekunden Texte und Lösungen generiert. Er entwirft ein lebendiges Bild moderner Bildung, in dem Urteilskraft, Neugier und echte Lebensrelevanz im Zentrum stehen.',
    whyRecommended:
      'Starker Denkanstoß für Fachkonferenzen zur Neugestaltung von Aufgabenformaten im digitalen Zeitalter.',
    targetAudience: 'Lehrkräfte aller Schulformen, Referendare & Schulentwickler',
    topics: ['Künstliche Intelligenz', 'Didaktik', 'Schulentwicklung', 'Lernmotivation'],
  },
  {
    id: 'de-effektiv-unterrichten-ki',
    lang: 'de',
    title: 'Effektiv unterrichten mit Künstlicher Intelligenz',
    subtitle: 'Wie Lehrkräfte und Lernende ChatGPT und andere KI-Tools sinnvoll nutzen',
    authorName: 'Joscha Falck',
    isbn: '9783403211839',
    publishYear: 2023,
    pages: 96,
    publisher: 'Persen',
    category: 'didaktik-schule',
    summary:
      'Ein kompakter Praxisleitfaden für den sofortigen Einsatz im Unterricht: Von der Materialdifferenzierung für heterogene Lerngruppen bis zum kritischen Hinterfragen von KI-Antworten im Klassenzimmer.',
    whyRecommended:
      'Kurz, konkret und direkt umsetzbar – spart wertvolle Zeit bei der Unterrichtsvorbereitung.',
    targetAudience: 'Lehrkräfte der Sekundarstufe I & II sowie Quereinsteiger',
    topics: ['ChatGPT', 'Prompting', 'Differenzierung', 'Unterrichtsvorbereitung'],
  },
  {
    id: 'de-einfuehrung-mediendidaktik',
    lang: 'de',
    title: 'Einführung in die Mediendidaktik',
    subtitle: 'Lehren und Lernen mit digitalen Medien',
    authorName: 'Dominik Petko',
    isbn: '9783407256782',
    publishYear: 2020,
    pages: 208,
    publisher: 'Beltz',
    category: 'didaktik-schule',
    summary:
      'Prof. Dr. Dominik Petko erklärt die wissenschaftlichen Grundlagen erfolgreichen digitalen Lernens – vom SAMR-Modell über kognitive Belastungstheorien bis zur Einbindung interaktiver Lernmodule wie H5P im Fachunterricht.',
    whyRecommended:
      'Das Standardwerk für alle, die digitale Quizze und interaktive Übungen didaktisch fundiert im Unterricht einsetzen wollen.',
    targetAudience: 'Lehramtsstudierende, Referendare, Fachseminare & Lehrkräfte',
    topics: ['Mediendidaktik', 'SAMR-Modell', 'Interaktives Lernen', 'Digitaler Unterricht'],
  },

  // =========================================================================
  // ENGLISH (en)
  // =========================================================================
  {
    id: 'en-prisoners-of-geography',
    lang: 'en',
    title: 'Prisoners of Geography',
    subtitle: 'Ten Maps That Tell You Everything You Need to Know About Global Politics',
    authorName: 'Tim Marshall',
    isbn: '9781783962433',
    publishYear: 2016,
    pages: 320,
    publisher: 'Elliott & Thompson',
    category: 'geopolitik-geschichte',
    summary:
      'All leaders are constrained by geography. Their choices are limited by mountains, rivers, seas, and concrete. Looking at Russia, China, the US, Latin America, the Middle East, Africa, and Europe, Tim Marshall explains how physical geography shapes national strategy and historical conflict.\n\nAccessible, witty, and richly informative, it bridges physical maps with modern international relations.',
    whyRecommended:
      'An ideal companion to our Geography and Map Quiz sections—helping students see why borders, rivers, and mountain ranges drive world history.',
    targetAudience: 'Geography & politics teachers, high school students, and global affairs readers',
    topics: ['Geopolitics', 'Maps', 'Borders', 'International Relations', 'Topography'],
  },
  {
    id: 'en-the-power-of-geography',
    lang: 'en',
    title: 'The Power of Geography',
    subtitle: 'Ten Maps That Reveal the Future of Our World',
    authorName: 'Tim Marshall',
    isbn: '9781783966028',
    publishYear: 2021,
    pages: 416,
    publisher: 'Elliott & Thompson',
    category: 'geopolitik-geschichte',
    summary:
      'Focusing on ten pivotal regions set to shape the twenty-first century—including Australia, Iran, Saudi Arabia, the UK, Greece, Turkey, the Sahel, Ethiopia, Spain, and outer space—Marshall reveals how terrain, climate, and maritime chokepoints continue to govern global dynamics.',
    whyRecommended:
      'Great for classroom debates on resource corridors, climate pressure in the Sahel, and rising regional powers.',
    targetAudience: 'Educators, AP Human Geography students & curious readers',
    topics: ['21st Century', 'Geopolitics', 'Sahel', 'Middle East', 'Space'],
  },
  {
    id: 'en-hundred-years-war-on-palestine',
    lang: 'en',
    title: "The Hundred Years' War on Palestine",
    subtitle: 'A History of Settler Colonialism and Resistance, 1917–2017',
    authorName: 'Rashid Khalidi',
    isbn: '9781250787651',
    publishYear: 2021,
    pages: 368,
    publisher: 'Metropolitan Books',
    category: 'geopolitik-geschichte',
    summary:
      'Columbia University historian Rashid Khalidi traces a century of conflict in the Middle East from the 1917 Balfour Declaration and the 1948 war through the 1967 occupation, Lebanon, the Intifadas, and the Oslo process.\n\nBlending archival scholarship with family papers, he presents a clear historical perspective essential for understanding Palestinian political history.',
    whyRecommended:
      'Essential comparative reading alongside our Middle East Conflict dossier, especially for university-prep history and critical source analysis.',
    targetAudience: 'History teachers, university students & advanced high school classes',
    topics: ['Middle East', 'Palestine', 'Israel', 'Modern History', 'Balfour Declaration'],
  },
  {
    id: 'en-righteous-victims',
    lang: 'en',
    title: 'Righteous Victims',
    subtitle: 'A History of the Zionist-Arab Conflict, 1881–2001',
    authorName: 'Benny Morris',
    isbn: '9780679744757',
    publishYear: 2001,
    pages: 784,
    publisher: 'Vintage Books',
    category: 'geopolitik-geschichte',
    summary:
      'Renowned Israeli historian Benny Morris offers a richly documented, deeply detailed historical narrative of the Arab-Israeli conflict from the late nineteenth century through the major wars of 1948, 1956, 1967, and 1973 to the Camp David and Oslo eras.\n\nDrawing on diplomatic archives, the work examines the motivations, fears, and decisions of both sides.',
    whyRecommended:
      'Widely cited as a benchmark historical reference—pairs well with multiple viewpoints to give students balanced historical context.',
    targetAudience: 'Historians, AP World History educators & serious readers',
    topics: ['Arab-Israeli Conflict', 'Israel', 'Zionism', 'Diplomatic History', 'Wars'],
  },
  {
    id: 'en-factfulness',
    lang: 'en',
    title: 'Factfulness',
    subtitle: 'Ten Reasons We’re Wrong About the World – and Why Things Are Better Than You Think',
    authorName: 'Hans Rosling, Ola Rosling, Anna Rosling Rönnlund',
    isbn: '9781250123824',
    publishYear: 2018,
    pages: 352,
    publisher: 'Flatiron Books',
    category: 'geographie-weltwissen',
    summary:
      'When asked simple questions about global trends—literacy, poverty, vaccination rates, life expectancy—most people score worse than chimpanzees guessing at random. Physician and statistician Hans Rosling reveals ten cognitive instincts that distort our view of the planet.\n\nUsing clear data visualizations, he replaces outdated stereotypes of "developing vs. developed" with a fact-based four-level income framework.',
    whyRecommended:
      'Transforms how students read global statistics and country profiles—a brilliant starting point for lessons using our World Countries section.',
    targetAudience: 'Teachers, students, data literacy classes & general readers',
    topics: ['Global Data', 'Demographics', 'World Countries', 'Critical Thinking', 'Statistics'],
  },
  {
    id: 'en-guns-germs-and-steel',
    lang: 'en',
    title: 'Guns, Germs, and Steel',
    subtitle: 'The Fates of Human Societies',
    authorName: 'Jared Diamond',
    isbn: '9780393354324',
    publishYear: 2017,
    pages: 528,
    publisher: 'W. W. Norton & Company',
    category: 'geographie-weltwissen',
    summary:
      'Why did human civilizations develop at drastically different speeds across continents? Pulitzer Prize winner Jared Diamond argues that geographic factors—the east-west axis of Eurasia, availability of domesticable plants and animals, and ecological barriers—shaped agriculture, technology, and immunity over 13,000 years.',
    whyRecommended:
      'Connects physical geography, biology, and world history in a landmark interdisciplinary synthesis.',
    targetAudience: 'AP World History & Geography students, teachers & lifelong learners',
    topics: ['World History', 'Geography', 'Continents', 'Agriculture', 'Civilizations'],
  },
  {
    id: 'en-sapiens',
    lang: 'en',
    title: 'Sapiens: A Brief History of Humankind',
    subtitle: 'From Animals into Gods',
    authorName: 'Yuval Noah Harari',
    isbn: '9780062316097',
    publishYear: 2015,
    pages: 464,
    publisher: 'Harper',
    category: 'geographie-weltwissen',
    summary:
      'From foraging bands 70,000 years ago to modern global networks, Yuval Noah Harari traces how shared myths, money, empires, and science enabled Homo sapiens to reshape every ecosystem on Earth.',
    whyRecommended:
      'Sparks big-picture thinking across geography, biology, and cultural history.',
    targetAudience: 'High school, college students & curious minds',
    topics: ['Human History', 'Evolution', 'Empires', 'Science', 'Culture'],
  },
  {
    id: 'en-these-truths',
    lang: 'en',
    title: 'These Truths',
    subtitle: 'A History of the United States',
    authorName: 'Jill Lepore',
    isbn: '9780393357424',
    publishYear: 2019,
    pages: 960,
    publisher: 'W. W. Norton & Company',
    category: 'usa-politik',
    summary:
      'In a sweeping single-volume history, Harvard professor Jill Lepore examines the American experiment—founded on political equality, natural rights, and the sovereignty of the people—through five centuries of presidents, constitutional debates, civil rights struggles, and media revolutions.',
    whyRecommended:
      'Pairs seamlessly with our US Presidents and US States modules, offering rich narrative context for every era from the Founding Fathers to the 21st century.',
    targetAudience: 'US History teachers, AP US History students & civic education readers',
    topics: ['United States', 'US Presidents', 'Constitution', 'Democracy', 'Civil Rights'],
  },
  {
    id: 'en-team-of-rivals',
    lang: 'en',
    title: 'Team of Rivals',
    subtitle: 'The Political Genius of Abraham Lincoln',
    authorName: 'Doris Kearns Goodwin',
    isbn: '9780743270755',
    publishYear: 2006,
    pages: 944,
    publisher: 'Simon & Schuster',
    category: 'usa-politik',
    summary:
      'Pulitzer Prize-winning historian Doris Kearns Goodwin explores how Abraham Lincoln won the 1860 election and boldly appointed his chief political rivals to his wartime cabinet, forging unity through empathy, persuasion, and constitutional resolve during the American Civil War.',
    whyRecommended:
      'A masterclass in presidential leadership and American Civil War history—great background for our Civil War era module.',
    targetAudience: 'History educators, leadership readers & US history enthusiasts',
    topics: ['Abraham Lincoln', 'US Presidents', 'Civil War', 'Leadership', 'American Politics'],
  },
  {
    id: 'en-hidden-life-of-trees',
    lang: 'en',
    title: 'The Hidden Life of Trees',
    subtitle: 'What They Feel, How They Communicate—Discoveries from a Secret World',
    authorName: 'Peter Wohlleben',
    isbn: '9781771642484',
    publishYear: 2016,
    pages: 288,
    publisher: 'Greystone Books',
    category: 'biologie-natur',
    summary:
      'Drawing on decades as a forester and botanical research, Peter Wohlleben reveals how trees operate as social communities—warning neighbors of insect threats via airborne scents and sharing nutrients through underground fungal networks.',
    whyRecommended:
      'Brings plant biology and forest ecology alive for learners using our Biology section and Species Quizzes.',
    targetAudience: 'Biology teachers, students & nature lovers',
    topics: ['Botany', 'Forest Ecology', 'Biology', 'Trees', 'Nature'],
  },
  {
    id: 'en-a-life-on-our-planet',
    lang: 'en',
    title: 'A Life on Our Planet',
    subtitle: 'My Witness Statement and a Vision for the Future',
    authorName: 'David Attenborough',
    isbn: '9781529108279',
    publishYear: 2020,
    pages: 272,
    publisher: 'Ebury Press',
    category: 'biologie-natur',
    summary:
      'Sir David Attenborough reflects on more than sixty years documenting Earth’s wildlife, chronicling the steep decline in global biodiversity alongside actionable, hopeful solutions—rewilding, renewable energy, and sustainable oceans—to restore ecological balance.',
    whyRecommended:
      'Inspires environmental stewardship while reinforcing key concepts of biodiversity and animal conservation.',
    targetAudience: 'Biology & geography classrooms, conservationists & families',
    topics: ['Biodiversity', 'Climate', 'Wildlife', 'Conservation', 'Sustainability'],
  },
  {
    id: 'en-brave-new-words',
    lang: 'en',
    title: 'Brave New Words',
    subtitle: 'How AI Will Revolutionize Education (and Why That’s a Good Thing)',
    authorName: 'Salman Khan',
    isbn: '9780593656952',
    publishYear: 2024,
    pages: 272,
    publisher: 'Viking',
    category: 'didaktik-schule',
    summary:
      'Khan Academy founder Salman Khan presents a grounded roadmap for integrating AI tutors and adaptive exercises into schools. Rather than replacing teachers or enabling shortcuts, well-designed AI tools can provide personalized Socratic guidance while freeing educators for human mentorship.',
    whyRecommended:
      'Essential perspective for teachers and parents exploring interactive exercises and AI-assisted study habits.',
    targetAudience: 'Educators, ed-tech coordinators, school leaders & parents',
    topics: ['AI in Education', 'Interactive Learning', 'Pedagogy', 'EdTech', 'Tutoring'],
  },
  {
    id: 'en-the-anxious-generation',
    lang: 'en',
    title: 'The Anxious Generation',
    subtitle: 'How the Great Rewiring of Childhood Is Causing an Epidemic of Mental Illness',
    authorName: 'Jonathan Haidt',
    isbn: '9780593655030',
    publishYear: 2024,
    pages: 400,
    publisher: 'Penguin Press',
    category: 'didaktik-schule',
    summary:
      'Social psychologist Jonathan Haidt investigates the shift from play-based childhood to phone-based adolescence, explaining how social media algorithms affect attention, sleep, and youth wellbeing—and outlining practical norms for phone-free schools and healthy digital balance.',
    whyRecommended:
      'Vital reading for school communities building healthy boundaries around smartphones and purposeful digital learning.',
    targetAudience: 'Teachers, school principals, counselors & parents',
    topics: ['Digital Wellbeing', 'Youth Mental Health', 'Schools', 'Smartphones', 'Social Media'],
  },

  // =========================================================================
  // FRANÇAIS (fr)
  // =========================================================================
  {
    id: 'fr-dessous-des-cartes-atlas',
    lang: 'fr',
    title: 'Le Dessous des cartes : Atlas géopolitique',
    subtitle: 'Comprendre le monde contemporain par les cartes',
    authorName: 'Jean-Christophe Victor, Virginie Raisson, Frank Tétart',
    isbn: '9782847342345',
    publishYear: 2005,
    pages: 252,
    publisher: 'Tallandier / Arte Éditions',
    category: 'geopolitik-geschichte',
    summary:
      'Adapté de la célèbre émission d’Arte, cet atlas géopolitique propose une lecture claire et rigoureuse des grands équilibres mondiaux à travers des cartes originales, des données démographiques, énergétiques et stratégiques.\n\nChaque dossier décrypte les tensions régionales, les routes maritimes et les mutations environnementales.',
    whyRecommended:
      'Une référence absolue en langue française pour relier la cartographie interactive aux grands enjeux géopolitiques abordés sur About the World.',
    targetAudience: 'Enseignants d’histoire-géographie, lycéens, étudiants & curieux',
    topics: ['Géopolitique', 'Cartographie', 'Atlas', 'Relations internationales', 'Démographie'],
  },
  {
    id: 'fr-dessous-des-cartes-itineraires',
    lang: 'fr',
    title: 'Le Dessous des cartes : Itinéraires géopolitiques',
    subtitle: 'Nouvelles analyses cartographiques du monde',
    authorName: 'Jean-Christophe Victor, Virginie Raisson, Frank Tétart',
    isbn: '9782847344660',
    publishYear: 2007,
    pages: 224,
    publisher: 'Tallandier / Arte Éditions',
    category: 'geopolitik-geschichte',
    summary:
      'Ce deuxième volume approfondit la méthode cartographique du « Dessous des cartes » en explorant des régions clés comme l’Asie centrale, l’Arctique, le Proche-Orient et les nouveaux réseaux commerciaux mondiaux.\n\nLes projections variées rappellent qu’aucune carte n’est neutre et apprennent à lire l’espace avec esprit critique.',
    whyRecommended:
      'Idéal pour entraîner les élèves à la lecture critique des cartes et à la compréhension des continents.',
    targetAudience: 'Professeurs de géographie, élèves du secondaire & passionnés de cartes',
    topics: ['Géographie', 'Cartes critiques', 'Frontières', 'Continents', 'Énergie'],
  },
  {
    id: 'fr-israel-palestine-alain-gresh',
    lang: 'fr',
    title: 'Israël, Palestine : Vérités sur un conflit',
    subtitle: 'Aux racines historiques d’une crise majeure',
    authorName: 'Alain Gresh',
    isbn: '9782818505403',
    publishYear: 2017,
    pages: 336,
    publisher: 'Pluriel / Fayard',
    category: 'geopolitik-geschichte',
    summary:
      'Journaliste spécialiste du Moyen-Orient, Alain Gresh retrace les étapes décisives du conflit israélo-palestinien : du mandat britannique et du plan de partage de 1947 aux guerres de 1948 et 1967, jusqu’aux impasses des accords d’Oslo.\n\nL’ouvrage démêle les questions de frontières, de Jérusalem, des colonies et du droit international.',
    whyRecommended:
      'Un guide historique structuré en français pour accompagner efficacement notre dossier interactif sur le conflit au Proche-Orient.',
    targetAudience: 'Enseignants d’histoire, étudiants en sciences politiques & lecteurs avertis',
    topics: ['Proche-Orient', 'Israël', 'Palestine', 'Oslo', 'Histoire contemporaine'],
  },
  {
    id: 'fr-geopolitique-de-lemotion',
    lang: 'fr',
    title: 'La Géopolitique de l’émotion',
    subtitle: 'Comment les cultures de peur, d’humiliation et d’espoir façonnent le monde',
    authorName: 'Dominique Moïsi',
    isbn: '9782081226470',
    publishYear: 2009,
    pages: 270,
    publisher: 'Flammarion',
    category: 'geopolitik-geschichte',
    summary:
      'Dominique Moïsi propose une grille d’analyse originale des relations internationales en étudiant le rôle des émotions collectives : l’espoir en Asie, la peur en Occident et l’humiliation au Moyen-Orient.\n\nIl montre comment l’histoire et la géographie nourrissent les perceptions politiques d’un continent à l’autre.',
    whyRecommended:
      'Enrichit les cours de géopolitique par une dimension culturelle et psychologique accessible.',
    targetAudience: 'Lycéens, étudiants, enseignants de sciences sociales',
    topics: ['Géopolitique', 'Cultures', 'Relations internationales', 'Moyen-Orient', 'Asie'],
  },
  {
    id: 'fr-sapiens',
    lang: 'fr',
    title: 'Sapiens : Une brève histoire de l’humanité',
    subtitle: 'De l’âge de pierre à la révolution scientifique',
    authorName: 'Yuval Noah Harari',
    isbn: '9782226257017',
    publishYear: 2015,
    pages: 512,
    publisher: 'Albin Michel',
    category: 'geographie-weltwissen',
    summary:
      'Comment notre espèce est-elle passée de petits groupes nomades en Afrique de l’Est au peuplement de tous les continents ? Yuval Noah Harari raconte l’histoire globale d’Homo sapiens à travers les révolutions cognitive, agricole et scientifique.',
    whyRecommended:
      'Une fresque captivante qui relie histoire mondiale, biologie évolutive et géographie humaine.',
    targetAudience: 'Lycéens, étudiants & grand public curieux',
    topics: ['Histoire mondiale', 'Évolution', 'Civilisations', 'Globalisation'],
  },
  {
    id: 'fr-inegalite-parmi-les-societes',
    lang: 'fr',
    title: 'De l’inégalité parmi les sociétés',
    subtitle: 'Essai sur l’homme et l’environnement dans l’histoire',
    authorName: 'Jared Diamond',
    isbn: '9782070347506',
    publishYear: 2007,
    pages: 768,
    publisher: 'Gallimard (Folio Essais)',
    category: 'geographie-weltwissen',
    summary:
      'Prix Pulitzer traduit dans le monde entier : Jared Diamond démontre pourquoi le climat, l’orientation des continents et les espèces animales ou végétales disponibles expliquent les écarts technologiques et historiques entre les régions du globe.',
    whyRecommended:
      'Démontre de façon brillante le lien fondamental entre géographie physique, botanique et destin des civilisations.',
    targetAudience: 'Professeurs d’histoire-géographie, classes préparatoires & étudiants',
    topics: ['Géographie humaine', 'Continents', 'Histoire', 'Environnement', 'Sociétés'],
  },
  {
    id: 'fr-histoire-de-tout',
    lang: 'fr',
    title: 'Une histoire de tout, ou presque...',
    subtitle: 'Voyage humoristique à travers les sciences de la Terre et de la vie',
    authorName: 'Bill Bryson',
    isbn: '9782228902182',
    publishYear: 2007,
    pages: 656,
    publisher: 'Payot',
    category: 'geographie-weltwissen',
    summary:
      'De la formation des océans et des plaques tectoniques à l’apparition de la vie et à la découverte des dinosaures, Bill Bryson rend les sciences de la Terre, la géologie et la biologie passionnantes grâce à des portraits hauts en couleur de chercheurs.',
    whyRecommended:
      'Parfait pour éveiller la curiosité sur les volcans, les séismes, les océans et les sciences naturelles.',
    targetAudience: 'Collégiens, lycéens, enseignants de SVT et géographie',
    topics: ['Sciences de la Terre', 'Tectonique', 'Biologie', 'Vulgarisation', 'Histoire des sciences'],
  },
  {
    id: 'fr-les-americains',
    lang: 'fr',
    title: 'Les Américains (Tome 1) : Naissance et essor des États-Unis',
    subtitle: 'De 1607 à 1945',
    authorName: 'André Kaspi',
    isbn: '9782757841549',
    publishYear: 2014,
    pages: 464,
    publisher: 'Points Histoire',
    category: 'usa-politik',
    summary:
      'Spécialiste reconnu des États-Unis, André Kaspi dresse un panorama clair de la construction américaine : des colonies anglaises et de la Constitution de 1787 à la conquête de l’Ouest, la guerre de Sécession et l’émergence comme première puissance mondiale.',
    whyRecommended:
      'Complément de référence en français pour explorer notre dossier sur les présidents des États-Unis et les 50 États américains.',
    targetAudience: 'Lycéens, étudiants en histoire/anglais & passionnés des États-Unis',
    topics: ['États-Unis', 'Histoire américaine', 'Présidents', 'Constitution', 'Guerre de Sécession'],
  },
  {
    id: 'fr-democratie-en-amerique',
    lang: 'fr',
    title: 'De la démocratie en Amérique',
    subtitle: 'Analyse classique du système politique américain',
    authorName: 'Alexis de Tocqueville',
    isbn: '9782070323548',
    publishYear: 1986,
    pages: 640,
    publisher: 'Gallimard (Folio Histoire)',
    category: 'usa-politik',
    summary:
      'Rédigé après son voyage aux États-Unis en 1831, le chef-d’œuvre d’Alexis de Tocqueville analyse le fédéralisme, l’équilibre des pouvoirs, le rôle des États fédérés et la vitalité de la démocratie américaine avec une lucidité restée d’actualité.',
    whyRecommended:
      'Un classique indispensable pour comprendre les institutions américaines et le fédéralisme des 50 États.',
    targetAudience: 'Classes de terminale, philosophie, histoire & sciences politiques',
    topics: ['Démocratie', 'Fédéralisme', 'États-Unis', 'Institutions', 'Philosophie politique'],
  },
  {
    id: 'fr-vie-secrete-des-arbres',
    lang: 'fr',
    title: 'La Vie secrète des arbres',
    subtitle: 'Ce qu’ils ressentent, comment ils communiquent',
    authorName: 'Peter Wohlleben',
    isbn: '9782352045939',
    publishYear: 2017,
    pages: 272,
    publisher: 'Les Arènes',
    category: 'biologie-natur',
    summary:
      'Forestier passionné, Peter Wohlleben dévoile les stratégies d’entraide et de communication des arbres en forêt grâce aux signaux chimiques et aux réseaux mycorhiziens souterrains.',
    whyRecommended:
      'Un best-seller accessible pour approfondir nos quiz de biologie et d’identification végétale.',
    targetAudience: 'Enseignants de SVT, familles & amoureux de la nature',
    topics: ['Botanique', 'Forêts', 'Écologie', 'Biologie végétale', 'Biodiversité'],
  },
  {
    id: 'fr-plaidoyer-pour-larbre',
    lang: 'fr',
    title: 'Plaidoyer pour l’arbre',
    subtitle: 'Le génie botanique des forêts tropicales et tempérées',
    authorName: 'Francis Hallé',
    isbn: '9782742757121',
    publishYear: 2005,
    pages: 212,
    publisher: 'Actes Sud',
    category: 'biologie-natur',
    summary:
      'Le grand botaniste français Francis Hallé célèbre la diversité architecturale, la longévité et le rôle vital des arbres dans le cycle du carbone, le climat mondial et le maintien de la biodiversité animale.',
    whyRecommended:
      'Allie rigueur scientifique et émerveillement botanique pour sensibiliser à la biologie et au climat.',
    targetAudience: 'Étudiants en biologie, enseignants & lecteurs écologistes',
    topics: ['Botanique', 'Arbres', 'Forêts tropicales', 'Biodiversité', 'Écologie'],
  },
  {
    id: 'fr-apprendre-dehaene',
    lang: 'fr',
    title: 'Apprendre !',
    subtitle: 'Les talents du cerveau, le défi des machines',
    authorName: 'Stanislas Dehaene',
    isbn: '9782738145420',
    publishYear: 2018,
    pages: 384,
    publisher: 'Odile Jacob',
    category: 'didaktik-schule',
    summary:
      'Le neuroscientifique Stanislas Dehaene identifie les quatre piliers de l’apprentissage humain : l’attention, l’engagement actif, le retour sur erreur et la consolidation. Il explique pourquoi des quiz interactifs fréquents avec correction immédiate démultiplient la mémorisation.',
    whyRecommended:
      'Explique scientifiquement l’efficacité pédagogique des quiz interactifs et exercices H5P d’About the World.',
    targetAudience: 'Enseignants, formateurs, parents & étudiants en sciences de l’éducation',
    topics: ['Neurosciences', 'Apprentissage', 'Mémoire', 'Pédagogie', 'Quiz interactifs'],
  },
  {
    id: 'fr-fabrique-du-cretin-digital',
    lang: 'fr',
    title: 'La Fabrique du crétin digital',
    subtitle: 'Les dangers des écrans pour nos enfants',
    authorName: 'Michel Desmurget',
    isbn: '9782021423310',
    publishYear: 2019,
    pages: 432,
    publisher: 'Seuil',
    category: 'didaktik-schule',
    summary:
      'Directeur de recherche à l’INSERM, Michel Desmurget synthétise les études scientifiques sur l’impact de la surexposition récréative aux écrans sur le langage, le sommeil et l’attention des jeunes, en distinguant nettement l’usage passif des outils éducatifs encadrés.',
    whyRecommended:
      'Utile aux équipes éducatives et aux parents pour instaurer un équilibre numérique sain.',
    targetAudience: 'Parents, chefs d’établissement, enseignants & professionnels de santé',
    topics: ['Éducation aux médias', 'Écrans', 'Attention', 'Développement cognitif'],
  },

  // =========================================================================
  // ESPAÑOL (es)
  // =========================================================================
  {
    id: 'es-la-venganza-de-la-geografia',
    lang: 'es',
    title: 'La venganza de la geografía',
    subtitle: 'Cómo los mapas condicionan el destino de las naciones',
    authorName: 'Robert D. Kaplan',
    isbn: '9788492921881',
    publishYear: 2013,
    pages: 480,
    publisher: 'RBA Libros',
    category: 'geopolitik-geschichte',
    summary:
      'Robert D. Kaplan demuestra que, a pesar de la tecnología moderna, las cordilleras, llanuras, desiertos y mares siguen dictando las posibilidades estratégicas de los Estados. El libro recorre Europa, Rusia, China, India, Oriente Medio y América Latina.\n\nUna lectura fundamental para entender los mapas políticos del mundo actual.',
    whyRecommended:
      'Ideal para contextualizar nuestros mapas interactivos y países del mundo dentro de la historia geopolítica.',
    targetAudience: 'Docentes de geografía e historia, universitarios y lectores de geopolítica',
    topics: ['Geopolítica', 'Mapas', 'Fronteras', 'Oriente Medio', 'Geoestrategia'],
  },
  {
    id: 'es-las-cruzadas-vistas-por-los-arabes',
    lang: 'es',
    title: 'Las cruzadas vistas por los árabes',
    subtitle: 'La otra perspectiva histórica sobre Oriente Próximo',
    authorName: 'Amin Maalouf',
    isbn: '9788420656861',
    publishYear: 2013,
    pages: 336,
    publisher: 'Alianza Editorial',
    category: 'geopolitik-geschichte',
    summary:
      'A partir de crónicas árabes de los siglos XI al XIII, Amin Maalouf reconstruye dos siglos de enfrentamientos y contactos culturales en el Mediterráneo oriental. Su enfoque permite comprender cómo las memorias históricas siguen influyendo en la percepción contemporánea de Oriente Medio.',
    whyRecommended:
      'Ofrece un complemento histórico valioso para trabajar la multiperspectividad junto al dossier del conflicto de Oriente Medio.',
    targetAudience: 'Profesores de historia, estudiantes de bachillerato y lectores de ensayo',
    topics: ['Oriente Medio', 'Historia', 'Mundo árabe', 'Multiperspectividad'],
  },
  {
    id: 'es-ebano',
    lang: 'es',
    title: 'Ébano',
    subtitle: 'Crónicas magistrales sobre los países y culturas de África',
    authorName: 'Ryszard Kapuściński',
    isbn: '9788433925442',
    publishYear: 2002,
    pages: 352,
    publisher: 'Anagrama',
    category: 'geopolitik-geschichte',
    summary:
      'A lo largo de cuarenta años de viajes como corresponsal por África —desde Ghana y Etiopía hasta Ruanda, Nigeria y Tanzania—, Kapuściński retrata la vida cotidiana, la geografía humana y las transformaciones poscoloniales de decenas de países africanos.',
    whyRecommended:
      'Da rostro humano y profundidad cultural a las fichas geográficas de los países de África.',
    targetAudience: 'Jóvenes lectores, docentes de geografía y amantes del periodismo narrativo',
    topics: ['África', 'Culturas', 'Geografía humana', 'Crónica', 'Países del mundo'],
  },
  {
    id: 'es-sapiens',
    lang: 'es',
    title: 'Sapiens: De animales a dioses',
    subtitle: 'Breve historia de la humanidad',
    authorName: 'Yuval Noah Harari',
    isbn: '9788499926223',
    publishYear: 2015,
    pages: 496,
    publisher: 'Debate',
    category: 'geographie-weltwissen',
    summary:
      'Un recorrido panorámico por la historia de nuestra especie desde la aparición del Homo sapiens en África hasta la globalización actual, explicando cómo las revoluciones cognitiva, agrícola y científica transformaron todos los continentes.',
    whyRecommended:
      'Excelente punto de partida interdisciplinar entre biología, geografía y evolución cultural.',
    targetAudience: 'Estudiantes de secundaria y universidad, docentes y público general',
    topics: ['Historia universal', 'Evolución', 'Globalización', 'Cultura'],
  },
  {
    id: 'es-armas-germenes-y-acero',
    lang: 'es',
    title: 'Armas, gérmenes y acero',
    subtitle: 'Breve historia de la humanidad en los últimos trece mil años',
    authorName: 'Jared Diamond',
    isbn: '9788483067772',
    publishYear: 2007,
    pages: 528,
    publisher: 'Debate',
    category: 'geographie-weltwissen',
    summary:
      '¿Por qué la historia humana evolucionó de modo distinto en cada continente? Jared Diamond examina el papel decisivo del clima, la orientación geográfica de los continentes y la biodiversidad agrícola y animal en el desarrollo de las civilizaciones.',
    whyRecommended:
      'Obra de referencia para comprender la relación entre geografía física, biología e historia global.',
    targetAudience: 'Profesores de ciencias sociales, estudiantes y lectores curiosos',
    topics: ['Geografía', 'Continentes', 'Historia comparada', 'Ecología'],
  },
  {
    id: 'es-breve-historia-de-casi-todo',
    lang: 'es',
    title: 'Una breve historia de casi todo',
    subtitle: 'Un viaje ameno por la geología, la Tierra y la vida',
    authorName: 'Bill Bryson',
    isbn: '9788478711758',
    publishYear: 2004,
    pages: 512,
    publisher: 'RBA',
    category: 'geographie-weltwissen',
    summary:
      'Bill Bryson explica de forma clara y entretenida cómo se formó la Tierra, cómo funcionan los volcanes, las placas tectónicas, los océanos y el origen de la biodiversidad, a través de anécdotas de los científicos que lo descubrieron.',
    whyRecommended:
      'Perfecto para despertar el entusiasmo por la geografía física, los fenómenos naturales y la biología.',
    targetAudience: 'Estudiantes desde los 14 años, familias y docentes de ciencias',
    topics: ['Geología', 'Tectónica', 'Biología', 'Divulgación científica'],
  },
  {
    id: 'es-historia-de-los-estados-unidos',
    lang: 'es',
    title: 'Historia de los Estados Unidos',
    subtitle: 'De las colonias a la superpotencia contemporánea',
    authorName: 'Philip Jenkins',
    isbn: '9788420689760',
    publishYear: 2015,
    pages: 488,
    publisher: 'Alianza Editorial',
    category: 'usa-politik',
    summary:
      'Un manual ágil y riguroso que repasa la evolución política, territorial y social de los Estados Unidos: la independencia, la expansión hacia el oeste, la Guerra de Secesión, el papel de los presidentes clave y los retos del siglo XXI.',
    whyRecommended:
      'Guía estructurada en español ideal para acompañar nuestros módulos de presidentes y estados de EE. UU.',
    targetAudience: 'Estudiantes de historia, docentes y lectores de política internacional',
    topics: ['Estados Unidos', 'Historia', 'Presidentes', 'Estados federales'],
  },
  {
    id: 'es-la-otra-historia-de-estados-unidos',
    lang: 'es',
    title: 'La otra historia de los Estados Unidos',
    subtitle: 'Desde 1492 hasta nuestros días',
    authorName: 'Howard Zinn',
    isbn: '9788477271673',
    publishYear: 2005,
    pages: 560,
    publisher: 'Siglo XXI Editores',
    category: 'usa-politik',
    summary:
      'Howard Zinn relata la historia estadounidense desde el punto de vista de los pueblos indígenas, los trabajadores, el movimiento abolicionista y los defensores de los derechos civiles, aportando una visión crítica complementaria a la historia institucional.',
    whyRecommended:
      'Estimula el pensamiento crítico en el aula al contrastar los hitos presidenciales con los movimientos sociales.',
    targetAudience: 'Docentes de bachillerato, universitarios y lectores críticos',
    topics: ['Estados Unidos', 'Derechos civiles', 'Historia social', 'Pensamiento crítico'],
  },
  {
    id: 'es-la-vida-secreta-de-los-arboles',
    lang: 'es',
    title: 'La vida secreta de los árboles',
    subtitle: 'Qué sienten, cómo se comunican: descubrimientos de un mundo oculto',
    authorName: 'Peter Wohlleben',
    isbn: '9788491111269',
    publishYear: 2016,
    pages: 256,
    publisher: 'Obelisco',
    category: 'biologie-natur',
    summary:
      'El ingeniero forestal Peter Wohlleben explica de manera cercana cómo los árboles colaboran en el bosque, transmiten señales frente a plagas y comparten nutrientes bajo tierra mediante redes de hongos.',
    whyRecommended:
      'Motiva a conocer mejor el mundo vegetal tras practicar nuestros cuestionarios de biología y especies.',
    targetAudience: 'Estudiantes, familias, amantes de la botánica y docentes de biología',
    topics: ['Botánica', 'Bosques', 'Ecología', 'Naturaleza', 'Biología'],
  },
  {
    id: 'es-la-invencion-de-la-naturaleza',
    lang: 'es',
    title: 'La invención de la naturaleza',
    subtitle: 'El nuevo mundo de Alexander von Humboldt',
    authorName: 'Andrea Wulf',
    isbn: '9788430618095',
    publishYear: 2016,
    pages: 584,
    publisher: 'Taurus',
    category: 'biologie-natur',
    summary:
      'Apasionante biografía de Alexander von Humboldt, el gran naturalista y geógrafo que recorrió América del Sur y comprendió por primera vez la Tierra como un organismo vivo interconectado, sentando las bases de la ecología y la biogeografía modernas.',
    whyRecommended:
      'Une de forma magistral nuestros dos pilares centrales: geografía y biología.',
    targetAudience: 'Profesores de geografía y biología, estudiantes y amantes de la ciencia',
    topics: ['Alexander von Humboldt', 'Biogeografía', 'Ecología', 'América del Sur'],
  },
  {
    id: 'es-neuroeducacion',
    lang: 'es',
    title: 'Neuroeducación',
    subtitle: 'Solo se puede aprender aquello que se ama',
    authorName: 'Francisco Mora',
    isbn: '9788420675336',
    publishYear: 2013,
    pages: 224,
    publisher: 'Alianza Editorial',
    category: 'didaktik-schule',
    summary:
      'El neurocientífico Francisco Mora explica cómo la emoción y la curiosidad encienden la atención del cerebro y consolidan la memoria a largo plazo, demostrando el valor de las metodologías activas y visuales en el aula.',
    whyRecommended:
      'Fundamenta por qué los mapas interactivos, retos de banderas y tarjetas visuales aceleran el aprendizaje.',
    targetAudience: 'Docentes, pedagogos, orientadores escolares y familias',
    topics: ['Neuroeducación', 'Motivación', 'Aprendizaje activo', 'Pedagogía'],
  },
  {
    id: 'es-el-elemento',
    lang: 'es',
    title: 'El elemento',
    subtitle: 'Descubrir tu pasión lo cambia todo',
    authorName: 'Ken Robinson',
    isbn: '9788499083902',
    publishYear: 2010,
    pages: 368,
    publisher: 'Debolsillo',
    category: 'didaktik-schule',
    summary:
      'El reconocido experto en educación Sir Ken Robinson analiza cómo la escuela moderna debe ir más allá de la memorización mecánica para cultivar la creatividad, los talentos diversos y la motivación intrínseca de cada estudiante.',
    whyRecommended:
      'Inspirador para docentes que buscan renovar el clima de aprendizaje en el siglo XXI.',
    targetAudience: 'Profesores, equipos directivos y familias',
    topics: ['Innovación educativa', 'Creatividad', 'Talento', 'Escuela'],
  },

  // =========================================================================
  // ITALIANO (it)
  // =========================================================================
  {
    id: 'it-le-10-mappe',
    lang: 'it',
    title: 'Le 10 mappe che spiegano il mondo',
    subtitle: 'La geopolitica raccontata attraverso la geografia fisica',
    authorName: 'Tim Marshall',
    isbn: '9788811675051',
    publishYear: 2017,
    pages: 304,
    publisher: 'Garzanti',
    category: 'geopolitik-geschichte',
    summary:
      'Dieci mappe fondamentali – tra cui Russia, Cina, Stati Uniti, Europa, Medio Oriente e Africa – mostrano come catene montuose, fiumi, mari e confini naturali influenzino le strategie delle potenze mondiali.\n\nUn testo chiaro e avvincente che trasforma ogni carta geografica in un racconto storico.',
    whyRecommended:
      'L’abbinamento naturale ai nostri quiz sulle mappe e all’atlante dei paesi del mondo.',
    targetAudience: 'Docenti di geografia e storia, studenti delle superiori e appassionati',
    topics: ['Geopolitica', 'Mappe', 'Confini', 'Regioni del mondo'],
  },
  {
    id: 'it-storia-conflitto-israelo-palestinese',
    lang: 'it',
    title: 'Storia del conflitto israelo-palestinese',
    subtitle: 'Origini, guerre, società e prospettive di pace',
    authorName: 'Claudio Vercelli',
    isbn: '9788858143483',
    publishYear: 2020,
    pages: 280,
    publisher: 'Laterza',
    category: 'geopolitik-geschichte',
    summary:
      'Lo storico Claudio Vercelli ricostruisce con rigore documentario le tappe centrali del conflitto in Medio Oriente: dalla Dichiarazione Balfour e dal piano di spartizione ONU del 1947 alle guerre del 1948, 1967 e 1973, fino agli accordi di Oslo e alle sfide contemporanee.\n\nAnalizza in modo equilibrato le ragioni storiche, territoriali e umane delle popolazioni coinvolte.',
    whyRecommended:
      'Ottimo strumento di approfondimento in italiano da affiancare al nostro dossier sul conflitto in Medio Oriente.',
    targetAudience: 'Insegnanti di storia, studenti universitari e delle scuole superiori',
    topics: ['Medio Oriente', 'Israele', 'Palestina', 'Storia contemporanea', 'Oslo'],
  },
  {
    id: 'it-ebano',
    lang: 'it',
    title: 'Ebano',
    subtitle: 'Viaggio attraverso le terre, i popoli e la storia dell’Africa',
    authorName: 'Ryszard Kapuściński',
    isbn: '9788807817052',
    publishYear: 2002,
    pages: 304,
    publisher: 'Feltrinelli',
    category: 'geopolitik-geschichte',
    summary:
      'Nato da quarant’anni di reportage nel continente africano, questo celebre libro intreccia paesaggi, geografia umana e storia recente dal Ghana all’Etiopia, dalla Nigeria al Sudafrica, raccontando la quotidianità e la complessità dei paesi africani.',
    whyRecommended:
      'Arricchisce lo studio geografico dei paesi dell’Africa con storie vive e indimenticabili.',
    targetAudience: 'Studenti, insegnanti e lettori curiosi del mondo',
    topics: ['Africa', 'Paesi del mondo', 'Geografia umana', 'Reportage'],
  },
  {
    id: 'it-sapiens',
    lang: 'it',
    title: 'Sapiens: Da animali a dèi',
    subtitle: 'Breve storia dell’umanità',
    authorName: 'Yuval Noah Harari',
    isbn: '9788845275906',
    publishYear: 2014,
    pages: 544,
    publisher: 'Bompiani',
    category: 'geographie-weltwissen',
    summary:
      'Un grande affresco interdisciplinare che segue la diffusione dell’Homo sapiens su tutti i continenti attraverso la rivoluzione cognitiva, agricola e scientifica, collegando biologia, geografia e cultura umana.',
    whyRecommended:
      'Stimola connessioni profonde tra geografia mondiale, scienze naturali e storia.',
    targetAudience: 'Studenti delle scuole superiori, università e lettori curiosi',
    topics: ['Storia mondiale', 'Evoluzione', 'Continenti', 'Globalizzazione'],
  },
  {
    id: 'it-armi-acciaio-e-malattie',
    lang: 'it',
    title: 'Armi, acciaio e malattie',
    subtitle: 'Breve storia del mondo negli ultimi tredicimila anni',
    authorName: 'Jared Diamond',
    isbn: '9788806219222',
    publishYear: 2014,
    pages: 420,
    publisher: 'Einaudi',
    category: 'geographie-weltwissen',
    summary:
      'Perché i diversi continenti hanno conosciuto sviluppi storici così differenti? Il premio Pulitzer Jared Diamond spiega come clima, assi geografici, biodiversità vegetale e animale abbiano plasmato il destino delle società umane.',
    whyRecommended:
      'Testo chiave per comprendere il legame scientifico tra geografia fisica e storia delle civiltà.',
    targetAudience: 'Docenti, studenti e appassionati di storia globale',
    topics: ['Geografia', 'Continenti', 'Storia', 'Ecologia', 'Agricoltura'],
  },
  {
    id: 'it-storia-minima-popolazione',
    lang: 'it',
    title: 'Storia minima della popolazione del mondo',
    subtitle: 'Demografia, risorse e grandi migrazioni umane',
    authorName: 'Massimo Livi Bacci',
    isbn: '9788815233707',
    publishYear: 2011,
    pages: 336,
    publisher: 'Il Mulino',
    category: 'geographie-weltwissen',
    summary:
      'Uno dei più autorevoli demografi italiani racconta in modo chiaro come popolazione, ambiente e risorse geografiche si siano intrecciati dal Neolitico al mondo globalizzato di oggi.',
    whyRecommended:
      'Fornisce solide basi demografiche per interpretare i dati dei diversi stati e continenti.',
    targetAudience: 'Insegnanti di geografia, studenti universitari e delle superiori',
    topics: ['Demografia', 'Popolazione mondiale', 'Risorse', 'Migrazioni'],
  },
  {
    id: 'it-storia-degli-stati-uniti',
    lang: 'it',
    title: 'Storia degli Stati Uniti',
    subtitle: 'Dalla nascita della repubblica al secolo americano',
    authorName: 'Oliviero Bergamini',
    isbn: '9788858141540',
    publishYear: 2020,
    pages: 272,
    publisher: 'Laterza',
    category: 'usa-politik',
    summary:
      'Una sintesi agile e autorevole dedicata al percorso politico e territoriale degli Stati Uniti: dalla Dichiarazione d’Indipendenza e dalla Costituzione federale alla Guerra Civile, alla Guerra Fredda e alle elezioni presidenziali contemporanee.',
    whyRecommended:
      'Compendio chiaro in italiano per approfondire i nostri moduli sui Presidenti USA e sugli Stati americani.',
    targetAudience: 'Studenti di storia e scienze politiche, docenti e lettori interessati agli USA',
    topics: ['Stati Uniti', 'Storia USA', 'Presidenti', 'Costituzione', 'Stati federali'],
  },
  {
    id: 'it-queste-verita',
    lang: 'it',
    title: 'Queste verità',
    subtitle: 'Una storia degli Stati Uniti',
    authorName: 'Jill Lepore',
    isbn: '9788817108911',
    publishYear: 2020,
    pages: 1008,
    publisher: 'Rizzoli',
    category: 'usa-politik',
    summary:
      'L’imponente storia degli Stati Uniti scritta dalla storica di Harvard Jill Lepore segue cinque secoli di presidenze, conflitti costituzionali, lotte per i diritti civili e trasformazioni mediatiche.',
    whyRecommended:
      'Offre il quadro narrativo completo delle epoche storiche presenti nella nostra cronologia dei presidenti americani.',
    targetAudience: 'Docenti, universitari e lettori di storia contemporanea',
    topics: ['Stati Uniti', 'Democrazia', 'Presidenti USA', 'Diritti civili'],
  },
  {
    id: 'it-verde-brillante',
    lang: 'it',
    title: 'Verde brillante',
    subtitle: 'Sensibilità e intelligenza del mondo vegetale',
    authorName: 'Stefano Mancuso, Alessandra Viola',
    isbn: '9788809811409',
    publishYear: 2015,
    pages: 176,
    publisher: 'Giunti',
    category: 'biologie-natur',
    summary:
      'Il neurobiologo vegetale Stefano Mancuso racconta come le piante percepiscano luce, gravità, suoni e segnali chimici, collaborando con l’ecosistema e dimostrando sorprendenti strategie adattive.',
    whyRecommended:
      'Un ponte affascinante tra scienza moderna e i nostri quiz dedicati a piante e biodiversità.',
    targetAudience: 'Studenti, docenti di scienze naturali e appassionati di botanica',
    topics: ['Botanica', 'Biologia', 'Piante', 'Ecologia', 'Scienze naturali'],
  },
  {
    id: 'it-collasso',
    lang: 'it',
    title: 'Collasso',
    subtitle: 'Come le società scelgono di morire o vivere',
    authorName: 'Jared Diamond',
    isbn: '9788806219239',
    publishYear: 2014,
    pages: 560,
    publisher: 'Einaudi',
    category: 'biologie-natur',
    summary:
      'Analizzando civiltà del passato (Isola di Pasqua, Maya, Groenlandia norrena) e regioni moderne, Jared Diamond mostra come la gestione sostenibile delle foreste, del suolo, dell’acqua e della biodiversità determini la sopravvivenza delle società.',
    whyRecommended:
      'Collega educazione ambientale, geografia delle risorse ed ecologia in un’analisi avvincente.',
    targetAudience: 'Insegnanti di geografia e scienze, studenti e lettori interessati alla sostenibilità',
    topics: ['Ecologia', 'Sostenibilità', 'Clima', 'Risorse naturali', 'Storia'],
  },
  {
    id: 'it-la-generazione-ansiosa',
    lang: 'it',
    title: 'La generazione ansiosa',
    subtitle: 'Come i social hanno rovinato i nostri figli',
    authorName: 'Jonathan Haidt',
    isbn: '9788817184991',
    publishYear: 2024,
    pages: 416,
    publisher: 'Rizzoli',
    category: 'didaktik-schule',
    summary:
      'Lo psicologo sociale Jonathan Haidt analizza il passaggio dall’infanzia basata sul gioco all’adolescenza centrata sullo smartphone, proponendo regole chiare per scuole libere dalle distrazioni dei social e un uso consapevole delle tecnologie educative.',
    whyRecommended:
      'Testo di grande attualità per collegi docenti e famiglie alla ricerca di equilibrio digitale.',
    targetAudience: 'Docenti, dirigenti scolastici, educatori e genitori',
    topics: ['Educazione digitale', 'Scuola', 'Smartphone', 'Benessere giovanile'],
  },
  {
    id: 'it-imparare-dehaene',
    lang: 'it',
    title: 'Imparare',
    subtitle: 'Il talento del cervello, la sfida delle macchine',
    authorName: 'Stanislas Dehaene',
    isbn: '9788832850949',
    publishYear: 2019,
    pages: 336,
    publisher: 'Raffaello Cortina Editore',
    category: 'didaktik-schule',
    summary:
      'Stanislas Dehaene illustra i quattro pilastri dell’apprendimento efficace secondo le neuroscienze: attenzione, coinvolgimento attivo, feedback immediato sull’errore e consolidamento della memoria.',
    whyRecommended:
      'Spiega su base scientifica perché i quiz interattivi e il feedback immediato migliorano lo studio.',
    targetAudience: 'Insegnanti, formatori e studenti di scienze dell’educazione',
    topics: ['Neuroscienze', 'Apprendimento', 'Didattica', 'Memoria', 'Quiz interattivi'],
  },
  {
    id: 'it-educare-alla-liberta',
    lang: 'it',
    title: 'Educare alla libertà',
    subtitle: 'I principi essenziali del metodo Montessori',
    authorName: 'Maria Montessori',
    isbn: '9788804580447',
    publishYear: 2008,
    pages: 144,
    publisher: 'Mondadori',
    category: 'didaktik-schule',
    summary:
      'Una raccolta agile degli scritti fondamentali di Maria Montessori sull’autonomia del bambino, la curiosità spontanea e l’importanza di ambienti di apprendimento strutturati in cui l’errore diventa strumento di crescita.',
    whyRecommended:
      'Un classico immortale della pedagogia italiana che ispira tuttora l’apprendimento autonomo e interattivo.',
    targetAudience: 'Insegnanti, educatori e genitori',
    topics: ['Pedagogia', 'Maria Montessori', 'Autonomia', 'Educazione', 'Metodo attivo'],
  },
];

export function getBuchTippById(id: string): BuchTipp | undefined {
  return BUCH_TIPPS.find((b) => b.id === id);
}

export function getAllBuchTipps(): BuchTipp[] {
  return BUCH_TIPPS;
}

export function getBuchTippsByLanguage(lang: Language): BuchTipp[] {
  const byLang = BUCH_TIPPS.filter((b) => b.lang === lang);
  return byLang.length > 0 ? byLang : BUCH_TIPPS.filter((b) => b.lang === 'de');
}
