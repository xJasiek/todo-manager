"use client";

import { useRef, useState } from "react";
import { Todo } from "@/lib/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    updates: Partial<Pick<Todo, "text" | "category">>
  ) => void;
  /**
   * Umsortieren per Drag-and-Drop. Wird nur aktiviert, wenn `draggable`
   * true ist (d. h. wenn kein Filter aktiv ist).
   */
  onReorder: (fromIndex: number, toIndex: number) => void;
  draggable: boolean;
}

/**
 * Rendert die Liste der Todos und übernimmt die Drag-and-Drop-Logik
 * zum Umsortieren. Die Reihenfolge wird live während des Ziehens
 * aktualisiert (HTML5 Drag-and-Drop API).
 */
export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  onReorder,
  draggable,
}: TodoListProps) {
  // Index des aktuell gezogenen Elements.
  const dragIndex = useRef<number | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (index: number, id: string) => {
    dragIndex.current = index;
    setDraggingId(id);
  };

  // Sobald ein anderes Element überfahren wird, Positionen tauschen.
  const handleDragEnter = (index: number) => {
    if (dragIndex.current === null || dragIndex.current === index) return;
    onReorder(dragIndex.current, index);
    dragIndex.current = index;
  };

  const handleDragEnd = () => {
    dragIndex.current = null;
    setDraggingId(null);
  };

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          draggable={draggable}
          isDragging={draggingId === todo.id}
          onDragStart={() => handleDragStart(index, todo.id)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
        />
      ))}
    </ul>
  );
}
