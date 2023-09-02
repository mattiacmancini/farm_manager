from app import app
from flask_login.mixins import UserMixin
from flask_login import login_user, current_user, logout_user, login_required
from flask import flash, jsonify, request
from flask import render_template, url_for, redirect
from app.forms import (RegistrationForm, LoginForm, UpdateAccountForm,
                       RequestResetForm, ResetPasswordForm)
from app.models import User
from app import app, db, bcrypt

@app.route('/')
def home():
    return "Hello World"

@app.route('/register', methods=['GET', 'POST'])
def register_user():

    # if current_user.is_authenticated:
    #     pass
    data = request.json
    form = RegistrationForm(data=data)
    if form.validate():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode('utf-8')
        
        user = User(
            firstname=form.firstname.data,
            middlename=form.middlename.data if form.middlename.data else None,
            lastname=form.lastname.data,
            dob=form.dob.data,
            username=form.username.data, 
            email=form.email.data, 
            password=hashed_password,
            data_agreement=form.data_agreement.data
        )
        db.session.add(user)
        db.session.commit() 
        print('Your account has been created. You are now able to log in')
        return jsonify({'message': 'Registration successful'}), 200
    print(form.errors)
    return jsonify({'errors': form.errors}), 400

@app.route('/login', methods=['POST', 'GET'])
def login():
    # if current_user.is_authenticated:
    #     return redirect(url_for('dashboard'))
    data = request.json
    form = LoginForm(data=data)
    error_list = {'errors':{}}
    if form.validate():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                # login_user(user, remember=form.remember.data)
                return jsonify({'message': 'User successfully logged in!'}), 200
            else:
                error_list['errors']['password'] = 'The password entered is incorrect'
                return jsonify(error_list), 400
        else:
            error_list['errors']['email'] = 'Email address not found.'
            return jsonify(error_list), 400
    print(form.errors)
    return jsonify({'errors': form.errors}), 400
