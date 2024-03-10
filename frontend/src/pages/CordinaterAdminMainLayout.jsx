import React, { useState } from "react";
import AdminSidebar from "../components/Sidebar/Sidebar";
import AdminHeader from "../components/SlideHeader/SlideHeader";
import { Outlet } from "react-router-dom";
import styles from "../styles/CordinaterAdminMainLayout.module.css";

export default function CordinaterAdminMainLayout() {
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
