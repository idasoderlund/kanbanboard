import React, { createContext, useState, type ReactNode } from "react";
import { Column, Task } from "./TaskContexts";

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

const initialData: Column[] = [
  { id: "todo", title: "Todo", tasks: [] },
  { id: "inprogress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

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
        if (col.id === sourceColumnId) {
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
