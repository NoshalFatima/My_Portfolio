import { useCallback, useRef } from "react";
import useTilt from "../hooks/useTilt";
import profilePic from "../assets/profiles.jpeg";

export default function Hero() {
  const sceneRef = useRef(null);
  const { ref: profileRef, onMouseMove: tiltProfile, onMouseLeave: untiltProfile } = useTilt({
    maxTilt: 8,
    scale: 1.03
  });

  // Moves the background orbs opposite to the cursor for a subtle depth-parallax feel.
  const onSceneMouseMove = useCallback((e) => {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", px.toFixed(3));
    el.style.setProperty("--py", py.toFixed(3));
  }, []);

  const onSceneMouseLeave = useCallback(() => {
    const el = sceneRef.current;
    if (!el) return;
    el.style.setProperty("--px", 0);
    el.style.setProperty("--py", 0);
  }, []);

  return (
    <main
      id="home"
      className="hero"
      ref={sceneRef}
      onMouseMove={onSceneMouseMove}
      onMouseLeave={onSceneMouseLeave}
    >
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content">
        <p className="eyebrow">Open to junior developer roles</p>

        <div
          className="hero-profile"
          ref={profileRef}
          onMouseMove={tiltProfile}
          onMouseLeave={untiltProfile}
        >
          <span className="hero-profile-ring">
            <img src={profilePic} alt="Noshal Fatima" />
          </span>
          <div>
            <strong>Noshal Fatima</strong>
            <span>Flutter Developer | AI Engineer</span>
          </div>
        </div>

        <h1>Noshal Fatima</h1>
        <h2>Flutter Developer, AI Engineer &amp; Junior Full-Stack Developer</h2>

        <p>
          I build mobile apps, AI tools, and full-stack web products using Flutter,
          Firebase, Laravel, Python, React, and Node.js.
        </p>

        <div className="hero-actions">
          <a href="/assets/Noshal-Fatima-CV.pdf" download>Download CV</a>
          <a href="#contact" className="outline">Hire Me</a>
          <a href="#projects" className="outline">View Projects</a>
        </div>
      </div>
    </main>
  );
}