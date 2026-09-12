import Reveal from "./Reveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <Reveal as="div" className="footer-brand">
          <p className="logo">Noshal<span>.</span></p>
          <p className="footer-tagline">
            Flutter Developer, AI Engineer &amp; Junior Full-Stack Developer —
            building mobile apps, AI tools, and full-stack products.
          </p>
          <p className="footer-status">
            <span className="footer-status-dot" /> status: open_to_work
          </p>
        </Reveal>

        <Reveal as="div" className="footer-col" style={{ transitionDelay: "100ms" }}>
          <p className="footer-col-title">// Quick Links</p>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#github">GitHub</a>
          <a href="#projects">Projects</a>
          <a href="#certificates">Certificates</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </Reveal>

        <Reveal as="div" className="footer-col" style={{ transitionDelay: "200ms" }}>
          <p className="footer-col-title">// Connect</p>
          <a href="mailto:noshalfatima28@gmail.com">noshalfatima28@gmail.com</a>
          <a href="tel:03404005981">03404005981</a>
          <a href="https://github.com/NoshalFatima" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/noshal-fatima" target="_blank" rel="noreferrer">LinkedIn</a>
        </Reveal>

        <Reveal as="div" className="footer-col footer-cta-col" style={{ transitionDelay: "300ms" }}>
          <p className="footer-col-title">// Let's Build Something</p>
          <p className="footer-cta-text">Have a role, project, or idea in mind?</p>
          <a href="#contact" className="footer-cta-btn">Get In Touch</a>
        </Reveal>
      </div>

      <div className="footer-bottom">
        <p>© {year} Noshal Fatima. Designed &amp; built with React, Node.js &amp; Firebase.</p>
        <a href="#home" className="back-to-top" aria-label="Back to top">↑ Back to top</a>
      </div>
    </footer>
  );
}