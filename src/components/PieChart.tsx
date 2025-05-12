import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { HabitsContext } from "../context/HabitsContext";
import { useContext } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const defaultOptions: ChartOptions<'pie'> = {
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
        backgroundColor: ['#4CAF50', 'red'],
        borderColor: ['#14E8C2', '#14E8C2'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} options={defaultOptions} />;
};

export default PieChart;