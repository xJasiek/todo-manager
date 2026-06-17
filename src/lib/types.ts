/**
 * Zentrale TypeScript-Typdefinitionen für den Todo-Manager.
 * Durch die strikte Typisierung werden Fehler bereits zur Entwicklungszeit
 * erkannt (Type-Safety) und der Code bleibt selbsterklärend.
 */

/** Verfügbare Kategorien für ein Todo. */
export type Category = "Allgemein" | "Arbeit" | "Privat" | "Einkaufen" | "Dringend";

/** Eine einzelne Aufgabe (Todo). */
export interface Todo {
  /** Eindeutige ID (z. B. via crypto.randomUUID erzeugt). */
  id: string;
  /** Der Aufgabentext. */
  text: string;
  /** Ob die Aufgabe erledigt ist. */
  completed: boolean;
  /** Zugewiesene Kategorie / Tag. */
  category: Category;
  /** Erstellungszeitpunkt als Unix-Timestamp (ms). */
  createdAt: number;
}

/** Mögliche Filter-Optionen in der Oberfläche. */
export type Filter = "alle" | "aktiv" | "erledigt";

/** Liste aller auswählbaren Kategorien (für Dropdowns / Tag-Auswahl). */
export const CATEGORIES: Category[] = [
  "Allgemein",
  "Arbeit",
  "Privat",
  "Einkaufen",
  "Dringend",
];

/**
 * Farbzuordnung pro Kategorie (Tailwind-Klassen).
 * Wird für die farbigen Tag-Badges verwendet.
 */
export const CATEGORY_STYLES: Record<Category, string> = {
  Allgemein: "bg-slate-500/20 text-slate-200 border-slate-400/30",
  Arbeit: "bg-blue-500/20 text-blue-200 border-blue-400/30",
  Privat: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
  Einkaufen: "bg-amber-500/20 text-amber-200 border-amber-400/30",
  Dringend: "bg-rose-500/20 text-rose-200 border-rose-400/30",
};
