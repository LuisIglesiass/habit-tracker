import React from 'react';
import { Typography, Paper } from '@mui/material';

interface ProgressCardProps {
  completedHabits: string;
  longestStreak: string;
  consistencyPercentage: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  completedHabits,
  longestStreak,
  consistencyPercentage,
}) => {
  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        YOUR PROGRESS RESUME
      </Typography>
      <Typography variant="body1" gutterBottom>
        Completed habits today <strong>{completedHabits}</strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Longest active streak <strong>{longestStreak}</strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Consistency percentage <strong>{consistencyPercentage}</strong>
      </Typography>
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        YOUR ACTUAL PROGRESS
      </Typography>
    </Paper>
  );
};

export default ProgressCard;