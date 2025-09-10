# services/transcript_service.py
# Try fetching transcript for a YouTube video using youtube_transcript_api if installed.

from utils.logger import logger

def get_youtube_transcript(video_id: str) -> str:
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
    except Exception:
        logger.warning("youtube_transcript_api not installed.")
        return ""
    try:
        parts = YouTubeTranscriptApi.get_transcript(video_id)
        text = " ".join([p["text"] for p in parts])
        return text
    except Exception as e:
        logger.warning(f"transcript fetch failed: {e}")
        return ""
