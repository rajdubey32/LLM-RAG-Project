# rag/retriever.py
from typing import List, Dict, Optional
from utils.logger import logger
import numpy as np

try:
    import faiss
    _FAISS = True
except Exception:
    faiss = None
    _FAISS = False

class VectorStore:
    def __init__(self, dim: int = 1536):
        self.dim = dim
        self.id_to_meta: Dict[int, Dict] = {}
        self.vectors = []
        self._next_id = 0
        if _FAISS:
            self.index = faiss.IndexFlatIP(dim)
            logger.info("FAISS enabled.")
        else:
            self.index = None
            logger.info("FAISS not available, using in-memory store.")

    def add(self, vec: np.ndarray, meta: Dict) -> int:
        vec = vec.astype("float32").reshape(1, -1)
        idx = self._next_id
        self._next_id += 1
        self.id_to_meta[idx] = meta
        if _FAISS:
            self.index.add(vec)
        else:
            self.vectors.append(vec)
        return idx

    def _cosine_search(self, qvec: np.ndarray, top_k: int):
        if not self.vectors:
            return []
        mat = np.vstack(self.vectors).reshape(-1, self.dim)
        qn = qvec / (np.linalg.norm(qvec) + 1e-12)
        matn = mat / (np.linalg.norm(mat, axis=1, keepdims=True) + 1e-12)
        sims = (matn @ qn).squeeze()
        order = np.argsort(-sims)[:top_k]
        return [(int(i), float(sims[i])) for i in order]

    def query(self, qvec: np.ndarray, top_k: int = 5):
        q = qvec.astype("float32").reshape(1, -1)
        if _FAISS:
            D, I = self.index.search(q, top_k)
            results = []
            for idx in I[0]:
                if idx == -1:
                    continue
                results.append(self.id_to_meta[int(idx)])
            return results
        else:
            pairs = self._cosine_search(qvec, top_k)
            results = []
            for idx, score in pairs:
                meta = self.id_to_meta.get(idx)
                if meta:
                    meta = dict(meta)
                    meta["score"] = float(score)
                    results.append(meta)
            return results

# global singleton store (use same dim as embedder output)
GLOBAL_STORE = VectorStore(dim=1536)
