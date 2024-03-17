import React, { useState, useEffect, useRef } from "react";
import "./StudentListAdmin.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getImageUrl } from "../../utils";
import axios from "axios";
import toast from "react-hot-toast";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Swal from "sweetalert2";


export default function StudentListAdmin() {
  const [search, setSearch] = useState("");
  const [Users, setUsers] = useState([]);



  const conponentPDF = useRef(null);

  console.log(search);

  useEffect(() => {
    function getSystemUsers() {
      axios
        .get(
          "http://localhost:8000/student/fetch-require-examiner-group",
          getSystemUsers
        )
        .then((res) => {
          console.log(res.data.groupsWithLessThanThreeExaminers);
          setUsers(res.data.groupsWithLessThanThreeExaminers);

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

  // function DeleteExaminer(id) {
  //   console.log(id);

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios.delete(
  //         "http://localhost:8000/api/examiner/delete-examiner/" + id
  //       );

  //       Swal.fire("Deleted!", "Your file has been deleted.", "success");

  //       window.location.reload();
  //     }
  //   });
  // }

  return (
    <div id="AllSupplier">
      <main className="table">
        <section className="table__header">
          <Link
            to="/admin-nav"
            style={{
              textDecoration: "none",
              backgroundColor: "transparent !important",
            }}
          >
            <h1 style={{ fontFamily: "serif", fontWeight: "600" }}>
              Assign Examiners For Student Group
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

                  <th>Assign Examiners</th>
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
                              border: "0.5px solid", // Adding solid border
                              padding: "5px",
                              borderEndStartRadius: "6px",
                              borderEndEndRadius: "5px",
                              margin: "5px",
                              backgroundColor:
                                index % 4 === 0
                                  ? "#2196f3"
                                  : index % 4 === 1
                                  ? "#cddc39"
                                  : index % 4 === 2
                                  ? "#43a047"
                                  : "#ff9800", // Assigning different colors based on index
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

                      <td style={{ marginLeft: "auto" }}>
                        <Link to="">
                          <button
                            className="bx bx-chevrons-right bx btn btn-outline-primary bx-fade-left-hover"
                            style={{
                              textAlign: "center",
                              fontWeight: "800",
                              padding: "10px",
                              fontSize: "18px",
                              alignItems: "baseline",
                            }}
                            //
                          >
                            Assign Examiner
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
