import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CreateTaskPopup from '../modals/CreateTask';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = taskList;
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const updateListArray = (obj, index) => {
        let tempList = taskList;
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        let tempList = taskList;
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    return (
        <Box>
            <Box className="header" textAlign="center" sx={{ backgroundColor: '#E9EEF6', pt: 6, pb: 4 }}>
                <Typography variant="h3">Todo List</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setModal(true)}>Create Task</Button>
            </Box>
            <Box className="task-container" sx={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#F6F7F8', p: 5 }}>
                {taskList && taskList.map((obj, index) => <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
            </Box>
            <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
        </Box>
    );
};

export default TodoList;
