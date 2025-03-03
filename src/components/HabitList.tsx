import React from 'react';
import { List, ListItem, ListItemText, Checkbox, Typography, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

interface HabitListProps {
  habits: Habit[];
}

const HabitList: React.FC<HabitListProps> = ({ habits }) => {
  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        YOUR WEEKLY RECAP
      </Typography>
      <List>
        {habits.map((habit) => (
          <ListItem key={habit.id}>
            <Checkbox
              checked={habit.completed}
              disabled
              icon={<CloseIcon />}
              checkedIcon={<CloseIcon />}
            />
            <ListItemText primary={habit.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default HabitList;