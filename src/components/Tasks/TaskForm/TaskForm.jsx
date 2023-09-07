import { MenuItem, Select, TextField } from "@mui/material";
import  { useState } from "react";

const TaskForm = ({ onTaskAdd }) => {
    const users = JSON.parse(localStorage.getItem("users"));
      const initialPriority = "low"; 
      const initialAssignee =
        users && users.length > 0 ? users[0].username : "";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: initialPriority, 
    assignee: initialAssignee, 
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
      status: "in progress", 
    });
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: initialPriority, 
      assignee: initialAssignee, 
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
                value={formData.priority}
                onChange={handleFormChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </label>
            <label>
              <p className="label-text">Assignee:</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Assginee"
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
            <button type="submit" className="form-btn">
              Add task
            </button>
          </form>
        
    );
};

export default TaskForm;
