import { pipeline } from "@xenova/transformers";

let embedderPromise = null;

function getEmbedder() {
  if (!embedderPromise) {
    embedderPromise = pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedderPromise;
}

/**
 * Returns a plain JS array (float embedding) for the given text.
 */
export async function embedText(text) {
  const embedder = await getEmbedder();
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

/**
 * Pre-loads model into memory on server start to avoid cold-start timeouts.
 */
export async function warmupModel() {
  try {
    console.log("Loading AI Embedding Model into memory...");
    await embedText("warmup initialization");
    console.log("✅ AI Model warm and ready in RAM!");
  } catch (error) {
    console.error("❌ Failed to warm up AI model:", error);
  }
}

/**
 * Standard cosine similarity between two equal-length vectors.
 */
export function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}