import React, { useState } from 'react';
import './addtask.css';
import add_icon from '../../assets/add_icon.png';
import AddTaskPopup from '../addtaskpopup/addtaskpopup';

const AddTask = ({ onTaskCreate }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleTaskCreate = (newTask) => {
    onTaskCreate(newTask);
    setShowSuccessMessage(true);
    console.log('Task created:', newTask);
  };

  return (
    <div className='addtask'>
      {showPopup && <AddTaskPopup onClose={handleClose} onTaskCreate={handleTaskCreate} />}
      <img src={add_icon} alt="" onClick={togglePopup} />
      {showSuccessMessage && (
        <p>Task has been successfully created!</p>
      )}
    </div>
  );
};

export default AddTask;