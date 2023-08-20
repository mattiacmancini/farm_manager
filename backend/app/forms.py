from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from wtforms import (
    StringField,
    DateField,
    TextField,
    PasswordField,
    SubmitField,
    BooleanField,
)
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from wtforms.widgets import PasswordInput
from app.models import User
from datetime import datetime


# Coustom validators
# ==================
def validate_dob(form, field):
    """Check whether user is 18yo"""
    today = datetime.utcnow().date()
    age = (
        today.year
        - field.data.year
        - ((today.month, today.day) < (field.data.month, field.data.day))
    )
    if age < 18:
        raise ValidationError("You must be at least 18 years old.")

# (1) REGISTRATION FORM
# =====================
class RegistrationForm(FlaskForm):
    firstname = StringField(
        "First name", validators=[DataRequired(), Length(min=3, max=30)]
    )

    middlename = StringField("Middle name", validators=[Length(min=1, max=30)])

    lastname = StringField(
        "Last name", validators=[DataRequired(), Length(min=3, max=30)]
    )

    username = StringField(
        "Username", validators=[DataRequired(), Length(min=4, max=20)]
    )
    dob = DateField("Date of birth", validators=[
                    DataRequired(), validate_dob])

    email = TextField(
        "Email address",
        validators=[DataRequired("Please enter your email address"), Email()],
    )

    password = PasswordField(
        "Password",
        widget=PasswordInput(hide_value=True),
        validators=[DataRequired("Please enter your password")],
    )

    confirm_password = PasswordField(
        "Confirm Password",
        widget=PasswordInput(hide_value=True),
        validators=[
            DataRequired("Please confirm your password"),
            EqualTo("password", message="Passwords must match"),
        ],
    )

    data_agreement = BooleanField(
        "Data agreement",
        validators=[DataRequired("You must agree to the Terms and Conditions")]
    )


    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError(
                "That username is already taken. Please choose a different one"
            )

    def validate_email(self, email):
        email_address = User.query.filter_by(email=email.data).first()
        if email_address:
            raise ValidationError(
                "The email entered is already taken. Please choose a different one"
            )


# (2) LOGIN FORM
# ==============
class LoginForm(FlaskForm):
    email = TextField(
        "Email address",
        validators=[DataRequired("Please enter your email address"), Email()],
    )

    password = PasswordField(
        "Password",
        widget=PasswordInput(hide_value=True),
        validators=[DataRequired("Please enter your password")],
    )

    remember = BooleanField("Remember me")



# (3) UPDATE ACCOUNT FORM
# =======================
class UpdateAccountForm(FlaskForm):
    username = StringField(
        "Username", validators=[DataRequired(), Length(min=4, max=20)]
    )

    email = TextField(
        "Email address",
        validators=[DataRequired("Please enter your email address"), Email()],
    )

    picture = FileField(
        "Update profile picture", validators=[FileAllowed(["jpg", "jpeg", "png"])]
    )

    submit = SubmitField("Update")

    def validate_username(self, username):
        if username.data != current_user.username:
            user = User.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError(
                    "That username entered is already taken. Please choose a different one"
                )

    def validate_email(self, email):
        if email.data != current_user.email:
            email_address = User.query.filter_by(email=email.data).first()
            if email_address:
                raise ValidationError(
                    "The email entered is already taken. Please choose a different one"
                )


# (4) REQUEST PASSWORD RESET
# ==========================
class RequestResetForm(FlaskForm):
    email = TextField(
        "Email address",
        validators=[DataRequired("Please enter your email address"), Email()],
    )
    submit = SubmitField("Request Password Reset")

    def validate_email(self, email):
        email_address = User.query.filter_by(email=email.data).first()
        if email_address is None:
            raise ValidationError(
                "There is no account with that email. You must register first"
            )


# (5) RESET PASSWORD
# ==================
class ResetPasswordForm(FlaskForm):
    password = PasswordField(
        "Password",
        widget=PasswordInput(hide_value=True),
        validators=[DataRequired("Please enter your password")],
    )

    confirm_password = PasswordField(
        "Confirm Password",
        widget=PasswordInput(hide_value=True),
        validators=[
            DataRequired("Please confirm your password"),
            EqualTo("password", message="Passwords must match"),
        ],
    )
    submit = SubmitField("Reset Password")
