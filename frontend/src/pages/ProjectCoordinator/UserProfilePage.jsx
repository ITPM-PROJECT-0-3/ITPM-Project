import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';

import { Box, Grid, Paper, Typography } from '@mui/material';
import ProjectSummaryWidget from '../../components/ProjectCoordinator/Widgets/ProjectSummaryWidget'; // Placeholder for your project summary widget
import TeamOverviewWidget from '../../components/ProjectCoordinator/Widgets/TeamOverviewWidget'; // Placeholder for your team overview widget
import UpcomingDeadlinesWidget from '../../components/ProjectCoordinator/Widgets/UpcomingDeadlinesWidget'; // Placeholder for upcoming deadlines widget


const ProjectCoordinatorDashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    // Mock data, replace with actual data fetching logic
    const projects = [
        { name: 'Project A', status: 'Active' },
        // ... other projects
    ];

    const teams = [
        { name: 'Team Alpha', project: 'Project A' },
        // ... other teams
    ];

    const deadlines = [
        { project: 'Project A', deadline: '2023-05-30' },
        // ... other deadlines
    ];

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#FAF9F6', paddingTop: '100px' }}>
            <AppBarComponent />
            <Sidebar handleNavigation={handleNavigation} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Project Coordinator Dashboard
                        </Typography>
                    </Grid>
                    
                    {/* Project Summary */}
                    <Grid item xs={12} md={6}>
                        <ProjectSummaryWidget projects={projects} />
                    </Grid>

                    {/* Team Overview */}
                    <Grid item xs={12} md={6}>
                        <TeamOverviewWidget teams={teams} />
                    </Grid>

                    {/* Upcoming Deadlines */}
                    <Grid item xs={12}>
                        <UpcomingDeadlinesWidget deadlines={deadlines} />
                    </Grid>

                    {/* Additional widgets or components */}
                    {/* <Grid item xs={12} md={6}>
                        <Paper>
                            <Typography variant="h6" gutterBottom>
                                Additional Widget
                            </Typography>
                            {/* Widget Content }
                        </Paper>
                    </Grid> */}
                </Grid>
            </Box>
        </Box>
    );
};

export default ProjectCoordinatorDashboard;
