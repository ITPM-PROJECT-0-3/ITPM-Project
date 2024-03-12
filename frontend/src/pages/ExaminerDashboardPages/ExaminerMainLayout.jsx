import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import styles from "../../styles/ExaminerMainLayout.module.css";
import AdminSidebar from "../../components/Sidebar/Sidebar";
import AdminHeader from "../../components/SlideHeader/SlideHeader";

export default function ExaminerMainLayout() {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

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
      to: "/examiner-nav",
      iconClass: "bx bx-registered",
      label: "Examiners",
    },
  ];

  const customNavLinks = [
    { href: "/examiner-nav", label: "Home" },
    { href: "/examiner-nav", label: "Dashboard" },
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
        <Outlet />
      </div>
    </div>
  );
}
