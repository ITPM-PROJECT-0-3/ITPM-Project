import React from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Footer from '../../components/Footer/Footer';
import Slider from 'react-slick'; // Import the Slider component
import { Box, Grid, Typography} from '@mui/material';

// Import the slick-carousel stylesheets
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import backgroundImage from '../../../assets/NAV/sliit_bg.jpg';



function HomePage() {
  // Settings for the slider
  const sliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };
  
  return (
    <div>
      <NavigationBar /> {/* Include the NavigationBar component at the top */}
      
      {/* Hero section with image slider */}
      <Slider {...sliderSettings}>
        <div>
          <img style={{ width: '100%', display: 'block' }} src="../../../assets/NAV/Slide01.png" alt="Slide 1" />
        </div>
        <div>
          <img style={{ width: '100%', display: 'block' }} src="../../../assets/NAV/Slide02.png" alt="Slide 2" />
        </div>
        <div>
          <img style={{ width: '100%', display: 'block' }} src="../../../assets/NAV/Slide03.png" alt="Slide 3" />
        </div>
        <div>
          <img style={{ width: '100%', display: 'block' }} src="../../../assets/NAV/Slide04.png" alt="Slide 3" />
        </div>
        {/* Add as many slides as you want */}
      </Slider>

      <Box
        sx={{
            background: `url(${backgroundImage})`,
            marginTop: '-10px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
            minHeight: '1000px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: 4,
          }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            {/* Empty Grid item for spacing, if necessary */}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" color="primary" gutterBottom fontWeight= 'Bold' fontSize= '3rem' >
              THE FUTURE AWAITS YOU!
            </Typography>
            <Typography>
            The homepage of the Project Module Management System serves as the central hub for students, faculty, and administrators 
            to access and manage academic project modules. It offers an intuitive, user-friendly interface that provides quick access 
            to all necessary resources and information related to project modules. The homepage is designed to streamline the management 
            and coordination of project modules, facilitating efficient communication, submission, evaluation, and feedback processes. 
            It highlights the latest announcements, deadlines, and updates related to project modules, ensuring all users are 
            well-informed and up-to-date.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </div>

    

    
  );
}

export default HomePage;