import React from "react";
import { useDrag } from "react-dnd/dist"; // testar lägga denna här
//import type { DragSourceMonitor } from "react-dnd";
import type { Task } from "../Types/Types";

interface CardProps {
  task: Task;
  columnId: string;
}

const Card: React.FC<CardProps> = ({ task, columnId }) => {
  const [collectedProps, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, sourceColumnId: columnId },
  });

  const { isDragging } = collectedProps;

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: "white",
        padding: "8px",
        marginBottom: "5px",
        border: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      {task.title}
    </div>
  );
};
export default Card;
