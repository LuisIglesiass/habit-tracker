import React, { useEffect, useState, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { HabitsContext } from "../context/HabitsContext";
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart: React.FC = () => {
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

  const defaultOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E0EFFF',
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#1E2A36',
        },
        ticks: {
          color: '#E0EFFF',
        },
      },
      y: {
        grid: {
          color: '#1E2A36',
        },
        ticks: {
          color: '#E0EFFF',
        },
      },
    },
  };

  const data = {
    labels: ['Completed', 'Incompleted'],
    datasets: [
      {
        label: 'Daily Habits',
        data: [completedCount, incompleteCount],
        backgroundColor: ['#4CAF50', '#FF4B5C'],
        borderColor: ['#14E8C2', '#14E8C2'],
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={defaultOptions} />;
};

export default BarChart;