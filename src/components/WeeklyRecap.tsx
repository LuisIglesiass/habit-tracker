import React from 'react';

const WeeklyRecap = () => {
  return (
    <div className="weekly-recap">
      <h2>YOUR WEEKLY RECAP</h2>
      <div className="pie-chart">
        {/* Gráfico de pastel de ejemplo */}
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d="M 50 50 L 95 50 A 45 45 0 0 0 50 5 Z" fill="#00D4FF" />
          <path d="M 50 50 L 5 50 A 45 45 0 0 0 50 5 Z" fill="#4CAF50" />
          <path d="M 50 50 L 50 95 A 45 45 0 0 0 5 50 Z" fill="#FFC107" />
        </svg>
      </div>
      <div className="line-chart">
        {/* Gráfico de líneas de ejemplo */}
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polyline points="0,95 20,70 40,80 60,30 80,60 100,20" stroke="#00D4FF" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default WeeklyRecap;