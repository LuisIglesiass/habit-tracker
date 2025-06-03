import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgressResume: React.FC = () => {
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [totalHabits, setTotalHabits] = useState<number>(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchHabitCounts = async () => {
      if (userId) {
        try {
          const completedResponse = await axios.get(`http://localhost:3000/api/habits/completed/today/${userId}`);
          setCompletedCount(completedResponse.data.length); 

          const totalResponse = await axios.get(`http://localhost:3000/api/habits/with-entries/${userId}`);
          setTotalHabits(totalResponse.data.length);
        } catch (error) {
          console.error("Error while fetching habits:", error);
        }
      }
    };

    fetchHabitCounts();
  }, [userId]);

  return (
    <div className="progress-resume">
      <h2>YOUR PROGRESS RESUME</h2>
      <ul>
        <li>Completed habits today: {completedCount} of {totalHabits}</li>
        <li>Longest active streak: Under development... 👀</li>
        <li>Average habits per day: Under development... 👀</li>
      </ul>
    </div>
  );
};

export default ProgressResume;