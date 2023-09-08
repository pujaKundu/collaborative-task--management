import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const TaskForm = ({ onTaskAdd }) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const [teams, setTeams] = useState(() => {
    const json = localStorage.getItem("teams");
    if (json === null) return [];
    return JSON.parse(json);
  });

  const initialPriority = "low";


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: initialPriority,
    assignee: [],
    teamId: null,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onTaskAdd({
      ...formData,
      status: "pending",
    });
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: initialPriority,
      assignee: [],
      teamId: null,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Add New Task</h3>
      <label>
        <p className="label-text">Task title:</p>
        <TextField
          required
          id="outlined-required"
          label="Enter Title"
          type="text"
          name="title"
          className="form-input"
          value={formData.title}
          onChange={handleFormChange}
        />
      </label>
      <label>
        <p className="label-text">Task description:</p>

        <TextField
          id="outlined-required"
          label="Enter task description"
          type="text"
          name="description"
          className="form-input"
          value={formData.description}
          onChange={handleFormChange}
          required
        />
      </label>
      <label>
        <p className="label-text">Due date:</p>
        <TextField
          required
          id="outlined-required"
          label=""
          type="date"
          name="dueDate"
          className="form-input"
          value={formData.dueDate}
          onChange={handleFormChange}
        />
      </label>
      <label>
        <p className="label-text">Priority:</p>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Task priority"
          className="form-input"
          name="priority"
          value={formData.priority}
          onChange={handleFormChange}
        >
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
        </Select>
      </label>
      <label>
        <p className="label-text">Assignee:</p>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Assginee"
          name="assignee"
          className="form-input"
          value={formData.assignee}
          onChange={handleFormChange}
        >
          {users.map((user) => (
            <MenuItem key={user?.id} value={user?.username}>
              {user?.username}
            </MenuItem>
          ))}
        </Select>
      </label>
      <label>
        <p className="label-text">Team:</p>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Team"
          name="teamId"
          className="form-input"
          value={formData.teamId}
          onChange={handleFormChange}
        >
          {teams.map((team) => (
            <MenuItem key={team?.id} value={team?.id}>
              {team?.name}
            </MenuItem>
          ))}
        </Select>
      </label>
      <button type="submit" className="form-btn">
        Add task
      </button>
    </form>
  );
};

export default TaskForm;
