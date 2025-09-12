import { useContext } from "react";
import Column from "./Column";
import { TaskContext } from "../Contexts/Context";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

//Funktion hämtar taskcontext med data om funktion och kolumn som flyttar uppgifter
const Board: React.FC = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TasksContext saknas");

  //Destrukturerar kolumn och funktion för att flytta uppgifter
  const { columns, moveTask } = ctx;

  //Funktion som hanteras när en dragnng (drag) avslutas
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    //Hämtar data kopplat till aktiv dragning inlkusive vilken kolumn den ska tillhöra
    const activeData = active.data.current;
    const overId = over.id as string;

    //Kontroll om dragning mellan kolumnerna
    if (activeData && activeData.columnId !== overId) {
      moveTask(activeData.columnId, overId, active.id as string);
    }
  };

  //Renderar brädan med kolumnerna den är innesluten i DndContext för drag&släpp
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
        {columns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
      </div>
    </DndContext>
  );
};
export default Board;
