import { useEffect, useState } from "react";
import ProjectCard from "./projectcard";
import Reveal from "./Reveal";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://myportfolio-b54v.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => {
        // Show "Campus Pulse" first, keep everything else in its original order.
        const sorted = [...data];
        const idx = sorted.findIndex((p) => p.title?.toLowerCase().includes("campus pulse"));
        if (idx > 0) {
          const [item] = sorted.splice(idx, 1);
          sorted.unshift(item);
        }
        setProjects(sorted);
      })
      .catch(() => setProjects([]));
  }, []);

  return (
    <section id="projects">
      <p className="section-label">Projects</p>
      <h2>Featured Work</h2>

      <div className="project-list">
        {projects.map((project, i) => (
          <Reveal
            as="div"
            key={project._id}
            style={{ transitionDelay: `${Math.min(i * 180, 720)}ms` }}
          >
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}