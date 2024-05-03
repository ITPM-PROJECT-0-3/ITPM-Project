import React, { useState, useEffect } from "react";
import Table from "@mui/joy/Table";
import axios from "axios";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

export default function Progress2Marks({ studentId, groupId }) {
  const [marks, setMarks] = useState({});
  const [errors, setErrors] = useState({});
  const examinerEmail = localStorage.getItem("UserEmail");

  const handleMarksChange = (criterion, value) => {
    // Check if value is less than or equal to 10
    if (value <= 10) {
      setMarks((prevState) => ({
        ...prevState,
        [criterion]: value,
      }));
      // Clear error if value is valid
      setErrors((prevState) => ({
        ...prevState,
        [criterion]: "",
      }));
    } else {
      // Set error if value is invalid
      setErrors((prevState) => ({
        ...prevState,
        [criterion]: "Value must be less than or equal to 10",
      }));
    }
  };

  const getTotalMarks = () => {
    let total = 0;
    for (const criterion in marks) {
      total += Number(marks[criterion]);
    }
    return total;
  };

  const getStatus = (value) => {
    if (value >= 8) {
      return "Good";
    } else if (value >= 5) {
      return "Average";
    } else {
      return "Not Good";
    }
  };

  const criteria = [
    { name: "demonstratedProgress" },
    { name: "adherenceToTimeline" },
    { name: "problemSolvingSkills" },
    { name: "resultsInterpretation" },
    { name: "innovationCreativity" },
    { name: "collaborationTeamwork" },
    { name: "documentationReporting" },
  ];
  console.log(marks.Clarity);
  console.log(getTotalMarks());

  const handleAssign = () => {
    const Marks = [
      {
        StudentID: studentId, // Assuming studentId is defined somewhere in your component
        demonstratedProgress: marks.demonstratedProgress,
        adherenceToTimeline: marks.adherenceToTimeline,
        problemSolvingSkills: marks.problemSolvingSkills,
        resultsInterpretation: marks.resultsInterpretation,
        innovationCreativity: marks.innovationCreativity,
        collaborationTeamwork: marks.collaborationTeamwork,
        documentationReporting: marks.documentationReporting,
        total: getTotalMarks(),
      },
    ];

    const Email = examinerEmail; // Assuming examinerEmail is defined somewhere in your component
    const Id = groupId; // Assuming groupId is defined somewhere in your component

    axios
      .put(`http://localhost:8000/api/examiner/Asigne-progrees2-marks/${Id}`, {
        progress2Marks: Marks,
        Email: Email,
      })
      .then((res) => {
        console.log(res.data.updatedGroup.ExaminerDetails);
        toast.success("Marks Updated Successfully!", {
          duration: 2000, // 3 seconds
          position: "top-right", // You can change the position if needed
        });
      })
      .catch((err) => {
        alert(
          "Error updating student Marks details in Student model: " +
            err.message
        );
      });
  };
  return (
    <div>
      {" "}
      <Table hoverRow>
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Marking Criteria</th>
            <th style={{ width: "20%" }}>Marks&nbsp;( /10)</th>
            <th style={{ width: "20%", textAlign: "center" }}>Status</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "left" }}>
          {criteria.map((criterion, index) => (
            <tr key={index}>
              <td>{criterion.name}</td>
              <td>
                <Form.Control
                  onChange={(e) =>
                    handleMarksChange(criterion.name, e.target.value)
                  }
                  type="number"
                  min="0"
                  max="10"
                />
              </td>
              <td style={{ fontWeight: "800", textAlign: "center" }}>
                {marks[criterion.name] &&
                  getStatus(Number(marks[criterion.name]))}
              </td>
              <td style={{ color: "red" }}>{errors[criterion.name]}</td>
            </tr>
          ))}

          <tr>
            <td style={{ fontWeight: "800", fontSize: "20px" }}>Total Marks</td>
            <td></td>
            <td style={{ fontWeight: "800", fontSize: "20px" }}>
              {getTotalMarks()}
            </td>

            <td></td>
          </tr>

          <tr style={{ textAlign: "right" }}>
            <td style={{ fontWeight: "800", fontSize: "20px" }}>
              <Button variant="success" onClick={handleAssign}>
                Save Result Sheet
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
