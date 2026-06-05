import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    organization: { type: String, required: true },
    period: { type: String, required: true },
    type: { type: String, default: "Experience" },
    points: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);