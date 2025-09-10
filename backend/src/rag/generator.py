# rag/generator.py
from typing import List
from utils.config import OPENAI_API_KEY, CHAT_MODEL
from utils.logger import logger

USE_OPENAI = bool(OPENAI_API_KEY)

if USE_OPENAI:
    import openai
    openai.api_key = OPENAI_API_KEY

def generate_answer(question: str, context_snippets: List[str]) -> str:
    """
    Build a simple prompt and call OpenAI chat completion if available,
    otherwise return a naive concatenation fallback.
    """
    if not USE_OPENAI:
        # fallback: return combined context + question
        out = "\n\n".join(context_snippets[:3])
        return f"Context:\n{out}\n\nQuestion: {question}\n\n(LLM not configured; this is a fallback.)"

    system = "You are an assistant that answers technical learning queries. Use context and cite short snippets."
    user_prompt = "Use the following context to answer the question concisely.\n\n"
    for i, s in enumerate(context_snippets):
        user_prompt += f"Context {i+1}:\n{s}\n\n"
    user_prompt += f"Question: {question}\nAnswer with short explanation and cite which context you used."

    resp = openai.ChatCompletion.create(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user_prompt}
        ],
        max_tokens=512,
        temperature=0.0,
    )
    text = resp.choices[0].message.content.strip()
    return text
