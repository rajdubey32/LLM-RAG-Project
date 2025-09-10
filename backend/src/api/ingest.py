# api/ingest.py
from fastapi import APIRouter, UploadFile, File, BackgroundTasks, HTTPException
from pathlib import Path
from utils.config import UPLOAD_DIR
from utils.logger import logger
from rag.embedder import embed_text
from rag.retriever import GLOBAL_STORE
import uuid
import shutil

router = APIRouter(prefix="/ingest", tags=["ingest"])

def save_file(upload: UploadFile, dest_folder: str) -> str:
    Path(dest_folder).mkdir(parents=True, exist_ok=True)
    filename = f"{uuid.uuid4().hex}_{upload.filename}"
    dest = Path(dest_folder) / filename
    with open(dest, "wb") as f:
        shutil.copyfileobj(upload.file, f)
    return str(dest)

def extract_text_from_file(path: str) -> str:
    # quick attempt for txt/pdf;...... extend as needed for more formats...........
    if path.lower().endswith(".pdf"):
        try:
            from pdfminer.high_level import extract_text
            return extract_text(path)[:50000]
        except Exception:
            return ""
    else:
        try:
            with open(path, "r", encoding="utf-8") as f:
                return f.read()[:50000]
        except Exception:
            return ""

def index_text(text: str, title: str, meta: dict):
    vec = embed_text(text)
    idx = GLOBAL_STORE.add(vec, {"title": title, "text": text[:2000], **meta})
    return idx

@router.post("/file")
async def ingest_file(background: BackgroundTasks, file: UploadFile = File(...)):
    path = save_file(file, UPLOAD_DIR)
    def job(p, fname):
        txt = extract_text_from_file(p)
        if not txt:
            logger.info("no text extracted from uploaded file")
        index_text(txt or fname, fname, {"source": "upload", "path": p})
        logger.info(f"indexed uploaded file: {fname}")
    background.add_task(job, path, file.filename)
    return {"status": "queued", "path": path}

@router.post("/text")
async def ingest_text(payload: dict):
    text = payload.get("text")
    title = payload.get("title", "untitled")
    if not text:
        raise HTTPException(400, "text required")
    idx = index_text(text, title, {"source": "text"})
    return {"status": "ok", "vector_id": idx}
