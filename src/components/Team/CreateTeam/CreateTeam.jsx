import  { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import {
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

const CreateTeam = ({ createTeam, users, tasks }) => {
  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleMemberChange = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleTaskChange = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleSubmit = () => {
    if (teamName && selectedMembers?.length > 0 && selectedTasks?.length > 0) {
      const newTeam = {
        name: teamName,
        members: selectedMembers,
        tasks: selectedTasks,
      };

      // Assign team members to selected tasks
      const updatedTasks = tasks.map((task) => {
        if (selectedTasks.includes(task.id)) {
          return {
            ...task,
            assignee: selectedMembers,
          };
        }
        return task;
      });

      createTeam(newTeam, updatedTasks);

      // Reset form
      setTeamName("");
      setSelectedMembers([]);
      setSelectedTasks([]);
    }
  };

  return (
    <>
      <Sidebar />
      <div>
        <h3>Create Team</h3>
        <div>
          <p className="label-text">Team Name:</p>
          <TextField
            type="text"
            value={teamName}
            onChange={handleTeamNameChange}
            placeholder="Enter team name"
            className="form-input"
          />
        </div>
        <div>
          <p className="label-text">Select Team Members:</p>
          {users.map((user) => (
            <FormControlLabel
              key={user.id}
              control={
                <Checkbox
                  checked={selectedMembers.includes(user.id)}
                  onChange={() => handleMemberChange(user.id)}
                  name={`member-${user.id}`}
                />
              }
              label={user.username}
            />
          ))}
        </div>
        <div>
          <p className="label-text">Select Tasks:</p>
          {tasks.map((task) => (
            <FormControlLabel
              key={task.id}
              control={
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleTaskChange(task.id)}
                  name={`task-${task.id}`}
                />
              }
              label={task.title}
            />
          ))}
        </div>

        <button onClick={handleSubmit} className="create-team-btn">
          Create Team
        </button>
      </div>
    </>
  );
};

export default CreateTeam;
