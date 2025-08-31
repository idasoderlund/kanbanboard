import React from "react";
import { useDrag } from "react-dnd";

const Card = ({ task, columnId }) => {
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
      onClick={handleClick}
    >
      {task.title}
    </div>
  );
};
export default Card;
