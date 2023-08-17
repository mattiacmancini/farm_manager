from flask import Flask
from app.config import load_config
from flask_sqlalchemy import SQLAlchemy
from urllib.parse import quote_plus
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS

user_db_config = load_config('user_db')
data_db_config = load_config('data_db')

app = Flask(__name__)

app.config['SECRET_KEY'] = 'your_secret_key'
app.config["WTF_CSRF_ENABLED"] = False ##THIS IS ONLY FOR TESTING WITH POSTMAN!!!!
app.config['SQLALCHEMY_BINDS'] = {
    'user_db': f"postgresql://{user_db_config['username']}:{quote_plus(user_db_config['password'])}@{user_db_config['host']}/{user_db_config['db_name']}",
    'data_db': f"postgresql://{data_db_config['username']}:{quote_plus(data_db_config['password'])}@{data_db_config['host']}/{data_db_config['db_name']}"
}

CORS(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login' #this sends back to the login route when trying manually to navigate to a route for only authenticated users
login_manager.login_message_category = 'info'

from app import routes