from app import app, db
from app.models import Users

if __name__ == '__main__':
    with app.app_context():
        db.create_all(bind_key=['user_db'])
        db.session.commit()