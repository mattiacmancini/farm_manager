import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Dashboard() {
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Decode the JWT token to extract user information
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken.sub.name)
        setUserName(decodedToken.sub.name);
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <React.Fragment>
      <h1>This is the Dashboard</h1>
      {userName && <p>Welcome, {userName}!</p>}
    </React.Fragment>
  );
}

export default Dashboard;
