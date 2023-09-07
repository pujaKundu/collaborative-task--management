import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TaskRow from "../TaskRow/TaskRow";
import { Select, MenuItem } from "@mui/material";

const TaskList = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);
  const [filteredTaskList, setFilteredTaskList] = useState(tasks); // Initialize with all tasks
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [selectedSortOption, setSelectedSortOption] = useState("priority");
  const [selectedDueDateFilter, setSelectedDueDateFilter] = useState("all");

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
      setFilteredTaskList(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // When the tasks prop changes, update the taskList state
    setTaskList(tasks);
    setFilteredTaskList(tasks); // Reset filteredTaskList when tasks prop changes
  }, [tasks]);

  useEffect(() => {
    // Save the taskList to localStorage whenever it changes
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleUpdateStatus = (taskId, newStatus) => {
    // Find the task in the list and update its status
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    // Update the state with the new task list
    setTaskList(updatedTaskList);
    setFilteredTaskList(updatedTaskList); // Update filteredTaskList as well
  };

  const handleStatusFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setSelectedStatusFilter(selectedStatus);

    // Filter tasks based on status and due date
    const filteredTasks = taskList.filter((task) => {
      if (selectedStatus === "all") {
        return true; // Show all tasks
      } else {
        return task.status === selectedStatus;
      }
    });
    setFilteredTaskList(filteredTasks);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSelectedSortOption(selectedSort);

    // Sort tasks based on the selected criteria
    const sortedTasks = [...filteredTaskList]; // Sort the filteredTaskList
    sortedTasks.sort((a, b) => {
      if (selectedSort === "priority") {
        return b.priority - a.priority; // Sort by priority in descending order
      } else if (selectedSort === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date
      }
    });

    // Update filteredTaskList
    setFilteredTaskList(sortedTasks);
  };

  const handleDueDateFilterChange = (event) => {
    const selectedDueDate = event.target.value;
    setSelectedDueDateFilter(selectedDueDate);

    // Filter tasks based on due date
    const filteredTasks = taskList.filter((task) => {
      if (selectedDueDate === "all") {
        return true;
      } else {
        const today = new Date();
        if (selectedDueDate === "today") {
          return new Date(task.dueDate).toDateString() === today.toDateString();
        } else if (selectedDueDate === "overdue") {
          return new Date(task.dueDate) < today;
        } else if (selectedDueDate === "upcoming") {
          return new Date(task.dueDate) > today;
        }
      }
    });

    // Update the displayed tasks
    setFilteredTaskList(filteredTasks);
  };

  return (
    <div>
      <div>
        <Select
          value={selectedStatusFilter}
          onChange={handleStatusFilterChange}
          label="Status Filter"
          name="status-filter"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </div>
      <div>
        <Select
          value={selectedSortOption}
          onChange={handleSortChange}
          label="Sort By"
          name="sort-by"
        >
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="dueDate">Due Date</MenuItem>
        </Select>
      </div>
      <div>
        <Select
          value={selectedDueDateFilter}
          onChange={handleDueDateFilterChange}
          label="Due Date Filter"
          name="due-date-filter"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="overdue">Overdue</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
        </Select>
      </div>
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
            {filteredTaskList.map((task) => (
              <TaskRow
                key={task?.id}
                task={task}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;
