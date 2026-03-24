# CLAUDE.md — Redaktions-Netzwerk-Tool

## Was dieses Produkt ist

Ein **journalistisches Recherche-Netzwerk-Tool** für Lokalredaktionen.

### Das Problem
Lokaljournalisten haben kollektiv riesige Kontaktnetzwerke — aber diese Netzwerke
sind fragmentiert und analog. Redakteur A kennt Person X, Redakteur B nicht.
Wenn Redakteur B zu einem Thema recherchieren muss, fragt er mündlich in der
Redaktion nach — oder er findet die Quelle gar nicht.

### Die Lösung
Ein digitales, semantisch durchsuchbares Netzwerk-Interface, das zeigt:
- **Welche Kontakte** in der Redaktion zu einem Thema verfügbar sind
- **Wie diese Kontakte miteinander verbunden sind** (Themen, Expertise, Beziehungen)
- **Welcher Redakteur** diesen Kontakt kennt und wie man ihn erreicht

### Der konkrete Nutzer-Flow (MVP-Fokus)
```
[Konferenz: Redakteur bekommt ein Thema zugeteilt]
    ↓
[Er öffnet das Tool und gibt sein Thema ein — z.B. "Vitamin Mangel"]
    ↓
[Ein Knowledge-Graph öffnet sich als Canvas]
    ↓
[Der Graph zeigt: verwandte Themenfelder als Nodes, verbunden durch Kanten]
    ↓
[Zoom in ein Themenfeld → zeigt verfügbare Kontakte/Quellen in diesem Bereich]
    ↓
[Klick auf Kontakt → zeigt: Wer ist das? Expertise? Welcher Kollege kennt ihn?
                              Kontaktweg? Frühere Gespräche in der Redaktion?]
    ↓
[Redakteur hat seine Quelle gefunden und kann die Recherche starten]
```

---

## Design-Philosophie: Obsidian als Referenz

