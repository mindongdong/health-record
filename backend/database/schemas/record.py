from typing import List, Optional
from typing import Optional
from pydantic import BaseModel

class RecordBase(BaseModel):
    part: Optional[str] = None
    symptom: Optional[str] = None
    degree: Optional[str] = None
