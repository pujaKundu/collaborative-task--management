import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [tasks, setTasks] = useState(() => {
    const json = localStorage.getItem("tasks");
    if (!json) return [];
    return JSON.parse(json);
  });

  // Filter tasks based on their status
  useEffect(() => {
    const pending = tasks.filter((task) => task.status === "pending");
    const inProgress = tasks.filter((task) => task.status === "in progress");
    const completed = tasks.filter((task) => task.status === "completed");

    setPendingTasks(pending);
    setInProgressTasks(inProgress);
    setCompletedTasks(completed);
  }, [tasks]);

  const renderTaskCards = (taskList) => {
    return taskList.map((task) => (
      <div key={task.id}>
        <Card
          className={`dashboard-card ${
            task.status === "completed"
              ? "green-card"
              : task.status === "in progress"
              ? "yellow-card"
              : "orange-card"
          }`}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Team: {task.teamId}
            </Typography>
          </CardContent>
        </Card>
      </div>
    ));
  };

  return (
    <div className="dashboard-container">
      <h3>Dashboard</h3>
      <div className="dashboard">
        <div className="dashboard-element">
          <div>
            <h4>Pending Tasks {pendingTasks.length}</h4>
          </div>
          {pendingTasks.length > 0 ? (
            renderTaskCards(pendingTasks)
          ) : (
            <p>No Pending Tasks</p>
          )}
        </div>

        <div className="dashboard-element">
          <div>
            <h4>In Progress Tasks {inProgressTasks.length}</h4>
          </div>
          {inProgressTasks.length > 0 ? (
            renderTaskCards(inProgressTasks)
          ) : (
            <p>No Tasks in Progress</p>
          )}
        </div>

        <div className="dashboard-element">
          <div>
            <h4>Completed Tasks {completedTasks.length}</h4>
          </div>
          {completedTasks.length > 0 ? (
            renderTaskCards(completedTasks)
          ) : (
            <p>No Completed Tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
