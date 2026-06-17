"use client";

import { CheckCircle2, ListTodo } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";
import TodoForm from "@/components/TodoForm";
import FilterBar from "@/components/FilterBar";
import TodoList from "@/components/TodoList";
import EmptyState from "@/components/EmptyState";

/**
 * Hauptseite des Todo-Managers.
 * Verbindet das State-Management (useTodos) mit den UI-Komponenten und
 * steuert, wann welche Ansicht (Liste oder Platzhalter) gerendert wird.
 */
export default function Home() {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    stats,
    hydrated,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    reorderTodos,
  } = useTodos();

  // Fortschritt in Prozent (für den Balken).
  const progress =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-5 px-4 py-10">
      {/* Kopfbereich */}
      <header className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-3">
          <ListTodo className="h-9 w-9 text-indigo-300" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Todo-Manager
          </h1>
        </div>
        <p className="text-white/60">
          Organisiere deine Aufgaben: modern, schnell und immer gespeichert.
        </p>
      </header>

      {/* Fortschrittsanzeige */}
      {stats.total > 0 && (
        <div className="glass flex items-center gap-3 rounded-2xl p-4">
          <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-emerald-300" />
          <div className="flex-1">
            <div className="mb-1 flex justify-between text-sm text-white/70">
              <span>Fortschritt</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Eingabeformular */}
      <TodoForm onAdd={addTodo} />

      {/* Filterleiste (nur bei vorhandenen Todos) */}
      {todos.length > 0 && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          stats={stats}
          onClearCompleted={clearCompleted}
        />
      )}

      {/* Liste oder Platzhalter.
          Vor dem Hydrieren (Local Storage laden) nichts anzeigen, um
          Flackern / Hydration-Mismatch zu vermeiden. */}
      {hydrated &&
        (filteredTodos.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            onReorder={reorderTodos}
            // Drag-and-Drop nur sinnvoll, wenn die vollständige Liste
            // angezeigt wird (Filter "alle").
            draggable={filter === "alle"}
          />
        ))}

      {/* Hinweis zum Sortieren */}
      {hydrated && filter === "alle" && todos.length > 1 && (
        <p className="text-center text-xs text-white/40">
          Tipp: Aufgaben lassen sich per Drag-and-Drop neu sortieren.
        </p>
      )}

      {/* Fußzeile */}
      <footer className="mt-auto pt-6 text-center text-xs text-white/40">
        Gebaut mit Next.js, TypeScript &amp; Tailwind CSS · Daten werden lokal
        im Browser gespeichert.
      </footer>
    </main>
  );
}
