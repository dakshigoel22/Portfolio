#!/usr/bin/env node
// Local test for the chat API — runs without Vercel dev server

const fs = require("fs");
const path = require("path");

// Load .env manually
const envFile = path.join(__dirname, ".env");
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, "utf8")
    .split("\n")
    .forEach((line) => {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    });
}

const GROQ_KEY = process.env.GROQ_API_KEY;
const HF_KEY = process.env.HUGGINGFACE_API_KEY;

async function testGroq() {
  console.log("\n--- Test 1: Groq API (llama-3.3-70b-versatile) ---");
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a test assistant. Be very brief." },
        { role: "user", content: "Say OK in one word." },
      ],
      max_tokens: 10,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("FAIL — Groq error:", JSON.stringify(data));
    return false;
  }
  console.log("PASS — Reply:", data.choices?.[0]?.message?.content);
  return true;
}

async function testHuggingFace() {
  console.log("\n--- Test 2: HuggingFace Embeddings ---");
  const model = "sentence-transformers/all-MiniLM-L6-v2";
  const url = `https://router.huggingface.co/hf-inference/models/${model}/pipeline/feature-extraction`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: "test query", options: { wait_for_model: true } }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("FAIL — HF error:", JSON.stringify(data));
    return false;
  }
  const embedding = Array.isArray(data[0]) ? data[0] : data;
  console.log(`PASS — Embedding dim: ${embedding.length}`);
  return true;
}

async function testFullPipeline() {
  console.log("\n--- Test 3: Full /api/chat logic ---");

  // Simulate what the handler does
  const message = "What is Dakshi's GPA?";
  const systemPrompt = `You are DAKSHI AI. Answer based only on:
- MS Data Science at UMD, 4.0 GPA
- B.Tech EE + CS from IIT Jammu (2024)
Be concise.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 100,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("FAIL:", JSON.stringify(data));
    return false;
  }
  console.log(`PASS — Q: "${message}"`);
  console.log(`       A: ${data.choices?.[0]?.message?.content}`);
  return true;
}

(async () => {
  console.log("Keys loaded:");
  console.log("  GROQ_API_KEY:", GROQ_KEY ? `${GROQ_KEY.slice(0, 8)}...` : "MISSING");
  console.log("  HUGGINGFACE_API_KEY:", HF_KEY ? `${HF_KEY.slice(0, 8)}...` : "MISSING");

  const results = [];
  results.push(await testGroq());
  results.push(await testHuggingFace());
  results.push(await testFullPipeline());

  console.log("\n=== Summary ===");
  console.log(`Passed: ${results.filter(Boolean).length}/${results.length}`);
  if (results.some((r) => !r)) process.exit(1);
})();
