import React, { useState, useEffect, useRef } from "react";
import "./ExaminerStudentList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export default function ExaminerStudentList() {
  const [search, setSearch] = useState("");
  const [Users, setUsers] = useState([]);

  const conponentPDF = useRef(null);

  console.log(search);
  const examinerEmail = localStorage.getItem("UserEmail");

  console.log(examinerEmail);

  useEffect(() => {
    function getSystemUsers() {
      axios
        .get(
          "http://localhost:8000/api/examiner/fetch-group/" + examinerEmail,
          getSystemUsers
        )
        .then((res) => {
          console.log(res.data.data);
          setUsers(res.data.data);

          toast.success("Data Fetched Successfully!", {
            duration: 3000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getSystemUsers();
  }, []);

  function MovetoAssign(id) {
    const groupId = id;
    alert(`Attention Examiner!
        
        Thank you for your dedication to the examination process. Below is a marking rubric and some guidelines to assist you:

        Marking Rubric:
        - Clearly defined criteria for assessment
        - Fair and consistent grading
        - Constructive feedback provided

        Examiner Guidelines:
        1. Familiarize yourself with the examination criteria.
        2. Evaluate each submission objectively and thoroughly.
        3. Provide constructive feedback to help candidates improve.
        4. Maintain confidentiality and integrity throughout the process.
        
        Click OK to proceed.`);

    localStorage.setItem("userid", groupId);
    window.location.replace("/examiner-Asign-marks");
  }

  return (
    <div id="AllSupplier">
      <main className="table">
        <section className="table__header">
          <Link
            to="/examiner-nav"
            style={{
              textDecoration: "none",
              backgroundColor: "transparent !important",
            }}
          >
            <h1 style={{ fontFamily: "serif", fontWeight: "600" }}>
              Examiner Group Preview
            </h1>
          </Link>
          <div className="input-group">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Data..."
            />
          </div>
        </section>
        <section className="table__body">
          <div ref={conponentPDF} style={{ width: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th>Group ID</th>
                  <th>Members</th>
                  <th>Supervisor Name & Co-Superviser Name</th>
                  <th>Topic</th>
                  <th>Assign Marks</th>
                </tr>
              </thead>
              <tbody>
                {Users && Users.length > 0 ? (
                  Users.filter((dataobj1) => {
                    const lowercaseSearch = search.toLocaleLowerCase();
                    const lowergroupId = dataobj1.groupId.toLowerCase();
                    const lowerCasesupervisor =
                      dataobj1.supervisor.toLowerCase();

                    return (
                      lowercaseSearch === "" ||
                      lowergroupId.includes(lowercaseSearch) ||
                      lowerCasesupervisor.includes(lowercaseSearch)
                    );
                  }).map((dataobj) => (
                    <tr key={dataobj._id}>
                      <td style={{ textAlign: "left", padding: "10px" }}>
                        {dataobj.groupId}
                      </td>
                      <td style={{ padding: "10px", textAlign: "left" }}>
                        {dataobj.members.map((member, index) => (
                          <div
                            key={index}
                            style={{
                              fontSize: "18px",
                              border: "0px solid", // Adding solid border
                              padding: "5px",
                              borderEndStartRadius: "6px",
                              borderEndEndRadius: "5px",
                              margin: "5px",
                              backgroundColor:
                                index % 4 === 0
                                  ? "#26c6da"
                                  : index % 4 === 1
                                  ? "#ffeb3b"
                                  : index % 4 === 2
                                  ? "#8c9eff"
                                  : "#64b5f6", // Assigning different colors based on index
                            }}
                          >
                            {member.ITNumber}
                          </div>
                        ))}
                      </td>
                      <td style={{ padding: "10px", textAlign: "left" }}>
                        <div style={{ marginBottom: "5px" }}>
                          <span style={{ fontWeight: "600", fontSize: "18px" }}>
                            Co-Supervisor Name:
                          </span>{" "}
                          {dataobj.coSupervisor}
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                          <span style={{ fontWeight: "600", fontSize: "18px" }}>
                            Supervisor Name:
                          </span>{" "}
                          {dataobj.supervisor}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontWeight: "600",
                        }}
                      >
                        {dataobj.topic}{" "}
                      </td>

                      <td style={{ marginLeft: "auto", padding: "20px" }}>
                        <Link to="">
                          <button
                            onClick={() => MovetoAssign(dataobj.groupId)}
                            className="bx bx-chevrons-right bx btn btn-outline-primary bx-fade-left-hover"
                            style={{
                              textAlign: "center",
                              fontWeight: "800",
                              padding: "10px",
                              fontSize: "18px",
                            }}
                          >
                            AssignMarks
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", color: "GrayText" }}
                    >
                      <center>
                        <PriorityHighIcon />
                      </center>
                      No Users in System.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
