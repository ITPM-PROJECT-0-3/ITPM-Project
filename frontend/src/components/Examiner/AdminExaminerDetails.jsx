import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AdminExaminerDetails() {
  const [examiner, setExaminer] = useState({});
  const id = useParams();
  console.log(id.id);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/examiner/get-examiner/` + id.id
        );
        console.log(response.data.ExaminerProfile);
        setExaminer(response.data.ExaminerProfile);

        toast.success("Examiner Detail's Fetched Successfully!", {
          duration: 2000, // 3 seconds
          position: "top-right", // You can change the position if needed
        });
      } catch (error) {
        console.error("Error fetching group data:", error.message);
      }
    };

    fetchGroupData();
  }, [id.id]);

  return (
    <Box>
      <br />
      {examiner && (
        <h4
          style={{
            padding: "5px",
            fontFamily: "monospace",
            backgroundColor: "#17376e",
            color: "white",
            fontWeight: "600",
            borderEndEndRadius: "40px",
          }}
        >
          Examiner Details Of : {examiner.TagName} {examiner.FirstName}{" "}
          {examiner.LastName}
        </h4>
      )}

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 8">
          <Item>xs=8</Item>
        </Box>
        <Box gridColumn="span 4">
          <Item>xs=4</Item>
        </Box>
      </Box>
    </Box>
  );
}
