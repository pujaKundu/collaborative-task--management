import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const TableHeaders = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="right" className="table-header">
          Title
        </TableCell>
        <TableCell align="right" className="table-header">
          Description
        </TableCell>
        <TableCell align="right" className="table-header">
          Due date
        </TableCell>
        <TableCell align="right" className="table-header">
          Priority
        </TableCell>
        <TableCell align="right" className="table-header">
          Assignee
        </TableCell>
        <TableCell align="right" className="table-header">
          Status
        </TableCell>
        <TableCell align="right" className="table-header">
          Change status
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeaders;
