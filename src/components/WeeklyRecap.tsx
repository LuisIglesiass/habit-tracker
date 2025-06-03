import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import axios from 'axios';

const WeeklyRecap = () => {
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [incompleteCount, setIncompleteCount] = useState<number>(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchHabitCounts = async () => {
      if (userId) {
        try {
          const completedResponse = await axios.get(`http://localhost:3000/api/habits/completed/today/${userId}`);
          const incompleteResponse = await axios.get(`http://localhost:3000/api/habits/incomplete/today/${userId}`);
          
          setCompletedCount(completedResponse.data.length);
          setIncompleteCount(incompleteResponse.data.length);
        } catch (error) {
          console.error("Error while fetching habits:", error);
        }
      }
    };

    fetchHabitCounts();
  }, [userId]);

  return (
    <div className="weekly-recap">
      <div className="pie-chart">
        <PieChart completedCount={completedCount} incompleteCount={incompleteCount} />
      </div>
      <div className="line-chart">
        <BarChart />
      </div>
    </div>
  );
};

export default WeeklyRecap;