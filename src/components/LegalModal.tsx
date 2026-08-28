'use client';

import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';

interface LegalModalProps {
  type: 'impressum' | 'datenschutz' | null;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  const { language } = useLanguage();

  if (!type) return null;

  const currentLang = (['de', 'en', 'fr', 'es', 'it'].includes(language) ? language : 'de') as Language;

  const content = {
    de: {
      imprintTitle: 'Impressum',
      imprintLead: 'Angaben gemäß § 5 TMG / Offenlegung gemäß Mediengesetz',
      operatorHeading: 'Betreiber der Website',
      operatorDesc: 'Web-Bildungsportal für Geographie, Politik & Weltgeschichte',
      responsibleHeading: 'Verantwortlich für den Inhalt',
      responsibleDesc: 'Redaktion About the World – Bildungs- und Lernmaterialien für Schulen und Selbstlerner',
      liabilityContentHeading: 'Haftung für Inhalte',
      liabilityContentDesc: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
      liabilityLinksHeading: 'Haftung für Links',
      liabilityLinksDesc: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.',
      copyrightHeading: 'Urheberrecht',
      copyrightDesc: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',

      privacyTitle: 'Datenschutzerklärung',
      privacyLead: 'Informationen über die Verarbeitung personenbezogener Daten gemäß EU-DSGVO',
      sec1Heading: '1. Datenschutz auf einen Blick',
      sec1Desc: 'Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.',
      sec2Heading: '2. Datenerfassung auf unserer Website',
      sec2Sub1: 'Wer ist verantwortlich für die Datenerfassung?',
      sec2Sub1Desc: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.',
      sec2Sub2: 'Wie erfassen wir Ihre Daten?',
      sec2Item1: 'Daten, die Sie uns mitteilen (z. B. Einstellungen im Browser oder Sprachauswahl).',
      sec2Item2: 'Automatisch beim Besuch der Website erfasste technische Server-Log-Daten (z. B. Internetbrowser, Betriebssystem, Uhrzeit des Seitenaufrufs).',
      sec3Heading: '3. Speicherung des Lernfortschritts (Local Storage & Datenbank)',
      sec3Desc: 'Um Ihren Fortschritt in interaktiven Übungen lokal auf Ihrem Endgerät zu speichern (z. B. bearbeitete Folien oder Fragenstände), nutzt diese Website den lokalen Browserspeicher (Local Storage). Bei eingeloggten Nutzern wird der Übungsstand datensparsam und zweckgebunden auf dem Server gespeichert.',
      sec4Heading: '4. Externe Medien & YouTube (H5P)',
      sec4Desc: 'Unsere Lerninhalte können Lehrvideos über YouTube einbinden. Wenn Sie eine Seite mit interaktiven Videos aufrufen, wird eine Verbindung zu den Servern von YouTube aufgebaut, sofern Sie dem Laden externer Medien zugestimmt haben.',
      sec5Heading: '5. Schülerverwaltung & Lernstands-Tracking ohne Klarnamen (Pseudonymisierung)',
      sec5Desc: 'Unsere Plattform ermöglicht es registrierten Lehrkräften, Lerngruppen und Klassen anzulegen, interaktive Aufgaben zuzuweisen und die Lernergebnisse ihrer Schüler nachzuverfolgen.',
      sec5SubHeading: 'Besondere Schutzmaßnahmen & Datensparsamkeit:',
      sec5Item1: 'Keine Klarnamen: Schülerkonten werden ausschließlich über zufällig generierte, anonyme Zugangscodes (z. B. STU-12345) erstellt. Es werden zu keinem Zeitpunkt Klarnamen, Geburtsdaten oder E-Mail-Adressen der Schülerinnen und Schüler erhoben oder gespeichert.',
      sec5Item2: 'Pseudonymisierte Aufgaben- & Ergebniszuordnung: Wenn ein Schüler mit seinem Code Aufgaben bearbeitet, werden Punktzahlen, Abschlussstatus und Zeitstempel ausschließlich diesem pseudonymen Code zugeordnet.',
      sec5Item3: 'Zweckbindung & vollständige Löschung: Die Daten dienen ausschließlich der didaktischen Unterrichtsbegleitung durch die zuständige Lehrkraft. Lehrkräfte können Schülerkonten, zugewiesene Aufgaben und Klassen mitsamt allen Fortschritten jederzeit eigenständig und unwiderruflich löschen.',
      sec5Item4: 'Keine Weitergabe an Dritte: Schülerfortschritte werden niemals an Werbepartner oder sonstige Dritte weitergegeben oder zu Profiling-Zwecken ausgewertet.',
      sec5LegalBasis: 'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung moderner digitaler Lehrwerkzeuge) bzw. Art. 6 Abs. 1 lit. e DSGVO i. V. m. den einschlägigen Schulgesetzen der Länder bei schulischer Nutzung.',
      sec6Heading: '6. Ihre Rechte',
      sec6Desc: 'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.',
      closeBtn: 'Schließen',
    },
    en: {
      imprintTitle: 'Legal Notice (Imprint)',
      imprintLead: 'Information pursuant to German Telemedia Act (§ 5 TMG) and media regulations',
      operatorHeading: 'Website Operator',
      operatorDesc: 'Educational Web Portal for Geography, Politics & World History',
      responsibleHeading: 'Responsible for Content',
      responsibleDesc: 'Editorial Team About the World – Educational materials for schools and self-directed learners',
      liabilityContentHeading: 'Liability for Content',
      liabilityContentDesc: 'As a service provider, we are responsible for our own content on these pages under general law. The contents have been created with the utmost care, but we cannot guarantee accuracy, completeness, or timeliness.',
      liabilityLinksHeading: 'Liability for Links',
      liabilityLinksDesc: 'Our website contains links to external websites of third parties over whose content we have no influence. We cannot assume any liability for third-party contents.',
      copyrightHeading: 'Copyright',
      copyrightDesc: 'The content and works provided on these pages are governed by copyright law. Duplication, processing, distribution, or any form of commercialization requires prior written consent.',

      privacyTitle: 'Privacy Policy',
      privacyLead: 'Information on the processing of personal data in accordance with the EU GDPR',
      sec1Heading: '1. Privacy at a Glance',
      sec1Desc: 'Protecting your personal data is an essential priority. We treat your data confidentially and in strict compliance with statutory data protection regulations and this policy.',
      sec2Heading: '2. Data Collection on Our Website',
      sec2Sub1: 'Who is responsible for data collection?',
      sec2Sub1Desc: 'Data processing on this website is carried out by the website operator.',
      sec2Sub2: 'How do we collect data?',
      sec2Item1: 'Data you provide (e.g. language preferences or browser settings).',
      sec2Item2: 'Technical data recorded automatically during your visit (e.g. browser type, operating system, time of page access).',
      sec3Heading: '3. Storage of Learning Progress (Local Storage & Database)',
      sec3Desc: 'To save your progress in interactive modules locally on your device, this website uses browser Local Storage. For logged-in users, exercise progress is saved securely and purpose-bound on our database.',
      sec4Heading: '4. External Media & YouTube (H5P)',
      sec4Desc: 'Our educational content may embed videos from YouTube. Loading pages with embedded videos connects to YouTube servers once external media consent is granted.',
      sec5Heading: '5. Student Management & Progress Tracking Without Real Names (Pseudonymization)',
      sec5Desc: 'Our platform enables registered teachers to create student groups/classes, assign interactive modules, and track exercise progress.',
      sec5SubHeading: 'Special Data Protection & Minimization Safeguards:',
      sec5Item1: 'No Real Names: Student accounts are created strictly via randomly generated anonymous access codes (e.g. STU-12345). No real names, dates of birth, or email addresses of students are ever requested or stored.',
      sec5Item2: 'Pseudonymous Task & Score Association: When a student completes exercises with their code, scores, completion status, and timestamps are associated solely with this pseudonymous code.',
      sec5Item3: 'Purpose Limitation & Complete Deletion: Data is used solely for educational instruction. Teachers can permanently and irrevocably delete student accounts, assigned tasks, and classes at any time.',
      sec5Item4: 'No Third-Party Sharing: Student data is never shared with advertisers or third parties, nor used for commercial profiling.',
      sec5LegalBasis: 'Processing is based on Art. 6 (1) (f) GDPR (legitimate interest in providing digital educational tools) or Art. 6 (1) (e) GDPR in conjunction with school education laws for institutional use.',
      sec6Heading: '6. Your Rights',
      sec6Desc: 'You have the right to request information free of charge at any time regarding your stored personal data, its origin, recipient, and purpose, as well as the right to rectification, blocking, or deletion.',
      closeBtn: 'Close',
    },
    fr: {
      imprintTitle: 'Mentions Légales',
      imprintLead: 'Informations réglementaires et éditoriales du portail',
      operatorHeading: 'Éditeur du site',
      operatorDesc: 'Portail éducatif web pour la géographie, l\'histoire mondiale et la politique',
      responsibleHeading: 'Responsable du contenu',
      responsibleDesc: 'Équipe éditoriale About the World – Ressources pédagogiques pour écoles et étudiants',
      liabilityContentHeading: 'Responsabilité relative aux contenus',
      liabilityContentDesc: 'En tant que fournisseur de services, nous sommes responsables de nos propres contenus conformément à la législation générale. Les contenus ont été élaborés avec le plus grand soin.',
      liabilityLinksHeading: 'Responsabilité relative aux liens',
      liabilityLinksDesc: 'Notre offre contient des liens vers des sites tiers sur le contenu desquels nous n\'avons aucune influence. Nous déclinons toute responsabilité pour ces contenus tiers.',
      copyrightHeading: 'Droits d\'auteur',
      copyrightDesc: 'Les contenus et œuvres créés sur ce site sont protégés par le droit d\'auteur. Toute reproduction ou diffusion nécessite l\'accord écrit préalable de l\'auteur.',

      privacyTitle: 'Politique de Confidentialité',
      privacyLead: 'Informations sur le traitement des données personnelles conformément au RGPD',
      sec1Heading: '1. La protection des données en un coup d\'œil',
      sec1Desc: 'La protection de vos données personnelles est pour nous une priorité majeure. Nous traitons vos données de manière confidentielle et conformément aux règles de protection des données.',
      sec2Heading: '2. Collecte des données sur notre site web',
      sec2Sub1: 'Qui est responsable de la collecte des données ?',
      sec2Sub1Desc: 'Le traitement des données sur ce site est effectué par l\'exploitant du site.',
      sec2Sub2: 'Comment collectons-nous les données ?',
      sec2Item1: 'Données fournies par vous-même (ex. choix de langue et préférences du navigateur).',
      sec2Item2: 'Données techniques enregistrées automatiquement lors de votre visite (ex. navigateur, système d\'exploitation, heure de la visite).',
      sec3Heading: '3. Enregistrement de la progression d\'apprentissage (Local Storage & Base de données)',
      sec3Desc: 'Pour mémoriser localement vos exercices interactifs sur votre terminal, ce site utilise le stockage local du navigateur. Pour les utilisateurs connectés, la progression est enregistrée de manière sécurisée et ciblée.',
      sec4Heading: '4. Médias externes & YouTube (H5P)',
      sec4Desc: 'Nos contenus peuvent intégrer des vidéos via YouTube. Une connexion aux serveurs de YouTube est établie lorsque vous donnez votre accord pour les médias externes.',
      sec5Heading: '5. Gestion des élèves et suivi des progrès sans vrais noms (Pseudonymisation)',
      sec5Desc: 'Notre plateforme permet aux enseignants inscrits de créer des classes, d\'assigner des exercices et de suivre les progrès des élèves.',
      sec5SubHeading: 'Mesures de protection et minimisation des données :',
      sec5Item1: 'Aucun vrai nom : Les comptes élèves sont générés exclusivement à l\'aide de codes d\'accès anonymes (ex. STU-12345). Aucun nom réel, date de naissance ou adresse e-mail d\'élève n\'est collecté.',
      sec5Item2: 'Attribution pseudonymisée des devoirs et scores : Lorsqu\'un élève s\'exerce avec son code, les résultats et dates sont liés uniquement à ce code pseudonyme pour son enseignant.',
      sec5Item3: 'Finalité stricte et suppression : Les données servent uniquement au suivi pédagogique. L\'enseignant peut supprimer définitivement et à tout moment les comptes, devoirs et classes.',
      sec5Item4: 'Aucune transmission à des tiers : Les données des élèves ne sont jamais cédées à des tiers ni utilisées à des fins publicitaires ou de profilage.',
      sec5LegalBasis: 'Le traitement repose sur l\'art. 6, par. 1, point f du RGPD (intérêt légitime pour les outils éducatifs numériques) ou l\'art. 6, par. 1, point e du RGPD dans le cadre scolaire.',
      sec6Heading: '6. Vos droits',
      sec6Desc: 'Vous avez le droit d\'obtenir gratuitement et à tout moment des informations sur vos données enregistrées, leur origine, et d\'exiger leur rectification ou suppression.',
      closeBtn: 'Fermer',
    },
    es: {
      imprintTitle: 'Aviso Legal',
      imprintLead: 'Información legal y editorial del portal web',
      operatorHeading: 'Titular del sitio web',
      operatorDesc: 'Portal educativo web de geografía, política e historia mundial',
      responsibleHeading: 'Responsable de contenido',
      responsibleDesc: 'Equipo editorial About the World – Material didáctico para centros educativos y estudiantes',
      liabilityContentHeading: 'Responsabilidad por contenidos',
      liabilityContentDesc: 'Como proveedores de servicios somos responsables de los contenidos propios en estas páginas. Los contenidos han sido creados con el máximo cuidado.',
      liabilityLinksHeading: 'Responsabilidad por enlaces',
      liabilityLinksDesc: 'Nuestro sitio contiene enlaces a páginas web de terceros sobre cuyos contenidos no tenemos influencia alguna.',
      copyrightHeading: 'Propiedad intelectual',
      copyrightDesc: 'Los contenidos y obras creados en este sitio están sujetos a derechos de autor. Cualquier reproducción o distribución requiere autorización previa por escrito.',

      privacyTitle: 'Política de Privacidad',
      privacyLead: 'Información sobre el tratamiento de datos personales conforme al RGPD de la UE',
      sec1Heading: '1. Protección de datos de un vistazo',
      sec1Desc: 'La protección de sus datos personales es una prioridad esencial. Tratamos sus datos de forma confidencial y en estricto cumplimiento de la normativa de protección de datos.',
      sec2Heading: '2. Recopilación de datos en nuestro sitio web',
      sec2Sub1: '¿Quién es responsable del tratamiento de datos?',
      sec2Sub1Desc: 'El tratamiento de datos en este sitio web lo realiza el titular del sitio.',
      sec2Sub2: '¿Cómo recopilamos sus datos?',
      sec2Item1: 'Datos facilitados por el usuario (p. ej. selección de idioma o configuración del navegador).',
      sec2Item2: 'Datos técnicos registrados automáticamente durante la visita (p. ej. navegador, sistema operativo, hora de acceso).',
      sec3Heading: '3. Almacenamiento del progreso de aprendizaje (Local Storage y base de datos)',
      sec3Desc: 'Para guardar el progreso en los ejercicios de forma local en su dispositivo, este sitio utiliza Local Storage. Para usuarios identificados, el progreso se almacena de forma segura en el servidor.',
      sec4Heading: '4. Medios externos y YouTube (H5P)',
      sec4Desc: 'Nuestros contenidos pueden incorporar vídeos educativos de YouTube. La conexión con YouTube se establece una vez otorgado el consentimiento.',
      sec5Heading: '5. Gestión de alumnos y seguimiento del aprendizaje sin nombres reales (Seudonimización)',
      sec5Desc: 'Nuestra plataforma permite a los profesores registrados crear clases, asignar módulos interactivos y supervisar los resultados de los estudiantes.',
      sec5SubHeading: 'Garantías de privacidad y minimización de datos:',
      sec5Item1: 'Sin nombres reales: Las cuentas de alumnos se crean exclusivamente mediante códigos de acceso aleatorios y anónimos (p. ej. STU-12345). Nunca se recaban nombres reales, fechas de nacimiento ni correos de los alumnos.',
      sec5Item2: 'Asignación seudonimizada de tareas y puntuaciones: Los resultados y fechas se asocian únicamente al código seudonimizado para el profesor.',
      sec5Item3: 'Finalidad educativa y eliminación completa: Los datos se destinan exclusivamente al seguimiento docente. El profesor puede eliminar cuentas y clases en cualquier momento.',
      sec5Item4: 'Sin cesión a terceros: Los datos de los estudiantes nunca se ceden a terceros ni se emplean con fines publicitarios o de elaboración de perfiles.',
      sec5LegalBasis: 'El tratamiento se fundamenta en el art. 6, ap. 1, letra f del RGPD (interés legítimo en herramientas didácticas digitales) o art. 6, ap. 1, letra e en el ámbito escolar.',
      sec6Heading: '6. Sus derechos',
      sec6Desc: 'Tiene derecho a obtener en cualquier momento información gratuita sobre sus datos personales almacenados, así como a solicitar su rectificación o supresión.',
      closeBtn: 'Cerrar',
    },
    it: {
      imprintTitle: 'Note Legali',
      imprintLead: 'Informazioni legali ed editoriali del portale didattico',
      operatorHeading: 'Gestore del sito web',
      operatorDesc: 'Portale didattico web per geografia, politica e storia mondiale',
      responsibleHeading: 'Responsabile dei contenuti',
      responsibleDesc: 'Redazione About the World – Materiali didattici per scuole e studenti',
      liabilityContentHeading: 'Responsabilità per i contenuti',
      liabilityContentDesc: 'Come fornitori di servizi siamo responsabili dei nostri contenuti su queste pagine ai sensi delle leggi vigenti. I contenuti sono stati redatti con la massima cura.',
      liabilityLinksHeading: 'Responsabilità per i link',
      liabilityLinksDesc: 'La nostra offerta contiene collegamenti a siti web esterni di terzi sui cui contenuti non abbiamo alcuna influenza.',
      copyrightHeading: 'Diritto d\'autore',
      copyrightDesc: 'I contenuti e le opere presenti su questo sito sono soggetti al diritto d\'autore. Qualsiasi riproduzione richiede il previo consenso scritto.',

      privacyTitle: 'Informativa sulla Privacy',
      privacyLead: 'Informazioni sul trattamento dei dati personali ai sensi del Regolamento UE (GDPR)',
      sec1Heading: '1. Protezione dei dati in sintesi',
      sec1Desc: 'La tutela dei vostri dati personali è per noi fondamentale. Trattiamo i dati personali in modo confidenziale e nel rispetto della normativa sulla privacy.',
      sec2Heading: '2. Raccolta dati sul nostro sito web',
      sec2Sub1: 'Chi è responsabile della raccolta dati?',
      sec2Sub1Desc: 'Il trattamento dei dati su questo sito web viene effettuato dal gestore del sito.',
      sec2Sub2: 'Come raccogliamo i vostri dati?',
      sec2Item1: 'Dati forniti dall\'utente (es. selezione della lingua o impostazioni del browser).',
      sec2Item2: 'Dati tecnici registrati automaticamente durante la visita (es. browser, sistema operativo, orario di accesso).',
      sec3Heading: '3. Memorizzazione dei progressi didattici (Local Storage e database)',
      sec3Desc: 'Per salvare i progressi degli esercizi interattivi in locale sul dispositivo, questo sito utilizza il Local Storage del browser. Per gli utenti registrati, i progressi sono salvati sul server in modo mirato.',
      sec4Heading: '4. Media esterni e YouTube (H5P)',
      sec4Desc: 'I nostri contenuti possono includere video tramite YouTube. Il collegamento ai server YouTube si attiva previo consenso dell\'utente.',
      sec5Heading: '5. Gestione studenti e monitoraggio dei progressi senza nomi reali (Pseudonimizzazione)',
      sec5Desc: 'La nostra piattaforma consente agli insegnanti registrati di creare classi, assegnare compiti interattivi e monitorare i risultati degli studenti.',
      sec5SubHeading: 'Misure di protezione e minimizzazione dei dati:',
      sec5Item1: 'Nessun nome reale: Gli account degli studenti vengono creati solo tramite codici di accesso anonimi generati casualmente (es. STU-12345). Non vengono mai raccolti nomi reali, date di nascita o email degli studenti.',
      sec5Item2: 'Assegnazione pseudonimizzata di compiti e risultati: I punteggi e gli stati di completamento sono associati unicamente al codice pseudonimo.',
      sec5Item3: 'Finalità didattica e cancellazione completa: I dati servono esclusivamente al docente. L\'insegnante può eliminare account, compiti e classi in qualsiasi momento in modo irreversibile.',
      sec5Item4: 'Nessuna cessione a terzi: I progressi degli studenti non vengono mai ceduti a terzi né utilizzati per scopi pubblicitari o di profilazione.',
      sec5LegalBasis: 'Il trattamento si basa sull\'art. 6, par. 1, lett. f del GDPR (legittimo interesse a fornire strumenti didattici digitali) o sull\'art. 6, par. 1, lett. e nell\'ambito scolastico.',
      sec6Heading: '6. I vostri diritti',
      sec6Desc: 'Avete il diritto di ricevere gratuitamente informazioni sui vostri dati personali memorizzati e di richiederne la rettifica, il blocco o la cancellazione.',
      closeBtn: 'Chiudi',
    },
  };

