"use client";

import { Trash2 } from "lucide-react";
import { Filter } from "@/lib/types";

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  stats: { total: number; active: number; completed: number };
  onClearCompleted: () => void;
}

/** Beschriftung der Filter-Buttons. */
const FILTERS: { value: Filter; label: string }[] = [
  { value: "alle", label: "Alle" },
  { value: "aktiv", label: "Aktiv" },
  { value: "erledigt", label: "Erledigt" },
];

/**
 * Leiste mit Filter-Buttons (Alle / Aktiv / Erledigt), einer Statusanzeige
 * sowie einem Button zum Entfernen aller erledigten Todos.
 */
export default function FilterBar({
  filter,
  onFilterChange,
  stats,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="glass flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Statusanzeige */}
      <span className="px-2 text-sm text-white/70">
        {stats.active} aktiv · {stats.completed} erledigt
      </span>

      {/* Filter-Buttons */}
      <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
              filter === value
                ? "bg-indigo-500 text-white shadow"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Erledigte löschen */}
      <button
        onClick={onClearCompleted}
        disabled={stats.completed === 0}
        className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-rose-300 transition hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Trash2 className="h-4 w-4" />
        Erledigte löschen
      </button>
    </div>
  );
}
