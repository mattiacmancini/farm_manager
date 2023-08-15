from app import user_db, data_db
from datetime import datetime
# from sqlalchemy import Date

# User Models
class Users(user_db.Model):
    __tablename__ = 'users'
    __table_args__ = {'schema': 'users'}
    id = user_db.Column(user_db.Integer, primary_key=True)
    firstname = user_db.Column(user_db.String(200), nullable=False)
    middlename = user_db.Column(user_db.String(200), nullable=True)
    lastname = user_db.Column(user_db.String(200), nullable=False)
    username = user_db.Column(user_db.String(20), nullable=False)
    email = user_db.Column(user_db.String(120), unique=True, nullable=False)
    image_file = user_db.Column(user_db.String(20), nullable=False, default='default.jpg')
    dob = user_db.Column(user_db.Date, nullable=False)
    password = user_db.Column(user_db.String(20), nullable=False)
    created = user_db.Column(user_db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"
    