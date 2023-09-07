import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";

const ManageTasks = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const json = localStorage.getItem("tasks");
    if (!json) return [];
    return JSON.parse(json);
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) ;
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAdd = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    
    closeTaskForm();
  };

  const openTaskForm = () => {
    setIsTaskFormOpen(true);
  };

  const closeTaskForm = () => {
    setIsTaskFormOpen(false);
  };

  return (
    <>
      <Sidebar />

      <div className="table-container">
        <h3 className="page-title">Manage tasks</h3>
        <button onClick={openTaskForm} className="add-task-btn">
          Add Task
        </button>

        {isTaskFormOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeTaskForm}>
                &times;
              </span>
              <TaskForm onTaskAdd={handleTaskAdd} />
            </div>
          </div>
        )}

        <TaskList tasks={tasks} />
      </div>
    </>
  );
};

export default ManageTasks;
