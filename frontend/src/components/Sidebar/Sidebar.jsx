import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { getImageUrl } from "../../utils";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function AdminSidebar({ sidebarActive, toggleSidebar, CustomTabs }) {
  const [isActive, setIsActive] = useState(sidebarActive);

  //   const userInfoString = localStorage.getItem('UserInfo');
  //   const storedUserInfo = JSON.parse(userInfoString);

  //   const navigate = useNavigate();

  useEffect(() => {
    setIsActive(sidebarActive);
  }, [sidebarActive]);

  //   function handleSignOut() {
  //     localStorage.removeItem('UserInfo');
  //     window.location.href = '/';
  //   }

  const userInfoString = localStorage.getItem("UserInfo");
  const storedUserInfo = JSON.parse(userInfoString);

  function handleSignout() {
    localStorage.removeItem("UserInfo");
    window.location.href = "/loginGrp";
  }
  return (
    <div id="SideNavigation">
      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <div className="sidebar">
          <div className="logo_content">
            <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
            <div className="logo">
              <div className="logo_name">
                <Link to={"/"}>
                  <img
                    className="component-3-icon"
                    alt=""
                    src={getImageUrl("NAV/logo.png")}
                  />
                </Link>
              </div>
            </div>
          </div>

          <ul className="nav_list">
            {CustomTabs &&
              CustomTabs.map((tab, index) => (
                <li key={index}>
                  <Link to={tab.to}>
                    <i className={tab.iconClass}></i>
                    <span className="link-name">{tab.label}</span>
                  </Link>
                  <div className="tooltip">{tab.label}</div>
                </li>
              ))}
          </ul>
          <Link to="">
            <div className="profile_content">
              <div className="profile">
                <div className="profile_details">
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt={storedUserInfo.groupId}
                      src="/static/images/avatar/1.jpg"
                    />
                  </StyledBadge>
                  <div className="name_job">
                    <div className="name">{storedUserInfo.groupId}</div>
                    <div className="">
                      <span style={{ color: "#7C7C7C" }}>
                        {" "}
                        {storedUserInfo &&
                          (storedUserInfo.UserType === "Examiner"
                            ? "Research Examiner"
                            : storedUserInfo.UserType === "Supervisor"
                            ? "Supervisor at SLIIT"
                            : "Research Coordinator")}
                      </span>
                    </div>
                  </div>
                </div>
                <i
                  className="bx bx-log-out"
                  id="log_out"
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={handleSignout}
                ></i>
              </div>
            </div>
          </Link>
        </div>

        <div className="home_content"></div>
      </div>
    </div>
  );
}

export default AdminSidebar;
