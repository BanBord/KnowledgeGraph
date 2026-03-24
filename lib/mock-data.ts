// Alle Mock-Daten zentral — keine Daten in Komponenten hartcodieren
import { Contact, Redakteur, TopicNode, SearchScenario } from '@/types';

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
];

// --- Topic Nodes ---

export const topicNodes: TopicNode[] = [
  // Szenario 1: Vitamin Mangel
  { id: 't1', label: 'Gesundheit', relatedTopics: ['t2', 't3', 't4'], contactIds: [], position: { x: 400, y: 300 } },
  { id: 't2', label: 'Vitaminmangel', parentId: 't1', relatedTopics: ['t1', 't3'], contactIds: ['c1', 'c2', 'c4'], position: { x: 200, y: 150 } },
  { id: 't3', label: 'Medikamente & Supplements', parentId: 't1', relatedTopics: ['t1', 't2', 't5'], contactIds: ['c2', 'c3'], position: { x: 600, y: 150 } },
  { id: 't4', label: 'Haustiergesundheit', parentId: 't1', relatedTopics: ['t1'], contactIds: [], position: { x: 700, y: 400 } },

  // Szenario 2: Vitamin Startup
  { id: 't5', label: 'Wirtschaft', relatedTopics: ['t6', 't7', 't8', 't9'], contactIds: [], position: { x: 400, y: 300 } },
  { id: 't6', label: 'Vitamin Startup', parentId: 't5', relatedTopics: ['t5', 't7'], contactIds: ['c3', 'c6', 'c7'], position: { x: 200, y: 150 } },
  { id: 't7', label: 'Chemie & Produktion', parentId: 't5', relatedTopics: ['t5', 't6'], contactIds: ['c5', 'c6'], position: { x: 600, y: 150 } },
  { id: 't8', label: 'Geschäftsführung', parentId: 't5', relatedTopics: ['t5', 't9'], contactIds: ['c6', 'c8'], position: { x: 200, y: 450 } },
  { id: 't9', label: 'BWL & Finanzen', parentId: 't5', relatedTopics: ['t5', 't8'], contactIds: ['c7', 'c8'], position: { x: 600, y: 450 } },

  // Szenario 3: Lokalpolitik
  { id: 't10', label: 'Lokalpolitik', relatedTopics: ['t11', 't12', 't13'], contactIds: [], position: { x: 400, y: 300 } },
  { id: 't11', label: 'Stadtrat', parentId: 't10', relatedTopics: ['t10', 't12'], contactIds: ['c9', 'c10'], position: { x: 200, y: 150 } },
  { id: 't12', label: 'Bauleitplanung', parentId: 't10', relatedTopics: ['t10', 't11', 't13'], contactIds: ['c10', 'c11', 'c12'], position: { x: 600, y: 150 } },
  { id: 't13', label: 'Verwaltung & Recht', parentId: 't10', relatedTopics: ['t10', 't12'], contactIds: ['c11', 'c12'], position: { x: 400, y: 500 } },
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
];

// --- Hilfsfunktionen ---

export function getContactById(id: string): Contact | undefined {
  return contacts.find((c) => c.id === id);
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

export function findScenarioByQuery(query: string): SearchScenario | undefined {
  const lower = query.toLowerCase().trim();
  return searchScenarios.find((s) => s.query.toLowerCase().includes(lower) || lower.includes(s.query.toLowerCase()));
}

export const SEARCH_SUGGESTIONS = [
  'Vitamin Mangel',
  'Vitamin Startup',
  'Lokalpolitik',
];
