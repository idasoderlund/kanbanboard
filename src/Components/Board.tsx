import { useContext } from "react";
import Column from "./Column";
import { TaskContext } from "../Contexts/Context";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

const Board: React.FC = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TasksContext saknas");

  const { columns, moveTask } = ctx;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeData = active.data.current;
    const overId = over.id as string;
    
    if (activeData && activeData.columnId !== overId) {
      moveTask(activeData.columnId, overId, active.id as string);
    }
  };

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
