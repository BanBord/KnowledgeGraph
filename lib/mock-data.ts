// Alle Mock-Daten zentral — keine Daten in Komponenten hartcodieren
import Fuse from 'fuse.js';
import { Contact, Person, Redakteur, TopicNode, SearchScenario } from '@/types';

// --- Redakteure ---

export const redakteure: Redakteur[] = [
  { id: 'r1', name: 'Lea Ullmann', ressort: 'Gesundheit & Wissenschaft' },
  { id: 'r2', name: 'Markus Berger', ressort: 'Wirtschaft & Unternehmen' },
  { id: 'r3', name: 'Nina Schreiber', ressort: 'Lokalpolitik & Gesellschaft' },
  { id: 'r4', name: 'Jonas Kiefer', ressort: 'Kultur & Stadtleben' },
];

// --- Kontakte: Szenario 1 — Vitamin Mangel ---

export const contacts: Contact[] = [
  {
    id: 'c1',
    name: 'Dr. Sabine Maier',
    role: 'Ärztin – Fachgebiet Innere Medizin & Vitamine',
    type: 'expert',
    expertise: ['Vitaminmangel', 'Ernährungsmedizin', 'Gesundheitsprävention'],
    knownBy: ['r1'],
    email: 'dr.maier@praxis-mitte.de',
    phone: '+49 89 123 4567',
    sourceNote: 'Kontaktiert bei Recherche zu Mangelernährung 2022',
    convHistory: [
      {
        id: 'cv1',
        date: '2023-11-15',
        redakteurId: 'r1',
        redakteurName: 'Lea Ullmann',
        summary: 'Interview zu Vitamin-D-Mangel im Winter. Dr. Maier betonte, dass über 40% der Bevölkerung im Winter einen Vitamin-D-Mangel haben.',
        articles: ['Vitamin-D im Winter: Was wir tun können'],
      },
      {
        id: 'cv2',
        date: '2023-03-08',
        redakteurId: 'r1',
        redakteurName: 'Lea Ullmann',
        summary: 'Hintergrundgespräch zu Supplementierung bei älteren Menschen.',
      },
    ],
  },
  {
    id: 'c2',
    name: 'Thomas Huber',
    role: 'Apotheker & Ernährungsberater',
    type: 'expert',
    expertise: ['Nahrungsergänzung', 'Vitamine', 'Medikamente', 'Wechselwirkungen'],
    knownBy: ['r1'],
    email: 'thomas.huber@stadtapotheke.de',
    sourceNote: 'Stadtapotheke am Marktplatz',
    convHistory: [
      {
        id: 'cv3',
        date: '2024-01-20',
        redakteurId: 'r1',
        redakteurName: 'Lea Ullmann',
        summary: 'Gespräch über steigende Nachfrage nach Vitamin-Präparaten. Huber sieht kritisch, dass viele Kunden ohne ärztlichen Rat supplementieren.',
        articles: ['Vitamin-Boom: Sinnvoll oder Marketing?'],
      },
    ],
  },
  {
    id: 'c3',
    name: 'Florian Vogt',
    role: 'Gründer & CEO – VitaBoost GmbH',
    type: 'company',
    expertise: ['Vitamin-Startups', 'Nahrungsergänzung', 'Direktvertrieb', 'E-Commerce'],
    knownBy: ['r2'],
    email: 'f.vogt@vitaboost.de',
    phone: '+49 89 999 0011',
    sourceNote: 'Gründer eines Münchner Vitamin-Startups, bekannt durch Investoren-Netzwerk',
    convHistory: [
      {
        id: 'cv4',
        date: '2023-09-05',
        redakteurId: 'r2',
        redakteurName: 'Markus Berger',
        summary: 'Interview nach Serie-A-Finanzierung. VitaBoost plant Expansion in den DACH-Raum.',
        articles: ['Münchner Startup sammelt 5 Mio. für Vitamin-Direktvertrieb'],
      },
    ],
  },
  {
    id: 'c4',
    name: 'Monika Richter',
    role: 'Betroffene — chronischer Vitamin-B12-Mangel',
    type: 'person',
    expertise: ['Patientenerfahrung', 'Vitamin B12', 'Vegane Ernährung'],
    knownBy: ['r1'],
    sourceNote: 'Leserin, hat sich nach Artikel zu B12-Mangel gemeldet',
    convHistory: [
      {
        id: 'cv5',
        date: '2024-02-10',
        redakteurId: 'r1',
        redakteurName: 'Lea Ullmann',
        summary: 'Monika schildert ihren jahrelangen unentdeckten B12-Mangel und die Auswirkungen auf ihre Gesundheit. Bereit für Erfahrungsbericht.',
      },
    ],
  },

  // --- Szenario 2: Vitamin Startup ---
  {
    id: 'c5',
    name: 'Dr. Petra Koch',
    role: 'Chemikerin – Lebensmitteltechnologie',
    type: 'expert',
    expertise: ['Vitamin-Synthese', 'Lebensmittelchemie', 'Bioverfügbarkeit', 'Qualitätssicherung'],
    knownBy: ['r2'],
    email: 'p.koch@tum.de',
    phone: '+49 89 289 0000',
    sourceNote: 'Professorin an der TU München, Fachbereich Lebensmittelchemie',
    convHistory: [
      {
        id: 'cv6',
        date: '2023-10-12',
        redakteurId: 'r2',
        redakteurName: 'Markus Berger',
        summary: 'Erläuterung der Unterschiede zwischen synthetischen und natürlichen Vitaminen. Dr. Koch betont: „Für den Körper ist die Quelle oft irrelevant."',
      },
    ],
  },
  {
    id: 'c6',
    name: 'Stefan Neumann',
    role: 'Geschäftsführer – BioSupply AG',
    type: 'company',
    expertise: ['Lieferketten', 'Rohstoffe', 'Vitaminproduktion', 'B2B-Handel'],
    knownBy: ['r2'],
    email: 's.neumann@biosupply.de',
    sourceNote: 'Größter regionaler Vitamin-Rohstofflieferant',
    convHistory: [
      {
        id: 'cv7',
        date: '2023-12-01',
        redakteurId: 'r2',
        redakteurName: 'Markus Berger',
        summary: 'Gespräch über Lieferkettenprobleme nach Covid. Preise für Rohstoffe stiegen um bis zu 60%.',
        articles: ['Nahrungsergänzung: Warum Vitamine teurer werden'],
      },
    ],
  },
  {
    id: 'c7',
    name: 'Eva Zimmermann',
    role: 'Investorin – Health & Wellness Ventures',
    type: 'institution',
    expertise: ['Startup-Finanzierung', 'Health-Tech', 'Wachstumsmärkte', 'Venture Capital'],
    knownBy: ['r2'],
    email: 'e.zimmermann@hwv.de',
    phone: '+49 89 456 7890',
    sourceNote: 'Lead-Investorin bei mehreren Health-Startups',
    convHistory: [
      {
        id: 'cv8',
        date: '2024-01-08',
        redakteurId: 'r2',
        redakteurName: 'Markus Berger',
        summary: 'Einschätzung zum Markt für Vitamin-Startups. Zimmermann sieht gesättigten Markt, aber Nischen in personalisierten Supplements.',
      },
    ],
  },
  {
    id: 'c8',
    name: 'Andreas Lenz',
    role: 'BWL-Professor – Unternehmertum',
    type: 'expert',
    expertise: ['Gründungsberatung', 'Businessplan', 'Skalierung', 'Lean Startup'],
    knownBy: ['r2'],
    email: 'a.lenz@lmu.de',
    sourceNote: 'Lehrstuhl für Entrepreneurship, LMU München',
    convHistory: [],
  },

  // --- Szenario 3: Lokalpolitik ---
  {
    id: 'c9',
    name: 'Bürgermeister Harald Fuchs',
    role: 'Erster Bürgermeister der Stadt',
    type: 'institution',
    expertise: ['Stadtpolitik', 'Bauleitplanung', 'Haushalt', 'Kommunalrecht'],
    knownBy: ['r3'],
    email: 'buergermeister@stadtmuenchen.de',
    phone: '+49 89 233 20000',
    sourceNote: 'Amtierend seit 2020, SPD',
    convHistory: [
      {
        id: 'cv9',
        date: '2024-03-15',
        redakteurId: 'r3',
        redakteurName: 'Nina Schreiber',
        summary: 'Pressekonferenz zum Jahreshaushalt. Fuchs verteidigt Investitionen in neue Schulen trotz Spardrucks.',
        articles: ['Stadt München: Haushalt 2024 verabschiedet'],
      },
    ],
  },
  {
    id: 'c10',
    name: 'Stadträtin Maria Hoffmann',
    role: 'Stadträtin – Vorsitzende Bauausschuss',
    type: 'institution',
    expertise: ['Stadtplanung', 'Wohnungsbau', 'Nachhaltigkeit', 'Bebauungsplan'],
    knownBy: ['r3', 'r4'],
    email: 'm.hoffmann@stadtrat.de',
    sourceNote: 'CSU-Fraktion, sehr zugänglich für Medienanfragen',
    convHistory: [
      {
        id: 'cv10',
        date: '2024-02-28',
        redakteurId: 'r3',
        redakteurName: 'Nina Schreiber',
        summary: 'Interview zur geplanten Wohnbebauung am Stadtrand. Hoffmann betont Notwendigkeit von Sozialwohnungen.',
      },
    ],
  },
  {
    id: 'c11',
    name: 'Klaus Baumann',
    role: 'Stadtplaner – Referat für Stadtplanung',
    type: 'institution',
    expertise: ['Bauleitplanung', 'Flächennutzungsplan', 'Verkehrsplanung', 'GIS'],
    knownBy: ['r3'],
    email: 'k.baumann@stadtplanung.de',
    phone: '+49 89 233 45678',
    sourceNote: 'Abteilungsleiter im städtischen Planungsreferat',
    convHistory: [
      {
        id: 'cv11',
        date: '2023-11-20',
        redakteurId: 'r3',
        redakteurName: 'Nina Schreiber',
        summary: 'Technische Erläuterungen zum neuen Flächennutzungsplan. Baumann zeigt Karten der geplanten Grünflächen.',
      },
    ],
  },
  {
    id: 'c12',
    name: 'Rechtsanwalt Dr. Felix Brand',
    role: 'Fachanwalt für Verwaltungsrecht',
    type: 'expert',
    expertise: ['Kommunalrecht', 'Verwaltungsrecht', 'Bebauungsrecht', 'Klagen gegen Stadt'],
    knownBy: ['r3'],
    email: 'f.brand@kanzlei-brand.de',
    phone: '+49 89 789 0123',
    sourceNote: 'Hat mehrere erfolgreiche Klagen gegen städtische Beschlüsse geführt',
    convHistory: [
      {
        id: 'cv12',
        date: '2024-01-15',
        redakteurId: 'r3',
        redakteurName: 'Nina Schreiber',
        summary: 'Einschätzung zur Rechtmäßigkeit des geplanten Neubaugebiets. Brand sieht Angriffspunkte im Umweltschutzgutachten.',
        articles: ['Neubaugebiet Stadtrand: Klage eingereicht'],
      },
    ],
  },

  // --- Neue Kontakte: Szenario 1 Erweiterung (Vitamin Mangel – großes Netz) ---
  {
    id: 'c13',
    name: 'Prof. Dr. Werner Scholz',
    role: 'Ernährungswissenschaftler – TU Berlin',
    type: 'expert',
    expertise: ['Ernährungswissenschaft', 'Vitaminmangel', 'Mikronährstoffe', 'Klinische Studien'],
    knownBy: ['r1', 'r2'],
    email: 'w.scholz@tu-berlin.de',
    phone: '+49 30 314 23456',
    sourceNote: 'Lehrstuhlinhaber Ernährungswissenschaften, publiziert regelmäßig zu Vitaminmangel-Studien',
    convHistory: [
      {
        id: 'cv13',
        date: '2023-06-20',
        redakteurId: 'r1',
        redakteurName: 'Lea Ullmann',
        summary: 'Hintergrundgespräch zur Metaanalyse über Vitaminmangel in der deutschen Bevölkerung. Scholz betont, dass Vitamin-D und B12 am häufigsten unterschätzt werden.',
        articles: ['Vitaminmangel in Deutschland: Neue Studie alarmiert Experten'],
      },
      {
        id: 'cv14',
        date: '2024-03-10',
        redakteurId: 'r2',
        redakteurName: 'Markus Berger',
        summary: 'Interview zur Zusammenarbeit mit der Vitamin-Industrie. Scholz äußert Bedenken über Interessenkonflikte in der Forschungsfinanzierung.',
      },
    ],
  },
  {
    id: 'c14',
    name: 'Sandra Kraus',
    role: 'Ernährungsberaterin & Gesundheitsbloggerin',
    type: 'person',
    expertise: ['Ernährungsberatung', 'Vitamine', 'Vegane Ernährung', 'Social Media', 'Selbsterfahrung'],
    knownBy: ['r1', 'r4'],
    email: 's.kraus@vitalblog.de',
    sourceNote: 'Betreibt Blog "VitalKitchen" mit 80.000 Lesern, selbst von Vitamin-D-Mangel betroffen',
    convHistory: [
      {
        id: 'cv15',
        date: '2024-01-05',
        redakteurId: 'r1',
        redakteurName: 'Lea Ullmann',
        summary: 'Sandra berichtet über ihre eigene Diagnose und den Community-Effekt: Tausende Leser teilten ähnliche Erfahrungen nach ihrem Artikel über B12-Mangel.',
        articles: ['Wenn der Körper schreit: Vitamin-B12-Mangel erkennen'],
      },
      {
        id: 'cv16',
        date: '2024-04-22',
        redakteurId: 'r4',
        redakteurName: 'Jonas Kiefer',
        summary: 'Gespräch über Wellness-Trends in der Stadtszene. Sandra kritisiert unkritischen Vitamin-Hype in sozialen Medien.',
      },
    ],
  },
  {
    id: 'c15',
    name: 'Dr. Klaus Engel',
    role: 'Allgemeinmediziner & Hausarzt',
    type: 'expert',
    expertise: ['Hausarztmedizin', 'Vitamindiagnostik', 'Blutbild', 'Prävention', 'Patientenaufklärung'],
    knownBy: ['r1'],
    email: 'dr.engel@hausarztpraxis-muenchen.de',
    phone: '+49 89 456 1234',
    sourceNote: 'Hausarzt in München-Schwabing, behandelt täglich Patienten mit Vitaminmangeldiagnosen',
    convHistory: [
      {
        id: 'cv17',
        date: '2023-12-05',
        redakteurId: 'r1',
        redakteurName: 'Lea Ullmann',
        summary: 'Dr. Engel erklärt, warum Vitaminmangel im Blutbild oft spät erkannt wird. Kassenärzte haben nur begrenzte Budgets für Labordiagnostik.',
        articles: ['Vitaminmangel: Warum der Arztbesuch zu spät kommt'],
      },
      {
        id: 'cv18',
        date: '2024-02-18',
        redakteurId: 'r1',
        redakteurName: 'Lea Ullmann',
        summary: 'Follow-up zu Fallzahlen in seiner Praxis: 3 von 10 Patienten über 50 zeigen Vitamin-D-Werte unter dem Normbereich.',
      },
    ],
  },
  {
    id: 'c16',
    name: 'Karin Metz',
    role: 'Leiterin Prävention – AOK Bayern',
    type: 'institution',
    expertise: ['Krankenkasse', 'Prävention', 'Gesundheitspolitik', 'Kassenleistungen', 'Vitaminprogramme'],
    knownBy: ['r1', 'r3'],
    email: 'k.metz@aok-bayern.de',
    phone: '+49 89 627 00',
    sourceNote: 'AOK Bayern ist größte Krankenkasse im Freistaat, Metz leitet Präventionsabteilung seit 2019',
    convHistory: [
      {
        id: 'cv19',
        date: '2023-09-15',
        redakteurId: 'r1',
        redakteurName: 'Lea Ullmann',
        summary: 'Metz erklärt, warum die AOK Vitamin-D-Tests nur bei ärztlich begründetem Verdacht übernimmt. Debatte über Ausweitung der Kassenleistungen.',
        articles: ['Krankenkassen und Vitamine: Was wird wirklich bezahlt?'],
      },
    ],
  },
  {
    id: 'c17',
    name: 'Julian Frick',
    role: 'Health & Fitness Influencer (210k Follower)',
    type: 'person',
    expertise: ['Social Media', 'Fitness', 'Nahrungsergänzung', 'Health Marketing', 'Community'],
    knownBy: ['r4', 'r2'],
    email: 'julian@frickfit.de',
    sourceNote: 'Instagram-Influencer @JulianFrickFit, hat Kooperation mit VitaBoost GmbH (c3) und promotet Vitamin-Supplements',
    convHistory: [
      {
        id: 'cv20',
        date: '2024-03-01',
        redakteurId: 'r4',
        redakteurName: 'Jonas Kiefer',
        summary: 'Julian spricht über bezahlte Kooperationen mit Supplement-Herstellern. Transparenz-Debatte: Wie erkennbar sind Werbepostings?',
        articles: ['Influencer und Vitamine: Werbung ohne Grenzen?'],
      },
      {
        id: 'cv21',
        date: '2024-04-10',
        redakteurId: 'r2',
        redakteurName: 'Markus Berger',
        summary: 'VitaBoost-Kooperation aus Wirtschaftsperspektive: Julian bestätigt 5-stellige Monatshonorare. Markt für Influencer-Marketing im Supplement-Bereich boomt.',
      },
    ],
  },
  {
    id: 'c18',
    name: 'BioVit GmbH',
    role: 'Hersteller – Vitamin-Kapseln & Nahrungsergänzung',
    type: 'company',
    expertise: ['Vitaminproduktion', 'Nahrungsergänzung', 'GMP-Zertifizierung', 'B2B-Handel', 'Einzelhandel'],
    knownBy: ['r2'],
    email: 'info@biovit-gmbh.de',
    phone: '+49 89 100 2020',
    sourceNote: 'Mittelständischer Hersteller aus dem Münchner Umland, beliefert u.a. Apotheken und Bioläden. Lieferant von Thomas Huber (c2).',
    convHistory: [
      {
        id: 'cv22',
        date: '2023-11-08',
        redakteurId: 'r2',
        redakteurName: 'Markus Berger',
        summary: 'Interview mit Geschäftsführer Bernd Kohl: BioVit setzt auf regionale Rohstoffe und kritisiert Billigimporte aus Asien. Umsatz 2023 bei 12 Mio. Euro.',
        articles: ['BioVit: Regionale Vitamine als Gegenentwurf zum Massenmarkt'],
      },
    ],
  },
];

