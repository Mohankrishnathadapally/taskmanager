import React, { useState } from 'react';
import Navbar from './components/Navbar/navbar';
import Addtask from './components/addtask/addtask';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Completed from './components/Completed/Completed';
import Important from './components/Important/Important';
import InProgress from './components/InProgress/InProgress';
import LoginSignup from './components/loginSignup/loginsignup';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreate = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <>
        <Navbar />
        <Addtask onTaskCreate={handleTaskCreate}/>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/completed' element={<Completed />} />
          <Route path='/inprogress' element={<InProgress />} />
          <Route path='/important' element={<Important />} />
          <Route path='/login' element={<LoginSignup/>} />
        </Routes>
    </>
  );
};

export default App;
