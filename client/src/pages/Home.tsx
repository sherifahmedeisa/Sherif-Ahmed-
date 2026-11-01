import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Music2,
  Sparkles,
  X,
} from "lucide-react";

const portraitSrc = "/manus-storage/pasted_file_XyEIl9_1000434281_dad4b939.jpg";
const portraitCoverSrc = "/my-eyes-cover.jpg";
const portraitTrackStart = 170;

type InquiryStatus = "idle" | "sending" | "success" | "error";
type InquiryForm = { name: string; email: string; message: string };

const projects = [
  {
    number: "01",
    title: "Vouch",
    label: "Founder / startup",
    description: "My startup for autonomous multi-agent security audits, exploit verification, patch synthesis, and continuous CI/CD protection.",
    tags: ["Security AI", "Multi-agent", "Founder"],
    kind: "vouch",
    tone: "violet",
    image: "/manus-storage/pasted_file_0EZ4f8_image_a443e5e3.png",
    url: "https://vouch-eta-one.vercel.app/",
  },
  {
    number: "02",
    title: "KAT Training",
    label: "Live project",
    description: "A complete online training platform for expert-led courses, enrollment, certification, and payment handling.",
    tags: ["E-learning", "Payments", "Arabic / English"],
    kind: "kat",
    tone: "violet",
    image: "/manus-storage/pasted_file_evP5iU_image_7b2303bd.png",
    url: "https://www.kat-training.com/",
  },
  {
    number: "03",
    title: "EISA",
    label: "Live prototype",
    description: "An instructor-facing consulting and training experience built from KAT’s design system for strategic services and corporate growth.",
    tags: ["Design systems", "Consulting", "Bilingual"],
    kind: "eisa",
    tone: "amber",
    image: "/manus-storage/pasted_file_CvOhDV_image_c3cb5669.png",
    url: "https://eisa.kat-training.com/en",
  },
];

function ProjectVisual({ kind, tone }: { kind: string; tone: string }) {
  if (kind === "vouch") {
    return (
      <div className={`project-visual visual-vouch tone-${tone}`}>
        <img src="/manus-storage/pasted_file_0EZ4f8_image_a443e5e3.png" alt="Vouch autonomous security platform homepage" />
        <div className="vouch-image-wash" />
        <div className="vouch-caption"><span>FOUNDER / VOUCH</span><strong>Continuous security.<br /><em>On every commit.</em></strong></div>
        <span className="vouch-badge"><i /> OWN STARTUP</span>
      </div>
    );
  }

  if (kind === "kat") {
    return (
      <div className={`project-visual visual-kat tone-${tone}`}>
        <img src="/manus-storage/pasted_file_evP5iU_image_7b2303bd.png" alt="KAT Training course platform homepage" />
        <div className="kat-image-wash" />
        <div className="kat-caption"><span>LIVE / KAT-TRAINING.COM</span><strong>Course platform<br /><em>with a complete flow.</em></strong></div>
        <span className="kat-live"><i /> LIVE</span>
      </div>
    );
  }

  if (kind === "eisa") {
    return (
      <div className={`project-visual visual-eisa tone-${tone}`}>
        <img src="/manus-storage/pasted_file_CvOhDV_image_c3cb5669.png" alt="EISA consulting and training prototype homepage" />
        <div className="eisa-image-wash" />
        <div className="eisa-caption"><span>PROTOTYPE / EISA</span><strong>Rooted in excellence.<br /><em>Growing your vision.</em></strong></div>
        <span className="eisa-badge"><i /> KAT SYSTEM / 03</span>
      </div>
    );
  }

  if (kind === "signal") {
    return (
      <div className={`project-visual visual-signal tone-${tone}`} aria-hidden="true">
        <div className="signal-topline"><span>LIVE SIGNAL</span><span>24.08.26</span></div>
        <div className="signal-orbit"><span className="orbit-core" /><span className="orbit-ring ring-one" /><span className="orbit-ring ring-two" /></div>
        <div className="signal-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="signal-foot"><span>+ 38.4%</span><span>activity index</span></div>
      </div>
    );
  }

  if (kind === "monument") {
    return (
      <div className={`project-visual visual-monument tone-${tone}`} aria-hidden="true">
        <div className="monument-glow" />
        <div className="monument-stack stack-back"><span /><span /><span /></div>
        <div className="monument-stack stack-front"><strong>03</strong><span>SPATIAL<br />INTERFACES</span><b>↗</b></div>
        <div className="monument-caption">a study in ratio / depth / quiet</div>
      </div>
    );
  }

  return (
    <div className={`project-visual visual-atlas tone-${tone}`} aria-hidden="true">
      <div className="atlas-chrome"><span className="chrome-dots"><i /><i /><i /></span><span>studio / 01</span><span>⌘ K</span></div>
      <div className="atlas-body"><div className="atlas-copy"><small>CURATED DIGITAL WORK</small><strong>Make it<br /><em>feel easy.</em></strong><span className="atlas-pill">Explore system <ArrowUpRight size={12} /></span></div><div className="atlas-card card-a"><span>01</span><b>VISUAL<br />LANGUAGE</b></div><div className="atlas-card card-b"><span>02</span><b>COMPLEXITY<br />TO CLARITY</b></div></div>
      <div className="atlas-base"><span>SHERIF AHMED</span><span>↗</span></div>
    </div>
  );
}

