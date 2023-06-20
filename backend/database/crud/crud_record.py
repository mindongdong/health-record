from typing import Any, Dict, Optional, Union
from sqlalchemy.orm import Session
from backend.database import models
from backend.database.schemas.record import RecordBase

def get_record(db: Session):
    return db.query(models.Record).all()

async def create_record(db: Session, part: str, symptom: str, degree: str) -> models.Record:
    db_file = models.Record(
        part = part,
        symptom = symptom,
        degree = degree,
        )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

def delete_record(db: Session, id: int):
    target_record = db.query(models.Record).filter(models.Record.id == id).first()
    db.delete(target_record)
    db.commit()
    return target_record