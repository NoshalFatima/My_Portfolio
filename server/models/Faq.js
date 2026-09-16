import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    embedding: { type: [Number], required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Faq", faqSchema);