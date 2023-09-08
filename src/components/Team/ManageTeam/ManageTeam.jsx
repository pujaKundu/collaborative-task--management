import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import TeamList from "../TeamList/TeamList";
import CreateTeam from "../CreateTeam/CreateTeam";

const ManageTeam = () => {
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);

  const [teams, setTeams] = useState(() => {
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    return storedTeams;
  });
  const [tasks, setTasks] = useState(() => {
    const json = localStorage.getItem("tasks");
    if (!json) return [];
    return JSON.parse(json);
  });
  const [users, setUsers] = useState(() => {
    const json = localStorage.getItem("users");
    if (!json) return [];
    return JSON.parse(json);
  });

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  const createTeam = (newTeam) => {
    setTeams([...teams, { ...newTeam, id: teams?.length + 1 }]);
  };

  const openTeamForm = () => {
    setIsTeamFormOpen(true);
  };

  const closeTeamForm = () => {
    setIsTeamFormOpen(false);
  };
  return (
    <>
      <Sidebar />
      <div className="team-container">
        <button onClick={openTeamForm} className="add-team-btn">
          Add Team
        </button>

        {isTeamFormOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeTeamForm}>
                &times;
              </span>
              <CreateTeam createTeam={createTeam} users={users} tasks={tasks} />
            </div>
          </div>
        )}

        <TeamList teams={teams} />
      </div>
    </>
  );
};

export default ManageTeam;
