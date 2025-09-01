import React from "react";
import type { DragSourceMonitor } from "react-dnd";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { Task } from "../Types/Types";

interface CardProps {
  task: Task;
  columnId: string;
}

const Card: React.FC<CardProps> = ({ task, columnId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, sourceColumnId: columnId },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  /*const handleClick = () => {
    //visa modal för redigering eller ta bort
    //detta hanteras i modalkomponenten
  };*/

  return (
    <div
      ref={(node) => {
        drag(node);
      }}
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
