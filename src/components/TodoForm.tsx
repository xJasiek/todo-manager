"use client";

import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import { CATEGORIES, Category } from "@/lib/types";

interface TodoFormProps {
  /** Callback zum Anlegen eines neuen Todos. */
  onAdd: (text: string, category: Category) => void;
}

/**
 * Eingabeformular zum Erstellen neuer Todos.
 * Besteht aus einem Textfeld, einer Kategorie-Auswahl und einem Button.
 */
export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState<Category>("Allgemein");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, category);
    setText(""); // Feld nach dem Hinzufügen leeren
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Was möchtest du erledigen?"
        aria-label="Aufgabentext"
        className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-indigo-400/60"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        aria-label="Kategorie auswählen"
        className="rounded-xl bg-white/10 px-3 py-3 text-white outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-indigo-400/60"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat} className="bg-slate-800 text-white">
            {cat}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400 active:scale-95 disabled:opacity-50"
        disabled={!text.trim()}
      >
        <Plus className="h-5 w-5" />
        Hinzufügen
      </button>
    </form>
  );
}
