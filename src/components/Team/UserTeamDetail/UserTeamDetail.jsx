import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import UserTeamRow from "../UserTeamRow/UserTeamRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHeaders from "../../Tasks/TaskList/TableHeaders";

const UserTeamDetail = () => {
  const { id } = useParams();

  const [teams, setTeams] = useState(() => {
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    return storedTeams;
  });
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return storedTasks;
  });

  const [taskList, setTaskList] = useState(tasks);
  const filteredTeam = teams.filter((team) => team.id == id) || [];

  const tasksInfo =
    filteredTeam[0]?.tasks?.map((taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        return task;
      } else {
        console.error(`Task with ID ${taskId} not found.`);
        return null;
      }
    }) || [];

  const handleUpdateStatus = (taskId, newStatus) => {
    const updatedTaskList = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTaskList);
  };

  return (
    <>
      <Sidebar />

      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeaders />
          <TableBody>
            {tasksInfo.map((t) => (
              <UserTeamRow
                key={t?.id}
                task={t}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTeamDetail;
