import { MenuItem, Select, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

const TaskRow = ({ task, onUpdateStatus }) => {
  const { id, title, description, dueDate, priority, assignee, status } = task;
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    onUpdateStatus(id, newStatus);
  };

  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">{id}</TableCell>
      <TableCell align="right">{title}</TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{dueDate}</TableCell>
      <TableCell align="right">{priority}</TableCell>
      <TableCell align="right">{assignee}</TableCell>
      <TableCell align="right">{status}</TableCell>
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

export default TaskRow;
