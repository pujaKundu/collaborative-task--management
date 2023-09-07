import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";

const CreateTeam = ({ createTeam, users, tasks }) => {
  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleMemberChange = (e) => {
    const selectedMember = e.target.value;
    if (!selectedMembers.includes(selectedMember)) {
      setSelectedMembers([...selectedMembers, selectedMember]);
    }
  };

  const handleTaskChange = (e) => {
    const selectedTask = e.target.value;
    if (!selectedTasks.includes(selectedTask)) {
      setSelectedTasks([...selectedTasks, selectedTask]);
    }
  };

  const handleSubmit = () => {
    if (teamName && selectedMembers.length > 0 && selectedTasks.length > 0) {
      const newTeam = {
        name: teamName,
        members: selectedMembers,
        tasks: selectedTasks,
      };
      createTeam(newTeam);
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
          <label>Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={handleTeamNameChange}
            placeholder="Enter team name"
          />
        </div>
        <div>
          <label>Select Team Members:</label>
          <select
            multiple
            value={selectedMembers}
            onChange={handleMemberChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Tasks:</label>
          <select multiple value={selectedTasks} onChange={handleTaskChange}>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit}>Create Team</button>
      </div>
    </>
  );
};

export default CreateTeam;
