import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../Contexts/Context";
import type { Column } from "../Types/Types";

interface Task {
  id: string;
  title: string;
}

const ColumnPage: React.FC = () => {
  const { columnId } = useParams<{ columnId: string }>();
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TaskContext saknas");

  const { columns } = ctx;

  const column = columns.find((c: Column) => c.id === columnId);

  if (!column) return <div>Kolumnen finns inte.</div>;

  return (
    <div>
      <h1>{column.title}</h1>
      {column.tasks.map((task: Task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};

export default ColumnPage;
