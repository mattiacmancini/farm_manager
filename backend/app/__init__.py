from flask import Flask
from app.config import load_config
from flask_sqlalchemy import SQLAlchemy
from urllib.parse import quote_plus
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS
from flask_jwt_extended import JWTManager


user_db_config = load_config('user_db')
data_db_config = load_config('data_db')

app = Flask(__name__)

app.config['SECRET_KEY'] = 'your_secret_key'
app.config["WTF_CSRF_ENABLED"] = False ##THIS IS ONLY FOR TESTING WITH POSTMAN!!!!
app.config['SQLALCHEMY_BINDS'] = {
    'user_db': f"postgresql://{user_db_config['username']}:{quote_plus(user_db_config['password'])}@{user_db_config['host']}/{user_db_config['db_name']}",
    'data_db': f"postgresql://{data_db_config['username']}:{quote_plus(data_db_config['password'])}@{data_db_config['host']}/{data_db_config['db_name']}"
}
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"

CORS(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

from app import routes