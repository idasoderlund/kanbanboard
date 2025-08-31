import React, { createContext, useState} from 'react';

export const TaskContext = createContext();

const initialData = {
    colums: [
        { id: 'todo', title: 'Todo', tasks: []},
        { id: 'inprogress', title: 'In Progress', tasks: []},
        { id: 'done', title: 'Done', tasks: []}
    ],
};

export const TasksProvider = ({ children }) => {
    const [columns, setColumns] = useState(initialData.columns);

    const addTask = (columnId, task) {
        setcolumns(prev => prev.map(col =>
            col.id === columnId? {...col, tasks: [...col.tasks,task] }
        ));
    };

    const updateTask = ( columnId, taskId, updateTask) => {
        setcolumns(ProgressEvent.map(col => {
            if(col.id !== columnId) return col;
            return {
                ...col,
                tasks: col.tasks.map(t => t.id === taskId ? updateTask : t),
            };
        }));
    };

    const deleteTask = (columnId, taskId) => {
        setColumns(prev => prev.map(col => {
            if (col.id !== columnId) return col;
            return {
                ...col,
                tasks: col.tasks.filer(t => t.id !== taskId),
            };
        }));
    };

    const moveTask = (sourceColId, targetColId, taskId) => {
        //hämta task från source
        let taskToMove;
        setColumns(prev => {
            const newCols = prev.map(col => {
                if (col.id === sourceColId) {
                    taskToMove = col.tasks.fins(t => t.id === taskId);
                    return {
                        ...col,
                        tasks: col.tasks.filer(t => t.id !== taskId),
                    };
                }
                return col;
            });
            //Lägg till i target
            return newCols.map(col => {
                if (col.id === targetColId && taskToMove) {
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
        <TaskContext.Provider value={{
            columns,
            addTask,
            updateTask,
            deleteTask,
            moveTask,
        }}>
            {children}
        </TaskContext.Provider>
    );
};