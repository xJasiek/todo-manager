"use client";

import { useCallback, useMemo, useState } from "react";
import { Category, Filter, Todo } from "@/lib/types";
import { useLocalStorage } from "./useLocalStorage";

/** Schlüssel, unter dem die Todos im Local Storage abgelegt werden. */
const STORAGE_KEY = "todo-manager:todos";

/**
 * Zentraler Hook für das gesamte State-Management des Todo-Managers.
 *
 * Kapselt sämtliche CRUD-Operationen, das Umschalten des Erledigt-Status,
 * die Filterlogik sowie die Reihenfolge per Drag-and-Drop. Die Daten werden
 * über `useLocalStorage` automatisch persistiert.
 */
export function useTodos() {
  const [todos, setTodos, hydrated] = useLocalStorage<Todo[]>(STORAGE_KEY, []);
  const [filter, setFilter] = useState<Filter>("alle");

  /** Neues Todo anlegen (Create). */
  const addTodo = useCallback(
    (text: string, category: Category) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const newTodo: Todo = {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now().toString(36) + Math.random().toString(36).slice(2),
        text: trimmed,
        completed: false,
        category,
        createdAt: Date.now(),
      };
      // Neues Todo oben einfügen.
      setTodos((prev) => [newTodo, ...prev]);
    },
    [setTodos]
  );

  /** Text und/oder Kategorie eines Todos ändern (Update). */
  const updateTodo = useCallback(
    (id: string, updates: Partial<Pick<Todo, "text" | "category">>) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                ...updates,
                text: updates.text !== undefined ? updates.text.trim() : todo.text,
              }
            : todo
        )
      );
    },
    [setTodos]
  );

  /** Ein Todo löschen (Delete). */
  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  /** Erledigt-Status umschalten. */
  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [setTodos]
  );

  /** Alle erledigten Todos auf einmal entfernen. */
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, [setTodos]);

  /**
   * Reihenfolge nach Drag-and-Drop anpassen.
   * Verschiebt das Element von `fromIndex` an die Position `toIndex`.
   */
  const reorderTodos = useCallback(
    (fromIndex: number, toIndex: number) => {
      setTodos((prev) => {
        if (
          fromIndex < 0 ||
          toIndex < 0 ||
          fromIndex >= prev.length ||
          toIndex >= prev.length
        ) {
          return prev;
        }
        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
    },
    [setTodos]
  );

  /** Nach aktivem Filter gefilterte Liste. */
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "aktiv":
        return todos.filter((todo) => !todo.completed);
      case "erledigt":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  /** Kennzahlen für die Statusleiste. */
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    return { total, completed, active: total - completed };
  }, [todos]);

  return {
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
  };
}
