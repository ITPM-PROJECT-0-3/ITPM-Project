import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

function ProjectSummaryWidget() {
  // Placeholder data - replace with real data
  const projects = [
    { name: 'Project A', completion: 60 },
    { name: 'Project B', completion: 30 },
    { name: 'Project C', completion: 80 },
  ];

  return (
    <Card raised sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Project Summary
        </Typography>
        {projects.map((project, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body2">{project.name}</Typography>
            <LinearProgress variant="determinate" value={project.completion} />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default ProjectSummaryWidget;
