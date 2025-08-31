import React, { useContext, useRef } from "react";
import Card from "./Card";
import { useDrop } from "react-dnd/dist";
import { TaskContext } from "../Contexts/Context";
import type { Column as ColumnType } from "../Types/Types";
//import { Task } from "../Contexts/TaskContexts";

interface ColumnProps {
  column: ColumnType;
}

interface DropResult {
  isOver: boolean;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TaskContext saknas");

  const { moveTask } = ctx;

  const divRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop<DropResult, unknown, { isOver: boolean }>({
    accept: "TASK",
    drop: (item: { id: string; sourceColumnId: string }, monitor) => {
      moveTask(item.sourceColumnId, column.id, item.id);
    },
    collect: (monitor) => ({
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
