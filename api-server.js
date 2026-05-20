#!/usr/bin/env node
// Local dev API server — mirrors the Vercel /api/chat function
// Run with: node api-server.js
// Then in another terminal: npm start

const http = require("http");
const fs = require("fs");
const path = require("path");

// Load .env
const envFile = path.join(__dirname, ".env");
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, "utf8")
    .split("\n")
    .forEach((line) => {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    });
}

const PORT = 3001;
const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const HF_URL = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}/pipeline/feature-extraction`;
const TOP_K = 3;

let embeddingsCache = null;
function loadEmbeddings() {
  if (embeddingsCache) return embeddingsCache;
  const filePath = path.join(__dirname, "src", "data", "embeddings.json");
  if (!fs.existsSync(filePath)) return null;
  embeddingsCache = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return embeddingsCache;
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]; normA += a[i] * a[i]; normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
}

async function embedQuery(query, apiKey) {
  const res = await fetch(HF_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: query, options: { wait_for_model: true } }),
  });
  if (!res.ok) throw new Error(`HF ${res.status}: ${await res.text()}`);
  const result = await res.json();
  if (Array.isArray(result) && Array.isArray(result[0]) && typeof result[0][0] === "number") return result[0];
  if (Array.isArray(result) && typeof result[0] === "number") return result;
  if (Array.isArray(result) && Array.isArray(result[0])) {
    const dim = result[0].length;
    const mean = new Array(dim).fill(0);
    for (const tok of result) tok.forEach((v, i) => (mean[i] += v));
    return mean.map((v) => v / result.length);
  }
  throw new Error("Unexpected HF shape");
}

const FALLBACK_CONTEXT = `You are DAKSHI AI, a friendly assistant for Dakshi Goel's portfolio.
Answer based only on the info below. If not covered, suggest dakshi22@umd.edu.

- MS Data Science at UMD (4.0 GPA, 2026)
- B.Tech EE+CS, IIT Jammu (2024), highest CGPA in EE dept
- AI/GenAI: LLMs, RAG, voice agents, multi-agent systems
- Experience: UMD TA, The Real Brokerage (AI Product), Mozrest (AI Dev), Infineon (RAG intern), LTIMindtree (ML intern)
- Research: IEEE Transactions on AI (underwater image), MIGARS 2024, UMD Perception & Robotics Group
- Projects: Voice Agent (LiveKit+RAG), Mock Interview Agent, LLM Fingerprinting, Consumer Complaints Pipeline
- Skills: Python, PyTorch, LangChain, LangGraph, FastAPI, Docker, AWS, FAISS, OpenAI, Groq, HuggingFace
- Contact: dakshi22@umd.edu | GitHub: dakshigoel22`;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(200); res.end(); return; }
  if (req.url !== "/api/chat" || req.method !== "POST") {
    res.writeHead(404); res.end(JSON.stringify({ error: "Not found" })); return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { message, history = [] } = JSON.parse(body);
      if (!message) { res.writeHead(400); res.end(JSON.stringify({ error: "message required" })); return; }

      const groqKey = process.env.GROQ_API_KEY;
      const hfKey = process.env.HUGGINGFACE_API_KEY;

      if (!groqKey) { res.writeHead(500); res.end(JSON.stringify({ error: "GROQ_API_KEY missing" })); return; }

      let systemPrompt = FALLBACK_CONTEXT;
      if (hfKey) {
        const chunks = loadEmbeddings();
        if (chunks?.length) {
          try {
            const qEmb = await embedQuery(message, hfKey);
            const scored = chunks.map((c) => ({ ...c, score: cosineSimilarity(qEmb, c.embedding) }));
            scored.sort((a, b) => b.score - a.score);
            const top = scored.slice(0, TOP_K).map((c) => c.text).join("\n---\n");
            systemPrompt = `You are DAKSHI AI. Answer based ONLY on:\n${top}`;
          } catch (e) {
            console.warn("RAG failed, using fallback:", e.message);
          }
        }
      }

      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${groqKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: systemPrompt }, ...history.slice(-10), { role: "user", content: message }],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await groqRes.json();
      if (!groqRes.ok) {
        console.error("Groq error:", data);
        res.writeHead(502); res.end(JSON.stringify({ error: "AI service unavailable. Please try again." })); return;
      }

      const reply = data.choices?.[0]?.message?.content ?? "Sorry, couldn't generate a response.";
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ reply }));
    } catch (err) {
      console.error("Server error:", err);
      res.writeHead(500); res.end(JSON.stringify({ error: "Internal server error" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}/api/chat`);
  console.log(`GROQ_API_KEY: ${process.env.GROQ_API_KEY ? "loaded" : "MISSING"}`);
  console.log(`HUGGINGFACE_API_KEY: ${process.env.HUGGINGFACE_API_KEY ? "loaded" : "MISSING"}`);
});
