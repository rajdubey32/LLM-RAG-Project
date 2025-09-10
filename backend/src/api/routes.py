from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from app.services.youtube_service import youtube_search
from app.services.transcript_service import extract_video_id, get_transcript_with_timestamps
from app.rag.retriever import chunk_transcript
from app.rag.embedder import create_index_for_chunks, search_index, build_or_load_index
from app.rag.generator import answer_with_llm

router = APIRouter()

class IngestRequest(BaseModel):
    url: HttpUrl
    lang_priority: Optional[List[str]] = ["en"]

class QARequest(BaseModel):
    video_id: str
    query: str
    target_lang: Optional[str] = "en"

@router.get("/search/youtube")
def search_youtube(q: str, limit: int = 6):
    results = youtube_search(q, limit)
    return results

@router.post("/ingest")
def ingest(req: IngestRequest):
    vid = extract_video_id(str(req.url))
    if not vid:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")
    transcript = get_transcript_with_timestamps(vid, req.lang_priority or ["en"])
    if not transcript:
        raise HTTPException(status_code=404, detail="No transcript found")
    chunks, meta = chunk_transcript(transcript)
    create_index_for_chunks(vid, chunks, meta)
    return {"video_id": vid, "chunks": len(chunks)}

@router.post("/qa")
def qa(req: QARequest):
    index, meta = build_or_load_index(req.video_id)
    if index is None:
        # try ingest on the fly if index not found
        transcript = get_transcript_with_timestamps(req.video_id, ["en"])
        if not transcript:
            raise HTTPException(status_code=404, detail="No transcript available")
        chunks, meta2 = chunk_transcript(transcript)
        create_index_for_chunks(req.video_id, chunks, meta2)
    hits = search_index(req.video_id, req.query, top_k=5)
    if not hits:
        raise HTTPException(status_code=404, detail="No relevant content found")
    answer = answer_with_llm(req.query, hits, req.target_lang)
    timestamps = list({h["meta"]["start"]+"-"+h["meta"]["end"] for h in hits})
    return {"answer": answer, "timestamps": timestamps, "sources": [f"https://www.youtube.com/watch?v={req.video_id}"]}

