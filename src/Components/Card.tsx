import React from "react";
import type { Task } from "../Types/Types";
import { useDraggable } from "@dnd-kit/core";

interface CardProps {
  task: Task;
  columnId: string;
}

const Card: React.FC<CardProps> = ({ task, columnId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id, data: { columnId, task } });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: "white",
    padding: "8px",
    marginBottom: "5px",
    border: "1px solid #ddd",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {task.title}
    </div>
  );
};
export default Card;
