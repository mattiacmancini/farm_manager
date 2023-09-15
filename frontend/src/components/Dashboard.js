import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth hook

function Dashboard() {
  const { user } = useAuth(); // Access user data from AuthContext
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // You can directly access user data from the user object in AuthContext
      console.log(user.name); // Assuming your user object has a 'name' property
      setUserName(user.name);
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
