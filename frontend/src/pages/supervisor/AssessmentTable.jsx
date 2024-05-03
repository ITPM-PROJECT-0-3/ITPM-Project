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

  useEffect(() => {
    // Extract groupMongoIds when currentUser or currentUser.engagedGroups changes
    if (currentUser) {
      console.log("Current User:", currentUser.supervisor.engagedGroups);
      const ids = currentUser.supervisor.engagedGroups.map(
        (group) => group.groupMongoId
      );
      setGroupMongoIds(ids);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/supervisor/superviser-groups",
          { ids: groupMongoIds }
        );
        console.log(response.data);
        setRows(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const requests = ids.map((id) =>
  //           axios.get(
  //             `http://localhost:8000/api/supervisor/assignment-marks/group/${id._id}`
  //           )
  //         );
  //         const responses = await Promise.all(requests);
  //         const data = responses.map((response) => response.data);
  //         setRows(data);
  //         setLoading(false);
  //       } catch (err) {
  //         setError(err.message);
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const handleClickOpen = (row) => {
    setOpen(true);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // console.log("Current User:", currentUser);

  return (
    <>
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
            {rows.map((row) => (
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
      <MarksModal
        open={open}
        handleClose={handleClose}
        currentRow={currentRow}
      />
    </>
  );
}

export default AssessmentTable;
