import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      'password': password
    }

    axios.post(`${props.baseUrl}login`, userData)
      .then(response => {
        if (response.status === 200) {
          setSuccessMessage('User registration successful: you can now login!')
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
          <div className="col-12">
            <button className="btn btn-dark mb-3 mt-3 me-2" type="submit" onClick={handleSubmit}>Login</button>
            <Link to="/" className="btn btn-dark mb-3 mt-3 me-2"> Back </Link>
          </div>
        </div>
        <div className='col'></div>
      </form>
    </React.Fragment>
  )
}

export default Login