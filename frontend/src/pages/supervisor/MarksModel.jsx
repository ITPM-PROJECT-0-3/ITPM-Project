import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import { showConfirmationAlert } from "../../../../BACKEND/utils/alert,js";
import { showDefaultAlert } from "../../../../BACKEND/utils/alert,js";

function MarksModal({ open, handleClose: close, currentRow }) {
  const [marks, setMarks] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [documentURL, setDocumentURL] = useState("");
  const [superviserId, setSuperviserId] = useState("");
  const [isNewEntry, setIsNewEntry] = useState(true);

  const handleCloseModal = () => {
    setMarks("");
    setComment("");
    setSnackbar({ ...snackbar, open: false });
    close(); // Call the original handleClose function passed as props
  };

  useEffect(() => {
    if (open && currentRow) {
      console.log("Fetching marks data for group:", currentRow.groupId);
      const fetchMarksData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/supervisor/assignment-marks/group/${currentRow.groupId}`
          );
          const { marks, comment } = response?.data?.assessmentMarks[0];
          setMarks(marks);
          setComment(comment);
        } catch (error) {
          console.error("Failed to fetch marks:", error);
        }
      };
      fetchMarksData();
    }
  }, [open, currentRow]);

  useEffect(() => {
    // Assuming the document URL is passed in currentRow or some other way
    if (currentRow && currentRow.downloadURLForDoc1) {
      setDocumentURL(currentRow.downloadURLForDoc1);
    }
  }, [currentRow]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleMarksChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setMarks(value.toString());
    }
  };

  useEffect(() => {
    if (currentRow) {
      if (currentRow.marks === null) {
        // Assuming 'marks' is not defined for new entries
        setIsNewEntry(false);
        setMarks(currentRow.marks);
        setComment(currentRow.comment);
      } else {
        setIsNewEntry(true);
        setMarks("");
        setComment("");
      }
    }
  }, [currentRow]);

  const handleCreate = async () => {
    const confirmationMessage = "confirm marks and comments for the group";

    const data = {
      groupId: currentRow?.groupId,
      supervisorId: currentRow?.supervisor,
      marks,
      comment,
    };
    handleCloseModal();

    showConfirmationAlert({
      confirmationMessage,
      onConfirm: async () => {
        setLoading(true);
        try {
          await axios.post(
            `http://localhost:8000/api/supervisor/assignment-marks/${currentRow.groupId}`,
            data
          );
          showDefaultAlert(
            "success",
            "Success",
            "Successfully submitted marks and comments!"
          );

          setLoading(false);
        } catch (error) {
          showDefaultAlert(
            "error",
            "Error",
            "An error occurred. Please try again later."
          );

          console.error("Failed to submit marks and comments:", error);
          setLoading(false);
        }
      },
      onCancel: () => {
        setLoading(false);
        handleCloseModal();
      },
    });
  };

  const handleUpdate = async () => {
    const confirmationMessage =
      "confirm updating marks and comments for the group";

    const data = {
      marks, // As this is the expected field from the API
      comment, // As this is the expected field from the API
    };
    handleCloseModal();
    showConfirmationAlert({
      confirmationMessage,
      onConfirm: async () => {
        setLoading(true);
        setLoading(true);
        try {
          await axios.put(
            `http://localhost:8000/api/supervisor/assignment-marks/group/${currentRow.groupId}`, // Correct endpoint with PUT method
            data
          );
          showDefaultAlert(
            "success",
            "Success",
            "Successfully updated marks and comments!"
          );
          handleCloseModal();
          setLoading(false);
        } catch (error) {
          showDefaultAlert(
            "error",
            "Error",
            "An error occurred. Please try again later."
          );
          console.error("Failed to submit marks and comments:", error);
          setSnackbar({ open: true, message: "Failed to update marks!" });
          setLoading(false);
        }
      },
      onCancel: () => {
        setLoading(false);
        handleCloseModal();
      },
    });
  };

  const handleDelete = async () => {
    const confirmationMessage = "confirm deletion of marks for the group";

    handleCloseModal();

    showConfirmationAlert({
      confirmationMessage,
      onConfirm: async () => {
        setLoading(true);
        try {
          console.log("Deleting marks for group:", currentRow.groupId);
          await axios.delete(
            `http://localhost:8000/api/supervisor/assignment-marks/group/${currentRow.groupId}`
          );
          showDefaultAlert("success", "Success", "Successfully deleted marks!");

          setLoading(false);
        } catch (error) {
          showDefaultAlert(
            "error",
            "Error",
            "An error occurred. Please try again later."
          );
          console.error("Failed to delete marks:", error);
          setLoading(false);
        }
      },
      onCancel: () => {
        setLoading(false);
        handleCloseModal();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title">
        Give Marks and Review Document
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="row" height={600}>
          {documentURL && (
            <Box flex={7} marginRight={2}>
              <iframe
                src={documentURL}
                title="Document Viewer"
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="fullscreen"
              />
            </Box>
          )}
          <Box flex={3} display="flex" flexDirection="column">
            <TextField
              autoFocus
              margin="dense"
              id="marks"
              label="Marks"
              type="number"
              fullWidth
              value={marks}
              onChange={handleMarksChange}
            />
            <TextField
              margin="dense"
              id="comment"
              label="Comment"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={handleCommentChange}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        {/* {isNewEntry ? ( */}
        <>
          <Button onClick={handleCreate} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </>
        {/* ) : ( */}
        <>
          <Button onClick={handleDelete} color="secondary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
          <Button onClick={handleUpdate} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </>
        {/* )} */}
      </DialogActions>
    </Dialog>
  );
}

export default MarksModal;
