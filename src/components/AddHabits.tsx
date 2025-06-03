import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const AddHabits = () => {
  return (
    <div className="add-habits">
      <h2>ADD NEW HABITS?</h2>
      <Link to="/habits">
        <Button label='ADD' className="primary-button" type='button' />
      </Link>
    </div>
  );
};

export default AddHabits;