// --- Echte Personen aus Design-Sprint-Kurs ---

export const persons: Person[] = [
  {
    id: 'p1',
    name: 'Lukas Speidel',
    role: 'UX Researcher – Praktikum bei Bosch',
    type: 'student',
    expertise: ['UX Research', 'Automotive', 'Hardware', 'Figma', 'Kontaktnetzwerke'],
    knownBy: [],
    email: 'lukas.speidel@student.hfg-gmuend.de',
    sourceNote: 'Design-Sprint-Kurs 2026, Praktikum bei Robert Bosch GmbH (Abstatt)',
    convHistory: [],
    company: 'Robert Bosch GmbH',
    companyIndustry: ['Automotive', 'Hardware & Sensoren', 'Industrietechnik'],
    hometown: 'Tübingen',
    favoriteDesignTool: 'Figma',
    projectTheme: 'Kontaktnetzwerke im Kontext von Journalismus',
    semester: 6,
    studyProgram: 'Interaktionsgestaltung',
    relatedPersonIds: ['p2', 'p5', 'p7', 'p8'],
  },
  {
    id: 'p2',
    name: 'Bruno Gross',
    role: 'UI/UX Designer – Praktikum bei BMW',
    type: 'student',
    expertise: ['UI/UX Design', 'Automotive', 'Mobilität', 'TouchDesigner', 'Kontaktnetzwerke'],
    knownBy: [],
    email: 'bruno.gross@student.hfg-gmuend.de',
    sourceNote: 'Design-Sprint-Kurs 2026, Praktikum bei BMW AG (München)',
    convHistory: [],
    company: 'Bayerische Motorenwerke AG (BMW)',
    companyIndustry: ['Automotive', 'Mobilität', 'Elektromobilität'],
    hometown: 'Dachau',
    favoriteDesignTool: 'TouchDesigner',
    projectTheme: 'Kontaktnetzwerke im Kontext von Journalismus',
    semester: 6,
    studyProgram: 'Interaktionsgestaltung',
    relatedPersonIds: ['p1', 'p5', 'p7', 'p8'],
  },
  {
    id: 'p3',
    name: 'Annalena Stein',
    role: 'UX/UI Designerin – Praktikum bei Carl Zeiss SMT',
    type: 'student',
    expertise: ['UX/UI Design', 'Medizintechnik', 'Optik', 'Circadianer Rhythmus', 'Gesundheit'],
    knownBy: [],
    email: 'annalena.stein@student.hfg-gmuend.de',
    sourceNote: 'Design-Sprint-Kurs 2026, Praktikum bei Carl Zeiss SMT (Oberkochen)',
    convHistory: [],
    company: 'Carl Zeiss SMT GmbH',
    companyIndustry: ['Medizintechnik', 'Optik', 'Halbleitertechnik'],
    hometown: 'Abtsgmünd',
    favoriteDesignTool: 'Figma',
    projectTheme: 'Circadianer Rhythmus',
    semester: 6,
    studyProgram: 'Interaktionsgestaltung',
    relatedPersonIds: ['p4', 'p7', 'p8'],
  },
  {
    id: 'p4',
    name: 'Lisa-Marie Rapp',
    role: 'UI/UX Designerin – Praktikum bei Siegmund Design',
    type: 'student',
    expertise: ['UI/UX Design', 'Haustiergesundheit', 'Tierernährung', 'Produktdesign'],
    knownBy: [],
    email: 'lisa.rapp@student.hfg-gmuend.de',
    sourceNote: 'Design-Sprint-Kurs 2026, Praktikum bei Siegmund Design GmbH (Stuttgart)',
    convHistory: [],
    company: 'Siegmund Design GmbH',
    companyIndustry: ['Design', 'Produktgestaltung'],
    hometown: 'Deggingen',
    favoriteDesignTool: 'Figma & InDesign',
    projectTheme: 'Haustiergesundheit und -haltung',
    semester: 6,
    studyProgram: 'Interaktionsgestaltung',
    relatedPersonIds: ['p3'],
  },
  {
    id: 'p5',
    name: 'Jens Döring',
    role: 'Designer – Praktikum bei 2av GmbH',
    type: 'student',
    expertise: ['Service Design', 'Design Education', 'Konzeptentwicklung'],
    knownBy: [],
    email: 'jens.doering@student.hfg-gmuend.de',
    sourceNote: 'Design-Sprint-Kurs 2026, Praktikum bei 2av GmbH (Ulm)',
    convHistory: [],
    company: '2av GmbH',
    companyIndustry: ['Design', 'Medien'],
    hometown: 'Dresden',
    favoriteDesignTool: 'Kopf',
    projectTheme: 'Diverses',
    semester: 77,
    studyProgram: 'Design & Technology',
    relatedPersonIds: ['p1', 'p2', 'p7'],
  },
  {
    id: 'p6',
    name: 'Maria Kamenskaya',
    role: 'UX/UI Designerin – Praktikum bei forwerts',
    type: 'student',
    expertise: ['UX/UI Design', 'Forstwirtschaft', 'Umwelt', 'Nachhaltigkeit'],
    knownBy: [],
    email: 'maria.kamenskaya@student.hfg-gmuend.de',
    sourceNote: 'Design-Sprint-Kurs 2026, Praktikum bei forwerts (Frankfurt)',
    convHistory: [],
    company: 'forwerts GmbH',
    companyIndustry: ['Beratung', 'Nachhaltigkeit'],
    hometown: 'Ibbenbüren (NRW)',
    favoriteDesignTool: 'Figma',
    projectTheme: 'Forstwirtschaft',
    semester: 6,
    studyProgram: 'Interaktionsgestaltung',
    relatedPersonIds: [],
  },
  {
    id: 'p7',
    name: 'Lea Ullmann',
    role: 'Ausstellungsgestalterin – Praktikum bei 2av',
    type: 'student',
    expertise: ['Ausstellungsgestaltung', 'Unverträglichkeiten', 'Morbus Crohn', 'Ernährung', 'Vitaminmangel'],
    knownBy: [],
    email: 'lea.ullmann@student.hfg-gmuend.de',
    sourceNote: 'Design-Sprint-Kurs 2026, Praktikum bei 2av GmbH (Ulm). Persönliche Betroffenheit durch Ernährungsunverträglichkeiten.',
    convHistory: [],
    company: '2av GmbH',
    companyIndustry: ['Design', 'Medien'],
    hometown: 'Hegau',
    favoriteDesignTool: 'Figma',
    projectTheme: 'Unverträglichkeiten mit Morbus Crohn',
    semester: 6,
    studyProgram: 'Interaktionsgestaltung',
    relatedPersonIds: ['p1', 'p2', 'p5', 'p8'],
  },
  {
    id: 'p8',
    name: 'Yasmin Hähnel',
    role: 'UX/UI Designerin – Praktikum bei 21TORR',
    type: 'student',
    expertise: ['UX/UI Design', 'Unverträglichkeiten', 'Morbus Crohn', 'Ernährung', 'Yoga'],
    knownBy: [],
    email: 'yasmin.haehnel@student.hfg-gmuend.de',
    sourceNote: 'Design-Sprint-Kurs 2026, Praktikum bei 21TORR GmbH (Stuttgart). Gleiche Herkunftsregion Hegau wie Lea Ullmann, gleiches Projektthema.',
    convHistory: [],
    company: '21TORR GmbH',
    companyIndustry: ['Digital Marketing', 'UX/UI'],
    hometown: 'Hegau',
    favoriteDesignTool: 'Figma',
    projectTheme: 'Unverträglichkeiten mit Morbus Crohn',
    semester: 6,
    studyProgram: 'Interaktionsgestaltung',
    relatedPersonIds: ['p3', 'p7'],
  },
];

