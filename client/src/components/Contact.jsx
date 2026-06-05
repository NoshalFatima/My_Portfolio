import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  function updateForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function sendMessage(e) {
    e.preventDefault();
    setStatus("Sending message...");

    try {
  // Poora Render ka URL laga dein taake request seedha backend par jaye
  const response = await fetch("https://myportfolio-b54v.onrender.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

      const data = await response.json();
      setStatus(data.message);

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
      setStatus("Backend server is not running.");
    }
  }

  return (
    <section id="contact">
      <p className="section-label">Contact</p>
      <h2>Let’s Work Together</h2>

      <div className="contact-layout">
        <div className="contact-info">
          <p>
            I am actively looking for , junior developer
            roles, and collaborative projects.
          </p>
          <a href="mailto:noshalfatima28@gmail.com">noshalfatima28@gmail.com</a>
          <a href="tel:03404005981">03404005981</a>
          <a href="https://github.com/NoshalFatima" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/noshal-fatima" target="_blank">LinkedIn</a>
        </div>

        <form onSubmit={sendMessage}>
          <input name="name" placeholder="Your name" value={form.name} onChange={updateForm} required />
          <input name="phone" placeholder="Phone number" value={form.phone} onChange={updateForm} />
          <input name="email" type="email" placeholder="Email address" value={form.email} onChange={updateForm} required />
          <input name="subject" placeholder="Subject" value={form.subject} onChange={updateForm} required />
          <textarea name="message" placeholder="Message" value={form.message} onChange={updateForm} required />
          <button type="submit">Send Message</button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}