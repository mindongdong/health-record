from fastapi import APIRouter

from backend.routes.endpoints import record

api_router = APIRouter()

api_router.include_router(record.router, prefix="/record", tags=["record"])