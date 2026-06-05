export default function Hero() {
  return (
    <main id="home" className="hero">
      <div className="hero-content">
        <p className="eyebrow">Open to junior developer roles</p>

        <div className="hero-profile">
          <img src="/assets/profile.jpg" alt="Noshal Fatima" />
          <div>
            <strong>Noshal Fatima</strong>
            <span>Flutter Developer | AI Engineer</span>
          </div>
        </div>

        <h1>Noshal Fatima</h1>
        <h2>Flutter Developer, AI Engineer & Junior Full-Stack Developer</h2>

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