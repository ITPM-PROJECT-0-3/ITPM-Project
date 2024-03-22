import React, { useState, useEffect } from "react";
import styles from "../../styles/ExaminerGroupList.module.css";
import AdminSidebar from "../../components/Sidebar/Sidebar";
import AdminHeader from "../../components/SlideHeader/SlideHeader";
import ExaminerStudentList from "../../components/Examiner-Student-List/ExaminerStudentList";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ExaminerGroupList() {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  useEffect(() => {
    document.title = "Examiner Group List | SLIIT";
    return () => {
      document.title = "SLIIT";
    };
  }, []);

  const CustomTabs = [
    {
      to: "/examiner-nav",
      iconClass: "bx bx-grid-alt",
      label: "Dashboard",
    },
    {
      to: "/examiner-nav",
      iconClass: "bx bx-spreadsheet",
      label: "Prasentatition-Shedule",
    },
    {
      to: "/examiner-Group-List",
      iconClass: "bx bx-group",
      label: "Groups",
    },
  ];

  const customNavLinks = [
    { href: "/examiner-nav", label: "Home" },
    { href: "/examiner-nav", label: "Dashboard" },
    { href: "/examiner-Group-List", label: "Group-List" },
  ];

  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    // Update state to show alert every time component refreshes
    setShowAlert(true);
  }, []);

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={styles.bodyD}>
      <div>
        <AdminSidebar
          sidebarActive={sidebarActive}
          toggleSidebar={toggleSidebar}
          CustomTabs={CustomTabs}
        />
      </div>

      <div
        style={{
          marginTop: "25px",
          marginLeft: sidebarActive ? "250px" : "80px",
          transition: " all 0.6s ease",
        }}
      >
        <AdminHeader customNavLinks={customNavLinks} />
        <div>
          {showAlert && ( // Conditionally render alert based on showAlert state
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info" onClose={closeAlert}>
                <div>
                  <span role="img" aria-label="Magnifying Glass">
                    🔍
                  </span>{" "}
                  Member Details & Examiner Assignment{" "}
                  <span role="img" aria-label="Magnifying Glass">
                    🔍
                  </span>
                </div>
                <div className="alert">
                  <strong>Attention!</strong>
                  <span role="img" aria-label="Calendar and Briefcase">
                    📅💼
                  </span>
                  <span>
                    Thank you for your dedication to the examination process.
                    Below is a marking rubric and some guidelines to assist you:
                  </span>
                  <ul>
                    <li>Marking Rubric:</li>
                    <ul>
                      <li>Clearly defined criteria for assessment</li>
                      <li>Fair and consistent grading</li>
                      <li>Constructive feedback provided</li>
                    </ul>
                  </ul>
                </div>
              </Alert>
            </Stack>
          )}
        </div>
        <ExaminerStudentList />
      </div>
    </div>
  );
}
