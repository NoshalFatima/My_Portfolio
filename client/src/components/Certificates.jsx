import { useEffect, useState } from "react";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch("https://myportfolio-b54v.onrender.com/api/certificates")
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch(() => setCertificates([]));
  }, []);

  return (
    <section id="certificates">
      <p className="section-label">Certificates</p>
      <h2>Certifications & Achievements</h2>

      <div className="grid">
        {certificates.map((cert) => (
          <article className="card cert-card" key={cert._id}>
            <img className="cert-img" src={cert.imageUrl} alt={`${cert.name} certificate`} />
            <h3>{cert.name}</h3>
            <p>{cert.issuer}</p>
            <p className="muted">{cert.date}</p>
            <a className="project-link" href={cert.certificateUrl} target="_blank">
              View Certificate
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}