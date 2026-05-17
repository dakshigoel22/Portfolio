# Chatbot Side Panel + RAG Pipeline Plan

## Current State

### What exists
- `src/components/Chatbot/Chatbot.js` — floating button (FAB) + centered modal dialog
- `src/components/Chatbot/Chatbot.css` — styles for FAB, backdrop, modal
- `api/chat.js` — Vercel serverless function calling Groq llama-3.1-70b
- `src/App.js` — mounts `<Chatbot />` as a persistent overlay

### Is it RAG? No.
The current approach is **prompt-stuffing**: a hardcoded `PORTFOLIO_CONTEXT` string (~600 chars) is prepended as the system message on every request. There is no vector database, no embedding step, no retrieval — just a static block of text passed verbatim to the LLM.

---

## Goals
1. **Side panel UI** — slides in from the right, main page content shifts left with a smooth transition
2. **RAG pipeline** — embed real documents (resume, projects, papers, LinkedIn) and retrieve relevant chunks per query

---

## Architecture

### RAG Design — Cosine Similarity + HuggingFace Embeddings, No Vector DB

```
docs/*.md
    ↓  (one-time: node scripts/embed-docs.js)
src/data/embeddings.json   ← committed to repo: text + 384-dim float arrays
    ↓  (at query time: api/chat.js)
embed query (HF API) → cosine similarity → top-3 chunks → build context → Groq
```

- **Embedding model**: `sentence-transformers/all-MiniLM-L6-v2` (free HF Inference API)
- **New env var**: `HUGGINGFACE_API_KEY` (free at huggingface.co/settings/tokens)
- **Generation**: Groq `llama-3.1-70b-versatile` (existing `GROQ_API_KEY`)
- **No vector DB needed** — cosine similarity runs in the serverless function

### Side Panel
- Fixed right panel, 380px wide, slides in via `transform: translateX`
- Main content shifts left via `margin-right: 380px` transition on `#main-content`
- Mobile (< 768px): full-screen, no margin shift

---

## Files Modified / Created

| File | Change |
|------|--------|
| `api/chat.js` | RAG retrieval (HF embed + cosine sim + dynamic prompt) |
| `src/components/Chatbot/Chatbot.js` | Modal → side panel |
| `src/components/Chatbot/Chatbot.css` | Panel styles |
| `src/App.js` | `panel-open` state + `#main-content` wrapper |
| `src/style.css` | `margin-right` transition |
| `scripts/embed-docs.js` | One-time embedding script |
| `src/data/embeddings.json` | Pre-computed embeddings (committed) |
| `docs/*.md` | User-provided background content |

---

## Running the Embedding Script

After filling in `docs/*.md`:

```bash
# Add HUGGINGFACE_API_KEY to .env.local first
node scripts/embed-docs.js
# Then commit src/data/embeddings.json
```

Re-run whenever docs change.

---

## Verification

1. `node scripts/embed-docs.js` → `src/data/embeddings.json` created correctly
2. `npm start` → side panel slides in, page shifts left
3. "What did you work on at Mozrest?" → specific details from docs, not generic answer
4. Out-of-scope question → bot says it doesn't have that info
5. Mobile: full-screen panel, no margin shift