**Primäre Design-Inspiration:** [Obsidian](https://obsidian.md/) — der Knowledge-Graph-Editor.

### Was wir von Obsidian übernehmen
- **Dunkles Canvas** als primäre Umgebung (kein helles weißes UI)
- **Graph-View als Herzstück**: Nodes und Edges als visuelle Sprache
- **Zoom-Interaktion**: Von Übersicht (Themenfelder) zu Detail (Kontakte)
- **Minimalistisches UI**: Das Interface tritt zurück, der Graph steht im Vordergrund
- **Informationsdichte**: Kompakte Nodes, viele Infos auf wenig Fläche
- **Keyboard-freundlich**: Suchfeld im Fokus, schnelle Navigation

### Was wir NICHT von Obsidian übernehmen
- Kein Markdown-Editor — wir sind read-focused, nicht write-focused
- Kein Datei-System — wir haben strukturierte Daten, keine Notizen
- Keine Plugin-Architektur — wir bauen einen fokussierten Prototypen

### Figma-Wireframes: NUR Funktionsreferenz
Die Figma-Wireframes (`lean_design_claude`) beschreiben **nur die Funktionalität und den Flow**,
nicht das visuelle Design. Sie sind Lo-Fi-Wireframes. **Niemals** das graue Wireframe-Design
direkt in Code umsetzen. Das visuelle Design folgt der Obsidian-Richtung.

---

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Sprache | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Graph | React Flow (`@xyflow/react`) |
| Icons | Lucide React |
| Daten | Mock-Daten (JSON, kein Backend) |
| Fonts | Geist (Next.js default) — kein Inter, kein Arial |

---

## Visuelles Design-System

### Farbpalette (Obsidian-inspiriert, dunkel)
```typescript
// tailwind.config.ts — diese Farben definieren:
colors: {
  canvas:      '#0d0d0d',   // Haupt-Canvas-Hintergrund (fast schwarz)
  surface:     '#1a1a1a',   // Panels, Sidebar, Cards
  surface2:    '#252525',   // Karten-Hover, erhöhte Elemente
  border:      '#333333',   // Dezente Trennlinien
  accent:      '#7c6af7',   // Lila-Akzent (Obsidian-Lila) — aktive Nodes
  accent2:     '#4f9cf9',   // Blau für Links/Connections
  nodeDefault: '#1e1e1e',   // Normaler Node-Hintergrund
  text:        '#e8e8e8',   // Primärer Text
  textMuted:   '#888888',   // Nebentext, Labels
  textDim:     '#555555',   // Sehr dezenter Text
  tagDefault:  '#2a2a3e',   // Default Tag-Hintergrund
}
```

### Graph-Ästhetik
- **Canvas-Hintergrund**: `#0d0d0d` mit Dot-Grid (`BackgroundVariant.Dots`, `color: #333`, `gap: 24`)
- **Edges**: `1px` Linien, `#444444`, bei aktivem Pfad: `#7c6af7` mit `filter: drop-shadow`
- **Topic-Nodes**: Abgerundete Rechtecke, `bg-surface`, heller Text, kein harter Rand — subtiler `border border-border`
- **Aktiver Node**: `border-accent` + `box-shadow: 0 0 12px #7c6af744`
- **Kontakt-Nodes**: Kleinere kompakte Cards, erscheinen erst ab Zoom-Level 1.1×

### Typografie
```
Geist Sans (Next.js default) für alle Texte
10-11px: Node-Labels bei weitem Zoom, Tags
13-14px: Kontaktname, Nebeninfos in Panels
16px:    Panel-Überschriften
20-24px: Suchfeld-Input
```

### UI-Komponenten-Stil
- **Panels**: `bg-surface/90 backdrop-blur-sm border-l border-border`
- **Suchfeld**: Command-Palette-Style — zentriert, prominent, mit Ring-Focus
- **Tags**: Klein, `bg-tagDefault text-accent`, kein Rosa aus dem Wireframe
- **Buttons**: Minimal — nur Icon oder sehr kurzer Text

---

## Projektstruktur

```
/
├── app/
│   ├── page.tsx                    # Screen 1: Startseite / Suche
│   ├── canvas/
│   │   └── page.tsx                # Screen 2: Graph-Canvas + Panel
│   └── layout.tsx                  # Dunkles Theme, Fonts
├── components/
│   ├── search/
│   │   ├── SearchCommand.tsx        # Command-Palette-Style Suchfeld
│   │   └── SearchSuggestions.tsx    # Themen-Vorschläge als Dropdown
│   ├── graph/
│   │   ├── NetworkGraph.tsx         # React Flow Wrapper
│   │   ├── TopicNode.tsx            # Themenfeld-Node
│   │   ├── ContactNode.tsx          # Kontakt-Node (bei Zoom sichtbar)
│   │   └── NetworkEdge.tsx          # Verbindungslinien
│   ├── panel/
│   │   ├── ContactPanel.tsx         # Rechtes Panel (Liste + Detail)
│   │   ├── ContactList.tsx          # Gefilterte Kontaktliste
│   │   ├── ContactCard.tsx          # Einzelne Kontaktkarte
│   │   └── ContactDetail.tsx        # Vollständige Detailansicht
│   └── ui/
│       ├── Tag.tsx                  # Themen-Badges
│       ├── Avatar.tsx               # Initialen-Avatar
│       └── EmptyState.tsx           # Leerer Graph
├── lib/
│   └── mock-data.ts                 # Alle Mock-Daten zentral
├── types/
│   └── index.ts                     # Alle TypeScript-Interfaces
└── CLAUDE.md
```

---

## Daten-Modell

```typescript
// types/index.ts

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
```

### Mock-Szenarien (3 vorprogrammierte Suchen)
```
SZENARIO 1: "Vitamin Mangel"
  Topics: Gesundheit (Hub) → Vitamin Mangel, Medikamente, Haustiergesundheit
  Kontakte: Ärztin (expert), Apotheker (expert),
            Vitamin-Startup-Gründer (company), Betroffene Person (person)
  Redakteure: Lea Ullmann kennt Ärztin + Apotheker

SZENARIO 2: "Vitamin Startup"
  Topics: Wirtschaft → Vitamin Startup, BWL, Chemie, Geschäftsführung
  Kontakte: Startup-Gründer (company), Geschäftsführer, Chemiker (expert)

SZENARIO 3: "Lokalpolitik" (frei erfunden)
  Topics: Politik → Stadtrat, Bürgermeister, Bauleitplanung
  Kontakte: 2 Politiker, 1 Verwaltungsbeamter, 1 Stadtplaner
```

---

## Screen-Logik

### Screen 1: Startseite (`/`)
- Dunkles Canvas, Logo oben links, Suchfeld zentriert
- Suchfeld: Command-Palette-Stil mit Placeholder `"Thema eingeben, z.B. Vitamin Mangel..."`
- Optional: Themen-Vorschläge als Pills darunter
- Enter → navigiert zu `/canvas?q=THEMA`

### Screen 2: Canvas (`/canvas`)
```
┌─────────────────────────────────────────┬──────────────────┐
│  🔍 [Suchfeld / Breadcrumb oben]        │                  │
├─────────────────────────────────────────│  CONTACT PANEL   │
│                                         │  (slide-in bei   │
│         GRAPH CANVAS (React Flow)       │   Node-Klick)    │
│                                         │                  │
│   [Topic A] ──── [Topic B]              │  Kontaktliste    │
│       \                                 │  oder Detail     │
│        [Topic C / AKTIV ★]              │                  │
│            |  (nach Zoom)              │                  │
│        [👤 K1] [👤 K2]                  │                  │
│                                         │                  │
└─────────────────────────────────────────┴──────────────────┘
```

**Zoom-Logik:**
- Zoom < 1.1×: Nur Topic-Nodes sichtbar
- Zoom ≥ 1.1×: Kontakt-Nodes erscheinen innerhalb/neben aktivem Topic
- Steuerung via `useViewport()` Hook von React Flow

**Interaktions-Logik:**
- Klick Topic-Node → Node aktiv (lila Glow), Panel zeigt Kontaktliste
- Klick Kontakt (Node oder Panel-Karte) → Panel wechselt zu Detailansicht
- Doppelklick Topic-Node → Zoom in Subtopics (Breadcrumb aktualisiert sich)

### Screen 3: Kontakt-Detail (innerhalb des Panels)
1. Name + Rolle + ContactType-Badge
2. Expertise-Tags
3. „Bekannt bei:" — Redakteur-Avatare die ihn kennen
4. Kontakt-Buttons (Mail, Telefon)
5. Gesprächshistorie (chronologisch, neueste zuerst)

---

## React Flow Konfiguration

```typescript
// NetworkGraph.tsx
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';

<ReactFlow
  nodeTypes={{ topic: TopicNode, contact: ContactNode }}
  defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
  minZoom={0.2}
  maxZoom={2.5}
  fitView
>
  <Background
    variant={BackgroundVariant.Dots}
    color="#333333"
    gap={24}
    size={1}
  />
</ReactFlow>

// Zoom-Schwellwert für Kontakt-Sichtbarkeit
const CONTACT_VISIBLE_ZOOM = 1.1;
```

---

## Verhaltensregeln für Claude Code

### Arbeitsweise
- **Plan zuerst** bei neuen Komponenten oder Architektur-Entscheidungen
- **Direkt implementieren** wenn der Plan klar ist oder Aufgabe trivial
- **Maximal eine Frage** wenn Unklarheiten bestehen

### Code-Standards
- TypeScript strict — kein `any` ohne Kommentar
- Kein Inline-Styling außer dynamische Werte (Graph-Koordinaten etc.)
- `cn()` (clsx + tailwind-merge) für bedingte Klassen
- Mock-Daten nur aus `lib/mock-data.ts`, nie hartcodiert in Komponenten
- Barrel-Exports (`index.ts`) in jedem Komponenten-Ordner

### Sprache
- Variablen/Funktionen: **Englisch**
- Kommentare + TODOs: **Deutsch**
- Design-Abweichungen: `// [DESIGN-ENTSCHEIDUNG]: Begründung`

### Verboten
- Lo-Fi-Wireframe-Design direkt übernehmen (kein Grau, kein Rosa `#ffb1b1`)
- Externe UI-Libraries außer den definierten
- Echte API-Calls
- Redux, Zustand oder andere externe State-Manager
- CLAUDE.md eigenständig verändern

### Status nach jedem Task
```
✅ Gebaut: [was]
🔗 Braucht: [Abhängigkeiten]
⚠️  Abweichung: [falls vorhanden]
📋 Weiter mit: [Phase X / nächste Aufgabe]
```

---

## Start-Prompt für Claude Code

```
Lies zuerst vollständig die CLAUDE.md im Projekt-Root.

Starte dann Phase 1:
1. Erstelle Next.js 14 Projekt (TypeScript, Tailwind CSS, App Router)
2. Installiere: @xyflow/react lucide-react clsx tailwind-merge
3. Erstelle types/index.ts mit allen Interfaces aus CLAUDE.md
4. Erstelle lib/mock-data.ts mit den 3 Suchszenarien (mind. 4 Kontakte pro Szenario)
5. Konfiguriere tailwind.config.ts mit den Farben aus CLAUDE.md
6. Setze dunkles Theme in app/layout.tsx (bg-canvas als Body-Hintergrund)

Nach Phase 1: Status-Zusammenfassung, dann warten auf OK für Phase 2.
```

---

*Stack: Next.js 14 · TypeScript · Tailwind CSS · React Flow*
*Design-Referenz: Obsidian (obsidian.md) — dunkel, graph-zentriert, minimalistisch*
*Figma-Wireframes: nur Funktionsreferenz, nicht visuelle Vorlage*
