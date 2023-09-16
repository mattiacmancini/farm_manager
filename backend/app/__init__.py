from urllib.parse import quote_plus
from flask import Flask
from app.config import AppConfig
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager

config = AppConfig('./app/config.ini')
# pylint: disable=no-member
user_db_config = config.user_db
data_db_config = config.data_db

app = Flask(__name__)

app.config['SECRET_KEY'] = config.app['farmapp_secret_key']
app.config["WTF_CSRF_ENABLED"] = False ##THIS IS ONLY FOR TESTING WITH POSTMAN!!!!
app.config['SQLALCHEMY_BINDS'] = {
    'user_db': (
        f"postgresql://{user_db_config['username']}:{quote_plus(user_db_config['password'])}@"
        f"{user_db_config['host']}/{user_db_config['db_name']}"
    ),
    'data_db': (
        f"postgresql://{data_db_config['username']}:{quote_plus(data_db_config['password'])}@"
        f"{data_db_config['host']}/{data_db_config['db_name']}"
    )
}
app.config["JWT_SECRET_KEY"] = config.app['farmapp_jwt_key']
app.config["BING_API_KEY"] = config.app['bing_api_key']
# pylint: enable=no-member
CORS(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# pylint: disable=wrong-import-position
from app import routes
# pylint: enable=wrong-import-position
