from flask import Flask
from app.config import load_config
from flask_sqlalchemy import SQLAlchemy
from urllib.parse import quote_plus

user_db_config = load_config('user_db')
data_db_config = load_config('data_db')

app = Flask(__name__)

app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_BINDS'] = {
    'user_db': f"postgresql://{user_db_config['username']}:{quote_plus(user_db_config['password'])}@{user_db_config['host']}/{user_db_config['db_name']}",
    'data_db': f"postgresql://{data_db_config['username']}:{quote_plus(data_db_config['password'])}@{data_db_config['host']}/{data_db_config['db_name']}"
}


db = SQLAlchemy(app)