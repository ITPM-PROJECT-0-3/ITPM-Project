import React, { useState } from "react";
import styles from "../styles/AdminExaminerTable.module.css";
import AdminSidebar from "../components/Sidebar/Sidebar";
import AdminHeader from "../components/SlideHeader/SlideHeader";
import ExaminerlistTable from "../components/ExaminerTable/ExaminerlistTable";

export default function AdminExaminerTable() {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const CustomTabs = [
    {
      to: "/admin-nav",
      iconClass: "bx bx-grid-alt",
      label: "Dasshboard",
    },
    {
      to: "/admin-nav",
      iconClass: "bx bx-spreadsheet",
      label: "Publication-Marks",
    },
    {
      to: "/examiner-admin-table",
      iconClass: "bx bx-registered",
      label: "Examiners",
    },
  ];

  const customNavLinks = [
    { href: "/admin-nav", label: "Home" },
    { href: "/admin-nav", label: "Dashboard" },
    { href: "/examiner-registration-admin", label: "Registration" },
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
        <ExaminerlistTable />
      </div>
    </div>
  );
}
