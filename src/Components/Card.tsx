import React, { useState } from "react";
import { useDrag } from "react-dnd/dist"; // testar lägga denna här
//import type { DragSourceMonitor } from "react-dnd";
import type { Task } from "../Types/Types";

interface CardProps {
  task: Task;
  columnId: string;
}

const Card: React.FC<CardProps> = ({ task, columnId }) => {
  const [isDragging, setIsDragging] = useState(false);
  //const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging: dragStatus }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, sourceColumnId: columnId },
    begin: () => {
      setIsDragging(true);
    },
    end: () => {
      setIsDragging(false);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //Hantera drag-händelser för att sätta status
  //Notera: React DND ger inte direkt evet för detta när man inte använder collect
  //men vi kan använda begin och end callbacks iusedrag fr att ändra status.

  return (
    <div
      ref={dragRef}
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
