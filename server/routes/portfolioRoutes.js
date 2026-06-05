import express from "express";
import Project from "../models/Project.js";
import Certificate from "../models/Certificate.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";

const router = express.Router();

router.get("/projects", async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
  res.json(projects);
});

router.get("/certificates", async (req, res) => {
  const certificates = await Certificate.find().sort({ createdAt: -1 });
  res.json(certificates);
});

router.get("/skills", async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, name: 1 });
  res.json(skills);
});

router.get("/experience", async (req, res) => {
  const experience = await Experience.find().sort({ createdAt: -1 });
  res.json(experience);
});

export default router;