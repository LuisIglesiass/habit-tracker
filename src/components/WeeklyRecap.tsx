import React from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { HabitsContext } from "../context/HabitsContext";
import { useContext } from 'react';

const WeeklyRecap = () => {
  const habitsContext = useContext(HabitsContext);
  const { completedHabits = [], incompleteHabits = [] } = habitsContext || {};

  const data = {
    labels: ['Completed', 'Incomplete'],
    datasets: [
      {
        label: 'Daily Habits',
        data: [completedHabits.length, incompleteHabits.length],
        backgroundColor: ['#4CAF50', 'red'],
        borderColor: ['#00000', '#00000'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="weekly-recap">
      <div className="pie-chart">
        <PieChart />
      </div>
      <div className="line-chart">
        {/* Gráfico de líneas de ejemplo */}
        <BarChart/>
      </div>
    </div>
  );
};

export default WeeklyRecap;