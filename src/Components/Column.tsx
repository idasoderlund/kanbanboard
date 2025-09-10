import React, { useContext } from "react";
import Card from "./Card";
import { useDroppable } from "@dnd-kit/core";
import { TaskContext } from "../Contexts/Context";
import type { Column as ColumnType } from "../Types/Types";

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TaskContext saknas");

  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const style = {
    backgroundColor: isOver ? "#f0f0f0" : "#fff",
    padding: "10px",
    minWidth: "200px",
    minHeight: "300px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{column.title}</h3>
      {column.tasks?.map((task) => (
        <Card key={task.id} task={task} columnId={column.id} />
      ))}
    </div>
  );
};

export default Column;
