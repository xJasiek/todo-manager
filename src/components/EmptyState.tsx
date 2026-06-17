"use client";

import { ClipboardList } from "lucide-react";
import { Filter } from "@/lib/types";

interface EmptyStateProps {
  filter: Filter;
}

/**
 * Platzhalter, der angezeigt wird, wenn keine Todos vorhanden sind
 * oder der aktive Filter keine Treffer liefert.
 */
export default function EmptyState({ filter }: EmptyStateProps) {
  const messages: Record<Filter, string> = {
    alle: "Noch keine Aufgaben. Lege oben deine erste Aufgabe an! 🚀",
    aktiv: "Keine aktiven Aufgaben, du hast alles erledigt! 🎉",
    erledigt: "Noch nichts erledigt. Leg los! 💪",
  };

  return (
    <div className="glass flex animate-fade-in flex-col items-center gap-3 rounded-2xl p-10 text-center">
      <ClipboardList className="h-12 w-12 animate-float text-white/40" />
      <p className="text-white/70">{messages[filter]}</p>
    </div>
  );
}
