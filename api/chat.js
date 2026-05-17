const path = require("path");
const fs = require("fs");

const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const HF_URL = `https://api-inference.huggingface.co/pipeline/feature-extraction/${HF_MODEL}`;
const TOP_K = 3;

// Module-level cache — persists across warm Vercel invocations
let embeddingsCache = null;

function loadEmbeddings() {
  if (embeddingsCache) return embeddingsCache;
  const filePath = path.join(process.cwd(), "src", "data", "embeddings.json");
  if (!fs.existsSync(filePath)) return null;
  embeddingsCache = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return embeddingsCache;
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
}

async function embedQuery(query, apiKey) {
  const response = await fetch(HF_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: query, options: { wait_for_model: true } }),
  });

  if (!response.ok) {
    throw new Error(`HF API ${response.status}: ${await response.text()}`);
  }

  const result = await response.json();

  // all-MiniLM-L6-v2 returns a flat array of floats for a single string input
  if (Array.isArray(result) && typeof result[0] === "number") return result;
  // Or [[floats...]] wrapping
  if (Array.isArray(result) && Array.isArray(result[0]) && typeof result[0][0] === "number") return result[0];
  // Token-level 2D: mean-pool
  if (Array.isArray(result) && Array.isArray(result[0])) {
    const dim = result[0].length;
    const mean = new Array(dim).fill(0);
    for (const tok of result) tok.forEach((v, i) => (mean[i] += v));
    return mean.map((v) => v / result.length);
  }

  throw new Error("Unexpected HF embedding shape");
}

function retrieveChunks(queryEmbedding, chunks) {
  const scored = chunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, TOP_K);
}

function buildSystemPrompt(contextChunks) {
  const contextText = contextChunks.map((c) => c.text).join("\n---\n");
  return `You are DAKSHI AI, a friendly and knowledgeable AI assistant for Dakshi Goel's portfolio website.
Answer questions about Dakshi based ONLY on the context below. Be concise, warm, and professional.
If the answer is not in the context, say you don't have that information and suggest reaching out at dakshi22@umd.edu.

CONTEXT:
${contextText}`;
}

// Fallback prompt used when embeddings.json is not yet generated
const FALLBACK_CONTEXT = `You are DAKSHI AI, a friendly and knowledgeable AI assistant for Dakshi Goel's portfolio website.
Answer questions about Dakshi based only on the information below. Be concise, warm, and professional.
If asked something not covered here, say you don't have that info but suggest they reach out directly at dakshi22@umd.edu.

ABOUT:
- MS Data Science at University of Maryland, College Park (4.0 GPA, expected 2026)
- B.Tech in Electrical Engineering + Computer Science from IIT Jammu (2024)
- AI/GenAI engineer focused on LLMs, RAG pipelines, voice agents, and ML systems

EXPERIENCE:
- Teaching Assistant @ UMD (Feb 2026–Present): Intro to Data Science course, supporting 30+ students
- AI Product Associate @ The Real Brokerage (Dec 2024–Aug 2025): Built vector search, RAG pipelines, LangFuse observability, Docker deployments
- AI Developer @ Mozrest (Dec 2023–Dec 2024): LangGraph multi-agent systems, ARIMA/LSTM forecasting, FastAPI microservices, AWS Lambda
- AI Innovation Intern @ Infineon Technologies (July–Dec 2023): RAG pipeline with LLaMA-13B and FAISS for semiconductor documentation
- ML Intern @ LTIMindtree (May–July 2023): LLaMA-2 code generation, 38% hallucination reduction through prompt engineering

RESEARCH:
- IEEE paper on underwater image enhancement using deep learning (+7dB PSNR improvement, Indian Patent granted)
- CNN for geological classification from remote sensing imagery (presented at MIGARS 2024)

PROJECTS:
- Voice Agent for Real Estate: Real-time voice AI using LiveKit and LLMs for property Q&A
- Mock Interview Agent: AI-powered interview simulator with feedback (LiveKit, LangChain)
- LLM Fingerprinting: 82% accuracy identifying LLM-generated text vs human text
- Consumer Complaints Agentic Pipeline: Multi-agent system for automated complaint classification and routing
- Audio Quality Assessment: ML model for speech quality scoring
- Age & Gender Prediction: CNN model (won 1st place at Inter-IIT Tech Meet 10.0 across 23 IITs)

ACHIEVEMENTS:
- Smt. Godavari Devi Award — IIT Jammu (2024)
- Flipkart Grid Robotics — 2nd Place (Top 0.1%, 9,000+ teams)
- Inter-IIT Tech Meet 10.0 — 1st Rank (Bosch challenge, 23 IITs)
- Google Girls Hackathon — Semi-finalist (Top 2.5% nationwide)
- SEED Pitch Competition — 2nd Prize

SKILLS: Python, PyTorch, TensorFlow, LangChain, LangGraph, FastAPI, Docker, AWS, PostgreSQL, MLflow, FAISS, OpenAI API, Groq

CONTACT: dakshi22@umd.edu | GitHub: dakshigoel22 | Open to: AI/ML engineering and research roles`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, history = [] } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) return res.status(500).json({ error: "GROQ_API_KEY not configured" });

  const hfKey = process.env.HUGGINGFACE_API_KEY;

  let systemPrompt = FALLBACK_CONTEXT;

  // RAG: use embeddings if available and HF key is configured
  if (hfKey) {
    const chunks = loadEmbeddings();
    if (chunks && chunks.length > 0) {
      try {
        const queryEmbedding = await embedQuery(message, hfKey);
        const topChunks = retrieveChunks(queryEmbedding, chunks);
        systemPrompt = buildSystemPrompt(topChunks);
      } catch (err) {
        console.warn("RAG retrieval failed, falling back to static context:", err.message);
        // systemPrompt stays as FALLBACK_CONTEXT
      }
    }
  }

  const recentHistory = history.slice(-10);
  const messages = [
    { role: "system", content: systemPrompt },
    ...recentHistory,
    { role: "user", content: message },
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API error:", err);
      return res.status(502).json({ error: "AI service unavailable. Please try again." });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
