import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHeaders from "./TableHeaders";
import Paper from "@mui/material/Paper";
import TaskRow from "../TaskRow/TaskRow";
import SelectOptions from "./SelectOptions";
import {
  statusFilterItems,
  sortByItems,
  dueDateFilterItems,
} from "../../../constants/taskMenuItems";

const TaskList = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);
  const [filteredTaskList, setFilteredTaskList] = useState(tasks); 
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [selectedSortOption, setSelectedSortOption] = useState("priority");
  const [selectedDueDateFilter, setSelectedDueDateFilter] = useState("all");

  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
      setFilteredTaskList(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    setTaskList(tasks);
    setFilteredTaskList(tasks); 
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleUpdateStatus = (taskId, newStatus) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    setTaskList(updatedTaskList);
    setFilteredTaskList(updatedTaskList); 
  };

  const handleUpdateAssignee = (taskId, newAssignee) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, assignee: newAssignee } : task
    );

    setTaskList(updatedTaskList);
    setFilteredTaskList(updatedTaskList);
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

    // Update tasks
    setFilteredTaskList(filteredTasks);
  };

  return (
    <>
      <div className="filter-sort-container">
        <div className="select-container">
          <small>Filter by status</small>
          <SelectOptions
            selectValue={selectedStatusFilter}
            onChangeHandler={handleStatusFilterChange}
            menuItems={statusFilterItems}
          />
        </div>
        <div className="select-container">
          <small>Filter by due date</small>
          <SelectOptions
            selectValue={selectedDueDateFilter}
            onChangeHandler={handleDueDateFilterChange}
            menuItems={dueDateFilterItems}
          />
        </div>
        <div className="select-container">
          <small>Sort by priority or date</small>
          <SelectOptions
            selectValue={selectedSortOption}
            onChangeHandler={handleSortChange}
            menuItems={sortByItems}
          />
        </div>
      </div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeaders />
          <TableBody>
            {filteredTaskList.map((task) => (
              <TaskRow
                key={task?.id}
                task={task}
                onUpdateStatus={handleUpdateStatus}
                onUpdateAssignee={handleUpdateAssignee}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskList;
