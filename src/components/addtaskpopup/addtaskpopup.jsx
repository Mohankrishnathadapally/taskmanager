import React, { useState, useEffect, useRef } from 'react';
import './addtaskpopup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTaskPopup = ({ onClose, onTaskCreate, taskToEdit }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    important: false, // Default to false
  });
  const popupRef = useRef(null);

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        ...taskToEdit,
        important: taskToEdit.important === 'Yes', // Ensure the checkbox reflects the correct state
      });
    }
  }, [taskToEdit]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTaskCreate({ ...task, important: task.important ? 'Yes' : 'No' }); // Convert back to string for consistency
    onClose();
  };

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updatePop = () => {
    const message = taskToEdit ? 'updated' : 'created';
    toast.success(`Task ${message} successfully!`, {
      className: 'toast-update',
    });
  };

  return (
    <div className='addtaskpopup'>
      <div ref={popupRef} className='addtaskpopup-box'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={task.title} onChange={handleInputChange} required />
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={task.description} onChange={handleInputChange} required></textarea>
          <label>Status:</label>
          <div className="status-options">
            <input type="radio" id="complete" name="status" value="Completed" checked={task.status === 'Completed'} onChange={handleInputChange} required />
            <label htmlFor="complete">Completed</label>
            <input type="radio" id="inprogress" name="status" value="Inprogress" checked={task.status === 'Inprogress'} onChange={handleInputChange} required />
            <label htmlFor="inprogress">In Progress</label>
          </div>
          <div>
            <input type="checkbox" id="important" name="important" checked={task.important} onChange={handleInputChange} />
            <label htmlFor="important">Important</label>
          </div>
          <div className="button-group">
            <button type="button" className='close' onClick={onClose}>
              Close
            </button>
            <button type="submit" className='create' onClick={updatePop} >
              {taskToEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;