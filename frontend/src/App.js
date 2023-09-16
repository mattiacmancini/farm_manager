import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './components/AuthContext'; // Import your AuthProvider


function App() {

  const baseUrl = 'http://localhost:5000/';
  const { user } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user && user.sub && user.sub.name) {
      setUserName(user.sub.name);
    }
  }, [user]);

  return (

    <Router>
      <AuthProvider>
        <div className='app-container'>
          <NavBar userName={userName}></NavBar>
          <div className='content-section'>
            <div className='container'>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login baseUrl={baseUrl} />} />
                <Route exact path="/register" element={<Register baseUrl={baseUrl} />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
