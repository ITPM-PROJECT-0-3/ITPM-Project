import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getImageUrl } from "../../utils";
import "./ExaminerlistTable.css";
import axios from "axios";
import toast from "react-hot-toast";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ExaminerlistTable() {
  const [search, setSearch] = useState("");
  const [Users, setUsers] = useState([]);

  const conponentPDF = useRef(null);

  console.log(search);

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

  function DeleteExaminer(id) {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          "http://localhost:8000/api/examiner/delete-examiner/" + id
        );

        Swal.fire("Deleted!", "Your file has been deleted.", "success");

        window.location.reload();
      }
    });
  }

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Add the logo
    const logoURL = "../../assets/NAV/logo.png";
    pdf.addImage(logoURL, "PNG", 10, 10, 50, 20); // Adjust the coordinates and dimensions as needed

    // Set font styles
    pdf.setFont("helvetica");
    pdf.setFontSize(16);

    // Add a title
    pdf.text("Examiner List Of Reserch Panel - SLIIT", 70, 20);

    // Create a table for client data
    const tableData = Users.map((dataobj, index) => {
      const groupIds = dataobj.StudentGropDetails.map(
        (group) => group.groupId
      ).join(", ");
      return [
        `${dataobj.TagName} ${dataobj.FirstName} ${dataobj.LastName}`,
        dataobj.Email,
        dataobj.Univercity,
        dataobj.Facalty,
        groupIds,
      ];
    });

    const tableHeaders = [
      "Examiner Name",
      "Email",
      "Univercity",
      "Facalty",
      "StudentGropDetails",
    ];

    // Set the table style
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0); // Text color (black)

    // Add the table
    pdf.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 40, // Adjust the vertical position
      margin: { horizontal: 10 },
      columnStyles: { 0: { cellWidth: 50 } }, // Adjust the column width
      bodyStyles: { valign: "middle" }, // Vertical alignment for cell content
      columnWidth: "wrap",
    });

    let currentYPosition = pdf.lastAutoTable.finalY + 20; // Get the Y position of the last table row + 20 for padding

    // Add shop address
    pdf.setFontSize(14);
    pdf.text("", 10, currentYPosition);

    const shopAddress = [
      "SLIIT | Sri Lanka Institute of Information Technology",
      "Faculty of Computing",
      "City : Malabe",
      "Phone: (+94)91 2245891",
      "Email: sliit.lk ",
    ];
    currentYPosition += 10; // Initial space before first address line

    shopAddress.forEach((line) => {
      pdf.text(line, 10, currentYPosition);
      currentYPosition += 10;
    });

    currentYPosition += 20; // add some spacing before the signature line

    // Add signature placeholders
    pdf.line(10, currentYPosition, 110, currentYPosition); // Signature line for supplier
    pdf.text("Cordinater Signature:", 10, currentYPosition + 10);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;

    pdf.text(`Date: ${formattedDate}`, 130, currentYPosition + 10);
    currentYPosition += 15;

    // Signature line for shop representative

    // Save the updated PDF
    pdf.save("supplier_report.pdf");
  };

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
              <label htmlFor="export-file" id="toPDF" onClick={generatePDF}>
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
                      <td>{dataobj.Facalty} </td>
                      <td>{dataobj.StudentGropDetails.length}</td>
                      <td style={{ marginLeft: "auto" }}>
                        <button
                          className="bx bx-trash bx-xs btn btn-outline-danger"
                          style={{ margin: "1px" }}
                          onClick={() => DeleteExaminer(dataobj._id)}
                        ></button>
                        <Link to={`/examiner-profile/${dataobj._id}`}>
                          <button
                            className="bx bx-info-circle bx-xs btn btn-outline-primary"
                            style={{ margin: "1px" }}
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
  );
}
