import React, { useState, type ReactNode } from "react";
import type { Column, Task } from "../Types/Types";
import { TaskContext } from "./Context";

const initialData: Column[] = [
  { id: "todo", title: "Todo", tasks: [] },
  { id: "inprogress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

export interface ColumnType {
  id: string;
  title: string;
}
interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>(initialData);

  const addTask = (columnId: string, task: Task) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  const updateTask = (columnId: string, taskId: string, updateTask: Task) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== columnId) return col;
        return {
          ...col,
          tasks: col.tasks.map((t: Task) => (t.id === taskId ? updateTask : t)),
        };
      })
    );
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== columnId) return col;
        return {
          ...col,
          tasks: col.tasks.filter((t: Task) => t.id !== taskId),
        };
      })
    );
  };

  const moveTask = (
    sourceColumn: string,
    targetColumnId: string,
    taskId: string
  ) => {
    //hämta task från source
    let taskToMove: Task | undefined;
    setColumns((prev) => {
      const newCols = prev.map((col) => {
        if (col.id === sourceColumn) {
          taskToMove = col.tasks.find((t: Task) => t.id === taskId);
          return {
            ...col,
            tasks: col.tasks.filter((t: Task) => t.id !== taskId),
          };
        }
        return col;
      });
      //Lägg till i target
      return newCols.map((col) => {
        if (col.id === targetColumnId && taskToMove) {
          return {
            ...col,
            tasks: [...col.tasks, taskToMove],
          };
        }
        return col;
      });
    });
  };
  return (
    <TaskContext.Provider
      value={{
        columns,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
