import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Board from './components/Board';

const dummyData = [
  {
    id: 1,
    title: "To Do",
    cards: [
      {
        id: uuidv4(),
        name: "Sample Task 1",
        description: "Sample Task 1 description.",
        deadline: "2023-12-12",
        image: null, // can be a URL
        isFavorited: false,
        status: 'To-Do'
      }
    ]
  },
  {
    id: 2,
    title: "In Progress",
    cards: [
      {
        id: uuidv4(),
        name: "Sample Task 2",
        description: "Sample Task 2 description.",
        deadline: "2023-12-12",
        image: null, // can be a URL
        isFavorited: false,
        status: 'To-Do'
      }
    ]
  },
  {
    id: 3,
    title: "Completed",
    cards: [
      {
        id: uuidv4(),
        name: "Sample Task 3",
        description: "Sample Task 3 description.",
        deadline: "2023-12-12",
        image: null, // can be a URL
        isFavorited: false,
        status: 'To-Do'
      }
    ]
  }
];

function App() {
  const theme = createTheme();

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : dummyData;
    setTaskList(data);
  }, []);

  const addNewTask = (id, task) => {
    const item = {
      id: uuidv4(),
      name: task.name,
      description: task.description,
      deadline: "2023-12-12",
      image: null, // can be a URL
      isFavorited: false,
      status: 'To-Do'
    };
    const newTaskList = [...taskList];
    newTaskList[id - 1].cards.push(item);
    setTaskList(newTaskList);
    savetoDB(newTaskList);
  };

  const deleteTask = (id, listId) => {
    const newTaskList = [...taskList];
    newTaskList[listId - 1].cards = newTaskList[listId - 1].cards.filter((e) => e.id != id);
    setTaskList(newTaskList);
    savetoDB(newTaskList);
  };

  const updateTaskStatus = (listId, id, newStatus) => {
    console.log(listId, id, newStatus);
    const newTaskList = [...taskList];
    const cards = newTaskList[listId - 1].cards.map(item => {
      if (item.id == id) {
        return {
          ...item,
          status: newStatus
        }
      }
      return item;
    });
    newTaskList[listId - 1].cards = cards;
    setTaskList(newTaskList);
    savetoDB(newTaskList);
  };

  const savetoDB = (data) => {
    localStorage.setItem('taskList', JSON.stringify(data));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className="App">
          <h1>Manage Task</h1>
          <Board
            lists={taskList}
            addNewTask={addNewTask}
            deleteTask={deleteTask}
            updateTaskStatus={updateTaskStatus}
          />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;

