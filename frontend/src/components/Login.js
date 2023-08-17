import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class Login extends Component {
    
    constructor(props) {
      super(props)
    
      this.state = {
         'email': "",
         'password': ""
      }
    }

    emailHandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    passwordHandler = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    render() {
        return (
            <React.Fragment>
                <form className="row g-3 needs-validation" noValidate>
                    <div className='col'></div>
                    <div className='col-md-6'>
                        <div className="col-md-12">
                            <label htmlFor="validationCustomEmail" className="form-label">Email</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" className="form-control" id="validationCustomEmail" value={this.state.email} onChange={this.emailHandler} placeholder="Enter your email" aria-describedby="inputGroupPrepend" required />
                                <div className="invalid-feedback"> Please choose a username.</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="validationCustomPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="validationCustomPassword" value={this.state.password} onChange={this.passwordHandler} placeholder="Enter your password" required />
                            <div className="valid-feedback">Looks good!</div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-dark mb-3 mt-3 me-2" type="submit">Login</button>
                            <Link to="/" className="btn btn-dark mb-3 mt-3 me-2"> Back </Link>
                        </div>
                    </div>
                    <div className='col'></div>
                </form>
            </React.Fragment>
        )
    }
}

export default Login