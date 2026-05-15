const PORTFOLIO_CONTEXT = `
You are DAKSHI AI, a friendly and knowledgeable AI assistant for Dakshi Goel's portfolio website.
Answer questions about Dakshi based only on the information below. Be concise, warm, and professional.
If asked something not covered here, say you don't have that info but suggest they reach out directly.

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

CONTACT: dakshi22@umd.edu | GitHub: dakshigoel22 | Open to: AI/ML engineering and research roles
`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history = [] } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not configured" });
  }

  const recentHistory = history.slice(-10);

  const messages = [
    { role: "system", content: PORTFOLIO_CONTEXT },
    ...recentHistory,
    { role: "user", content: message },
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
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
