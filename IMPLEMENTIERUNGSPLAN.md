# IMPLEMENTIERUNGSPLAN.md — Netzwerk-Recherche-Tool

## Ziel
Einen klickbaren Web-App-Prototypen aus dem Figma-Wireflow bauen —
so schnell wie möglich, mit Mock-Daten, ohne Backend.

**Referenz:** `lean_design_claude` (Figma)
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · React Flow

---

## Phase 1 — Projekt-Setup ⚡ (~15 Min)

**Ziel:** Lauffähiges Next.js-Projekt mit allen Dependencies.

### Befehle
```bash
npx create-next-app@latest netzwerk-tool \
  --typescript --tailwind --app --no-src-dir --import-alias "@/*"

cd netzwerk-tool

# Graph-Library
npm install @xyflow/react

# Icons
npm install lucide-react

# Klassen-Utility
npm install clsx tailwind-merge
```

### Dateien anlegen
- [ ] `lib/mock-data.ts` — alle Mock-Daten (Kontakte, Themen, Graph-Nodes)
- [ ] `types/index.ts` — alle TypeScript-Interfaces
- [ ] `lib/utils.ts` — `cn()` Utility-Funktion
- [ ] `tailwind.config.ts` — Custom-Farben aus Figma ergänzen

### Mock-Daten (Minimal-Set für Phase 1)
```typescript
// 3 Suchanfragen vorprogrammieren:
const SEARCH_SCENARIOS = [
  { query: 'Gesundheit',     → Graph mit ~6 Knoten, 5 Kontakte },
  { query: 'Vitamin Startup', → Graph mit ~4 Knoten, 3 Kontakte },
  { query: 'BWL',             → Graph mit ~3 Knoten, 2 Kontakte },
]
```

**Claude Code Anweisung:** Nach Phase 1 kurze Bestätigung dass `npm run dev` läuft.

---

## Phase 2 — Screen 1: Startseite 🏠 (~20 Min)

**Figma Referenz:** Node `1:2`
**Ziel:** Vollständige Startseite mit funktionierender Suche.

### Komponenten
```
app/page.tsx
  ├── components/search/SearchBar.tsx      ← Figma 1:4
  └── components/search/FilterToggle.tsx   ← Figma 1:7, 1:9
  └── components/ui/Button.tsx             ← Figma 1:10 "+ Neuen Eintrag"
```

### Verhalten
- Hintergrund: `#b1b1b1` (Netzwerk-Platzhalter — kann animiertes Rauschen sein)
- Suchleiste: zentriert, weiß, mit Lupe rechts
- Enter oder Klick auf Lupe → `router.push('/netzwerk?q=SUCHBEGRIFF')`
- Filter-Badge: zeigt `(0)` initial, nicht interaktiv in Phase 2

### Akzeptanzkriterien
- [ ] Sucheingabe funktioniert
- [ ] Navigation zu `/netzwerk` mit Query-Parameter
- [ ] "+ Neuen Eintrag verfassen" Button sichtbar (noch nicht funktional)
- [ ] Responsiv auf 1512px (Figma-Referenzbreite)

---

## Phase 3 — Screen 2: Topic-Graph 🗺️ (~40 Min)

**Figma Referenz:** Node `1:14`
**Ziel:** Interaktiver Graph mit React Flow, der die Mock-Daten visualisiert.

### Komponenten
```
app/netzwerk/page.tsx
  ├── components/graph/TopicGraph.tsx      ← Haupt-Graph-Wrapper
  ├── components/graph/TopicNode.tsx       ← Einzelner Knoten (248×112px)
  └── components/graph/TopicEdge.tsx       ← Verbindungslinien (schwarz, dünn)
```

### TopicNode Spezifikation (aus Figma)
```typescript
// Normaler Knoten: grauer BG, kein Border
// Aktiver Knoten (1:78): weißer BG + 11px roter Solid-Border
// Text: 24px, Inter Regular, linksbündig mit 32px Padding

interface TopicNodeData {
  label: string;
  isActive?: boolean;
}
```

### Graph-Verhalten
- Initiale Node-Positionen: aus Mock-Daten (x/y aus Figma abgeleitet)
- Klick auf Knoten → Knoten wird `isActive`, Sidebar filtert Kontakte
- Doppelklick auf Knoten → Zoom-Transition zu Subtopic-Graph (Phase 6)
- Drag & Drop: **aktiviert** (React Flow Standard)
- Zoom: maus-scroll, 0.3×–2× Grenzen

### Akzeptanzkriterien
- [ ] Graph zeigt Nodes aus Mock-Daten basierend auf URL-Query
- [ ] Klick aktiviert Knoten (roter Rahmen)
- [ ] Edges verbinden Knoten korrekt
- [ ] Kein Crash bei leerem Graph

---

## Phase 4 — Sidebar + Kontaktkarten 📋 (~30 Min)

**Figma Referenz:** Node `1:15`, `1:24`–`1:64`
**Ziel:** Rechte Sidebar mit gefilterter Kontaktliste.

### Komponenten
```
components/sidebar/
  ├── ContactSidebar.tsx    ← Container (377px Breite, #b1b1b1 BG)
  ├── ContactCard.tsx       ← 175×105px Karte mit Avatar + Tags
  └── FilterBadge.tsx       ← "Thema" Label (rosa, oben)
```

### ContactCard Spezifikation (aus Figma 1:24)
```
┌─────────────────────────────┐  ← 175×105px, #d9d9d9, rounded
│ 👤 Lea Ullmann              │  ← Avatar-Icon + Name 11px
│                             │
│ [Gesundheit] [Vitamin Man.] │  ← Tags: #ffb1b1, 14px hoch
│ [UX Research]               │
└─────────────────────────────┘
```

