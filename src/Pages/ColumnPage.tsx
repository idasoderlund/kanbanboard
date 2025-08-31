import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../Contexts/TaskContexts";

interface Task {
  id: string;
  title: string;
} //Finns en interface i types redan, kolla sen gällande import

/*interface Column {
  id: string;
  title: string;
  tasks: Task[];
}*/
const ColumnPage: React.FC = () => {
  const { columnId } = useParams<{ columnId: string }>();
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TaskContext saknas");

  const { columns } = ctx;

  const column = columns.find((c) => c.id === columnId);

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
