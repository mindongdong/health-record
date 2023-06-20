from fastapi import APIRouter

from backend.routes.endpoints import auth, workflow, files

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(workflow.router, prefix="/workflow", tags=["workflow"])
api_router.include_router(files.router, prefix="/files", tags=["files"])