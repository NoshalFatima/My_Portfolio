import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";
import profilePic from "../assets/profiles.jpeg";

export default function About() {
  const { ref, onMouseMove, onMouseLeave } = useTilt({ maxTilt: 12, scale: 1.03 });

  return (
    <section id="about">
      <Reveal as="p" className="section-label">About</Reveal>
      <Reveal as="h2" style={{ transitionDelay: "80ms" }}>Profile Summary</Reveal>

      <div className="about-layout">
        <Reveal as="div" style={{ transitionDelay: "160ms" }}>
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
        </Reveal>

        <div className="about-text">
          <Reveal as="p" style={{ transitionDelay: "260ms" }}>
            I am Noshal Fatima, a BS Computer Science student at the University of
            Punjab, graduating in 2026 with a 3.44 CGPA.
          </Reveal>
          <Reveal as="p" style={{ transitionDelay: "340ms" }}>
            I build Flutter mobile apps, Firebase systems, AI tools, RAG applications,
            Laravel backends, and MERN stack web applications.
          </Reveal>

          <Reveal as="div" className="about-badges" style={{ transitionDelay: "420ms" }}>
            <span className="about-badge">🎓 Graduating 2026</span>
            <span className="about-badge">📊 3.44 CGPA</span>
            <span className="about-badge">💻 Full-Stack &amp; AI</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}