### Verhalten
- Sidebar zeigt **alle Kontakte** die einem aktiven Knoten zugeordnet sind
- Kein aktiver Knoten → Sidebar zeigt alle Kontakte (oder leer)
- Klick auf Karte → öffnet `ContactDetail`-Panel (Phase 5)
- `+ Neuen Eintrag verfassen` Button: fest unten in Sidebar

### Akzeptanzkriterien
- [ ] Sidebar zeigt Kontakte gefiltert nach aktivem Knoten
- [ ] Tags in `#ffb1b1` korrekt dargestellt
- [ ] Scrollbar bei vielen Kontakten
- [ ] Filter-Badge zeigt korrekte Anzahl

---

## Phase 5 — Kontakt-Detailansicht 📄 (~25 Min)

**Figma Referenz:** Node `1:151`, `1:185`
**Ziel:** Detail-Panel das aufgeht wenn man eine Kontaktkarte anklickt.

### Komponenten
```
components/sidebar/ContactDetail.tsx
  ├── Kontaktinfo-Block      ← Name, Quelle, Mail-Button
  └── ConvHistory-Block      ← Liste vergangener Einträge
```

### Layout (aus Figma 1:185)
```
┌────────────────────────────────────┐  ← 530×575px Panel
│  Kontaktinfos: CTA und Quelle      │  ← oberer Block (145px)
│  [Mail] [...]                      │
├────────────────────────────────────┤
│  Convo History                     │  ← unterer Block (369px)
│  ┌──────────────────────────────┐  │
│  │ Eintrag                      │  │
│  │ Redakteur Name               │  │
│  │ Vergangene Artikel           │  │
│  │ Etc.                         │  │
│  └──────────────────────────────┘  │
│  [kontext schriftlich]             │
└────────────────────────────────────┘
```

### Verhalten
- Panel erscheint **über** der Sidebar (als Overlay oder ersetzt sie)
- Schließen: X-Button oder Klick außerhalb
- Mock-Daten: mindestens 2 ConvHistory-Einträge pro Kontakt

### Akzeptanzkriterien
- [ ] Panel öffnet sich bei Klick auf Kontaktkarte
- [ ] Mail-Button sichtbar (kein echter Link nötig)
- [ ] ConvHistory-Einträge werden gelistet
- [ ] Schließen funktioniert

---

## Phase 6 — Filter + Zoom-Interaktion 🔍 (~20 Min)

**Figma Referenz:** Node `1:99` (Subtopic-Zoom-State)
**Ziel:** Filter-Funktion + Doppelklick-Zoom in Subtopics.

### Filter
- Klick auf Filter-Icon → Dropdown/Toggle mit Kategorien (aus Tag-Werten)
- Aktiver Filter reduziert Kontaktliste in Sidebar
- Filter-Badge zeigt Anzahl aktiver Filter: `Filter (1)`

### Zoom-Interaktion
- Doppelklick auf Topic-Knoten → Graph zeigt **Subtopics** dieses Knotens
- Breadcrumb oben: `Gesundheit > Vitamin Mangel`
- Zurück-Navigation: Breadcrumb-Klick oder Browser-Back

### Subtopic Mock-Daten (aus Figma `1:99`)
```
Vitamin Mangel
  ├── Medikamente
  ├── Haustiergesundheit
  ├── Vitamin Start-Up Gründer
  ├── Apotheker
  └── Ärztin mit Fachgebiet auf Vitamine
```

### Akzeptanzkriterien
- [ ] Doppelklick öffnet Subtopic-Graph
- [ ] Breadcrumb Navigation funktioniert
- [ ] Filter reduziert Sidebar-Kontakte korrekt

---

## Phase 7 — Polish & Übergänge ✨ (~15 Min)

**Ziel:** Alles fühlt sich wie ein echter Prototyp an.

### Animationen
- [ ] Graph-Nodes: `opacity-0 → opacity-100` beim Erscheinen (100ms staggered)
- [ ] Sidebar: smooth slide-in wenn Kontakte erscheinen
- [ ] Detail-Panel: fade + slide-up Transition
- [ ] Such-Ergebnis-Übergang: kurzer Ladeindikator (200ms)

### Feinschliff
- [ ] Leere Zustände definieren (kein Suchergebnis, keine Kontakte)
- [ ] Keyboard-Navigation: Enter in Suchfeld
- [ ] Hover-States auf allen interaktiven Elementen
- [ ] Favicon & Seitentitel auf Deutsch

---

## Gesamtaufwand-Schätzung

| Phase | Aufwand | Komplexität |
|---|---|---|
| 1 Setup | ~15 Min | ⭐ |
| 2 Startseite | ~20 Min | ⭐⭐ |
| 3 Topic-Graph | ~40 Min | ⭐⭐⭐⭐ |
| 4 Sidebar | ~30 Min | ⭐⭐⭐ |
| 5 Detailansicht | ~25 Min | ⭐⭐ |
| 6 Filter + Zoom | ~20 Min | ⭐⭐⭐ |
| 7 Polish | ~15 Min | ⭐⭐ |
| **Gesamt** | **~2.5 Std** | |

---

## Start-Befehl für Claude Code

Wenn du mit Claude Code startest, nutze diesen Prompt:

```
Lies zuerst die CLAUDE.md. Dann beginne mit Phase 1:
Erstelle das Next.js-Projekt mit dem definierten Stack und lege alle
Basis-Dateien an (mock-data.ts, types/index.ts, utils.ts, tailwind.config.ts).
Zeige mir dann den Plan für Phase 2 bevor du anfängst.
```

---

*Dokument-Version: 1.0 | Stack: Next.js 14 · TypeScript · Tailwind · React Flow*
