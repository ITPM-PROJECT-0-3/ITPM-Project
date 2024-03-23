import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

function TeamOverviewWidget() {
  // Placeholder data - replace with real data
  const teams = [
    { name: 'Design Team', members: 5 },
    { name: 'Development Team', members: 8 },
    { name: 'QA Team', members: 3 },
  ];

  return (
    <Card raised sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Team Overview
        </Typography>
        <List>
          {teams.map((team, index) => (
            <ListItem key={index}>
              <ListItemText primary={team.name} secondary={`Members: ${team.members}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TeamOverviewWidget;
