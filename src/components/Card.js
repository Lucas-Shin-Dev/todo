import React, { useState } from 'react';
import { Checkbox, Card as MuiCard, CardContent, Typography, Button, Box } from '@mui/material';
import EditTaskPopup from '../modals/EditTask';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);
    const [completed, setCompleted] = useState(taskObj && taskObj.completed ? taskObj.completed : false);


    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ];

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    const handleCheckboxChange = () => {
        setCompleted(!completed);
        let updatedTask = { ...taskObj, completed: !completed };
        updateListArray(updatedTask, index);
    };

    return (
        <MuiCard sx={{ marginBottom: 2, boxShadow: 3, bgcolor: colors[index % 5].secondaryColor }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" component="div" sx={{ textDecoration: (completed && taskObj && taskObj.Name) ? 'line-through' : 'none' }}>
                    {taskObj && taskObj.Name}
                </Typography>

                    <Checkbox checked={completed} onChange={handleCheckboxChange} />
                </Box>
                <Typography variant="body2" sx={{ mt: 1, textDecoration: (completed && taskObj && taskObj.Description) ? 'line-through' : 'none' }}>
                    {taskObj && taskObj.Description}
                </Typography>

                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button variant="contained" color="primary" onClick={() => setModal(true)} sx={{ marginRight: 1 }}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                </Box>
            </CardContent>
            <EditTaskPopup modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </MuiCard>
    );
};

export default Card;
