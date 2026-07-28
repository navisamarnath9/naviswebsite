"use client";

import { FormEvent, useState } from "react";

const services = [
  {
    number: "01",
    title: "Individual therapy",
    short: "Thrive",
    copy: "A private space to understand what is weighing on you, build steadier patterns, and feel more like yourself.",
    focus: ["Anxiety", "Burnout", "Life transitions"],
  },
  {
    number: "02",
    title: "Personal coaching",
    short: "Elevate",
    copy: "Focused support that turns a meaningful ambition into clear decisions, useful habits, and forward momentum.",
    focus: ["Clarity", "Confidence", "Purpose"],
  },
  {
    number: "03",
    title: "Couples therapy",
    short: "Reconnect",
    copy: "Guided conversations that make room for honesty, repair recurring patterns, and deepen connection.",
    focus: ["Communication", "Trust", "Connection"],
  },
  {
    number: "04",
    title: "Group sessions",
    short: "Belong",
    copy: "Thoughtfully facilitated sessions where shared experience becomes a source of insight and support.",
    focus: ["Community", "Resilience", "Growth"],
  },
];

const principles = [
  {
    number: "01",
    title: "See the whole picture",
    copy: "We begin with your story—not a label. Together, we notice the patterns, pressures, and strengths shaping this moment.",
  },
  {
    number: "02",
    title: "Choose what fits",
    copy: "Your care draws from evidence-based approaches and is shaped around your pace, personality, and real life.",
  },
  {
    number: "03",
    title: "Make change usable",
    copy: "Insight becomes practical next steps, so the work continues to support you long after each conversation ends.",
  },
];

