import { useContext } from "react";
import Column from "./Column";
import { TaskContext /*TaskContextType*/ } from "../Contexts/Context";

const Board: React.FC = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("TasksContext saknas");

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
