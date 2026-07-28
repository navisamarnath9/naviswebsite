"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Individual therapy",
    copy: "A private, thoughtful space to understand what is weighing on you and build steadier ways forward.",
    details: ["Anxiety & stress", "Burnout", "Life transitions"],
    href: "/services#individual",
  },
  {
    number: "02",
    title: "Personal coaching",
    copy: "Focused support for meaningful ambitions, clearer decisions, and momentum that still feels like your own.",
    details: ["Clarity", "Confidence", "Purpose"],
    href: "/services#coaching",
  },
  {
    number: "03",
    title: "Couples therapy",
    copy: "Guided conversations that make room for honesty, repair recurring patterns, and deepen connection.",
    details: ["Communication", "Trust", "Connection"],
    href: "/services#couples",
  },
  {
    number: "04",
    title: "Group sessions",
    copy: "Carefully facilitated spaces where shared experience becomes a source of perspective and support.",
    details: ["Community", "Resilience", "Growth"],
    href: "/services#groups",
  },
];

const approach = [
  {
    number: "01",
    title: "See the whole picture",
    copy: "We begin with your story—not a label—and notice the pressures, patterns, and strengths shaping this moment.",
  },
  {
    number: "02",
    title: "Choose what fits",
    copy: "Evidence-based care is shaped around your pace, personality, culture, relationships, and real life.",
  },
  {
    number: "03",
    title: "Make change usable",
    copy: "Insight becomes practical next steps, so the work continues to support you between conversations.",
  },
];

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗"}</span>;
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [compactNav, setCompactNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.classList.add("motion-ready");
    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    const onScroll = () => {
      setCompactNav(window.scrollY > 72);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="sample-home" id="top" ref={rootRef}>
      <a className="sample-skip" href="#home-content">
        Skip to main content
      </a>

      <header
        className={`sample-nav ${compactNav ? "is-compact" : ""} ${
          menuOpen ? "menu-is-open" : ""
        }`}
      >
        <Link className="sample-nav-brand" href="/" onClick={closeMenu}>
          <span>Navisamarnath</span>
          <small>Psychology &amp; coaching</small>
        </Link>

        <nav className="sample-nav-links" aria-label="Main navigation">
          <Link href="/services" onClick={closeMenu}>
            Services
          </Link>
          <Link href="/about" onClick={closeMenu}>
            About
          </Link>
          <Link href="/resources" onClick={closeMenu}>
            Resources
          </Link>
          <Link href="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>

        <button
          className="sample-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="sample-hero" aria-labelledby="home-heading">
        <div className="sample-hero-media" aria-hidden="true">
          <img src="/navis hero img.webp" alt="" />
        </div>
        <div className="sample-hero-shade" />
        <div className="sample-hero-grid">
          <div className="sample-hero-copy">
            <p className="sample-kicker">Psychology · Coaching · Connection</p>
            <h1 id="home-heading">
              Space to understand.
              <span>Support to move forward.</span>
            </h1>
            <p>
              Thoughtful, evidence-based support for the moments that ask you
              to pause, understand yourself more deeply, and choose a clearer
              way forward.
            </p>
          </div>

          <div className="sample-hero-actions">
            <Link href="/contact#booking">
              Start a conversation <Arrow />
            </Link>
            <a href="#home-content" aria-label="Explore the practice">
              Explore <Arrow down />
            </a>
          </div>

          <p className="sample-hero-note">
            Private online sessions
            <br />
            Welcoming new clients
          </p>
        </div>
      </section>

      <div className="sample-surface" id="home-content">
        <section className="sample-intro sample-section">
          <p className="sample-side-label" data-reveal>
            The practice
          </p>
          <div className="sample-intro-main">
            <p className="sample-overline" data-reveal>
              A human approach to meaningful change
            </p>
            <h2 data-reveal>
              Real change does not ask you to become someone else. It helps you
              return to yourself with more{" "}
              <span>clarity, courage, and choice.</span>
            </h2>
          </div>
        </section>

        <section className="sample-profile sample-section">
          <div className="sample-profile-image" data-reveal>
            <img
              src="/Gemini_Generated_Image_mohymemohymemohy.webp"
              alt="Dr. Navisamarnath"
            />
          </div>

          <div className="sample-profile-copy" data-reveal>
            <p className="sample-overline">Meet your guide</p>
            <h2>You bring your whole story. We find the thread forward.</h2>
            <p>
              There is no perfect way to begin. You might feel overwhelmed,
              disconnected, stuck in a familiar pattern—or simply ready for
              something to shift.
            </p>
            <p>
              Our work makes room for curiosity without judgment, connecting
              insight with practical tools and progress that feels possible in
              everyday life.
            </p>
            <Link className="sample-text-link" href="/about">
              About Dr. Navisamarnath <Arrow />
            </Link>
          </div>

          <aside className="sample-credential" data-reveal>
            <span>PhD</span>
            <p>
              Licensed psychologist
              <br />
              Executive coach
            </p>
          </aside>
        </section>

        <section className="sample-services sample-section" id="services">
          <div className="sample-section-heading">
            <p className="sample-side-label" data-reveal>
              Services
            </p>
            <div data-reveal>
              <p className="sample-overline">Ways to work together</p>
              <h2>Support shaped around real life.</h2>
            </div>
            <p data-reveal>
              Every path begins with a complimentary conversation. We will
              explore what you need and decide together what kind of support
              fits best.
            </p>
          </div>

          <div className="sample-service-grid">
            {services.map((service, index) => (
              <Link
                className="sample-service-card"
                href={service.href}
                key={service.title}
                data-reveal
                style={{ "--card-delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <span className="sample-card-number">{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <ul>
                  {service.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
        </section>

        <section className="sample-feature">
          <div className="sample-feature-image" data-reveal>
            <img
              src="/therapy-conversation.jpg"
              alt="A calm one-to-one therapy conversation"
            />
          </div>
          <div className="sample-feature-copy" data-reveal>
            <p className="sample-overline">How change takes shape</p>
            <h2>
              Enough structure to guide you. Enough space to be fully human.
            </h2>
            <p>
              Rooted in person-centred care and informed by CBT, DBT,
              trauma-aware practice, mindfulness, and psychodynamic insight.
            </p>
            <Link className="sample-text-link sample-text-link-light" href="/services">
              Explore the approach <Arrow />
            </Link>
          </div>
        </section>

        <section className="sample-approach sample-section">
          <div className="sample-section-heading">
            <p className="sample-side-label" data-reveal>
              The process
            </p>
            <div data-reveal>
              <p className="sample-overline">Thoughtful · Tailored · Practical</p>
              <h2>Care that meets you where you are.</h2>
            </div>
          </div>

          <div className="sample-approach-list">
            {approach.map((item) => (
              <article key={item.number} data-reveal>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sample-journal sample-section">
          <div className="sample-section-heading">
            <p className="sample-side-label" data-reveal>
              Explore
            </p>
            <div data-reveal>
              <p className="sample-overline">Keep the conversation going</p>
              <h2>Ideas and tools for the space between sessions.</h2>
            </div>
          </div>

          <div className="sample-journal-grid">
            <Link href="/resources" data-reveal>
              <span>Free guide · 5 minute read</span>
              <h3>Grounding &amp; nervous system reset</h3>
              <p>Practical exercises for anxiety and overload.</p>
              <i>↗</i>
            </Link>
            <Link href="/blog" data-reveal>
              <span>Latest article · 8 minute read</span>
              <h3>Breaking the cycle of high-functioning burnout</h3>
              <p>Why achievement does not always bring peace.</p>
              <i>↗</i>
            </Link>
          </div>
        </section>

        <section className="sample-closing sample-section">
          <p className="sample-side-label" data-reveal>
            Your next step
          </p>
          <div data-reveal>
            <p className="sample-overline">A low-pressure place to begin</p>
            <h2>Let&apos;s start with one honest conversation.</h2>
            <p>
              Request a complimentary consultation. We will talk about what is
              bringing you here, answer your questions, and see whether working
              together feels right.
            </p>
            <Link href="/contact#booking">
              Request a consultation <Arrow />
            </Link>
          </div>
        </section>
      </div>

      <div className="sample-footer-spacer" aria-hidden="true" />

      <footer className="sample-footer">
        <div className="sample-footer-inner">
          <div className="sample-footer-intro">
            <p>Navisamarnath</p>
            <h2>
              Space to understand.
              <br />
              Support to move forward.
            </h2>
            <Link href="/contact">hello@navisamarnath.com</Link>
          </div>

          <div className="sample-footer-cards">
            <Link href="/contact#booking">
              <span>01</span>
              <strong>Book a complimentary consultation</strong>
              <i>↗</i>
            </Link>
            <Link href="/resources">
              <span>02</span>
              <strong>Explore practical resources</strong>
              <i>↗</i>
            </Link>
            <Link href="/faq">
              <span>03</span>
              <strong>Read common questions</strong>
              <i>↗</i>
            </Link>
          </div>

          <div className="sample-footer-bottom">
            <p>© {new Date().getFullYear()} Navisamarnath</p>
            <nav aria-label="Footer navigation">
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/blog">Journal</Link>
              <a href="#top">Back to top ↑</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
