import React, { useContext, useRef } from "react";
import Card from "./Card";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { TaskContext } from "../Contexts/Context";
import type { Column as ColumnType } from "../Types/Types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface ColumnProps {
  column: ColumnType;
}

interface DragItem {
  id: string;
  sourceColumnId: string;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TaskContext saknas");

  const { moveTask } = ctx;

  const divRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop<DragItem, unknown, { isOver: boolean }>({
    accept: "TASK",
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      moveTask(item.sourceColumnId, column.id, item.id);
    },

    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(divRef);
  return (
    <div
      ref={divRef}
      style={{
        backgroundColor: isOver ? "#f0f0f0" : "#fff",
        padding: "10px",
        minWidth: "200px",
        border: "1px solid #ccc",
      }}
    >
      <h3>{column.title}</h3>
      {column.tasks?.map((task) => (
        <Card key={task.id} task={task} columnId={column.id} />
      ))}
    </div>
  );
};

export default Column;
