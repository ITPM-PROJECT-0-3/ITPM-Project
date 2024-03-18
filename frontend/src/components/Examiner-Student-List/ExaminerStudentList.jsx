import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getImageUrl } from "../../utils";
import "./ExaminerStudentList.css";
import axios from "axios";
import toast from "react-hot-toast";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";


export default function ExaminerStudentList() {

    const [search, setSearch] = useState("");
    const [Users, setUsers] = useState([]);

    const conponentPDF = useRef(null);

    useEffect(() => {
        function getSystemUsers() {
          axios
            .get(
              "http://localhost:8000/api/examiner/get-examiner-all",
              getSystemUsers
            )
            .then((res) => {
              console.log(res.data.ExaminerUserAll);
              setUsers(res.data.ExaminerUserAll);
    
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
              System Examiners Details...
            </h1>
          </Link>
          <div className="input-group">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Data..."
            />
          </div>
          <Link to="/examiner-registration-admin">
            <Button variant="outline-primary" size="md">
              Add Examiners
            </Button>
          </Link>
          <div className="export__file">
            <label
              htmlFor="export-file"
              className="export__file-btn"
              title="Export File"
            >
              <i className="bx bx-menu "></i>
            </label>
            <input type="checkbox" id="export-file" />
            <div className="export__file-options">
              <label>Export As &nbsp; &#10140;</label>
              <label htmlFor="export-file" id="toPDF">
                PDF <img src={getImageUrl("NAV/pdf.png")} alt="" />
              </label>
            </div>
          </div>
        </section>
        <section className="table__body">
          <div ref={conponentPDF} style={{ width: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th>Examiner Name</th>
                  <th>Email</th>
                  <th>UniverSity</th>
                  <th>Facalty</th>
                  <th>No Of Group</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {Users && Users.length > 0 ? (
                  Users.filter((dataobj1) => {
                    const lowercaseSearch = search.toLocaleLowerCase();
                    const lowerFirstName = dataobj1.FirstName.toLowerCase();
                    const lowerCaseLastName = dataobj1.LastName.toLowerCase();
                    const lowerCaseFacalty = dataobj1.Facalty
                      ? dataobj1.Facalty.toLowerCase()
                      : null;
                    const lowerCaseEmail = dataobj1.Email.toLowerCase();

                    return (
                      lowercaseSearch === "" ||
                      lowerFirstName.includes(lowercaseSearch) ||
                      lowerCaseLastName.includes(lowercaseSearch) ||
                      (lowerCaseFacalty &&
                        lowerCaseFacalty.includes(lowercaseSearch)) ||
                      lowerCaseEmail.includes(lowercaseSearch)
                    );
                  }).map((dataobj) => (
                    <tr key={dataobj._id}>
                      <td style={{ textAlign: "left" }}>
                        <img
                          src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                          alt=""
                          style={{ margin: "10px" }}
                        />
                        {dataobj.FirstName} {dataobj.LastName}
                      </td>
                      <td>{dataobj.Email}</td>
                      <td>{dataobj.Univercity}</td>
                      <td>{dataobj.Facalty} </td>
                      <td>{dataobj.AdminisrationPosition}</td>
                      <td style={{ marginLeft: "auto" }}>
                        <button
                          className="bx bx-trash bx-xs btn btn-outline-danger"
                          style={{ margin: "1px" }}
                        ></button>
                        <Link to={`/Admin/Sup/Profile/${dataobj._id}`}>
                          <button
                            className="bx bx-info-circle bx-xs btn btn-outline-primary"
                            style={{ margin: "1px" }}
                            //
                          ></button>
                        </Link>
                        <Link to={`/Admin/profile/update/${dataobj._id}`}>
                          <button
                            className="bx bx-pencil bx-xs btn btn-outline-warning"
                            style={{ margin: "1px" }}
                          ></button>
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
  )
}
