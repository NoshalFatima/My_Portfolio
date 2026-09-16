import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    service_type: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: String, default: "" },
    timeline: { type: String, default: "" },
    client_name: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);