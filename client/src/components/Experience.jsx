import { useEffect, useState } from "react";

export default function Experience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch("https://myportfolio-b54v.onrender.com/api/experience")
      .then((res) => res.json())
      .then((data) => setExperience(data))
      .catch(() => setExperience([]));
  }, []);

  return (
    <section id="experience">
      <p className="section-label">Experience</p>
      <h2>Work & Education</h2>

      {experience.map((item) => (
        <article className="card" key={item._id}>
          <h3>{item.role}</h3>
          <p className="muted">{item.organization} | {item.period}</p>
          <ul>
            {item.points?.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}