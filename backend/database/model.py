from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB, JSON, ARRAY

from backend.database.conn import Base


class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    part = Column(String, nullable=False)
    symptom = Column(String, nullable=False)
    degree = Column(String, nullable=False)