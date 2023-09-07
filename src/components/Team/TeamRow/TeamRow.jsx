import { TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { getMemberNames, getTaskNames } from "../Helper/TeamHelperFunctions";

const TeamRow = ({ team }) => {
  const { id, name, members, tasks: taskIds } = team || {};

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

  const memberNames = getMemberNames(members, users);
  const taskNames = getTaskNames(taskIds, tasks);

  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">{name}</TableCell>
      <TableCell align="right">{memberNames}</TableCell>
      <TableCell align="right">{taskNames}</TableCell>
    </TableRow>
  );
};

export default TeamRow;
