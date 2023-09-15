import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreementCheck, setAgreementCheck] = useState(false);

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState({});

  const [firstNameSubmitted, setFirstNameSubmitted] = useState(false);
  const [middleNameSubmitted, setMiddleNameSubmitted] = useState(false);
  const [lastNameSubmitted, setLastNameSubmitted] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [dobSubmitted, setDobSubmitted] = useState(false);
  const [userNameSubmitted, setUserNameSubmitted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [repeatPasswordSubmitted, setRepeatPasswordSubmitted] = useState(false);
  const [agreementSubmitted, setAgreementSubmitted] = useState(false);
  const submissionSetters = {
    firstname: setFirstNameSubmitted,
    lastname: setLastNameSubmitted,
    middlename: setMiddleNameSubmitted,
    dob: setDobSubmitted,
    email: setEmailSubmitted,
    username: setUserNameSubmitted,
    password: setPasswordSubmitted,
    confirm_password: setRepeatPasswordSubmitted,
    data_agreement: setAgreementSubmitted
  };

  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();


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
      'firstname': firstName,
      'middlename': middleName,
      'lastname': lastName,
      'dob': dateOfBirth,
      'username': userName,
      'email': email,
      'password': password,
      'confirm_password': repeatPassword,
      'data_agreement': agreementCheck
    }

    axios.post(`${props.baseUrl}register`, userData)
      .then(response => {
        if (response.status === 200) {
          setSuccessMessage('User registration successful: you can now login!')
          setFirstNameSubmitted(true);
          setMiddleNameSubmitted(true);
          setLastNameSubmitted(true);
          setEmailSubmitted(true);
          setDobSubmitted(true);
          setUserNameSubmitted(true);
          setPasswordSubmitted(true);
          setRepeatPasswordSubmitted(true);
          setAgreementSubmitted(true);
          setRedirectToLogin(true);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log("User registration failed:", error.response.data.errors);
          setFirstNameSubmitted(true);
          setMiddleNameSubmitted(true);
          setLastNameSubmitted(true);
          setEmailSubmitted(true);
          setDobSubmitted(true);
          setUserNameSubmitted(true);
          setPasswordSubmitted(true);
          setRepeatPasswordSubmitted(true);
          setAgreementSubmitted(true);
          setErrors(error.response.data.errors);
          setErrorMessage('Error registering user: check the data you entered!')
        } else {
          setFirstNameSubmitted(true);
          setMiddleNameSubmitted(true);
          setLastNameSubmitted(true);
          setEmailSubmitted(true);
          setDobSubmitted(true);
          setUserNameSubmitted(true);
          setPasswordSubmitted(true);
          setRepeatPasswordSubmitted(true);
          setAgreementSubmitted(true);
          console.error("Error registering user:", error);
        }
      });
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (setter, value, fieldName) => {
    setErrors(errors => ({
      ...errors,
      [fieldName]: "",
    }));
    setter(value);
    const submittedSetter = submissionSetters[fieldName];
    if (submittedSetter) {
      submittedSetter(false);
    }
  };


  return (
    <React.Fragment>
      <form className='row g-3 needs-validation' noValidate>
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
        <div className='col-md-5'>
          <label htmlFor='firstNameValidator' className='form-label'>First Name</label>
          <input
            type='text'
            className={`form-control ${firstNameSubmitted ? (errors['firstname'] ? 'is-invalid' : 'is-valid') : ''}`}
            id='firstNameValidator'
            value={firstName}
            onChange={(e) => handleInputChange(setFirstName, e.target.value, 'firstname')} />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">{errors['firstname']}</div>
        </div>
        <div className='col-md-2'>
          <label htmlFor='middleNameValidator' className='form-label'>Middle Name</label>
          <input
            type='text'
            className={`form-control ${middleNameSubmitted ? (errors['middlename'] ? 'is-invalid' : 'is-valid') : ''}`}
            id='middleNameValidator'
            value={middleName}
            onChange={(e) => handleInputChange(setMiddleName, e.target.value, 'middlename')} />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">{errors['middlename']}</div>
        </div>
        <div className='col-md-5'>
          <label htmlFor='lastNameValidator' className='form-label'>Last Name</label>
          <input
            type='text'
            className={`form-control ${lastNameSubmitted ? (errors['lastname'] ? 'is-invalid' : 'is-valid') : ''}`}
            id='lastNameValidator'
            value={lastName}
            onChange={(e) => handleInputChange(setLastName, e.target.value, 'lastname')} />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">{errors['lastname']}</div>
        </div>
        <div className='col-md-5'>
          <label htmlFor='emailValidator' className='form-label'>Email Address</label>
          <input
            type='email'
            className={`form-control ${emailSubmitted ? (errors['email'] ? 'is-invalid' : 'is-valid') : ''}`}
            id='emailValidator'
            value={email}
            onChange={(e) => handleInputChange(setEmail, e.target.value, 'email')} />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">{errors['email']}</div>
        </div>
        <div className='col-md-2'>
          <label htmlFor='DoBValidator' className='form-label'>Date of Birth</label>
          <input
            type='date'
            className={`form-control ${dobSubmitted ? (errors['dob'] ? 'is-invalid' : 'is-valid') : ''}`}
            id='DoBValidator'
            value={dateOfBirth}
            onChange={(e) => handleInputChange(setDateOfBirth, e.target.value, 'dob')} />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">{errors['dob']}</div>
        </div>
        <div className='col-md-5'></div>
        <div className='col-md-4'>
          <label htmlFor='userNameValidator' className='form-label'>Username</label>
          <input
            type='text'
            className={`form-control ${userNameSubmitted ? (errors['username'] ? 'is-invalid' : 'is-valid') : ''}`}
            id='userNameValidator'
            value={userName}
            onChange={(e) => handleInputChange(setUserName, e.target.value, 'username')} />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">{errors['username']}</div>
        </div>
        <div className='col-md-4'>
          <label htmlFor='passwordValidator' className='form-label'>Password</label>
          <input
            type='password'
            className={`form-control ${passwordSubmitted ? (errors['password'] ? 'is-invalid' : 'is-valid') : ''}`}
            id='passwordValidator'
            value={password}
            onChange={(e) => handleInputChange(setPassword, e.target.value, 'password')} />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">{errors['password']}</div>
        </div>
        <div className='col-md-4'>
          <label htmlFor='repeatPasswordValidator' className='form-label'>Re-enter your password</label>
          <input
            type='password'
            className={`form-control ${repeatPasswordSubmitted ? (errors['confirm_password'] ? 'is-invalid' : 'is-valid') : ''}`}
            id='repeatPasswordValidator'
            value={repeatPassword}
            onChange={(e) => handleInputChange(setRepeatPassword, e.target.value, 'confirm_password')} />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">{errors['confirm_password']}</div>
        </div>
        <div className="col-md-12">
          <div className="form-check mt-3">
            <input
              className={`form-check-input ${agreementSubmitted ? (errors['data_agreement'] ? 'is-invalid' : 'is-valid') : ''}`}
              type="checkbox" checked={agreementCheck} onChange={(e) => handleInputChange(setAgreementCheck, e.target.checked, 'data_agreement')}
              id="CheckBox" />
            <label className="form-check-label" htmlFor="CheckBox">Agree to terms and conditions</label>
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">You need to agree with the T&C!</div>
          </div>
        </div>
        <div className="col-md-12">
          {redirectToLogin ? (
            <Link className="btn btn-dark mt-2 mb-2" to="/login">
              Login
            </Link>
          ) : (
            <button className="btn btn-dark mt-2 mb-2" type="button" onClick={handleSubmit}>
              Register
            </button>
          )}
        </div>
        <div className="border-top pt-3">
          <small className="text-muted">
            Already have an account? <Link className="ml-2" to="/login">Login Now</Link>
          </small>
        </div>
      </form>
    </React.Fragment>
  );
}

export default Register;
