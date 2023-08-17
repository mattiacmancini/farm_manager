import React from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";


function App() {

    // function clicked() {
    //   alert("Class button is clicked")
    // }

    return (

        <Router>
            <div className='app-container'>
                <NavBar/>
                <div className='content-section'>
                    <div className='container'>
                        <Routes>
                            <Route exact path = "/" element = {<Home/>}/>
                            <Route exact path = "/about" element = {<About/>}/>
                            <Route exact path = "/login" element = {<Login/>}/>
                            <Route exact path = "/register" element = {<Register/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
            
        </Router>
    );
}

export default App;
