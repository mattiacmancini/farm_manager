import React, { Component } from 'react'
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';

export class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className='container'>
          <div className="navbar-nav mr-auto w-100">
            <Link to="/" className="nav-item nav-link"> <HomeIcon /> Home </Link>
            <Link to="/about" className="nav-item nav-link"> <InfoIcon /> About </Link>
          </div>
          <div className="navbar-nav ml-auto w-100 justify-content-end">
            <Link to="/register" className="nav-item nav-link"> <HowToRegIcon /> Register </Link>
            <Link to="/login" className="nav-item nav-link"> <LoginIcon /> Login </Link>
          </div>
        </div>

      </nav>
    )
  }
}

export default NavBar