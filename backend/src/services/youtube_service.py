# services/youtube_service.py
# Placeholder helpers. You can later plug YouTube Data API or scraping.

import requests
from utils.logger import logger

def search_youtube_videos(query: str, limit: int = 5):
    # Placeholder: return dummy list or integrate YouTube API here.
    logger.info("youtube_service.search_youtube_videos called — implement with YouTube API")
    return [{"title": f"Video result for {query} #{i+1}", "url": f"https://youtu.be/dummy{i+1}"} for i in range(limit)]
