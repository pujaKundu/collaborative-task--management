import { MenuItem, Select, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

const TeamRow = ({ team }) => {
  const { id, teamName, teamMembers, assignedTasks } = team || {};
  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">{teamName}</TableCell>
    </TableRow>
  );
};

export default TeamRow;
