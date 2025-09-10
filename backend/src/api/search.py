# api/search.py
from fastapi import APIRouter, Query
from rag.embedder import embed_text
from rag.retriever import GLOBAL_STORE

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/")
def search(q: str = Query(...), top_k: int = Query(5)):
    qvec = embed_text(q)
    results = GLOBAL_STORE.query(qvec, top_k=top_k)
    # return trimmed results
    out = []
    for r in results:
        out.append({
            "title": r.get("title"),
            "snippet": (r.get("text") or "")[:400],
            "meta": {k: v for k, v in r.items() if k not in ("text",)}
        })
    return {"query": q, "results": out}
