import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";
import profilePic from "../assets/profiles.jpeg";

export default function About() {
  const { ref, onMouseMove, onMouseLeave } = useTilt({ maxTilt: 12, scale: 1.03 });

  return (
    <Reveal as="section" id="about">
      <p className="section-label">About</p>
      <h2>Profile Summary</h2>

      <div className="about-layout">
        <div className="about-photo-idle">
          <div
            className="framed-photo glow-border"
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <span className="framed-photo-glow" aria-hidden="true" />
            <span className="corner corner-tl" aria-hidden="true" />
            <span className="corner corner-tr" aria-hidden="true" />
            <span className="corner corner-bl" aria-hidden="true" />
            <span className="corner corner-br" aria-hidden="true" />
            <img src={profilePic} alt="Noshal Fatima" />
          </div>
        </div>

        <div className="about-text">
          <p>
            I am Noshal Fatima, a BS Computer Science student at the University of
            Punjab, graduating in 2026 with a 3.44 CGPA.
          </p>
          <p>
            I build Flutter mobile apps, Firebase systems, AI tools, RAG applications,
            Laravel backends, and MERN stack web applications.
          </p>

          <div className="about-badges">
            <span className="about-badge">🎓 Graduating 2026</span>
            <span className="about-badge">📊 3.44 CGPA</span>
            <span className="about-badge">💻 Full-Stack &amp; AI</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}