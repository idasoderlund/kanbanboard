import { createContext } from "react";
import type { Column, Task } from "../Types/Types";

interface TaskContextType {
  columns: Column[];
  addTask: (ColumnId: string, task: Task) => void;
  updateTask: (ColumnId: string, taskId: string, updatedTask: Task) => void;
  deleteTask: (
    columnId: string,
    targetColumnId: string,
    taskId: string
  ) => void;
  moveTask: (
    sourceColumnId: string,
    targetColumnId: string,
    taskId: string
  ) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
