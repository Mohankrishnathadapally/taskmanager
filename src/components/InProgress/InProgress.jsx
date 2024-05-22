import React, { useState, useEffect } from 'react';
import '../CSS/Style.css';
import data from '../../assets/data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import edit_icon from '../../assets/edit_icon.png';
import delete_icon from '../../assets/delete_icon.png';
import AddTaskPopup from '../addtaskpopup/addtaskpopup';
import AddTask from '../addtask/addtask';

const InProgress = () => {
  const [tasks, setTasks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // useEffect(() => {
  //   // Fetch tasks from an API or use dummy data
  //   const fetchedTasks = [
  //     { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'Completed', important: 'Yes' },
  //     { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'Inprogress', important: 'No' },
  //     { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'Completed', important: 'No' },
  //     { id: 4, title: 'Task 4', description: 'Description for Task 4', status: 'Inprogress', important: 'Yes' },
  //     { id: 5, title: 'Task 5', description: 'Description for Task 5', status: 'Inprogress', important: 'No' },
  //     { id: 6, title: 'Task 6', description: 'Description for Task 6', status: 'Completed', important: 'Yes' },
  //     { id: 7, title: 'Task 7', description: 'Description for Task 7', status: 'Inprogress', important: 'No' },
  //     { id: 8, title: 'Task 8', description: 'Description for Task 8', status: 'Inprogress', important: 'No' },
  //     { id: 9, title: 'Task 9', description: 'Description for Task 9', status: 'Inprogress', important: 'Yes' },
  //     { id: 10, title: 'Task 10', description: 'Description for Task 10', status: 'Completed', important: 'Yes' },
  //     { id: 11, title: 'Task 11', description: 'Description for Task 11', status: 'Completed', important: 'Yes' },
  //     { id: 12, title: 'Task 12', description: 'Description for Task 12', status: 'Inprogress', important: 'No' },
  //   ];
  //   setTasks(fetchedTasks);
  // }, []);

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

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    handleClosePopup();
  };

  const handleTaskCreate = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const deletePop = () => {
    toast.warning(`Task deleted successfully`, {
      className: 'toast-delete',
    });
  };

  const inprogressTasks = tasks.filter(task => task.status === 'Inprogress');

  return (
    <div className="container">
      <h1>In Progress</h1>
      <AddTask onTaskCreate={handleTaskCreate} />
      <div className='task-empty'>
        {inprogressTasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <div className="task-list">
            {inprogressTasks.map(task => (
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

export default InProgress;