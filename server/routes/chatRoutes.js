import express from "express";
import Faq from "../models/Faq.js";
import Inquiry from "../models/Inquiry.js";
import { embedText, cosineSimilarity } from "../utils/embeddings.js";

const router = express.Router();

const SYSTEM_PROMPT = `You are the AI assistant on Noshal Fatima's portfolio website. You represent Noshal
professionally, warmly, and confidently — you speak on her behalf, not as a generic bot.

CONTEXT & INTENT MATCHING:
- You will be provided with relevant Q&A pairs retrieved from Noshal's FAQ database.
- UNDERSTAND INTENT: Users may rephrase questions (e.g., asking "who is noshal", "tell me about yourself", or "who created this website"). Always connect their intent to the most relevant information in the retrieved FAQ context.
- Do not invent fake facts, projects, or experience that are completely absent from the context, but DO synthesize and rephrase available context to answer general questions intelligently.

BEHAVIOR RULES:
1. Answer naturally and conversationally in your own words based on the retrieved context — never just copy FAQ text word-for-word.
2. If the user asks a question that cannot be answered or inferred from the context at all, politely let them know and direct them to email Noshal directly at noshalfatima28@gmail.com.
3. Keep responses concise (2-4 sentences) unless the user asks for in-depth details.
4. Match the user's tone and language style — if they write in Roman Urdu/Hinglish, respond in a natural mixed style; if in English, respond in English.
5.Text is clear dont used any  additional stars.
6.if they ask about project confirm from them web project,mobile app or AI or All 
7.Answer like u are assiatant and u provide details about her skills, projects, and experience. You are not Noshal herself, but you are her AI assistant
8.if ask anything about pricing response this Pricing depends on the project scope and requirements. Share some details about what you need and Noshal will get back to you with a quote.
SERVICE INQUIRY FLOW:
If the user expresses interest in hiring Noshal, starting a project, or asks about her services (AI chatbots, web development, app development), switch into inquiry mode:
- Ask for these details one or two at a time, conversationally: service type, project description, budget range (optional), timeline, client name, and contact details (email/phone).
- Once you have enough details, summarize them back to the user for confirmation.
- After the user confirms, output ONLY this JSON block (nothing else in that message):
  {
    "action": "service_inquiry",
    "service_type": "...",
    "description": "...",
    "budget": "...",
    "timeline": "...",
    "client_name": "...",
    "contact": "..."
  }
- Immediately after, in your NEXT message, inform the user that their request has been noted, Noshal will personally review and reach out, and they can also email her directly at noshalfatima28@gmail.com for a faster response.
- Never confirm pricing, availability, or timelines yourself — always mention it is pending Noshal's confirmation.

BOUNDARIES:
- Never make commitments on Noshal's behalf (pricing, deadlines, availability).
- Never discuss topics unrelated to Noshal's portfolio, skills, or services.
- Stay professional, friendly, and helpful at all times.`;

const TOP_K = 6;

function extractServiceInquiry(text) {
  const trimmed = text.trim();
  const candidates = [trimmed];

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) candidates.push(fenced[1].trim());

  const braceMatch = trimmed.match(/\{[\s\S]*\}/);
  if (braceMatch) candidates.push(braceMatch[0]);

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed && parsed.action === "service_inquiry") return parsed;
    } catch {
      // not valid JSON, try the next candidate
    }
  }
  return null;
}

router.post("/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ reply: "Please type a message." });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set in .env");
      return res.status(500).json({ reply: "Chat is temporarily unavailable. Please try again later." });
    }

    // 1. Embed the incoming message locally.
    const queryEmbedding = await embedText(message);

    // 2. Retrieve the most relevant FAQ entries via cosine similarity.
    const allFaqs = await Faq.find({}, { question: 1, answer: 1, category: 1, embedding: 1 });

    const ranked = allFaqs
      .map((faq) => ({
        faq,
        score: cosineSimilarity(queryEmbedding, faq.embedding)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    const contextBlock = ranked
      .map(
        ({ faq }, i) =>
          `[${i + 1}] Category: ${faq.category}\nQ: ${faq.question}\nA: ${faq.answer}`
      )
      .join("\n\n");

    // 3. Build the Groq message list.
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory
        .filter((m) => m && m.role && m.content)
        .map((m) => ({ role: m.role, content: m.content })),
      {
        role: "system",
        content: `Relevant context retrieved from the FAQ database for this question:\n\n${contextBlock || "(no strong matches found)"}`
      },
      { role: "user", content: message }
    ];

    // 4. Call Groq with standard supported model ID.
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b", // ✅ Fixed Model Name
        messages,
        temperature: 0.4
      })
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error("Groq API error:", groqResponse.status, errText);
      return res.status(500).json({ reply: "Sorry, something went wrong on my end. Please try again." });
    }

    const groqData = await groqResponse.json();
    const rawReply = groqData.choices?.[0]?.message?.content || "";

    // 5. Check for service inquiry JSON response.
    const inquiry = extractServiceInquiry(rawReply);

    if (inquiry) {
      await Inquiry.create({
        service_type: inquiry.service_type || "Not specified",
        description: inquiry.description || "",
        budget: inquiry.budget || "",
        timeline: inquiry.timeline || "",
        client_name: inquiry.client_name || "Not provided",
        contact: inquiry.contact || "",
        status: "pending"
      });

      return res.json({
        reply:
          "Thanks  I've noted your request! Noshal will personally review it and reach out to confirm the details. " +
          "For a faster response, you can also email her directly at noshalfatima28@gmail.com."
      });
    }

    // 6. Normal reply.
    res.json({ reply: rawReply });
  } catch (error) {
    console.error("Chat route error:", error);
    res.status(500).json({ reply: "Something went wrong. Please try again in a moment." });
  }
});

export default router;