// --- Topic Nodes ---

export const topicNodes: TopicNode[] = [
  // Szenario 1: Vitamin Mangel (erweitertes Netzwerk)
  // Positionen werden von D3-Force berechnet — alle starten bei 0,0
  { id: 't1', label: 'Gesundheit', relatedTopics: ['t2', 't3', 't4', 't17', 't18', 't19', 't20', 't21', 't22'], contactIds: [], position: { x: 0, y: 0 } },
  { id: 't2', label: 'Vitaminmangel', parentId: 't1', relatedTopics: ['t1', 't3', 't17', 't18'], contactIds: ['c1', 'c2', 'c4', 'c13', 'c15', 'p7', 'p8'], position: { x: 0, y: 0 } },
  { id: 't3', label: 'Medikamente & Supplements', parentId: 't1', relatedTopics: ['t1', 't2', 't5', 't20', 't21'], contactIds: ['c2', 'c3', 'c17', 'c18'], position: { x: 0, y: 0 } },
  { id: 't4', label: 'Haustiergesundheit', parentId: 't1', relatedTopics: ['t1', 't22'], contactIds: ['p4'], position: { x: 0, y: 0 } },

  // Szenario 2: Vitamin Startup
  { id: 't5', label: 'Wirtschaft', relatedTopics: ['t6', 't7', 't8', 't9'], contactIds: [], position: { x: 0, y: 0 } },
  { id: 't6', label: 'Vitamin Startup', parentId: 't5', relatedTopics: ['t5', 't7'], contactIds: ['c3', 'c6', 'c7'], position: { x: 0, y: 0 } },
  { id: 't7', label: 'Chemie & Produktion', parentId: 't5', relatedTopics: ['t5', 't6'], contactIds: ['c5', 'c6'], position: { x: 0, y: 0 } },
  { id: 't8', label: 'Geschäftsführung', parentId: 't5', relatedTopics: ['t5', 't9'], contactIds: ['c6', 'c8'], position: { x: 0, y: 0 } },
  { id: 't9', label: 'BWL & Finanzen', parentId: 't5', relatedTopics: ['t5', 't8'], contactIds: ['c7', 'c8'], position: { x: 0, y: 0 } },

  // Szenario 3: Lokalpolitik
  { id: 't10', label: 'Lokalpolitik', relatedTopics: ['t11', 't12', 't13'], contactIds: [], position: { x: 0, y: 0 } },
  { id: 't11', label: 'Stadtrat', parentId: 't10', relatedTopics: ['t10', 't12'], contactIds: ['c9', 'c10'], position: { x: 0, y: 0 } },
  { id: 't12', label: 'Bauleitplanung', parentId: 't10', relatedTopics: ['t10', 't11', 't13'], contactIds: ['c10', 'c11', 'c12'], position: { x: 0, y: 0 } },
  { id: 't13', label: 'Verwaltung & Recht', parentId: 't10', relatedTopics: ['t10', 't12'], contactIds: ['c11', 'c12'], position: { x: 0, y: 0 } },

  // Szenario 1 Erweiterung: Vitamin Mangel — große Netzwerk-Topics
  { id: 't17', label: 'Ernährungswissenschaft', parentId: 't1', relatedTopics: ['t1', 't2', 't18'], contactIds: ['c1', 'c13', 'c14', 'p7', 'p8'], position: { x: 0, y: 0 } },
  { id: 't18', label: 'Hausarztmedizin', parentId: 't1', relatedTopics: ['t1', 't17', 't19'], contactIds: ['c15', 'c4', 'p7'], position: { x: 0, y: 0 } },
  { id: 't19', label: 'Krankenkassen & Prävention', parentId: 't1', relatedTopics: ['t1', 't18'], contactIds: ['c16', 'c1'], position: { x: 0, y: 0 } },
  { id: 't20', label: 'Social Media & Health', parentId: 't1', relatedTopics: ['t1', 't3'], contactIds: ['c17', 'c14'], position: { x: 0, y: 0 } },
  { id: 't21', label: 'Produktion & Hersteller', parentId: 't1', relatedTopics: ['t3', 't6'], contactIds: ['c18', 'c2'], position: { x: 0, y: 0 } },
  { id: 't22', label: 'Haustiergesundheit', parentId: 't1', relatedTopics: ['t1', 't17'], contactIds: ['p4', 'p3'], position: { x: 0, y: 0 } },

  // Szenario 4: Automotive (echte Personen)
  { id: 't14', label: 'Industrie & Technologie', relatedTopics: ['t15', 't16'], contactIds: [], position: { x: 0, y: 0 } },
  { id: 't15', label: 'Automotive', parentId: 't14', relatedTopics: ['t14', 't16'], contactIds: ['p1', 'p2'], position: { x: 0, y: 0 } },
  { id: 't16', label: 'Hardware & Sensoren', parentId: 't14', relatedTopics: ['t14', 't15'], contactIds: ['p1', 'p3'], position: { x: 0, y: 0 } },
];

