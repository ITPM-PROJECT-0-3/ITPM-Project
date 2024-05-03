import React, { useState, useEffect } from "react";
import styles from "../../styles/AssignMarksScreen.module.css";
import AdminSidebar from "../../components/Sidebar/Sidebar";
import AdminHeader from "../../components/SlideHeader/SlideHeader";
import AssignMarks from "../../components/AssignMarks-Examiner/AssignMarks";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import AssignMarksProgress1 from "../../components/AssignMarks-Examiner/AssignMarksProgress1";
import AssignMarksProgress2 from "../../components/AssignMarks-Examiner/AssignMarksProgress2";
import AssignMarksFinal from "../../components/AssignMarks-Examiner/AssignMarksFinal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function AssignMarksScreen() {
  const [sidebarActive, setSidebarActive] = useState(true);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
        <Box sx={{ bgcolor: "", width: "100%" }}>
          <AppBar
            position="static"
            sx={{
              bgcolor: "#17376e",
              borderEndEndRadius: "30px",
              borderBottomLeftRadius: "30px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Proposal Marks Schema" {...a11yProps(0)} />
              <Tab label="Progress1 Marks Schema" {...a11yProps(1)} />
              <Tab label="Progress2 Marks Schema" {...a11yProps(2)} />
              <Tab label="Final Presentation Schema" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <AssignMarks />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <AssignMarksProgress1 />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <AssignMarksProgress2 />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <AssignMarksFinal/>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
  );
}
