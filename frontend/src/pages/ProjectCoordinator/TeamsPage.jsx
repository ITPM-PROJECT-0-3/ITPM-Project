import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import Sidebar from '../../components/ProjectCoordinator/SideBar/SideBar';
import AppBarComponent from '../../components/ProjectCoordinator/NavBar/NavBar';

// Placeholder data for teams
const initialTeams = [
  { id: 1, name: 'Development Team', memberCount: 5 },
  { id: 2, name: 'Design Team', memberCount: 3 },
  // Add more teams as needed
];

const TeamsPage = () => {
  const [teams, setTeams] = useState(initialTeams);
  const navigate = useNavigate();

  const handleAddTeam = () => navigate('/teams/new');
  const handleEditTeam = (id) => navigate(`/teams/edit/${id}`);
  const handleDeleteTeam = (id) => setTeams(teams.filter(team => team.id !== id));
  const handleViewTeam = (id) => navigate(`/teams/${id}`);

  return (
    <>
      <AppBarComponent />
      <Sidebar handleNavigation={(path) => navigate(path)} />
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Teams</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddTeam} sx={{ mb: 2 }}>
          Add Team
        </Button>
        <Grid container spacing={3}>
          {teams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {team.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Members: {team.memberCount}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="edit team" onClick={() => handleEditTeam(team.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete team" onClick={() => handleDeleteTeam(team.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="view team" onClick={() => handleViewTeam(team.id)}>
                    <GroupIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TeamsPage;