// --- Suchszenarien ---

export const searchScenarios: SearchScenario[] = [
  {
    query: 'Vitamin Mangel',
    topicIds: ['t1', 't2', 't3', 't4'],
    highlightedTopicId: 't2',
  },
  {
    query: 'Vitamin Startup',
    topicIds: ['t5', 't6', 't7', 't8', 't9'],
    highlightedTopicId: 't6',
  },
  {
    query: 'Lokalpolitik',
    topicIds: ['t10', 't11', 't12', 't13'],
    highlightedTopicId: 't10',
  },
  {
    query: 'Automotive',
    topicIds: ['t14', 't15', 't16'],
    highlightedTopicId: 't15',
  },
];

// --- Hilfsfunktionen ---

// Alle Kontakte inkl. echte Personen — für einheitliche Lookup-Funktion
export const allContacts: Contact[] = [...contacts, ...persons];

export function getContactById(id: string): Contact | undefined {
  return allContacts.find((c) => c.id === id);
}

export function getPersonById(id: string): Person | undefined {
  return persons.find((p) => p.id === id);
}

export function getTopicById(id: string): TopicNode | undefined {
  return topicNodes.find((t) => t.id === id);
}

export function getRedakteurById(id: string): Redakteur | undefined {
  return redakteure.find((r) => r.id === id);
}

