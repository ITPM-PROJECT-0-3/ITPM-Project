import React from 'react';
import { Box, Grid, Typography, Button, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Calander from '../../components/Footer/Calander';



function Footer() {

    const ButtonStyle = { 
        bgcolor: '#FFAE00', // Background color
        color: 'Black', // Text color
        alignItems: 'center',
        marginTop: '10px',
        padding: '10px 40px', // Padding inside the button
        textTransform: 'none', // Prevent uppercase transform
        borderRadius: '0px', // Border radius for the button
        fontWeight: 'bold', // Make the text bold
        '&:hover': {
          bgcolor: '#F2F2F2 ', // Background color on hover
        }
       };

  return (
    <Box sx={{ bgcolor: '#323A45', color: 'white'}}>

      <Grid container spacing={5} justifyContent="center" padding= '50px'>
        {/* Support Section */}
        <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
              DO YOU NEED ANY SUPPORT?
            </Typography>
            <Box>
              <Typography variant="subtitle1">
                <EmailIcon /> support@sliit.lk
              </Typography>
              <Typography variant="subtitle1">
                <PhoneIcon /> +94 11 754 4801
              </Typography>
            </Box>
            <Button sx={ButtonStyle}>
              Provide Feedback to SLIIT
            </Button>
        </Grid>

        {/* Calendar Placeholder Section */}
        <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
              Calendar
            </Typography>
            
            <Box sx={{ my: 2, p: 2, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
              {/* Placeholder for the calendar */}
              <Typography variant="body1" align="center">
                Calendar Component Goes Here
              </Typography>
            </Box>

        </Grid>

        {/* Social Media Icons */}
        <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
              {/* Empty title for alignment */}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <IconButton aria-label="Facebook" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="YouTube" color="inherit">
                <YouTubeIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" color="inherit">
                <LinkedInIcon />
              </IconButton>
            </Box>

        </Grid>
      </Grid>
      <Box sx={{ bgcolor: '#292F38', color: 'white', py: 5 }}>
          <Typography variant="body2" align="center" fontSize= '1.1rem'>
            Copyright © SLIIT. All Rights Reserved.
          </Typography>
          <Typography variant="body2" align="center" fontSize= '0.9rem' spa>
            https://www.sliit.lk | info@sliit.lk | +94 11 754 4801
          </Typography>
          
        </Box>

    </Box>
  );
}

export default Footer;
