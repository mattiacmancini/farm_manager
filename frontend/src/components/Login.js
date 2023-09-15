import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Login(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const clearFormErrors = () => {
    setFormErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearFormErrors();

    try {
      const response = await axios.post(`${props.baseUrl}login`, formData);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        console.log(jwt_decode(response.data.token))
        setSuccessMessage('User successfully logged-in!');
        setTimeout(() => {
          navigate(`/dashboard`);
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormErrors(error.response.data.errors);
        setErrorMessage('Error logging user in: check the data you entered!');
      } else {
        console.error('Error logging user in: ', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{formErrors.email}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">{formErrors.password}</div>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-dark mt-3 mb-3">
              Login
            </button>
          </form>
          <div className="border-top pt-3">
            <small className="text-muted">
              Need an account? <Link className="ml-2" to="/register">Sign Up Now</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
