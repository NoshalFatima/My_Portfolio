import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    imageUrl: { type: String, required: true },
    certificateUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);