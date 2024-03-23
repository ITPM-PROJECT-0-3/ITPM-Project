import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';

// Placeholder data for reports
const reports = [
  { id: 1, title: 'Project Performance', description: 'An overview of project timelines and deliverable statuses.' },
  { id: 2, title: 'Resource Allocation', description: 'Detailed insights into resource distribution and utilization.' },
  // Add more reports as needed
];

const ReportsPage = () => {
  const navigate = useNavigate();

  // Function to handle viewing reports
  const handleViewReport = (id) => {
    navigate(`/reports/${id}`);
  };

  return (
    <>
      <AppBarComponent />
      <Sidebar handleNavigation={(path) => navigate(path)} />
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Reports</Typography>
        <Grid container spacing={3}>
          {reports.map((report) => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {report.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {report.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<BarChartIcon />} onClick={() => handleViewReport(report.id)}>
                    View Report
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ReportsPage;
