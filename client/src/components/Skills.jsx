import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";

// Keyword map used to sort each skill into a category. Add more keywords any
// time — anything that doesn't match falls into "Tools & Others" automatically.
const CATEGORIES = [
  { label: "Frontend", keywords: ["react", "next", "vue", "angular", "html", "css", "javascript", "typescript", "tailwind", "bootstrap", "redux"] },
  { label: "Mobile", keywords: ["flutter", "dart", "android", "kotlin", "swift", "react native", "ios"] },
  { label: "Backend", keywords: ["node", "express", "laravel", "php", "django", "flask", "spring", "java", "python", ".net", "c#"] },
  { label: "Database", keywords: ["mongodb", "mysql", "postgres", "firebase", "sql", "sqlite", "redis"] },
  { label: "AI & Data", keywords: ["ai", "machine learning", " ml", "nlp", "rag", "tensorflow", "pytorch", "langchain", "openai", "llm", "data"] },
];

function categoryFor(name = "") {
  const lower = ` ${name.toLowerCase()} `;
  const match = CATEGORIES.find((cat) => cat.keywords.some((k) => lower.includes(k)));
  return match ? match.label : "Tools & Others";
}

function initialsFor(name = "") {
  const clean = name.trim();
  if (!clean) return "??";
  const words = clean.split(/\s+/);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}

function hueFor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
}

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("https://myportfolio-b54v.onrender.com/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch(() => setSkills([]));
  }, []);

  // Group skills by category, keep only categories that actually have skills in them.
  const grouped = useMemo(() => {
    const map = new Map();
    skills.forEach((skill) => {
      const cat = categoryFor(skill.name);
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(skill);
    });
    return Array.from(map.entries());
  }, [skills]);

  return (
    <section id="skills">
      <p className="section-label">Skills</p>
      <h2>Technical Stack</h2>

      {grouped.map(([category, items], laneIndex) => (
        <Reveal
          as="div"
          className="skills-category"
          key={category}
          style={{ transitionDelay: `${laneIndex * 150}ms` }}
        >
          <p className="skills-category-label">{category}</p>

          <div className={`skills-lane ${laneIndex % 2 === 1 ? "skills-lane-reverse" : ""}`}>
            <div className="skills-track">
              {[...items, ...items].map((skill, i) => (
                <span
                  className="skill-badge"
                  key={`${skill._id}-${i}`}
                  style={{ animationDelay: `${(i % 8) * 0.15}s` }}
                >
                  <span className="skill-avatar" style={{ "--hue": hueFor(skill.name) }}>
                    {initialsFor(skill.name)}
                  </span>
                  <span className="skill-name">{skill.name}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}