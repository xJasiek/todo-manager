"use client";

import { KeyboardEvent, useState } from "react";
import { Check, GripVertical, Pencil, Trash2, X } from "lucide-react";
import { CATEGORIES, Category, CATEGORY_STYLES, Todo } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    updates: Partial<Pick<Todo, "text" | "category">>
  ) => void;
  /** Drag-and-Drop-Handler (von der Liste bereitgestellt). */
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnter?: () => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

/**
 * Stellt eine einzelne Aufgabe dar.
 * Unterstützt das Umschalten des Status, Inline-Bearbeitung von Text und
 * Kategorie, Löschen sowie Drag-and-Drop zum Umsortieren.
 */
export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  draggable,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(todo.text);
  const [draftCategory, setDraftCategory] = useState<Category>(todo.category);

  // Bearbeitung speichern.
  const handleSave = () => {
    if (!draftText.trim()) return;
    onUpdate(todo.id, { text: draftText, category: draftCategory });
    setIsEditing(false);
  };

  // Bearbeitung abbrechen und Entwürfe zurücksetzen.
  const handleCancel = () => {
    setDraftText(todo.text);
    setDraftCategory(todo.category);
    setIsEditing(false);
  };

  // Enter speichert, Escape bricht ab.
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <li
      draggable={draggable && !isEditing}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={`glass group flex animate-fade-in items-center gap-3 rounded-2xl p-3 transition ${
        isDragging ? "opacity-50 ring-2 ring-indigo-400/60" : "hover:bg-white/10"
      }`}
    >
      {/* Drag-Griff */}
      {draggable && (
        <span
          className="cursor-grab text-white/30 transition group-hover:text-white/60 active:cursor-grabbing"
          aria-hidden
        >
          <GripVertical className="h-5 w-5" />
        </span>
      )}

      {/* Checkbox / Erledigt-Status */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Als unerledigt markieren" : "Als erledigt markieren"}
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
          todo.completed
            ? "animate-pop border-emerald-400 bg-emerald-400 text-slate-900"
            : "border-white/40 hover:border-indigo-300"
        }`}
      >
        {todo.completed && <Check className="h-4 w-4" strokeWidth={3} />}
      </button>

      {/* Inhalt: Anzeige- oder Bearbeitungsmodus */}
      {isEditing ? (
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <input
            autoFocus
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-white outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-indigo-400/60"
          />
          <select
            value={draftCategory}
            onChange={(e) => setDraftCategory(e.target.value as Category)}
            className="rounded-lg bg-white/10 px-2 py-2 text-sm text-white outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-indigo-400/60"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-800">
                {cat}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span
            className={`flex-1 break-words ${
              todo.completed ? "text-white/40 line-through" : "text-white"
            }`}
          >
            {todo.text}
          </span>
          {/* Kategorie-Badge */}
          <span
            className={`w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_STYLES[todo.category]}`}
          >
            {todo.category}
          </span>
        </div>
      )}

      {/* Aktions-Buttons */}
      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              aria-label="Speichern"
              className="rounded-lg p-2 text-emerald-300 transition hover:bg-emerald-500/15"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              aria-label="Abbrechen"
              className="rounded-lg p-2 text-white/60 transition hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              aria-label="Bearbeiten"
              className="rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              aria-label="Löschen"
              className="rounded-lg p-2 text-white/50 transition hover:bg-rose-500/15 hover:text-rose-300"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
