import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    stack: [{ type: String }],
    link: { type: String },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);