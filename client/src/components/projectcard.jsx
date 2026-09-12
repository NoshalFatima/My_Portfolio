import { useState } from "react";
import useTilt from "../hooks/useTilt";
import useCountUp from "../hooks/useCountUp";

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt({ maxTilt: 8, scale: 1.02 });
  const isReversed = index % 2 === 1;

  const techCount = project.stack?.length || 0;
  const { ref: countRef, value: techValue } = useCountUp(techCount, { duration: 1000 });

  return (
    <div className={`project-row ${isReversed ? "project-row-reverse" : ""}`}>
      <div
        className="project-row-visual glow-border"
        ref={(node) => {
          tiltRef.current = node;
          countRef.current = node;
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <span className="project-row-number">{String(index + 1).padStart(2, "0")}</span>

        <div className="project-row-stat">
          <span className="project-row-stat-value">{techValue}</span>
          <span className="project-row-stat-label">Technologies Used</span>
        </div>

        <span className="project-row-type">{project.type}</span>
      </div>

      <div className="project-row-info">
        <button
          type="button"
          className="project-row-header"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <h3>{project.title}</h3>
          <span className={`project-row-toggle ${expanded ? "is-open" : ""}`}>+</span>
        </button>

        <div className={`project-row-details ${expanded ? "is-open" : ""}`}>
          <p>{project.description}</p>

          <div className="mini-chips">
            {project.stack?.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
            View Project
          </a>
        </div>
      </div>
    </div>
  );
}