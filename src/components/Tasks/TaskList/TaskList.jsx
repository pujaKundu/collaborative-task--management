import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TaskRow from "../TaskRow/TaskRow";

const TaskList = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    // When the tasks prop changes, update the taskList state
    setTaskList(tasks);
  }, [tasks]);

  const handleUpdateStatus = (taskId, newStatus) => {
    // Find the task in the list and update its status
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    // Update the state with the new task list
    setTaskList(updatedTaskList);

    // Save the updated tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Due date</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Assignee</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Change status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskList.map((task) => (
            <TaskRow
              key={task?.id}
              task={task}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
