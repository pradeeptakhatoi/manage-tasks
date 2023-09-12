import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

function AddTaskForm({ handleClose, addTask }) {
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        let tempErrors = {};

        // Validate name (at least 3 characters)
        if (formData.name.trim().length == 0) {
            tempErrors.name = 'Please enter task name.';
        }

        // Validate description
        if (formData.description.trim().length == 0) {
            tempErrors.description = 'Please enter description.';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form is valid! Submitting:', formData);
            // Submit your form here
            addTask(formData);
        } else {
            console.log('Form has errors.');
        }
    };

    const handleCancel = (e) => {
        handleClose();
    };

    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                />
            </Grid>
            <Grid item>
                <TextField
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={2}
                    error={!!errors.description}
                    helperText={errors.description}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                &nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddTaskForm;