  const tLegal = content[currentLang] || content.de;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backdropFilter: 'blur(2px)'
      }}
      onClick={onClose}
    >
      <div 
        className="legal-paper"
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          width: '100%',
          maxWidth: 860,
          background: '#ffffff',
          borderRadius: 8,
          padding: '30px 28px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'var(--green-light)',
            border: '1px solid var(--green-border)',
            borderRadius: 4,
            padding: 6,
            cursor: 'pointer',
            color: 'var(--green-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label={tLegal.closeBtn}
        >
          <X style={{ width: 18, height: 18 }} />
        </button>

        {type === 'impressum' ? (
          <div>
            <h1 className="legal-title">{tLegal.imprintTitle}</h1>
            <p className="legal-lead">
              {tLegal.imprintLead}
            </p>

            <div className="legal-block">
              <h2>{tLegal.operatorHeading}</h2>
              <p><strong>About the World</strong></p>
              <p>{tLegal.operatorDesc}</p>
              <p>Website: <a href="https://www.about-the-world.org">about-the-world.org</a></p>
              <p>E-Mail: info@about-the-world.org</p>
            </div>

            <div className="legal-block">
              <h2>{tLegal.responsibleHeading}</h2>
              <p>{tLegal.responsibleDesc}</p>
            </div>

            <div className="legal-block">
              <h2>{tLegal.liabilityContentHeading}</h2>
              <p>{tLegal.liabilityContentDesc}</p>
            </div>

            <div className="legal-block">
              <h2>{tLegal.liabilityLinksHeading}</h2>
              <p>{tLegal.liabilityLinksDesc}</p>
            </div>

            <div className="legal-block">
              <h2>{tLegal.copyrightHeading}</h2>
              <p>{tLegal.copyrightDesc}</p>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <ShieldCheck style={{ width: 28, height: 28, color: 'var(--green-dark)' }} />
              <h1 className="legal-title" style={{ margin: 0 }}>{tLegal.privacyTitle}</h1>
            </div>
            <p className="legal-lead">
              {tLegal.privacyLead}
            </p>

            <div className="legal-block">
              <h2>{tLegal.sec1Heading}</h2>
              <p>{tLegal.sec1Desc}</p>
            </div>

            <div className="legal-block">
              <h2>{tLegal.sec2Heading}</h2>
              <p><strong>{tLegal.sec2Sub1}</strong></p>
              <p>{tLegal.sec2Sub1Desc}</p>
              <br />
              <p><strong>{tLegal.sec2Sub2}</strong></p>
              <ul className="legal-list">
                <li>{tLegal.sec2Item1}</li>
                <li>{tLegal.sec2Item2}</li>
              </ul>
            </div>

            <div className="legal-block">
              <h2>{tLegal.sec3Heading}</h2>
              <p>{tLegal.sec3Desc}</p>
            </div>

            <div className="legal-block">
              <h2>{tLegal.sec4Heading}</h2>
              <p>{tLegal.sec4Desc}</p>
            </div>

            <div className="legal-block" style={{ background: 'var(--green-light)', padding: '16px 18px', borderRadius: 6, border: '1px solid var(--green-border)' }}>
              <h2 style={{ color: 'var(--green-dark)', marginTop: 0 }}>{tLegal.sec5Heading}</h2>
              <p>{tLegal.sec5Desc}</p>
              <br />
              <p><strong>{tLegal.sec5SubHeading}</strong></p>
              <ul className="legal-list" style={{ marginTop: 8 }}>
                <li>{tLegal.sec5Item1}</li>
                <li>{tLegal.sec5Item2}</li>
                <li>{tLegal.sec5Item3}</li>
                <li>{tLegal.sec5Item4}</li>
              </ul>
              <br />
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {tLegal.sec5LegalBasis}
              </p>
            </div>

            <div className="legal-block">
              <h2>{tLegal.sec6Heading}</h2>
              <p>{tLegal.sec6Desc}</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <button
            type="button"
            onClick={onClose}
            className="nav-btn active"
            style={{
              cursor: 'pointer',
              background: 'var(--green-primary)',
              color: '#ffffff',
              border: 'none',
              padding: '9px 20px',
              borderRadius: 4,
              fontWeight: 700
            }}
          >
            {tLegal.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
