import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    FormLabel,
    TextField,
    Typography,
    Box,
    Modal
} from '@mui/material';
import Card from './Card';
import AddIcon from '@mui/icons-material/Add';
import AddTaskForm from './AddTaskForm';

function List({ list, addNewTask, deleteTask, updateTaskStatus }) {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({ name: '', description: '' });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addTask = (formData) => {
        handleClose();
        addNewTask(list.id, formData);
    };

    return (
        <div className="list">
            <div className='list-header'>
                {list.title}
                <span className='add-btn' onClick={handleOpen}>+</span>
            </div>
            {list.cards.map((card) => (
                <Card key={card.id}
                    card={card}
                    listId={list.id}
                    deleteTask={deleteTask}
                    updateTaskStatus={updateTaskStatus}
                />
            ))}

            

            {/* Add task modal start  */}
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>{"Add New Task"}</DialogTitle>
                <DialogContent>
                    <AddTaskForm handleClose={handleClose} addTask={addTask} />
                </DialogContent>
            </Dialog>
            {/* Add task modal end  */}
        </div>
    );
}

export default List;
