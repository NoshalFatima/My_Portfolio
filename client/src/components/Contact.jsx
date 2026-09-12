import { useState } from "react";
import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const { ref: formRef, onMouseMove, onMouseLeave } = useTilt({ maxTilt: 3, scale: 1.005 });

  function updateForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function sendMessage(e) {
    e.preventDefault();
    setStatus("> transmitting_message...");

    try {
      const response = await fetch("https://myportfolio-b54v.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      setStatus(`> ${data.message}`);

      if (response.ok) {
        setForm({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: ""
        });
      }
    } catch {
      setStatus("> connection_failed :: backend server is not running.");
    }
  }

  return (
    <section id="contact">
      <Reveal as="p" className="section-label">Contact</Reveal>
      <Reveal as="h2" style={{ transitionDelay: "80ms" }}>
        Initialize Transmission<span className="term-cursor">_</span>
      </Reveal>

      <div className="contact-layout">
        <div className="contact-info terminal-lines">
          <Reveal as="p" className="term-line" style={{ transitionDelay: "180ms" }}>
            <span className="term-prompt">$</span> status --check
            <br />
            <span className="term-muted">// actively looking for junior developer roles &amp; collaborative projects</span>
          </Reveal>
          <Reveal as="p" className="term-line" style={{ transitionDelay: "260ms" }}>
            <span className="term-prompt">$</span> contact --email
            <br />
            <a href="mailto:noshalfatima28@gmail.com">noshalfatima28@gmail.com</a>
          </Reveal>
          <Reveal as="p" className="term-line" style={{ transitionDelay: "340ms" }}>
            <span className="term-prompt">$</span> contact --phone
            <br />
            <a href="tel:03404005981">03404005981</a>
          </Reveal>
          <Reveal as="p" className="term-line" style={{ transitionDelay: "420ms" }}>
            <span className="term-prompt">$</span> social --links
            <br />
            <a href="https://github.com/NoshalFatima" target="_blank" rel="noreferrer">GitHub</a>
            {" "}/{" "}
            <a href="https://linkedin.com/in/noshal-fatima" target="_blank" rel="noreferrer">LinkedIn</a>
          </Reveal>
        </div>

        <Reveal as="div" style={{ transitionDelay: "260ms" }}>
          <div className="terminal-panel" ref={formRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
            <div className="terminal-titlebar">
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span className="terminal-titletext">contact@noshal:~$</span>
            </div>

            <form onSubmit={sendMessage} className="terminal-form">
              <label className="term-field-label">&gt; name</label>
              <input name="name" placeholder="your name" value={form.name} onChange={updateForm} required />

              <label className="term-field-label">&gt; phone (optional)</label>
              <input name="phone" placeholder="phone number" value={form.phone} onChange={updateForm} />

              <label className="term-field-label">&gt; email</label>
              <input name="email" type="email" placeholder="email address" value={form.email} onChange={updateForm} required />

              <label className="term-field-label">&gt; subject</label>
              <input name="subject" placeholder="subject" value={form.subject} onChange={updateForm} required />

              <label className="term-field-label">&gt; message</label>
              <textarea name="message" placeholder="type your message..." value={form.message} onChange={updateForm} required />

              <button type="submit">EXECUTE_TRANSMIT()</button>
              {status && <p className="form-status">{status}</p>}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}