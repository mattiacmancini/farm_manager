import React from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from './AuthContext'; // Import useAuth
import Logout from './Logout';

function NavBar() {
  const { user } = useAuth(); // Access the user from AuthContext

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className='container'>
        {user ? ( // Check if a user is authenticated
          <>
            <div className='col-md-2 navbar-nav nav-link'>
              <Link to="/dashboard" className="nav-item nav-link"> <SpaceDashboardIcon /> Dashboard </Link>
            </div>
            <div className='col-md-8'></div>
            <div className='col-md-1 navbar-nav nav-link'>
              <Link to="/register" className="nav-item nav-link"> <SettingsIcon /> Settings </Link>
            </div>
            <div className='col-md-1 navbar-nav nav-link'>
              <Logout /> {/* Render the Logout component */}
            </div>
          </>
        ) : (
          <>
            <div className='col-md-1 navbar-nav nav-link'>
              <Link to="/" className="nav-item nav-link"> <HomeIcon /> Home </Link>
            </div>
            <div className='col-md-1 navbar-nav nav-link'>
              <Link to="/about" className="nav-item nav-link"> <InfoIcon /> About </Link>
            </div>
            <div className='col-md-8'></div>
            <div className='col-md-1 navbar-nav nav-link'>
              <Link to="/register" className="nav-item nav-link"> <HowToRegIcon /> Register </Link>
            </div>
            <div className='col-md-1 navbar-nav nav-link'>
              <Link to="/login" className="nav-item nav-link"> <LoginIcon /> Login </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
