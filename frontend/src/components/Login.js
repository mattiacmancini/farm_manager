import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState({});
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const handleInputChange = (setter, value, fieldName) => {
    setErrors(errors => ({
      ...errors,
      [fieldName]: "",
    }));
    setter(value);
  };

  const handleCheck = (e) => {
    setRememberMe(e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setErrors({});
    }

    if (successMessage) {
      setSuccessMessage('')
    }

    if (errorMessage) {
      setErrorMessage('')
    }

    const userData = {
      'email': email,
      'password': password,
      'remember': rememberMe
    }

    axios.post(`${props.baseUrl}login`, userData)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          console.log(response.data.token)
          setSuccessMessage('User successfully logged-in!');
          setEmailSubmitted(true);
          setPasswordSubmitted(true);
          console.log("User successfully logged-in:", response.data.message);
          // redirect('/login');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log("User login failed:", error.response.data.errors);
          setEmailSubmitted(true);
          setPasswordSubmitted(true);
          setErrors(error.response.data.errors);
          setErrorMessage('Error logging user in: check the data you entered!')
        } else {
          setEmailSubmitted(true);
          setPasswordSubmitted(true);
          console.error("Error logging user in: ", error);
        }
      });
  };

  return (
    <React.Fragment>
      <form className="row g-3 needs-validation" noValidate>
        <div className='col'></div>
        <div className='col-md-6'>
          {successMessage && (
            <div className="alert alert-success mt-3 d-flex justify-content-center align-items-center">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3 d-flex justify-content-center align-items-center">
              {errorMessage}
            </div>
          )}
          <div className="col-md-12">
            <label htmlFor='emailValidator' className='form-label'>E-mail address</label>
            <input
              type='text'
              className={`form-control ${emailSubmitted ? (errors['email'] ? 'is-invalid' : '') : ''}`}
              id='emailValidator'
              value={email}
              onChange={(e) => handleInputChange(setEmail, e.target.value, 'email')} />
            <div className="invalid-feedback">{errors['email']}</div>
          </div>
          <div className="col-md-12">
            <label htmlFor='passwordValidator' className='form-label'>Password</label>
            <input
              type='password'
              className={`form-control ${passwordSubmitted ? (errors['password'] ? 'is-invalid' : '') : ''}`}
              id='passwordValidator'
              value={password}
              onChange={(e) => handleInputChange(setPassword, e.target.value, 'password')} />
            <div className="invalid-feedback">{errors['password']}</div>
          </div>
          <div className='col-md-12'>
            <div className="form-check mt-3 mb-3">
              <input
                className='form-check-input'
                type="checkbox" checked={rememberMe} onChange={(e) => handleCheck(e.target.checked)}
                id="CheckBox" />
              <label className="form-check-label" htmlFor="CheckBox">Remember me</label>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-dark mb-2 mt-2" type="submit" onClick={handleSubmit}>Login</button>
          </div>
          <div className="border-top pt-3">
            <small className="text-muted">
              Need an account? <Link className="ml-2" to="/register">Sign Up Now</Link>
            </small>
          </div>
        </div>
        <div className='col'></div>
      </form>
    </React.Fragment>
  )
}

export default Login