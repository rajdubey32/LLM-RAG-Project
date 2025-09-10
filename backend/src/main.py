# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import ingest, search, qa
from utils.logger import logger
from utils.config import API_HOST, UPLOAD_DIR
import os

app = FastAPI(title="Learning Resource Finder - RAG Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest.router)
app.include_router(search.router)
app.include_router(qa.router)

@app.get("/")
def root():
    return {"status": "ok", "info": "RAG backend running"}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting app")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
