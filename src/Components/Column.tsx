import React, { useContext } from "react";
import Card from "./Card";
import { useDrop } from "react-dnd/dist";
import { TaskContext } from "./TaskContext";
import type { Column as ColumnType } from "../Types/Types";
//import { Task } from "../Contexts/TaskContexts";

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TaskContext saknas");

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string; sourceColumnId: string }) => {
      moveTask(item.sourceColumnId, column.id, item.id);
    },
  });

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "#f0f0f0" : "#fff",
        padding: "10px",
        minWidth: "200px",
        border: "1px solid #ccc",
      }}
    >
      <h3>{column.title}</h3>
      {column.tasks.map((task) => (
        <Card key={task.id} task={task} columnId={column.id} />
      ))}
    </div>
  );
};

export default Column;
