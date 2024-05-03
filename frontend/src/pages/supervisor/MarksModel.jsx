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
} from "@mui/material";

function MarksModal({ open, handleClose: close, currentRow }) {
  const [marks, setMarks] = useState("");
  const [comment, setComment] = useState("");
  const [documentURL, setDocumentURL] = useState("");

  useEffect(() => {
    if (open && currentRow) {
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
    setMarks(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      groupId: currentRow?.groupId,
      supervisorId: currentRow?.supervisor,
      marks,
      comment,
    };
    try {
      await axios.post(
        `http://localhost:8000/api/supervisor/assignment-marks/${currentRow.groupId}`,
        data
      );
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Failed to submit marks and comments:", error);
    }
  };

  // Modified handleClose to reset state immediately when closing
  const handleClose = () => {
    setMarks("");
    setComment("");
    setDocumentURL(""); // Optionally reset other states as needed
    close(); // Call the original handleClose function passed as props
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MarksModal;
