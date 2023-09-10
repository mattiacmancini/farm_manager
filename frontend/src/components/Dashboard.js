import React, { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

function Dashboard() {
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <React.Fragment>
      <h1>This is the Dashboard</h1>
    </React.Fragment>
  );
}

export default Dashboard;