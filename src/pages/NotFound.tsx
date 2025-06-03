import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleGoToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={handleGoToLogin} className="primary-button">
        Go to Login
      </button>
    </div>
  );
};

export default NotFound;
