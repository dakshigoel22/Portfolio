#!/usr/bin/env node
/**
 * node scripts/embed-docs.js
 *
 * Reads all docs/*.md files, splits into ~300-word chunks with 50-word overlap,
 * embeds each chunk via HuggingFace Inference API (all-MiniLM-L6-v2),
 * and writes src/data/embeddings.json.
 *
 * Prerequisites:
 *   - HUGGINGFACE_API_KEY set in .env.local or environment
 *   - npm install dotenv (or pass key directly)
 *
 * Run: node scripts/embed-docs.js
 * Re-run whenever docs/*.md content changes, then commit embeddings.json.
 */

const fs = require("fs");
const path = require("path");

// Load .env.local if present
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) {
      process.env[key.trim()] = rest.join("=").trim().replace(/^["']|["']$/g, "");
    }
  }
}

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
if (!HF_API_KEY) {
  console.error("Error: HUGGINGFACE_API_KEY not set. Add it to .env.local or your environment.");
  process.exit(1);
}

const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const HF_URL = `https://api-inference.huggingface.co/pipeline/feature-extraction/${HF_MODEL}`;

const DOCS_DIR = path.join(__dirname, "..", "docs");
const OUT_FILE = path.join(__dirname, "..", "src", "data", "embeddings.json");

const CHUNK_WORDS = 300;
const OVERLAP_WORDS = 50;
const BATCH_SIZE = 10;

/** Split text into overlapping word-boundary chunks */
function chunkText(text, chunkWords = CHUNK_WORDS, overlapWords = OVERLAP_WORDS) {
  // Normalize whitespace and split into words
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const chunks = [];
  let start = 0;

  while (start < words.length) {
    const end = Math.min(start + chunkWords, words.length);
    const chunkWords_ = words.slice(start, end);

    // Try to end on a sentence boundary (period, !, ?) within last 30 words
    let cutEnd = end;
    for (let i = end - 1; i >= Math.max(start, end - 30); i--) {
      if (/[.!?]$/.test(words[i])) {
        cutEnd = i + 1;
        break;
      }
    }

    chunks.push(words.slice(start, cutEnd).join(" "));
    if (cutEnd >= words.length) break;
    start = Math.max(start + 1, cutEnd - overlapWords);
  }

  return chunks.filter((c) => c.trim().length > 50);
}

/** Call HuggingFace Inference API to get embeddings for a batch of texts */
async function embedBatch(texts) {
  const response = await fetch(HF_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: texts, options: { wait_for_model: true } }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HF API error ${response.status}: ${err}`);
  }

  const result = await response.json();

  // HF feature-extraction returns either [[...embedding...], ...] or [...embedding...]
  // For batched inputs it returns an array of embeddings
  if (Array.isArray(result) && Array.isArray(result[0])) {
    // Could be [[emb1], [emb2]] or [[[token_emb,...], ...], ...] (token-level)
    // all-MiniLM-L6-v2 returns sentence-level: [[float, ...], ...]
    if (typeof result[0][0] === "number") {
      // Single text case — wrap in array
      return [result];
    }
    // Check if it's token-level embeddings (3D array)
    if (Array.isArray(result[0][0])) {
      // Mean pool over tokens for each text
      return result.map((tokenEmbs) => {
        const dim = tokenEmbs[0].length;
        const mean = new Array(dim).fill(0);
        for (const tok of tokenEmbs) tok.forEach((v, i) => (mean[i] += v));
        return mean.map((v) => v / tokenEmbs.length);
      });
    }
    return result; // Already [embedding, ...]
  }

  throw new Error("Unexpected HF API response shape: " + JSON.stringify(result).slice(0, 200));
}

/** Sleep helper for rate limit back-off */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  // 1. Read all docs/*.md
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`docs/ directory not found at ${DOCS_DIR}`);
    process.exit(1);
  }

  const mdFiles = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md"));
  if (mdFiles.length === 0) {
    console.error("No .md files found in docs/");
    process.exit(1);
  }

  console.log(`Found ${mdFiles.length} doc files: ${mdFiles.join(", ")}`);

  // 2. Chunk all files
  const allChunks = [];
  for (const file of mdFiles) {
    const source = path.basename(file, ".md");
    const text = fs.readFileSync(path.join(DOCS_DIR, file), "utf8");
    const chunks = chunkText(text);
    console.log(`  ${file}: ${chunks.length} chunks`);
    chunks.forEach((chunk, i) => {
      allChunks.push({ id: `${source}_${i}`, source, text: chunk });
    });
  }

  console.log(`\nTotal chunks: ${allChunks.length}`);
  console.log("Embedding via HuggingFace API...\n");

  // 3. Embed in batches
  const results = [];
  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map((c) => c.text);

    let attempts = 0;
    let embeddings;
    while (attempts < 3) {
      try {
        embeddings = await embedBatch(texts);
        break;
      } catch (err) {
        attempts++;
        if (attempts === 3) throw err;
        console.warn(`  Batch ${i / BATCH_SIZE + 1} failed (attempt ${attempts}): ${err.message}. Retrying in 5s...`);
        await sleep(5000);
      }
    }

    batch.forEach((chunk, j) => {
      results.push({ ...chunk, embedding: embeddings[j] });
    });

    const done = Math.min(i + BATCH_SIZE, allChunks.length);
    process.stdout.write(`  [${done}/${allChunks.length}] chunks embedded\r`);

    // Respect free tier rate limits
    if (i + BATCH_SIZE < allChunks.length) await sleep(500);
  }

  console.log("\n");

  // 4. Validate embeddings
  const dim = results[0]?.embedding?.length;
  console.log(`Embedding dimension: ${dim}`);
  if (!dim || dim < 10) {
    console.error("Unexpected embedding dimension. Check HF API response.");
    process.exit(1);
  }

  // 5. Write output
  const outDir = path.dirname(OUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2));

  const sizeKB = Math.round(fs.statSync(OUT_FILE).size / 1024);
  console.log(`Written: ${OUT_FILE} (${sizeKB} KB, ${results.length} chunks)`);
  console.log("\nDone! Commit src/data/embeddings.json to enable RAG.");
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
