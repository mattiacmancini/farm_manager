import React, { useState } from 'react';
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
  // const redirect = useNavigate();

  const validateCheckBox = (value) => {
    return value
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
      'firstname': firstName,
      'middlename': middleName,
      'lastname': lastName,
      'dob': dateOfBirth,
      'username': userName,
      'email': email,
      'password': password,
      'confirm_password': repeatPassword
    }

    axios.post(`${props.baseUrl}register`, userData)
      .then(response => {
        if (response.status === 200) {
          setSuccessMessage('User registration successful: you can now login!')
          console.log("User registration successful:", response.data.message);
          // redirect('/login');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log("User registration failed:", error.response.data.errors);
          setErrors(error.response.data.errors);
          setErrorMessage('Error registering user: check the data you entered!')
        } else {
          console.error("Error registering user:", error);
        }
      });
  };

  const handleInputChange = (setter, value, fieldName) => {
    setErrors(errors => ({
      ...errors,
      [fieldName]: "",
    }));

    setter(value);
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
            className={`form-control ${errors['firstname'] ? 'is-invalid' : (firstName === "" ? "" : 'is-valid')}`}
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
            className={`form-control ${errors['middlename'] ? 'is-invalid' : (middleName === "" ? "" : 'is-valid')}`}
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
            className={`form-control ${errors['lastname'] ? 'is-invalid' : (lastName === "" ? "" : 'is-valid')}`}
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
            className={`form-control ${errors['email'] ? 'is-invalid' : (email === "" ? "" : 'is-valid')}`}
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
            className={`form-control ${errors['dob'] ? 'is-invalid' : (dateOfBirth === "" ? "" : 'is-valid')}`}
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
            className={`form-control ${errors['username'] ? 'is-invalid' : (userName === "" ? "" : 'is-valid')}`}
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
            className={`form-control ${errors['password'] ? 'is-invalid' : (password === "" ? "" : 'is-valid')}`}
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
            className={`form-control ${errors['confirm_password'] ? 'is-invalid' : (repeatPassword === "" ? "" : 'is-valid')}`}
            id='repeatPasswordValidator'
            value={repeatPassword}
            onChange={(e) => handleInputChange(setRepeatPassword, e.target.value, 'confirm_password')} />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">{errors['confirm_password']}</div>
        </div>
        <div className="col-md-12">
          <div className="form-check mt-3">
            <input
              className={`form-check-input ${validateCheckBox(agreementCheck) ? 'is-valid' : 'is-invalid'}`}
              type="checkbox" checked={agreementCheck} onChange={(e) => handleInputChange(setAgreementCheck, e.target.checked)}
              id="CheckBox" />
            <label className="form-check-label" htmlFor="CheckBox">Agree to terms and conditions</label>
            <div className="invalid-feedback">You need to agree with the T&C!</div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-dark mb-3 me-2" type="button" onClick={handleSubmit}>
            Register
          </button>
          <Link to="/" className="btn btn-dark mb-3 me-2">
            Back
          </Link>
        </div>

      </form>
    </React.Fragment>
  );
}

export default Register;
