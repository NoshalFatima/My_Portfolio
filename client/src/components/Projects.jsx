import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://myportfolio-b54v.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  return (
    <section id="projects">
      <p className="section-label">Projects</p>
      <h2>Featured Work</h2>

      <div className="grid">
        {projects.map((project) => (
          <article className="card project-card" key={project._id}>
            <p className="muted">{project.type}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="mini-chips">
              {project.stack?.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <a className="project-link" href={project.link} target="_blank">
              View Project
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}