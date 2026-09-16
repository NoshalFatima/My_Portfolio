export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="logo">Noshal<span>.</span></a>

      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#certificates">Certificates</a>
        <a href="#contact">Contact</a>
        <a className="cv-btn" href="/assets/Noshal-Fatima-CV.pdf" download>
          Download CV
        </a>
      </div>
    </nav>
  );
}