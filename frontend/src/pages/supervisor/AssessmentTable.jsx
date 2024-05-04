import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
} from "@mui/material";
import MarksModal from "./MarksModel";
import { useAuth } from "../../contexts/ProjectCoordinator/AuthContext";

function AssessmentTable() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupMongoIds, setGroupMongoIds] = useState([]);

  const { currentUser } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (currentUser) {
      const ids = currentUser.supervisor.engagedGroups.map(
        (group) => group.groupMongoId
      );
      setGroupMongoIds(ids);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(groupMongoIds);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/supervisor/superviser-groups",
          { ids: groupMongoIds }
        );
        console.log(response.data.data);
        setRows(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (groupMongoIds.length > 0) {
      fetchData();
    }
  }, [groupMongoIds]);

  const handleClickOpen = (row) => {
    setOpen(true);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <TextField
        label="Search Here..."
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Group ID</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Submit Date</TableCell>
              <TableCell>Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.groupId}>
                  <TableCell component="th" scope="row">
                    {row.groupId}
                  </TableCell>
                  <TableCell>{row.topic}</TableCell>
                  <TableCell>{row.updatedAt}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickOpen(row)}
                    >
                      Marks
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <MarksModal
        open={open}
        handleClose={handleClose}
        currentRow={currentRow}
      />
    </>
  );
}

export default AssessmentTable;