export function getContactsForTopic(topicId: string): Contact[] {
  const topic = getTopicById(topicId);
  if (!topic) return [];
  return topic.contactIds.map((id) => getContactById(id)).filter((c): c is Contact => !!c);
}

export function getRelatedPersons(personId: string): Person[] {
  const person = getPersonById(personId);
  if (!person) return [];
  return person.relatedPersonIds.map((id) => getPersonById(id)).filter((p): p is Person => !!p);
}

// --- Such-Index für Fuzzy-Matching ---

interface SearchIndexEntry {
  label: string;
  scenarioQuery: string;
  topicIds: string[];
  highlightedTopicId?: string;
}

// Alle durchsuchbaren Begriffe pro Szenario aggregieren
function buildSearchIndex(): SearchIndexEntry[] {
  const entries: SearchIndexEntry[] = [];

  for (const scenario of searchScenarios) {
    const scenarioTopics = topicNodes.filter((t) => scenario.topicIds.includes(t.id));
    const contactIdsInScenario = new Set(scenarioTopics.flatMap((t) => t.contactIds));
    const contactsInScenario = allContacts.filter((c) => contactIdsInScenario.has(c.id));

    // Szenario-Query selbst
    entries.push({
      label: scenario.query,
      scenarioQuery: scenario.query,
      topicIds: scenario.topicIds,
      highlightedTopicId: scenario.highlightedTopicId,
    });

    // Topic-Labels
    for (const topic of scenarioTopics) {
      entries.push({
        label: topic.label,
        scenarioQuery: scenario.query,
        topicIds: scenario.topicIds,
        highlightedTopicId: topic.id,
      });
    }

    // Kontaktnamen + Rollen + Expertise-Tags
    for (const contact of contactsInScenario) {
      entries.push({
        label: contact.name,
        scenarioQuery: scenario.query,
        topicIds: scenario.topicIds,
        highlightedTopicId: scenario.highlightedTopicId,
      });
      entries.push({
        label: contact.role,
        scenarioQuery: scenario.query,
        topicIds: scenario.topicIds,
        highlightedTopicId: scenario.highlightedTopicId,
      });
      for (const tag of contact.expertise) {
        entries.push({
          label: tag,
          scenarioQuery: scenario.query,
          topicIds: scenario.topicIds,
          highlightedTopicId: scenario.highlightedTopicId,
        });
      }
    }
  }

  return entries;
}

// Fuse-Instanz lazy initialisieren (einmalig gecacht)
let fuseInstance: Fuse<SearchIndexEntry> | null = null;

function getFuse(): Fuse<SearchIndexEntry> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(buildSearchIndex(), {
      keys: ['label'],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export function findScenarioByQuery(query: string): SearchScenario | undefined {
  const trimmed = query.trim();
  if (!trimmed) return undefined;

  // 1. Exakter Substring-Match auf Szenario-Queries (wie bisher)
  const lower = trimmed.toLowerCase();
  const exact = searchScenarios.find(
    (s) => s.query.toLowerCase().includes(lower) || lower.includes(s.query.toLowerCase())
  );
  if (exact) return exact;

  // 2. Fuzzy-Match über den Search-Index
  const results = getFuse().search(trimmed);
  if (results.length === 0) return undefined;

  const best = results[0].item;
  return {
    query: best.scenarioQuery,
    topicIds: best.topicIds,
    highlightedTopicId: best.highlightedTopicId,
  };
}

export const SEARCH_SUGGESTIONS = [
  'Vitamin Mangel',
  'Vitamin Startup',
  'Lokalpolitik',
  'Automotive',
];
