from fastapi import FastAPI
from sqlalchemy import engine
from starlette.middleware.cors import CORSMiddleware

from backend.routes.api import api_router
from backend.common.config import settings
from backend.database import models
from backend.database.conn import engine


models.Base.metadata.create_all(bind=engine)

global_engine = engine

app = FastAPI(
    title=settings.PROJECT_NAME
)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

# if settings.BACKEND_CORS_ORIGINS:

app.add_middleware(
    CORSMiddleware,
    # allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.ROUTES_STR)