import React from 'react';
import Card from './Card';
import {useDrop } from 'react-dnd';
import { TaskContext } from '../Contexts/TaskContext';

const Column = ({ column }) => {
    const { moveTask } = React.useContext(TaskContext);

    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => {
            moveTask(item.sourceColumnId, columnId, itemId);
        },
        collect: (monitor => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} style= {{
            backgroundColor: isOver ? '#f0f0f0' : '#fff',
            padding: '10px',
            minWidth: '200px',
            border: '1px solid #ccc',
        }}>
            <h3>{column.title}</h3>
            {column.tasks.map(task => (
                <Card key={task.id} task={task} columnId={column.id} />
            ))}
        </div>
    );
};

export default Column;