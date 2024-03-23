import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const days = new Array(31).fill(null).map((_, index) => index + 1); // For simplicity, assuming 31 days in a month

function CalendarComponent() {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        March 2024
      </Typography>
      <Grid container spacing={1}>
        {daysOfWeek.map((day) => (
          <Grid item xs key={day}>
            <Typography variant="subtitle2" align="center">
              {day}
            </Typography>
          </Grid>
        ))}
        {days.map((date, index) => (
          <Grid item xs key={index}>
            <Box
              sx={{
                textAlign: 'center',
                padding: 1,
                bgcolor: index === 23 ? 'secondary.main' : 'transparent', // Highlighting the 24th
                color: index === 23 ? 'secondary.contrastText' : 'inherit',
              }}
            >
              {date}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default CalendarComponent;
