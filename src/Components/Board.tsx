import React from "react";
import Column from "./Column";
import { TaskContext } from "../Contexts/TaskContext";

const Board = () => {
  const { columns } = React.useContext(TaskContext);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {columns.map((col) => (
        <Column key={col.id} column={col} />
      ))}
    </div>
  );
};
export default Board;
