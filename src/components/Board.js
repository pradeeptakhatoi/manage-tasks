import React from 'react';
import List from './List';

function Board({ lists, addNewTask, deleteTask, updateTaskStatus }) {
    return (
        <div className="board">
            {lists.map((list) => (
                <List
                    key={list.id}
                    list={list}
                    addNewTask={addNewTask}
                    deleteTask={deleteTask}
                    updateTaskStatus={updateTaskStatus}
                />
            ))}
        </div>
    );
}

export default Board;
