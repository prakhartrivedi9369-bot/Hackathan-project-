import { useEffect, useState } from "react";
import "./Landing.css";

/* ---------------------------------------------------------
   Inline icon set — single-weight line icons, no dependency
--------------------------------------------------------- */
const Icon = {
  Map: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  Spark: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  Gauge: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 15a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 15 16 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.3" fill="currentColor" />
    </svg>
  ),
  Users: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 20c.7-3.4 3-5.2 5.5-5.2s4.8 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="7.5" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.3 14.3c2.2.2 4 1.8 4.7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Report: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 3.5h9l3.5 3.5V20a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6V4.1a.6.6 0 0 1 .6-.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12.5h6M9 16h6M9 9h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Chat: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 5.5h16v10.2H9.4L5 19.4v-3.7H4V5.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 9.5h8M8 12.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ---------------------------------------------------------
   Signature hero graphic — a responder "mesh" converging on
   a live incident, with a radar sweep behind it.
--------------------------------------------------------- */
function MeshGraphic() {
  const nodes = [
    { id: "a", x: 70, y: 90 },
    { id: "b", x: 60, y: 260 },
    { id: "c", x: 150, y: 400 },
    { id: "d", x: 330, y: 410 },
    { id: "e", x: 420, y: 300 },
    { id: "f", x: 400, y: 110 },
    { id: "g", x: 230, y: 60 },
  ];
  const center = { x: 240, y: 240 };

  return (
    <svg className="mesh-graphic" viewBox="0 0 480 480" role="img" aria-label="Live mesh of response teams converging on an active incident">
      <defs>
        <radialGradient id="radarFade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={center.x} cy={center.y} r="220" fill="url(#radarFade)" />
      {[80, 140, 200].map((r) => (
        <circle key={r} cx={center.x} cy={center.y} r={r} className="radar-ring" />
      ))}
      <g className="radar-sweep" style={{ transformOrigin: `${center.x}px ${center.y}px` }}>
        <path d={`M ${center.x} ${center.y} L ${center.x} ${center.y - 200} A 200 200 0 0 1 ${center.x + 141} ${center.y - 141} Z`} fill="url(#radarFade)" />
      </g>

      {nodes.map((n) => (
        <line key={n.id} x1={n.x} y1={n.y} x2={center.x} y2={center.y} className="mesh-line" />
      ))}
      <line x1={nodes[0].x} y1={nodes[0].y} x2={nodes[1].x} y2={nodes[1].y} className="mesh-line mesh-line--dim" />
      <line x1={nodes[4].x} y1={nodes[4].y} x2={nodes[5].x} y2={nodes[5].y} className="mesh-line mesh-line--dim" />
      <line x1={nodes[2].x} y1={nodes[2].y} x2={nodes[3].x} y2={nodes[3].y} className="mesh-line mesh-line--dim" />

      {nodes.map((n, i) => (
        <circle key={`pulse-${n.id}`} r="3.2" className="mesh-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
          <animateMotion dur="3.2s" repeatCount="indefinite" begin={`${i * 0.5}s`} path={`M ${n.x} ${n.y} L ${center.x} ${center.y}`} />
        </circle>
      ))}

      {nodes.map((n) => (
        <g key={`node-${n.id}`} className="mesh-node">
          <circle cx={n.x} cy={n.y} r="9" className="mesh-node__ring" />
          <circle cx={n.x} cy={n.y} r="4" className="mesh-node__core" />
        </g>
      ))}

      <g className="mesh-node mesh-node--primary">
        <circle cx={center.x} cy={center.y} r="17" className="mesh-node__ring mesh-node__ring--primary" />
        <circle cx={center.x} cy={center.y} r="7" className="mesh-node__core mesh-node__core--primary" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------
   Data grounded in the actual product (roles, flow, stack)
--------------------------------------------------------- */
const FEATURES = [
  { icon: "Map", title: "Live incident map", copy: "Every open incident plotted in real time, with team and resource positions layered on top." },
  { icon: "Spark", title: "AI resource recommender", copy: "Claude reviews severity, population and availability, then proposes the right teams and supplies." },
  { icon: "Gauge", title: "Priority scoring", copy: "Incidents are ranked Critical to Low automatically, so responders always work the right thing first." },
  { icon: "Users", title: "Smart team assignment", copy: "Matches the closest, best-equipped team to each incident and explains the reasoning behind it." },
  { icon: "Report", title: "Situation reports", copy: "One click turns raw incident data into a structured summary, action list and resource plan." },
  { icon: "Chat", title: "Command copilot", copy: "Describe a scenario in plain language and get a deployment plan back, ready to dispatch." },
];

const FLOW = [
  { n: "01", t: "Log the incident", d: "An officer opens a disaster and adds location, severity and details from the field." },
  { n: "02", t: "AI reads the situation", d: "The AI layer analyzes severity, population and terrain against current resource load." },
  { n: "03", t: "Get a recommendation", d: "Best-fit teams, ambulances and supplies come back with the reasoning attached." },
  { n: "04", t: "Assign and deploy", d: "One confirmation dispatches the recommended team and updates the live map." },
  { n: "05", t: "Monitor and report", d: "Progress streams in over WebSockets until the incident closes and a report is generated." },
];

const STACK = ["React", "Node.js + Express", "MongoDB", "Claude AI"];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="gm-landing">
      {/* ---------- Nav ---------- */}
      <header className={`gm-nav${scrolled ? " gm-nav--scrolled" : ""}`}>
        <div className="gm-shell gm-nav__row">
          <a href="#top" className="gm-logo">
            <span className="gm-logo__mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            GuardianMesh <em>AI</em>
          </a>

          <nav className={`gm-nav__links${menuOpen ? " is-open" : ""}`}>
            <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a>
            <a href="#flow" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#roles" onClick={() => setMenuOpen(false)}>For responders</a>
            <a href="/login" className="gm-nav__cta" onClick={() => setMenuOpen(false)}>Sign in</a>
          </nav>

          <button className="gm-nav__toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section id="top" className="gm-hero">
        <div className="gm-shell gm-hero__row">
          <div className="gm-hero__copy">
            <p className="gm-eyebrow">AI-powered disaster intelligence</p>
            <h1>
              Coordinate the response<br />before it becomes the crisis.
            </h1>
            <p className="gm-hero__sub">
              GuardianMesh AI reads every incident as it happens, ranks it by priority, and
              recommends the closest, best-equipped team to send — so officers spend their
              time deciding, not searching.
            </p>
            <div className="gm-hero__actions">
              <a href="/signup" className="gm-btn gm-btn--primary">
                Request access <Icon.Arrow className="gm-btn__icon" />
              </a>
              <a href="#flow" className="gm-btn gm-btn--ghost">See how it works</a>
            </div>
            <ul className="gm-capstrip">
              <li>Real-time mapping</li>
              <li>AI priority scoring</li>
              <li>Automated dispatch</li>
              <li>Live situation reports</li>
            </ul>
          </div>

          <div className="gm-hero__art">
            <MeshGraphic />
            <div className="gm-chip gm-chip--1">
              <span className="gm-chip__dot gm-chip__dot--critical" />
              <div>
                <p className="gm-chip__label">Active incidents</p>
                <p className="gm-chip__value">14</p>
              </div>
            </div>
            <div className="gm-chip gm-chip--2">
              <span className="gm-chip__dot gm-chip__dot--ok" />
              <div>
                <p className="gm-chip__label">Teams deployed</p>
                <p className="gm-chip__value">9</p>
              </div>
            </div>
            <div className="gm-chip gm-chip--3">
              <p className="gm-chip__label">AI recommendation</p>
              <p className="gm-chip__mono">Dispatch Team Bravo · 4.1km · ETA 6m</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Feature grid ---------- */}
      <section id="platform" className="gm-section">
        <div className="gm-shell">
          <p className="gm-eyebrow gm-eyebrow--center">The platform</p>
          <h2 className="gm-section__title">Everything a command center needs, in one mesh.</h2>

          <div className="gm-grid">
            {FEATURES.map((f) => {
              const IconCmp = Icon[f.icon];
              return (
                <article className="gm-card" key={f.title}>
                  <div className="gm-card__icon"><IconCmp /></div>
                  <h3>{f.title}</h3>
                  <p>{f.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Flow ---------- */}
      <section id="flow" className="gm-section gm-section--flow">
        <div className="gm-shell">
          <p className="gm-eyebrow gm-eyebrow--center">End to end</p>
          <h2 className="gm-section__title">From first report to a closed incident.</h2>

          <ol className="gm-flow">
            {FLOW.map((step) => (
              <li className="gm-flow__step" key={step.n}>
                <span className="gm-flow__n">{step.n}</span>
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Roles ---------- */}
      <section id="roles" className="gm-section">
        <div className="gm-shell gm-roles">
          <div className="gm-roles__copy">
            <p className="gm-eyebrow">Built for the whole chain of command</p>
            <h2 className="gm-section__title">One platform, two views.</h2>
            <p className="gm-hero__sub">
              Admins get the full operational picture. Officers get exactly what they need
              in the field — nothing more to click through in an emergency.
            </p>
          </div>

          <div className="gm-roles__cards">
            <div className="gm-role-card">
              <p className="gm-role-card__tag">Admin</p>
              <ul>
                <li>Manage teams, resources and access</li>
                <li>Monitor every active incident live</li>
                <li>Review analytics and response trends</li>
                <li>Oversee AI recommendations across regions</li>
              </ul>
            </div>
            <div className="gm-role-card gm-role-card--accent">
              <p className="gm-role-card__tag">Officer</p>
              <ul>
                <li>Log incidents from the field in seconds</li>
                <li>Get an instant AI-ranked action plan</li>
                <li>Dispatch the recommended team in one tap</li>
                <li>Track progress until the incident closes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="gm-cta">
        <div className="gm-shell gm-cta__row">
          <h2>When every minute counts, mesh up.</h2>
          <a href="/signup" className="gm-btn gm-btn--primary">
            Request access <Icon.Arrow className="gm-btn__icon" />
          </a>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="gm-footer">
        <div className="gm-shell gm-footer__row">
          <a href="#top" className="gm-logo gm-logo--small">
            <span className="gm-logo__mark" aria-hidden="true"><span /><span /><span /></span>
            GuardianMesh <em>AI</em>
          </a>
          <ul className="gm-footer__stack">
            {STACK.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <p className="gm-footer__copy">© {new Date().getFullYear()} GuardianMesh AI · Built for faster disaster response.</p>
        </div>
      </footer>
    </div>
  );
}
