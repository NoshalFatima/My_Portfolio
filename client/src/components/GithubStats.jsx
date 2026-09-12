import { useState } from "react";
import Reveal from "./Reveal";

// Change this if your GitHub username is different from the one already
// linked in Contact.jsx / Footer.jsx.
const GITHUB_USERNAME = "NoshalFatima";

// github-readme-stats.vercel.app (the original free service) is well known
// to hit rate limits / downtime — see anuraghazra/github-readme-stats#4680,
// #4748, #4666. Its maintainers now point people to this actively-maintained,
// fully compatible successor instead, which is far more reliable:
const STATS_BASE = "https://github-stats-extended.vercel.app";
const STREAK_BASE = "https://github-readme-streak-stats.herokuapp.com";

const THEME = {
  bg: "00000000", // transparent — sits on the site's own dark background
  title: "f2b705",
  text: "f5f4ef",
  icon: "f2b705"
};

const statsUrl =
  `${STATS_BASE}/api?username=${GITHUB_USERNAME}` +
  `&show_icons=true&hide_border=true&bg_color=${THEME.bg}` +
  `&title_color=${THEME.title}&text_color=${THEME.text}&icon_color=${THEME.icon}`;

const langsUrl =
  `${STATS_BASE}/api/top-langs/?username=${GITHUB_USERNAME}` +
  `&layout=compact&hide_border=true&bg_color=${THEME.bg}` +
  `&title_color=${THEME.title}&text_color=${THEME.text}`;

const streakUrl =
  `${STREAK_BASE}/?user=${GITHUB_USERNAME}` +
  `&hide_border=true&background=${THEME.bg}&ring=${THEME.title}&fire=${THEME.title}` +
  `&currStreakLabel=${THEME.title}&sideLabels=${THEME.text}&currStreakNum=${THEME.text}` +
  `&sideNums=${THEME.text}&dates=${THEME.text}`;

// A card that gracefully falls back to a simple link if the stats image
// service is ever slow/down, instead of showing a broken-image icon.
function GithubCard({ src, alt, wide }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`github-card glow-border ${wide ? "github-card-wide" : ""}`}>
      {!failed ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="github-card-fallback">
          <p>Couldn't load this card right now.</p>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            View on GitHub →
          </a>
        </div>
      )}
    </div>
  );
}

export default function GithubStats() {
  return (
    <section id="github">
      <Reveal as="p" className="section-label">GitHub</Reveal>
      <Reveal as="h2" style={{ transitionDelay: "80ms" }}>Code Activity</Reveal>
      <Reveal as="p" style={{ transitionDelay: "140ms" }}>
        Live stats pulled straight from{" "}
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="project-link"
          style={{ display: "inline" }}
        >
          @{GITHUB_USERNAME}
        </a>
        .
      </Reveal>

      <div className="github-grid">
        <Reveal as="div" style={{ transitionDelay: "220ms" }}>
          <GithubCard src={statsUrl} alt="GitHub stats" />
        </Reveal>

        <Reveal as="div" style={{ transitionDelay: "300ms" }}>
          <GithubCard src={streakUrl} alt="GitHub streak stats" />
        </Reveal>

        <Reveal as="div" style={{ transitionDelay: "380ms" }}>
          <GithubCard src={langsUrl} alt="Top languages" wide />
        </Reveal>
      </div>
    </section>
  );
}