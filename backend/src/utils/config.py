# utils/config.py
from pathlib import Path
from dotenv import load_dotenv
import os

ROOT = Path(__file__).parents[3]
load_dotenv(ROOT / ".env")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
API_HOST = os.getenv("API_HOST", "http://localhost:8000")

UPLOAD_DIR = os.getenv("UPLOAD_DIR", str(ROOT / "uploads"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

EMBED_MODEL = os.getenv("EMBED_MODEL", "text-embedding-3-small")
CHAT_MODEL = os.getenv("CHAT_MODEL", "gpt-4o-mini")  # change to available model
TOP_K = int(os.getenv("TOP_K", "5"))
