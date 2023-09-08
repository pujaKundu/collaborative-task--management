import { MenuItem, Select, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

const UserTeamRow = ({ task, onUpdateStatus }) => {
  const {
    id,
    title,
    description,
    dueDate,
    priority,
    assignee,
    status,
    teamId,
  } = task;

  const [selectedStatus, setSelectedStatus] = useState(status);

  console.log(selectedStatus);
  console.log(status);

  const stringPriority = () => {
    if (priority == 1) return "Low";
    if (priority == 2) return "Medium";
    if (priority == 3) return "High";
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    onUpdateStatus(id, newStatus);
  };

  const statusClassName = () => {
    switch (selectedStatus) {
      case "in progress":
        return "in-progress";
      case "completed":
        return "completed";
      default:
        return "";
    }
  };

  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">{title}</TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{dueDate}</TableCell>
      <TableCell align="right">{stringPriority()}</TableCell>
      <TableCell align="right">{teamId}</TableCell>
      <TableCell align="right">{assignee}</TableCell>
      <TableCell align="right" className={statusClassName()}>
        {status}
      </TableCell>
      <TableCell align="right">
        <Select
          value={selectedStatus}
          onChange={handleStatusChange}
          label="Status"
          name="status"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </TableCell>
    </TableRow>
  );
};

export default UserTeamRow;
