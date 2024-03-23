import React, { useState, useEffect } from "react";
import styles from "../../styles/AssignMarksScreen.module.css";
import AdminSidebar from "../../components/Sidebar/Sidebar";
import AdminHeader from "../../components/SlideHeader/SlideHeader";
import AssignMarks from "../../components/AssignMarks-Examiner/AssignMarks";

export default function AssignMarksScreen() {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  useEffect(() => {
    document.title = "Assign Marks | SLIIT";
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
    { href: "/examiner-Asign-marks", label: "Assign-Marks" },
  ];

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
        <br />
        <AssignMarks />
      </div>
    </div>
  );
}
