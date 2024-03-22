import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login"; // Import the login icon

export default function NavigationBar() {
  const navigate = useNavigate();

  // Define the function to handle forgotten username/password clicks
  const handleForgotClick = () => {
    // Logic to navigate or open a dialog goes here
    console.log("Navigate to password recovery page");
  };

  const handleLoginClick = () => {
    navigate("/loginGrp"); // Navigate to /loginGrp route when login button is clicked
  };

  // Custom styles

  const loginButtonStyle = { 
    bgcolor: '#FFAE00', // Background color
    color: 'Black', // Text color
    alignItems: 'center',
    padding: '10px 40px', // Padding inside the button
    textTransform: 'none', // Prevent uppercase transform
    borderRadius: '0px', // Border radius for the button
    fontWeight: 'bold', // Make the text bold
    '&:hover': {
      bgcolor: '#F2F2F2', // Background color on hover
    }
   };
  const loginText = { 
    color: 'black', // Text color
    textTransform: 'none',
    
    padding: '0px 0px 5px 0px',
    fontWeight: 'Bold'
    
   };
  const forgetPasswordText = { 
    mt: 1, 
    cursor: 'pointer', 
    color: '#FFAE00',
    '&:hover': {
        color: 'black', // Background color on hover
      },
   };

  const loginButtonStyle = {
    bgcolor: "#FFAE00", // Background color
    color: "Black", // Text color
    alignItems: "center",
    padding: "10px 40px", // Padding inside the button
    textTransform: "none", // Prevent uppercase transform
    borderRadius: "0px", // Border radius for the button
    fontWeight: "bold", // Make the text bold
    "&:hover": {
      bgcolor: "#F2F2F2", // Background color on hover
    },
  };
  const loginText = {
    color: "black", // Text color
    textTransform: "none",
    fontWeight: "normal",
    padding: "0px 0px 5px 0px",
  };
  const forgetPasswordText = {
    mt: 1,
    cursor: "pointer",
    color: "#FFAE00",
    "&:hover": {
      color: "black", // Background color on hover
    },
  };

  const menuRowStyle = {
    display: "flex",
    background: "#BDC3C2", // Assuming a grey background for the menu row
    padding: "10px 20px", // Adjust padding as necessary
    height: "60px",
  };
  const menuItemStyle = {
    marginRight: "15px", // Space between menu items
    color: "black", // Color of the menu text
    textTransform: "none",
    fontWeight: "normal",
    fontSize: "1rem",
    padding: "30px 40px 30px 40px",
    margin: "-10px 0px -10px 0px",
    "&:hover": {
      bgcolor: "#FFAE00", // Background color on hover
    },
    borderRadius: "0px",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ bgcolor: "white" }}
      >
        <Toolbar
          sx={{
            minHeight: "120px",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Logo container */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img
              src="../../../assets/NAV/ProMarks.png"
              alt="Logo"
              style={{ height: "120px", marginLeft: "-30px" }}
            />
          </Box>
          {/* Login text, button, and forgot password link */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="body2" sx={loginText}>
              LOG IN USING YOUR ACCOUNT ON:
            </Typography>
            <Button
              startIcon={<LoginIcon />}
              sx={loginButtonStyle}
              onClick={handleLoginClick}
            >
              SLIIT Login
            </Button>
            <Typography
              variant="body2"
              sx={forgetPasswordText}
              onClick={handleForgotClick}
            >
              Forgotten your username or password?
            </Typography>
          </Box>
        </Toolbar>
        {/* Menu items row */}
        <Box sx={menuRowStyle}>
          <Button sx={menuItemStyle}>Home</Button>
          <Button sx={menuItemStyle}>Programmes</Button>
          <Button sx={menuItemStyle}>Support</Button>
          <Button sx={menuItemStyle}>Resources</Button>
          <Button sx={menuItemStyle}>Libraries</Button>
          <Button sx={menuItemStyle}>Email</Button>
        </Box>
      </AppBar>
    </Box>
  );
}
