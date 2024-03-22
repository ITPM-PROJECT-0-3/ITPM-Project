
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login'; // Import the login icon

const AppBarComponent = () => {
    
  const navigate = useNavigate();

  // Define the function to handle forgotten username/password clicks
  const handleForgotClick = () => {
    // Logic to navigate or open a dialog goes here
    console.log('Navigate to password recovery page');
  };

  const handleLoginClick = () => {
    navigate('/loginCoordinator'); // Navigate to /loginGrp route when login button is clicked
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

  return (
    <Box sx={{ flexGrow: 1  }}>
    
      <AppBar position="fixed" color="default" elevation={0} sx={{ bgcolor: 'white',zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ minHeight: '120px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* Logo container */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src="../../../assets/NAV/ProMarks.png" alt="Logo" style={{ height: '110px', marginLeft: '-30px' }} />
          </Box>
          {/* Login text, button, and forgot password link */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography variant="body2" sx={loginText}>
              LOG IN USING YOUR ACCOUNT ON:
            </Typography>
            <Button startIcon={<LoginIcon />} sx={loginButtonStyle} onClick={handleLoginClick}>
              SLIIT Login
            </Button>
            <Typography variant="body2" sx={forgetPasswordText} onClick={handleForgotClick}>
              Forgotten your username or password?
            </Typography>
          </Box>
        </Toolbar>

      </AppBar>
    </Box>
  );
}

export default AppBarComponent;