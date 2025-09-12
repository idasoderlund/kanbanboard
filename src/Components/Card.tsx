import React from "react";
import type { Task } from "../Types/Types";
import { useDraggable } from "@dnd-kit/core";

//Definerar ts interface för props som cardkomponenten ska ta emot
interface CardProps {
  task: Task;
  columnId: string;
}

//React funktionn  komponent för ett uppgiftskort
const Card: React.FC<CardProps> = ({ task, columnId }) => {
  //Använder draggable-hook för att göra elementet dragbart
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id, data: { columnId, task } });
  // Här skickas unika id:t task.id för dragobjekt och ytterligare data alltså columnid och task

  //Definera stil för kort
  const style = {
    //Använder transform värde för att flytta element under dragning
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    //Sänker opacitet när kortet dras för att visa att det är nyss draget
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: "white",
    padding: "8px",
    marginBottom: "5px",
    border: "1px solid #ddd",
    cursor: "pointer",
    borderRadius: "4px",
  };

  //Renderar ett divelement som fugnerar som kortet
  //Använder ref för att koppla element till dragfunktionaliteten
  //Sprider ut lyssnare och attribut som krövs för dragfunktion
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {task.title}
    </div>
  );
};
export default Card;
