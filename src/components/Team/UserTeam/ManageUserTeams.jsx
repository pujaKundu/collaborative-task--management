import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from "react-router-dom";

const ManageUserTeams = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [teams, setTeams] = useState(() => {
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    return storedTeams;
  });

  const filteredTeams = teams.filter((team) =>
    team.members.includes(currentUser.id)
  );

  return (
    <>
      <Sidebar />
      <h4>Manage my teams</h4>
      <div className="user-team-container">
        {filteredTeams.map((team) => (
          <div key={team.id} className="team">
            <Link to={`/my-teams/${team.id}`}>{team.name.toUpperCase()}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageUserTeams;
