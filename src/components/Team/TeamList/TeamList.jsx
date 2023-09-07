import { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TeamRow from "../TeamRow/TeamRow";

const TeamList = () => {
  const [teams, setTeams] = useState(() => {
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    return storedTeams;
  });

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  const createTeam = (newTeam) => {
    setTeams([...teams, { ...newTeam, id: teams.length + 1 }]);
  };
  return (
    <>
      <Sidebar />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" className="table-header">
                Team name
              </TableCell>
              <TableCell align="right" className="table-header">
                Assigned tasks
              </TableCell>
              <TableCell align="right" className="table-header">
                Team members
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TeamRow key={team?.id} team={team} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TeamList;
