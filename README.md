# ✅ Todo-Manager

Ein Todo-Manager, den ich mit Next.js 14, TypeScript und Tailwind CSS gebaut habe. Aufgaben werden mitsamt Kategorien und Reihenfolge automatisch im Local Storage gespeichert, bleiben also nach einem Reload erhalten. Kein Backend, kein Account, läuft komplett im Browser.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)
![Lizenz](https://img.shields.io/badge/Lizenz-MIT-green)

## Worum geht's

Eine kleine Single-Page-App, mit der man alltägliche Aufgaben schnell erfasst, sortiert und abarbeitet. Der ganze State lebt im Browser, es gehen keine Daten an irgendeinen Server. Dadurch ist die App schnell, datensparsam und funktioniert sogar offline.

Mir ging es vor allem darum, sauberes State-Management mit eigenen React-Hooks zu üben, Daten im Local Storage zu persistieren und ein paar UI-Patterns wie Drag-and-Drop und Animationen ordentlich umzusetzen.

## Features

| Feature | Was es macht |
| --- | --- |
| **CRUD** | Aufgaben anlegen, bearbeiten, löschen, alles dabei. |
| **Erledigt-Status** | Aufgaben per Klick abhaken, mit animiertem Häkchen und Durchstreichen. |
| **Kategorien / Tags** | Jede Aufgabe bekommt eine farbige Kategorie (Allgemein, Arbeit, Privat, Einkaufen, Dringend). |
| **Filter** | Nach Alle, Aktiv oder Erledigt filtern. |
| **Local Storage** | Alles wird automatisch im Browser gespeichert und nach dem Reload wiederhergestellt. |
| **Drag-and-Drop** | Reihenfolge per Ziehen und Ablegen ändern. |
| **Fortschrittsbalken** | Zeigt animiert, wie viel schon erledigt ist. |
| **Inline-Bearbeitung** | Text und Kategorie direkt in der Liste ändern (Enter speichert, Escape bricht ab). |
| **Erledigte aufräumen** | Alle fertigen Aufgaben mit einem Klick weg. |
| **Responsive** | Läuft auf Handy, Tablet und Desktop. |
| **Look** | Glasmorphismus, animierter Verlaufshintergrund, sanfte Übergänge. |

## Screenshots

> Platzhalter. Nach dem Start einfach eigene Screenshots reinpacken.

| Übersicht | Bearbeitungsmodus |
| --- | --- |
| ![Screenshot Hauptansicht](./docs/screenshot-uebersicht.png) | ![Screenshot Bearbeitungsmodus](./docs/screenshot-bearbeiten.png) |

```
┌────────────────────────────────────────┐
│              ✅ Todo-Manager             │
│   Organisiere deine Aufgaben modern...   │
│  ┌──────────────────────────────────┐   │
│  │ Fortschritt                  60%  │   │
│  │ ██████████████░░░░░░░░░░░░         │   │
│  └──────────────────────────────────┘   │
│  [ Was möchtest du erledigen? ] [Arbeit]│
│  ( Alle ) ( Aktiv ) ( Erledigt )         │
│  ⋮  ☐  Präsentation vorbereiten  [Arbeit]│
│  ⋮  ☑  Einkaufen gehen        [Einkaufen]│
└────────────────────────────────────────┘
```

## Tech-Stack

* **[Next.js 14](https://nextjs.org/)** als React-Framework mit App Router
* **[React 18](https://react.dev/)** für die UI (Hooks, Client Components)
* **[TypeScript](https://www.typescriptlang.org/)** für die Typsicherheit
* **[Tailwind CSS](https://tailwindcss.com/)** fürs Styling
* **[lucide-react](https://lucide.dev/)** für die Icons
* **Local Storage API** für die Persistenz

## Setup

> Du brauchst Node.js 18.17 oder neuer und npm.

1. **Repo klonen**
   ```bash
   git clone <repository-url>
   cd todo-manager
   ```

2. **Pakete installieren**
   ```bash
   npm install
   ```

3. **Dev-Server starten**
   ```bash
   npm run dev
   ```

4. **Im Browser öffnen**

   [http://localhost:3000](http://localhost:3000)

### Weitere Befehle

```bash
npm run build   # Produktions-Build bauen
npm run start   # Produktions-Server starten
npm run lint    # Code mit ESLint checken
```

## Wie man's benutzt

1. **Aufgabe anlegen:** Text eintippen, Kategorie wählen, auf **Hinzufügen** klicken (oder Enter drücken).
2. **Abhaken:** Auf den runden Button links neben der Aufgabe klicken. Erledigte Aufgaben werden durchgestrichen.
3. **Bearbeiten:** Auf das Stift-Symbol klicken, Text und/oder Kategorie ändern, mit Enter oder dem Häkchen speichern. Escape bricht ab.
4. **Löschen:** Auf das Papierkorb-Symbol klicken.
5. **Filtern:** Über die Buttons Alle, Aktiv oder Erledigt die Ansicht wechseln.
6. **Sortieren:** In der Ansicht "Alle" Aufgaben am Griff-Symbol packen und per Drag-and-Drop neu anordnen.
7. **Aufräumen:** Mit **Erledigte löschen** alle fertigen Aufgaben auf einmal entfernen.

> Alles wird automatisch gespeichert. Einfach die Seite neu laden, die Aufgaben sind noch da.

## Projektstruktur

```
todo-manager/
├── src/
│   ├── app/
│   │   ├── globals.css      # Globale Styles, Animationen, Glasmorphismus
│   │   ├── layout.tsx       # Root-Layout, Metadaten, Schrift
│   │   └── page.tsx         # Hauptseite, verbindet State und UI
│   ├── components/
│   │   ├── TodoForm.tsx     # Eingabeformular für neue Aufgaben
│   │   ├── FilterBar.tsx    # Filter-Buttons, Status, "Erledigte löschen"
│   │   ├── TodoList.tsx     # Liste plus Drag-and-Drop-Logik
│   │   ├── TodoItem.tsx     # Einzelne Aufgabe (Toggle, Edit, Delete)
│   │   └── EmptyState.tsx   # Platzhalter bei leerer Liste
│   ├── hooks/
│   │   ├── useLocalStorage.ts  # Generischer Local-Storage-Hook
│   │   └── useTodos.ts         # Zentrales State-Management und CRUD
│   └── lib/
│       └── types.ts         # TypeScript-Typen und Konstanten
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Ein paar Code-Highlights

### Wiederverwendbarer Local-Storage-Hook

`useLocalStorage` verhält sich wie `useState`, schreibt den Wert aber transparent in den `localStorage`. Ein `hydrated`-Flag verhindert die typischen Hydration-Probleme beim Server-Side Rendering von Next.js:

```ts
const [todos, setTodos, hydrated] = useLocalStorage<Todo[]>("todo-manager:todos", []);
```

### State-Management an einer Stelle

Der `useTodos`-Hook bündelt die ganze Logik (anlegen, bearbeiten, löschen, umschalten, filtern, sortieren). Dadurch bleiben die UI-Komponenten schlank und kümmern sich nur ums Anzeigen. Abgeleitete Werte wie `filteredTodos` und `stats` laufen über `useMemo`, damit nicht unnötig neu gerechnet wird.

### Drag-and-Drop ohne extra Library

Das Umsortieren nutzt die native HTML5 Drag-and-Drop API. Während des Ziehens wird die Reihenfolge live über `onReorder(fromIndex, toIndex)` angepasst, ganz ohne zusätzliche Abhängigkeiten.

### Durchgängig typsicher

Die zentralen Typen (`Todo`, `Category`, `Filter`) liegen in `lib/types.ts`. Das gibt Autovervollständigung und fängt Fehler schon beim Entwickeln ab.

## Ideen für später

* [ ] Fälligkeitsdaten und Erinnerungen
* [ ] Prioritäten (hoch, mittel, niedrig) mit Sortierung
* [ ] Unteraufgaben / Checklisten innerhalb eines Todos
* [ ] Suche und Volltextfilter
* [ ] Eigene Kategorien anlegen und einfärben
* [ ] Dark/Light Mode
* [ ] Sync über ein Backend (z.B. Supabase oder Firebase)
* [ ] Export/Import der Aufgaben als JSON
* [ ] Mehrsprachigkeit
* [ ] Tastatur-Shortcuts
* [ ] PWA-Support

## Lizenz

MIT. Mach damit, was du willst.
