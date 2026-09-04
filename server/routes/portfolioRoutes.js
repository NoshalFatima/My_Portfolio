import express from "express";
import Project from "../models/Project.js";
import Certificate from "../models/Certificate.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";

const router = express.Router();

// Projects (Sort by custom order)
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Certificates (Sort by custom order)
router.get("/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Skills (Sort by custom order)
router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Experience (Sort by custom order)
router.get("/experience", async (req, res) => {
  try {
    const experience = await Experience.find().sort({ order: 1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;