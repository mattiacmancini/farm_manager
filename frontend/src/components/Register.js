import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            checkbox: false
        }
    }

    firstnameHandler = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }

    lastnameHandler = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    emailHandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    usernameHandler = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    
    passwordHandler = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    checkboxHandler = (event) => {
        this.setState({ 
            checkbox: event.target.checked 
        });
    }

    render() {

        return (
            <React.Fragment>
                <form className="row g-3 needs-validation" noValidate>
                    <div className='col'></div>
                    <div className='col-md-6'>
                        <div className="col-md-12">
                            <label htmlFor="validationCustomFirstname" className="form-label">First name</label>
                            <input type="text" className="form-control" id="validationCustomFirstname" value={this.state.firstname} onChange={this.firstnameHandler} placeholder="Enter your first name" required />
                            <div className="valid-feedback"> Looks good!</div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="validationCustomLastname" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="validationCustomLastname" value={this.state.lastname} onChange={this.lastnameHandler} placeholder="Enter your last name" required />
                            <div className="valid-feedback">Looks good!</div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="validationCustomEmail" className="form-label">Email</label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" id="validationCustomEmail" value={this.state.email} onChange={this.emailHandler} placeholder="Enter your email" aria-describedby="inputGroupPrepend" required />
                                <div className="invalid-feedback"> Please choose a username.</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="validationCustomUsername" className="form-label">Username</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" className="form-control" id="validationCustomUsername" value={this.state.username} onChange={this.usernameHandler} placeholder="Enter a unique username" aria-describedby="inputGroupPrepend" required />
                                <div className="invalid-feedback"> Please choose a username.</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="validationCustomPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="validationCustomPassword" value={this.state.password} onChange={this.passwordHandler} placeholder="Enter your password" required />
                            <div className="valid-feedback">Looks good!</div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-check mb-3 mt-3">
                                <input className="form-check-input" type="checkbox" value={this.state.checkbox} onChange={this.checkboxHandler} id="CheckBox" required />
                                <label className="form-check-label" htmlFor="CheckBox">Agree to terms and conditions</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-dark mb-3 mt-3 me-2" type="submit">Submit form</button>
                            <Link to="/" className="btn btn-dark mb-3 mt-3 me-2"> Back </Link>
                        </div>
                    </div>
                    <div className='col'></div>
                </form>
            </React.Fragment>
        )
    }
}

export default Register