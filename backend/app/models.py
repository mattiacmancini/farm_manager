from app import db
from datetime import datetime
# from sqlalchemy import Date

# User Models
class User(db.Model):
    __bind_key__ = 'user_db'
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(200), nullable=False)
    middlename = db.Column(db.String(200), nullable=True)
    lastname = db.Column(db.String(200), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    dob = db.Column(db.Date, nullable=False)
    password = db.Column(db.String(1000), nullable=False)
    data_agreement = db.Column(db.Boolean, nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"
    