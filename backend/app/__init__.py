from flask import Flask
from app.config import load_config
from flask_sqlalchemy import SQLAlchemy

user_db_config = load_config('user_db')
data_db_config = load_config('data_db')

app = Flask(__name__)

app.config['SECRET_KEY'] = 'your_secret_key'
app.config['USER_DB_URI'] = f"postgresql://{user_db_config['username']}:{user_db_config['password']}@{user_db_config['host']}/{user_db_config['db_name']}"
app.config['DATA_DB_URI'] = f"postgresql://{data_db_config['username']}:{data_db_config['password']}@{data_db_config['host']}/{data_db_config['db_name']}"

user_db = SQLAlchemy(app, session_options={'bind': app.config['USER_DB_URI']})
data_db = SQLAlchemy(app, session_options={'bind': app.config['DATA_DB_URI']})
