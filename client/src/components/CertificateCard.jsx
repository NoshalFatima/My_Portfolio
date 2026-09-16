import { useState } from "react";

export default function CertificateCard({ cert }) {
  const [flipped, setFlipped] = useState(false);

  function toggle() {
    setFlipped((f) => !f);
  }

  return (
    <div
      className="cert-flip"
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className={`cert-flip-inner ${flipped ? "is-flipped" : ""}`}>
        <div className="cert-face cert-face-front glow-border">
          <img className="cert-img" src={cert.imageUrl} alt={`${cert.name} certificate`} />
          <h3>{cert.name}</h3>
          <p className="muted">{cert.issuer}</p>
          <span className="cert-flip-hint">Tap to see details ↻</span>
        </div>

        <div className="cert-face cert-face-back">
          <h3>{cert.name}</h3>
          <p>{cert.issuer}</p>
          <p className="muted">{cert.date}</p>
          <a
            className="project-link"
            href={cert.certificateUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            View Certificate
          </a>
          <span className="cert-flip-hint">Tap to flip back ↻</span>
        </div>
      </div>
    </div>
  );
}