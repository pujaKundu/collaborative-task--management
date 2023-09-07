import { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TeamRow from "../TeamRow/TeamRow";
import Paper from "@mui/material/Paper";

const TeamList = ({ teams }) => {
  return (
    <>
      <Sidebar />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" className="table-header">
                Team Id
              </TableCell>
              <TableCell align="right" className="table-header">
                Team name
              </TableCell>

              <TableCell align="right" className="table-header">
                Team members
              </TableCell>
              <TableCell align="right" className="table-header">
                Assigned tasks
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
