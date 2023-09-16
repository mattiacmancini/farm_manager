import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setUserName(user.sub.name);
    }
  }, [user, navigate]);

  return (
    <React.Fragment>
      <h1>This is the Dashboard</h1>
      {userName && <p>Welcome, {userName}!</p>}
    </React.Fragment>
  );
}

export default Dashboard;
