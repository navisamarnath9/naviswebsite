"use client";

import { FormEvent, useState } from "react";

const approaches = [
  {
    number: "01",
    title: "Anxiety & overwhelm",
    copy: "Quiet the mental noise, understand your patterns, and build tools that help you feel steady in real life.",
  },
  {
    number: "02",
    title: "Relationships & boundaries",
    copy: "Create healthier ways of connecting, communicating, and protecting the energy you need for yourself.",
  },
  {
    number: "03",
    title: "Life transitions",
    copy: "Move through change, grief, identity shifts, or burnout with clarity, self-trust, and meaningful support.",
  },
];

const testimonials = [
  {
    quote:
      "I finally stopped treating myself like a problem to solve. Therapy gave me language for what I felt—and practical ways to move forward.",
    name: "Former client",
    detail: "Individual therapy",
  },
  {
    quote:
      "Maya is warm, direct, and deeply thoughtful. I leave our sessions feeling understood, but also ready to take the next brave step.",
    name: "Former client",
    detail: "Online therapy",
  },
];

const times = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

export default function Home() {
  const [selectedTime, setSelectedTime] = useState(times[1]);
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

  return (
    <main>
      <div className="announcement">
        <span>Now welcoming new online clients</span>
        <a href="#booking">Request an appointment <span aria-hidden="true">↗</span></a>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Maya Rhodes Psychology home">
          <span className="brand-mark">M</span>
          <span>
            <b>Dr. Maya Rhodes</b>
            <small>Clinical Psychologist</small>
          </span>
        </a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#support" onClick={() => setMenuOpen(false)}>How I help</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>My approach</a>
          <a href="#resources" onClick={() => setMenuOpen(false)}>Resources</a>
        </nav>
        <a className="button button-small header-cta" href="#booking">Book a session</a>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Therapy for thoughtful, overwhelmed humans</p>
          <h1>A softer place to land. A clearer way <em>forward.</em></h1>
          <p className="hero-lede">
            Compassionate, evidence-based therapy to help you feel less stuck,
            reconnect with yourself, and build a life that feels like yours.
          </p>
          <div className="hero-actions">
            <a className="button" href="#booking">Find a time <span aria-hidden="true">→</span></a>
            <a className="text-link" href="#about">Get to know Maya <span aria-hidden="true">↓</span></a>
          </div>
          <div className="availability">
            <span className="pulse" aria-hidden="true" />
            <span><strong>Appointments available</strong> · Online across New York</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="sun-shape" aria-hidden="true" />
          <div className="image-frame">
            <img
              src="/therapy-conversation.jpg"
              alt="A welcoming conversation in a bright therapy room"
            />
          </div>
          <div className="hero-note">
            <span aria-hidden="true">✦</span>
            <p><strong>You don’t have to carry it all alone.</strong></p>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Practice credentials">
        <p>Evidence-based care</p>
        <span aria-hidden="true">✦</span>
        <p>LGBTQIA+ affirming</p>
        <span aria-hidden="true">✦</span>
        <p>Trauma informed</p>
        <span aria-hidden="true">✦</span>
        <p>Secure telehealth</p>
      </section>

      <section className="intro section" id="about">
        <div className="intro-image-wrap">
          <div className="intro-image">
            <img
              src="/therapy-session.jpg"
              alt="A therapist listening with care during a session"
            />
          </div>
          <div className="credential-stamp">
            <span>PhD</span>
            <small>Licensed<br />Psychologist</small>
          </div>
        </div>
        <div className="intro-copy">
          <p className="eyebrow">Hi, I’m Maya</p>
          <h2>Therapy can be both gentle <em>and</em> transformative.</h2>
          <p className="large-copy">
            You may be high-functioning on the outside while feeling anxious,
            disconnected, or exhausted underneath. In our work, there is room
            for all of it—without judgment or pressure to have the right words.
          </p>
          <p>
            I blend practical tools with genuine curiosity, helping you
            understand what shaped you and choose what comes next. We’ll move at
            a pace that feels safe, honest, and useful.
          </p>
          <a className="text-link" href="#approach">More about my approach <span aria-hidden="true">→</span></a>
          <dl className="mini-credentials">
            <div><dt>12+</dt><dd>Years in practice</dd></div>
            <div><dt>PhD</dt><dd>Clinical Psychology</dd></div>
            <div><dt>NY</dt><dd>License #023991</dd></div>
          </dl>
        </div>
      </section>

      <section className="support section" id="support">
        <div className="section-heading">
          <div>
            <p className="eyebrow">How I can support you</p>
            <h2>We can start with what feels <em>heaviest.</em></h2>
          </div>
          <p>
            You don’t need a perfect explanation. Bring the stress, questions,
            repeating patterns, or simply the feeling that something needs to
            change.
          </p>
        </div>
        <div className="approach-grid">
          {approaches.map((item) => (
            <article className="approach-card" key={item.number}>
              <span className="card-number">{item.number}</span>
              <div className="card-icon" aria-hidden="true">
                <i />
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href="#booking" aria-label={`Book therapy for ${item.title}`}>Explore support <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-band" id="approach">
        <div className="approach-band-copy">
          <p className="eyebrow light">The way we’ll work</p>
          <h2>Insight is powerful. Practice is what helps it <em>stick.</em></h2>
          <div className="steps">
            <div><span>1</span><p><strong>Notice</strong> the patterns protecting you.</p></div>
            <div><span>2</span><p><strong>Understand</strong> where they came from.</p></div>
            <div><span>3</span><p><strong>Practice</strong> a new way of responding.</p></div>
          </div>
        </div>
        <blockquote>
          <span className="quote-mark">“</span>
          <p>You are not broken. You adapted. Together, we can decide which adaptations still belong in your life.</p>
          <footer>— Dr. Maya Rhodes</footer>
        </blockquote>
      </section>

      <section className="testimonials section">
        <p className="eyebrow centered">Words from former clients</p>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.detail}>
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">{testimonial.name.charAt(0)}</span>
                <span><strong>{testimonial.name}</strong><small>{testimonial.detail}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="testimonial-note">Testimonials are shared with permission and identifying details have been changed to protect privacy.</p>
      </section>

      <section className="booking section" id="booking">
        <div className="booking-info">
          <p className="eyebrow light">Let’s take the first step</p>
          <h2>Find a time that feels <em>right.</em></h2>
          <p>
            Request a complimentary 15-minute consultation or a full therapy
            session. You’ll receive a confirmation email within one business
            day.
          </p>
          <div className="booking-details">
            <div><span aria-hidden="true">◌</span><p><strong>Secure online sessions</strong><small>Join from a private space anywhere in New York.</small></p></div>
            <div><span aria-hidden="true">◇</span><p><strong>Clear, caring process</strong><small>We’ll make sure the fit and format feel right.</small></p></div>
            <div><span aria-hidden="true">◎</span><p><strong>Transparent pricing</strong><small>Consultations are free · Sessions are $240.</small></p></div>
          </div>
          <p className="urgent-note">
            This form is not monitored for emergencies. If you are in immediate
            danger, call 911 or go to your nearest emergency room.
          </p>
        </div>

        <form className="booking-form" onSubmit={submitBooking}>
          <div className="form-heading">
            <span>Appointment request</span>
            <small>Typically confirmed within 1 business day</small>
          </div>
          <div className="field">
            <label htmlFor="sessionType">I’d like to book</label>
            <select id="sessionType" name="sessionType" required defaultValue="Free 15-minute consultation">
              <option>Free 15-minute consultation</option>
              <option>Individual therapy · 50 minutes</option>
              <option>Couples therapy · 60 minutes</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="appointmentDate">Preferred date</label>
            <input id="appointmentDate" name="appointmentDate" type="date" required />
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
              <input id="name" name="name" autoComplete="name" required placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="phone">Phone <span>(optional)</span></label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" />
          </div>
          <div className="field">
            <label htmlFor="note">Anything you’d like me to know? <span>(optional)</span></label>
            <textarea id="note" name="note" rows={3} placeholder="A short note is plenty—please don’t include sensitive health information." />
          </div>
          <label className="consent">
            <input type="checkbox" required />
            <span>I understand this is a request and my appointment is not confirmed until I receive an email.</span>
          </label>
          <button className="button submit-button" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending request…" : "Request this time"} <span aria-hidden="true">→</span>
          </button>
          {message && (
            <div className={`form-message ${status}`} role="status">{message}</div>
          )}
          <p className="privacy-note">Your information is encrypted in transit and used only to respond to this appointment request.</p>
        </form>
      </section>

      <section className="resources section" id="resources">
        <div>
          <p className="eyebrow">A quiet note for your inbox</p>
          <h2>Practical tools for a more grounded week.</h2>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="newsletter">Email address</label>
          <input id="newsletter" type="email" placeholder="Your email address" />
          <button className="button" type="submit">Send me the notes <span aria-hidden="true">→</span></button>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark inverse">M</span>
          <div><strong>Dr. Maya Rhodes</strong><small>Clinical Psychologist · New York</small></div>
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#support">Services</a>
          <a href="#booking">Book</a>
          <a href="#resources">Resources</a>
        </div>
        <div className="footer-meta">
          <p>© 2026 Maya Rhodes Psychology</p>
          <p>Privacy · Terms · Good Faith Estimate</p>
          <p>Photography via Unsplash</p>
        </div>
      </footer>
    </main>
  );
}
