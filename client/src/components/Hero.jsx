import { useCallback, useRef, useState } from "react";
import heroVideo from "../assets/hero-loop.mp4";

// Splits text into individual letters (grouped by word so a word never breaks
// mid-letter across lines), each animating in with its own staggered delay —
// a one-time 3D "flip open" moment when the hero first loads.
function AnimatedLetters({ text, startDelay = 0 }) {
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <>
      {words.map((word, wi) => (
        <span className="letter-word" key={wi}>
          {word.split("").map((char, ci) => {
            const delay = startDelay + letterIndex * 0.035;
            letterIndex += 1;
            return (
              <span key={ci} className="letter-in" style={{ animationDelay: `${delay}s` }}>
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const sceneRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  // Moves the background grid / orbs opposite the cursor for a subtle parallax feel.
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
      className="hero hero-video-bg"
      ref={sceneRef}
      onMouseMove={onSceneMouseMove}
      onMouseLeave={onSceneMouseLeave}
    >
      <video
        className={`hero-bg-video ${videoReady ? "is-ready" : ""}`}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setVideoReady(true)}
      />
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-layout hero-layout-single">
        <div className="hero-content">
          <p className="eyebrow">Open to junior developer roles</p>

          <h1><AnimatedLetters text="Noshal Fatima" /></h1>
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
      </div>
    </main>
  );
}