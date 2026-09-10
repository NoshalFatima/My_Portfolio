import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import portfolioRoutes from "./routes/portfolioRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error.message));

app.get("/", (req, res) => {
  res.send("Portfolio backend is running");
});

app.use("/api", portfolioRoutes);

app.post("/api/contact", async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      message: "Please fill name, email, subject, and message."
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Noshal Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Message: ${subject}`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone || "Not provided"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Message could not be sent. Check email settings."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});