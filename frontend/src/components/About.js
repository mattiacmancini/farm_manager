import React from 'react'
import { Link } from "react-router-dom";

function About() {
    return (
        <React.Fragment>
            <h1> This is the about page</h1>
            <Link to="/" className="btn btn-dark mb-3 me-2"> Back </Link>
        </React.Fragment>
    )
}

export default About