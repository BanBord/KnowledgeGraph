// Alle TypeScript-Interfaces für das Redaktions-Netzwerk-Tool

export type ContactType = 'expert' | 'institution' | 'company' | 'person' | 'journalist';

export interface Contact {
  id: string;
  name: string;
  role: string;                  // z.B. "Ärztin – Fachgebiet Vitamine"
  type: ContactType;
  expertise: string[];           // Themen-Tags
  knownBy: string[];             // IDs der Redakteure die ihn kennen
  email?: string;
  phone?: string;
  sourceNote?: string;           // Woher kommt der Kontakt ursprünglich
  convHistory: ConvEntry[];
}

export interface ConvEntry {
  id: string;
  date: string;
  redakteurId: string;
  redakteurName: string;
  summary: string;
  articles?: string[];
}

export interface Redakteur {
  id: string;
  name: string;
  ressort: string;
}

export interface TopicNode {
  id: string;
  label: string;
  parentId?: string;             // Für Subtopic-Hierarchie
  relatedTopics: string[];
  contactIds: string[];
  position: { x: number; y: number };
}

export interface SearchScenario {
  query: string;
  topicIds: string[];
  highlightedTopicId?: string;
}

// React Flow Node-Daten-Typen
export interface TopicNodeData {
  label: string;
  topicId: string;
  contactCount: number;
  isActive: boolean;
  isHub: boolean;            // true wenn kein parentId → Hub-Topic
}

export interface ContactNodeData {
  contact: Contact;
  isActive: boolean;
  familiarityLevel: number;  // knownBy.length → Hintergrundfarbe-Wärme
}

// React Flow Edge-Daten-Typ
export interface NetworkEdgeData {
  active?: boolean;
  weight?: number;           // convHistory.length → Kantendicke
}
