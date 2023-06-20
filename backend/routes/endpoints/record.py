from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.crud import crud_record
from backend.database.schemas.record import RecordBase
from backend.routes import dep
from backend.database import models

router = APIRouter()

#save record data
@router.post("/save")
def save_record(
    *,
    db: Session = Depends(dep.get_db),
    record: RecordBase,
    ):
    user_record = crud_record.get_record(db)
    if user_record:
       # occur error
       error = "이미 존재하는 workflow입니다."
       return error
    else :
        return crud_record.create_workflow(db, record.part, record.symptom, record.degree)
    

#get record data
@router.get("/get")
def get_record(
    *,
    db: Session = Depends(dep.get_db),
    ):
    return crud_record.get_record(db)