const times = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [selectedTime, setSelectedTime] = useState(times[1]);
  const [activeService, setActiveService] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      sessionType: String(form.get("sessionType") ?? ""),
      appointmentDate: String(form.get("appointmentDate") ?? ""),
      appointmentTime: selectedTime,
      note: String(form.get("note") ?? ""),
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Please try again.");

      setStatus("success");
      setMessage(
        `Thank you, ${payload.name.split(" ")[0]}. Your request for ${payload.appointmentDate} at ${selectedTime} is in. We’ll confirm by email within one business day.`,
      );
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn’t send your request. Please try again.",
      );
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main id="top">
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <div className="announcement">
        <p>
          <span className="availability-dot" aria-hidden="true" />
          Now welcoming new online clients
        </p>
        <a href="#booking">
          Complimentary consultation <ArrowIcon />
        </a>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Navisamarnath home">
          <span className="brand-symbol" aria-hidden="true">
            N
          </span>
          <span className="brand-name">
            Navi
            <strong>samarnath</strong>
          </span>
        </a>

        <nav
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Main navigation"
        >
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#approach" onClick={closeMenu}>
            Approach
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <a className="mobile-book" href="#booking" onClick={closeMenu}>
            Book a session <ArrowIcon />
          </a>
        </nav>

        <a className="button button-compact header-cta" href="#booking">
          Begin your journey <ArrowIcon />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="content">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="kicker">
              <span>Psychology</span>
              <span>Coaching</span>
              <span>Connection</span>
            </p>
            <h1 id="hero-heading">
              Make space for the life{" "}
              <em>
                waiting <span>within.</span>
              </em>
            </h1>
            <p className="hero-lede">
              Thoughtful, evidence-based support for the moments that ask you
              to pause, understand yourself more deeply, and choose a clearer
              way forward.
            </p>
            <div className="hero-actions">
              <a className="button" href="#booking">
                Start with a conversation <ArrowIcon />
              </a>
              <a className="round-link" href="#services" aria-label="Explore services">
                <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-proof" aria-label="Practice highlights">
              <div>
                <strong>12+</strong>
                <span>years of practice</span>
              </div>
              <div>
                <strong>12k+</strong>
                <span>clinical hours</span>
              </div>
              <div>
                <strong>Online</strong>
                <span>private & flexible</span>
              </div>
            </div>
          </div>

          <div className="hero-stage">
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <span className="hero-index" aria-hidden="true">
              01
            </span>
            <div className="hero-image">
              <img
                src="/therapy-conversation.jpg"
                alt="A client and therapist having a calm, engaged conversation"
              />
            </div>
            <div className="hero-card">
              <span className="spark" aria-hidden="true">
                ✦
              </span>
              <p>You do not have to carry it all alone.</p>
              <small>A gentler beginning is still a beginning.</small>
            </div>
            <div className="hero-seal" aria-hidden="true">
              <span>Pause · Notice · Grow ·</span>
              <b>N</b>
            </div>
          </div>
        </section>

        <section className="statement" aria-label="Practice philosophy">
          <span className="statement-mark" aria-hidden="true">
            “
          </span>
          <p>
            Real change does not ask you to become someone else. It helps you
            return to yourself with more{" "}
            <em>clarity, courage, and choice.</em>
          </p>
        </section>

        <section className="about section" id="about">
          <div className="section-label">
            <span>02</span>
            <p>Meet your guide</p>
          </div>

          <div className="about-collage">
            <div className="about-image-main">
              <img
                src="/therapy-session.jpg"
                alt="A therapist listening closely during a session"
              />
            </div>
            <div className="about-block" aria-hidden="true">
              <span>Care that meets you</span>
              <strong>where you are.</strong>
            </div>
            <div className="credential">
              <strong>PhD</strong>
              <span>Licensed psychologist</span>
            </div>
          </div>

          <div className="about-copy">
            <p className="eyebrow">A human approach to meaningful change</p>
            <h2>
              You bring your whole story.{" "}
              <em>We find the thread forward.</em>
            </h2>
            <p className="lead">
              There is no perfect way to begin. You might feel overwhelmed,
              disconnected, stuck in a familiar pattern—or simply ready for
              something to shift.
            </p>
            <p>
              Our work makes room for curiosity without judgment. Together, we
              connect insight with practical tools, creating progress that
              feels grounded in your values and possible in your everyday
              life.
            </p>
            <a className="line-link" href="#approach">
              Discover the approach <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="services-heading">
            <div className="section-label light-label">
              <span>03</span>
              <p>Ways to work together</p>
            </div>
            <div>
              <p className="eyebrow light">Support shaped around real life</p>
              <h2>
                Choose the pathway that{" "}
                <em>meets this moment.</em>
              </h2>
            </div>
            <p>
              Every path starts with a complimentary conversation. We will
              explore what you need and decide together what kind of support
              fits best.
            </p>
          </div>

          <div className="service-explorer">
            <div className="service-tabs" role="tablist" aria-label="Services">
              {services.map((service, index) => (
                <button
                  key={service.title}
                  type="button"
                  role="tab"
                  aria-selected={activeService === index}
                  aria-controls={`service-panel-${index}`}
                  id={`service-tab-${index}`}
                  className={activeService === index ? "active" : ""}
                  onClick={() => setActiveService(index)}
                >
                  <span>{service.number}</span>
                  <strong>{service.title}</strong>
                  <i aria-hidden="true">↗</i>
                </button>
              ))}
            </div>

            <article
              className="service-panel"
              role="tabpanel"
              id={`service-panel-${activeService}`}
              aria-labelledby={`service-tab-${activeService}`}
              key={services[activeService].title}
            >
              <div className="service-orbit" aria-hidden="true">
                <span>{services[activeService].short}</span>
              </div>
              <p className="service-number">
                {services[activeService].number} / 04
              </p>
              <div className="service-panel-copy">
                <p className="eyebrow light">{services[activeService].short}</p>
                <h3>{services[activeService].title}</h3>
                <p>{services[activeService].copy}</p>
                <ul>
                  {services[activeService].focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className="button button-light" href="#booking">
                  Explore this path <ArrowIcon />
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="approach section" id="approach">
          <div className="section-label">
            <span>04</span>
            <p>How change takes shape</p>
          </div>
          <div className="approach-intro">
            <p className="eyebrow">Thoughtful, tailored, practical</p>
            <h2>
              A process with enough structure to guide you—and enough space to{" "}
              <em>be fully human.</em>
            </h2>
          </div>

          <div className="principles">
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <div className="principle-mark" aria-hidden="true">
                  <i />
                  <i />
                </div>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            ))}
          </div>

          <div className="approach-note">
            <span aria-hidden="true">✦</span>
            <p>
              Rooted in person-centred care and informed by CBT, DBT,
              trauma-aware practice, mindfulness, and psychodynamic insight.
            </p>
            <a href="#booking">
              Take the first step <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="booking section" id="booking">
          <div className="booking-intro" id="contact">
            <div className="section-label light-label">
              <span>05</span>
              <p>Your next step</p>
            </div>
            <p className="eyebrow light">A low-pressure place to begin</p>
            <h2>
              Let’s start with one{" "}
              <em>honest conversation.</em>
            </h2>
            <p className="booking-lede">
              Request a complimentary consultation. We will talk about what is
              bringing you here, answer your questions, and see whether working
              together feels right.
            </p>

            <div className="booking-promises">
              <div>
                <span>01</span>
                <p>
                  <strong>Private online sessions</strong>
                  <small>Join from a quiet space that feels comfortable.</small>
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <strong>A clear, caring process</strong>
                  <small>Know what to expect before you commit.</small>
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <strong>Reply within one business day</strong>
                  <small>Your requested time will be confirmed by email.</small>
                </p>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={submitBooking}>
            <div className="form-heading">
              <div>
                <span>Complimentary consultation</span>
                <h3>Find your starting point</h3>
              </div>
              <b aria-hidden="true">↗</b>
            </div>

            <div className="field">
              <label htmlFor="sessionType">I’m interested in</label>
              <select
                id="sessionType"
                name="sessionType"
                required
                defaultValue="Free 15-minute consultation"
              >
                <option>Free 15-minute consultation</option>
                <option>Individual therapy</option>
                <option>Personal coaching</option>
                <option>Couples therapy</option>
                <option>Group session</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="appointmentDate">Preferred date</label>
              <input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                required
              />
            </div>

            <fieldset className="field">
              <legend>Preferred time</legend>
              <div className="time-grid">
                {times.map((time) => (
                  <button
                    className={selectedTime === time ? "time active" : "time"}
                    type="button"
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    aria-pressed={selectedTime === time}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="phone">
                Phone <span>(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 555 000 0000"
              />
            </div>

            <div className="field">
              <label htmlFor="note">
                What would you like support with? <span>(optional)</span>
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                placeholder="A short note is plenty."
              />
            </div>

            <label className="consent">
              <input type="checkbox" required />
              <span>
                I understand this is a request and is not confirmed until I
                receive an email.
              </span>
            </label>

            <button
              className="button submit-button"
              type="submit"
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? "Sending request…"
                : "Request this conversation"}{" "}
              <ArrowIcon />
            </button>

            {message && (
              <div className={`form-message ${status}`} role="status">
                {message}
              </div>
            )}
          </form>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#top">
            <span className="brand-symbol inverse" aria-hidden="true">
              N
            </span>
            <span className="brand-name">
              Navi
              <strong>samarnath</strong>
            </span>
          </a>
          <p>
            Space to understand.
            <br />
            Support to move forward.
          </p>
          <a className="footer-circle" href="#top" aria-label="Back to top">
            ↑
          </a>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Navisamarnath. All rights reserved.</p>
          <nav aria-label="Footer navigation">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#booking">Book</a>
          </nav>
          <p>Privacy · Terms · Good Faith Estimate</p>
        </div>
      </footer>
    </main>
  );
}
