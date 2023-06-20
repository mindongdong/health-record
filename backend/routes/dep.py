from typing import Generator

from fastapi.security import OAuth2PasswordBearer


from backend.common.config import settings
from backend.database.conn import SessionLocal

#dependency
def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()