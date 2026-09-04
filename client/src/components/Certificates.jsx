import { useEffect, useState } from "react";
import CertificateCard from "./CertificateCard";
import Reveal from "./Reveal";

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
        {certificates.map((cert, i) => (
          <Reveal
            as="div"
            key={cert._id}
            style={{ transitionDelay: `${Math.min(i * 60, 300)}ms` }}
          >
            <CertificateCard cert={cert} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}