function AppMark() {
  return <span className="app-mark" aria-hidden="true"><span /><span /><span /><span /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<InquiryStatus>("idle");
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<InquiryForm>({ name: "", email: "", message: "" });
  const portraitAudioRef = useRef<HTMLAudioElement>(null);
  const [portraitSoundOn, setPortraitSoundOn] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setConnectOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const copyName = async () => {
    try {
      await navigator.clipboard.writeText("Sherif Ahmed");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const openConnect = () => {
    setConnectOpen(true);
    setFormStatus("idle");
    setFormError("");
  };

  const closeConnect = () => {
    if (formStatus !== "sending") setConnectOpen(false);
  };

  const updateForm = (field: keyof InquiryForm, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not deliver your inquiry.");
      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus("error");
      setFormError(error instanceof Error ? error.message : "We could not deliver your inquiry.");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const canHoverPlayPortrait = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const playPortraitSound = async () => {
    if (!canHoverPlayPortrait()) return;
    const audio = portraitAudioRef.current;
    if (!audio) return;
    try {
      if (audio.readyState < 1) {
        await new Promise<void>((resolve) => {
          audio.addEventListener("loadedmetadata", () => resolve(), { once: true });
          audio.load();
        });
      }
      audio.currentTime = Number.isFinite(audio.duration) && audio.duration > portraitTrackStart ? portraitTrackStart : 0;
      await audio.play();
      setPortraitSoundOn(true);
    } catch {
      setPortraitSoundOn(false);
    }
  };

  const pausePortraitSound = () => {
    if (!canHoverPlayPortrait()) return;
    const audio = portraitAudioRef.current;
    if (!audio) return;
    audio.pause();
    setPortraitSoundOn(false);
  };

  const togglePortraitSound = async () => {
    if (!canHoverPlayPortrait()) return;
    if (portraitSoundOn) pausePortraitSound();
    else await playPortraitSound();
  };

  return (
    <div className="portfolio-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sherif Ahmed home"><AppMark /><span>SA<span className="brand-dot">.</span></span></a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button header-copy" onClick={copyName} aria-label="Copy my name"><Copy size={15} />{copied ? "Copied" : "Copy name"}</button>
          <button className="header-cta" onClick={openConnect}>Let’s connect <ArrowUpRight size={15} /></button>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> Available for interesting problems <span className="eyebrow-line" /></div>
            <h1 id="hero-title">Building digital<br /><span className="hero-outline">things that</span><br /><span className="hero-gradient">feel inevitable.</span></h1>
            <p className="hero-lede">I’m Sherif Ahmed — a programmer who cares about the space between a good idea and a great experience.</p>
            <div className="hero-actions"><a className="button button-light" href="#work">See selected work <ArrowDown size={16} /></a><a className="text-link" href="#about">A little about me <ChevronRight size={15} /></a></div>
            <div className="hero-meta"><span>Based wherever the work is interesting</span><span className="meta-rule" /><span>01 <small>/</small> 03</span></div>
          </div>
          <div className="hero-visual" aria-label="Portrait of Sherif Ahmed">
            <div className="hero-orb orb-left" /><div className="hero-orb orb-right" />
            <div className={`portrait-frame ${portraitSoundOn ? "is-playing" : ""}`} tabIndex={0} role="button" aria-label={portraitSoundOn ? "Pause My Eyes 2:50 segment" : "Play My Eyes 2:50 segment"} onMouseEnter={() => { if (canHoverPlayPortrait()) void playPortraitSound(); }} onMouseLeave={() => { if (canHoverPlayPortrait()) pausePortraitSound(); }} onClick={togglePortraitSound} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); void togglePortraitSound(); } }}><img src={portraitSrc} alt="Sherif Ahmed in a city at night" /><div className="portrait-shade" /><div className="portrait-cover" style={{ backgroundImage: `url(${portraitCoverSrc})` }}><span className="portrait-cover-kicker">MY EYES / 2:50 SEGMENT</span><span className="portrait-cover-title">My<br /><em>eyes.</em></span><span className="portrait-play"><Music2 size={16} /> {portraitSoundOn ? "Playing 2:50 segment" : "Play 2:50 segment"}</span></div><div className="portrait-label"><span>SHERIF<br />AHMED</span><span>PROGRAMMER<br />& BUILDER</span></div><span className="portrait-corner corner-tl" /><span className="portrait-corner corner-br" /></div><audio ref={portraitAudioRef} src="/my-eyes.mp3" preload="metadata" onEnded={() => setPortraitSoundOn(false)} />
            <div className="floating-note note-top"><Sparkles size={13} /><span>Craft over noise</span></div>
          </div>
        </section>

        <section className="marquee-strip" aria-label="Technical skills ticker"><div className="marquee-track"><span>REACT.JS</span><i>✳</i><span>JAVASCRIPT ES6+</span><i>✳</i><span>NEXT.JS</span><i>✳</i><span>TAILWIND CSS</span><i>✳</i><span>RESPONSIVE DESIGN</span><i>✳</i><span>REST APIs</span><i>✳</i><span>SQL SERVER</span><i>✳</i><span>C# / C++ / JAVA</span><i>✳</i><span>GIT & GITHUB</span><i>✳</i><span>FIGMA</span><i>✳</i><span>AGILE / SCRUM</span><i>✳</i><span>COMPONENT ARCHITECTURE</span><i>✳</i><span>REACT.JS</span><i>✳</i><span>JAVASCRIPT ES6+</span><i>✳</i><span>NEXT.JS</span><i>✳</i><span>TAILWIND CSS</span><i>✳</i><span>RESPONSIVE DESIGN</span><i>✳</i><span>REST APIs</span><i>✳</i><span>SQL SERVER</span><i>✳</i><span>C# / C++ / JAVA</span><i>✳</i><span>GIT & GITHUB</span><i>✳</i><span>FIGMA</span><i>✳</i><span>AGILE / SCRUM</span><i>✳</i><span>COMPONENT ARCHITECTURE</span><i>✳</i></div></section>

        <section id="work" className="work-section section-wrap" aria-labelledby="work-title">
          <div className="section-heading"><div><span className="section-kicker">01 — SELECTED WORK</span><h2 id="work-title">A few things<br /><em>in motion.</em></h2></div><p>Currently collecting the projects that best represent how I think, build, and obsess over the last 10%.</p></div>
          <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.number}><ProjectVisual kind={project.kind} tone={project.tone} /><div className="project-info"><div><span className="project-number">{project.number}</span><span className="project-label">{project.label}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>{project.url ? <a className="project-arrow" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ArrowUpRight size={18} /></a> : <button className="project-arrow" aria-label={`Open ${project.title}`}><ArrowUpRight size={18} /></button>}</article>)}</div>
          <div className="work-footer"><span>More work is loading in the background.</span><span className="footer-rule" /><span>2026 <ArrowUpRight size={13} /></span></div>
        </section>

        <section id="about" className="about-section section-wrap" aria-labelledby="about-title">
          <div className="about-copy"><span className="section-kicker">02 — THE SHORT VERSION</span><div className="about-title-row"><h2 id="about-title">Less noise.<br /><em>More signal.</em></h2><span className="about-index">/ 02</span></div><div className="about-intro"><p className="about-quote">I build the bridge between <em>complex systems</em> and clear human experiences.</p><div className="about-facts"><span><b>01</b> Founder of Vouch</span><span><b>02</b> Product-minded programmer</span><span><b>03</b> Cairo University senior</span></div></div><p>I’m a programmer drawn to the intersection of logic and feeling. I build products, lead ambitious experiments, and care about the small decisions that make a system feel considered.</p><p>I’m currently in my fourth year studying Computer Science and Artificial Intelligence at Cairo University, with graduation expected in 2027. Alongside the degree, I’m building Vouch and continuing to ship useful products for real teams.</p><div className="education-card"><span className="education-logo"><img src="/manus-storage/pasted_file_YcklIj_image_cdabee68.png" alt="Cairo University logo" /></span><div><strong>Computer Science & Artificial Intelligence</strong><span>Cairo University · Fourth year · Expected graduation 2027</span></div></div><a className="text-link" href="#contact">More about the approach <ChevronRight size={15} /></a></div>
        </section>

        <section id="contact" className="contact-section section-wrap" aria-labelledby="contact-title"><div className="contact-topline"><span className="section-kicker">03 — OPEN CHANNEL</span><span>Have a good problem?</span></div><div className="contact-layout"><h2 id="contact-title">Let’s make<br /><span className="hero-gradient">something clear.</span></h2><div className="contact-card"><p>Founder of Vouch, programmer, and product builder. Find the wider trail of work and the people I’m learning with below.</p><button className="button button-light" onClick={openConnect}>Let’s connect <ArrowUpRight size={16} /></button><div className="contact-links"><button className="contact-link-button" onClick={openConnect} aria-label="Open Sherif Ahmed contact form"><Mail size={16} /> Email</button><a href="https://github.com/sherifahmedeisa" target="_blank" rel="noreferrer" aria-label="Sherif Ahmed on GitHub"><Github size={16} /> GitHub</a><a href="https://www.linkedin.com/in/sherif-ahmed-eisa/" target="_blank" rel="noreferrer" aria-label="Sherif Ahmed on LinkedIn"><Linkedin size={16} /> LinkedIn</a></div></div></div></section>
      </main>

      {connectOpen && <div className="connect-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeConnect(); }}><section className="connect-modal" role="dialog" aria-modal="true" aria-labelledby="connect-title"><button className="modal-close" onClick={closeConnect} aria-label="Close contact form"><X size={18} /></button><span className="section-kicker">OPEN CHANNEL / 04</span><h2 id="connect-title">Let’s connect<span className="brand-dot">.</span></h2>{formStatus === "success" ? <div className="form-success"><span className="success-mark">✓</span><h3>Message sent.</h3><p>Thanks for reaching out. I’ll get back to you at the email you provided.</p><button className="text-link" onClick={() => setFormStatus("idle")}>Send another inquiry <ChevronRight size={15} /></button></div> : <form className="connect-form" onSubmit={submitInquiry}><label>Name<input name="name" value={formState.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Your name" required maxLength={120} /></label><label>Email<input name="email" type="email" value={formState.email} onChange={(event) => updateForm("email", event.target.value)} placeholder="you@example.com" required maxLength={320} /></label><label>Project query<textarea name="message" value={formState.message} onChange={(event) => updateForm("message", event.target.value)} placeholder="Tell me a little about what you’re building..." required maxLength={5000} rows={5} /></label>{formStatus === "error" && <p className="form-error" role="alert">{formError}</p>}<button className="button button-light form-submit" type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? "Sending..." : "Send inquiry"} <ArrowUpRight size={16} /></button><p className="form-note">Your message is sent securely to Sherif’s inbox.</p></form>}</section></div>}

      <footer className="site-footer"><a className="brand" href="#top"><AppMark /><span>SA<span className="brand-dot">.</span></span></a><span>Designed & built with intent.</span><span>© 2026 Sherif Ahmed</span></footer>
    </div>
  );
}
