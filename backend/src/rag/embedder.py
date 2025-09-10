# rag/embedder.py
from typing import List
import numpy as np
from utils.config import OPENAI_API_KEY, EMBED_MODEL
from utils.logger import logger

USE_OPENAI = bool(OPENAI_API_KEY)

if USE_OPENAI:
    import openai
    openai.api_key = OPENAI_API_KEY

def embed_text(text: str) -> np.ndarray:
    text = text or ""
    if USE_OPENAI:
        resp = openai.Embedding.create(model=EMBED_MODEL, input=text)
        vec = np.array(resp["data"][0]["embedding"], dtype="float32")
        return vec
    # fallback cheap embedding: char-based hash -> fixed vector (not for prod)
    import hashlib
    h = hashlib.sha256(text.encode("utf-8")).digest()
    vec = np.frombuffer(h, dtype=np.uint8).astype("float32")
    vec = vec / (np.linalg.norm(vec) + 1e-12)
    # pad or trim to length 384 to have consistent size
    target_dim = 384
    v = np.zeros(target_dim, dtype="float32")
    v[:min(len(vec), target_dim)] = vec[:min(len(vec), target_dim)]
    return v

def embed_batch(texts: List[str]):
    return [embed_text(t) for t in texts]
