import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { HabitsContext } from "../context/HabitsContext";
import { useContext } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart: React.FC = () => {
  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
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

  const habitsContext = useContext(HabitsContext);
  if (!habitsContext) {
    return <div>Error: HabitsContext is undefined</div>;
  }

  const { completedHabits, incompleteHabits } = habitsContext;

  const data = {
    labels: ['Completadas', 'Incompletas'],
    datasets: [
      {
        label: 'Hábitos diarios',
        data: [completedHabits.length, incompleteHabits.length],
        backgroundColor: ['#4CAF50', '#FF4B5C'],
        borderColor: '#14E8C2',
        borderWidth: 2,
        pointBackgroundColor: '#00D4FF',
        pointBorderColor: '#E0EFFF',
      },
    ],
  };

  return <Line data={data} options={defaultOptions} />;
};

export default LineChart;