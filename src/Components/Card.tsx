import React from "react";
import { useDrag } from "react-dnd";
import { Task } from "Types";

interface CardProps {
  task: Task;
  columnId: string;
}

const Card: React.FC<CardProps> = ({ task, columnId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, sourceColumnId: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    //visa modal för redigering eller ta bort
    //detta hanteras i modalkomponenten
  };

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
