import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LogoutIcon from '@mui/icons-material/Logout'; // Import your logout icon

function Logout() {
  const { logout } = useAuth(); // Access the logout function from AuthContext

  const handleLogout = () => {
    logout(); // Call the logout function to clear user data and remove the token from local storage
  };

  return (
    <Link to="/" className="nav-item nav-link" onClick={handleLogout}>
      <LogoutIcon /> Logout
    </Link>
  );
}

export default Logout;
