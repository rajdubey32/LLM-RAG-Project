# api/qa.py
from fastapi import APIRouter, Body, HTTPException
from rag.embedder import embed_text
from rag.retriever import GLOBAL_STORE
from rag.generator import generate_answer

router = APIRouter(prefix="/qa", tags=["qa"])

@router.post("/")
def qa(payload: dict = Body(...)):
    question = payload.get("question")
    top_k = int(payload.get("top_k", 5))
    if not question:
        raise HTTPException(status_code=400, detail="question required")
    qvec = embed_text(question)
    hits = GLOBAL_STORE.query(qvec, top_k=top_k)
    contexts = [h.get("text", "") for h in hits if h.get("text")]
    answer = generate_answer(question, contexts)
    return {"answer": answer, "sources": hits}
