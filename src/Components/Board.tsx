import React from "react";
import Column from "./Column";
import { TaskContext } from "../Contexts/TaskContext";

const Board: React.FC = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new error("TasksContext saknas");

  const { columns } = ctx;

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {columns.map((col) => (
        <Column key={col.id} column={col} />
      ))}
    </div>
  );
};
export default Board;
