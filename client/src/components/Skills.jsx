import { useEffect, useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("https://myportfolio-b54v.onrender.com/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch(() => setSkills([]));
  }, []);

  return (
    <section id="skills">
      <p className="section-label">Skills</p>
      <h2>Technical Stack</h2>

      <div className="chips">
        {skills.map((skill) => (
          <span key={skill._id}>{skill.name}</span>
        ))}
      </div>
    </section>
  );
}