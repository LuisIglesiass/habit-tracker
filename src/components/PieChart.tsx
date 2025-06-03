import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { HabitsContext } from "../context/HabitsContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<{ completedCount: number; incompleteCount: number }> = ({ completedCount, incompleteCount }) => {
  const data = {
    labels: ['Completed', 'Incompleted'],
    datasets: [
      {
        label: 'Daily habits',
        data: [completedCount, incompleteCount],
        backgroundColor: ['#4CAF50', 'red'],
        borderColor: ['#14E8C2', '#14E8C2'],
        borderWidth: 1,
      },
    ],
  };

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

  return <Pie data={data} options={defaultOptions} />;
};

export default PieChart;