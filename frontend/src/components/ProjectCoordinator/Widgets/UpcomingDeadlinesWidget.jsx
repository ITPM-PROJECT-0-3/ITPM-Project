import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

function UpcomingDeadlinesWidget() {
  // Placeholder data - replace with real data
  const deadlines = [
    { task: 'Design Specs', dueDate: '2024-03-30' },
    { task: 'Prototype Review', dueDate: '2024-04-05' },
    { task: 'Final Presentation', dueDate: '2024-04-15' },
  ];

  return (
    <Card raised sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Upcoming Deadlines
        </Typography>
        <List>
          {deadlines.map((deadline, index) => (
            <ListItem key={index}>
              <ListItemText primary={deadline.task} secondary={`Due: ${deadline.dueDate}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default UpcomingDeadlinesWidget;
