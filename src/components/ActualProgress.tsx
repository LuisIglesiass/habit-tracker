import React from 'react';

const ActualProgress = ({ progress = 79 }) => {
  return (
    <div className="actual-progress">
      <h2>YOUR ACTUAL PROGRESS</h2>
      <div className="progress-bar" style={{ '--progress': `${progress}%` } as React.CSSProperties}></div>
    </div>
  );
};

export default ActualProgress;