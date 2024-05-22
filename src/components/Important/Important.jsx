import React, { useState, useEffect } from 'react';
import '../CSS/Style.css';
import data from '../../assets/data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import edit_icon from '../../assets/edit_icon.png';
import delete_icon from '../../assets/delete_icon.png';
import AddTaskPopup from '../addtaskpopup/addtaskpopup';
import AddTask from '../addtask/addtask';
import important from '../../assets/important.png'

const Important = () => {
  const [tasks, setTasks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    // Fetch tasks from an API or use dummy data
    setTasks(data);
  }, []);

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setCurrentTask(taskToEdit);
    setIsPopupOpen(true);
  };

  const handleDelete = (taskId) => {
    console.log('Delete task:', taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentTask(null);
  };

  const deletePop = () => {
    toast.warning(`Task deleted successfully`, {
      className: 'toast-delete',
    });
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    handleClosePopup();
  };

  const handleTaskCreate = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const importantTasks = tasks.filter(task => task.important === 'Yes');

  return (
    <div className="container">
      <h1>Important</h1>
      <AddTask onTaskCreate={handleTaskCreate} />
      <div className='task-empty'>
        {importantTasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <div className="task-list">
            {importantTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-details">
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <div className='task-status'>
                      {task.status}
                    </div>
                    <div className={`${task.important === "Yes" ? "task-status" : ""}`}>
                      {task.important === "Yes" ? 'Important' : ""}
                    </div>
                  </div>
                </div>
                <div className="task-actions">
                  <img
                    src={edit_icon}
                    alt="Edit"
                    onClick={() => handleEdit(task.id)}
                  />
                  <img
                    src={delete_icon}
                    alt="Delete"
                    onClick={() => {
                      handleDelete(task.id);
                      deletePop();
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isPopupOpen &&
        <AddTaskPopup
          onClose={handleClosePopup}
          onTaskCreate={handleTaskUpdate}
          taskToEdit={currentTask}
        />
      }
      <ToastContainer
        className="toast-container"
        autoClose={5000}
        closeButton={false}
        pauseOnHover={false}
        draggable={true}
        position='top-right'
      />
    </div>
  );
};

export default Important;