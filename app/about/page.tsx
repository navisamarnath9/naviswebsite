"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const memberships = [
  { abbr: "CCPA", label: "Canadian Counseling and Psychotherapy Association" },
  { abbr: "CACFT", label: "Canadian Association for Couple & Family Therapy" },
  { abbr: "AAMFT", label: "American Association for Marriage & Family Therapy" },
  { abbr: "CCA", label: "Certified Coaches Alliance" },
];

const educationalCredentials = [
  {
    title: "MA in Clinical Counselling",
    type: "Master's Degree",
    category: "Counseling and Psychotherapy",
    icon: "graduation",
  },
  {
    title: "MS in Counselling & Psychotherapy",
    type: "Master's Degree",
    category: "Counseling and Psychotherapy",
    icon: "brain",
  },
  {
    title: "MBA in Strategy & Leadership",
    type: "Master's Degree",
    category: "Coaching & Leadership",
    icon: "briefcase",
  },
  {
    title: "Diploma in Counselling & Psychotherapy",
    type: "Diploma",
    category: "Counseling and Psychotherapy",
    icon: "certificate",
  },
  {
    title: "PG Diploma in Training the Trainers",
    type: "Postgraduate Specialty",
    category: "Coaching & Leadership",
    icon: "briefcase",
  },
  {
    title: "PG Program in Management",
    type: "Postgraduate Specialty",
    category: "Coaching & Leadership",
    icon: "briefcase",
  },
];

const professionalCertifications = [
  {
    title: "Certified Executive Coach",
    category: "Coaching & Leadership",
    badge: "Executive Level",
    icon: "zap",
  },
  {
    title: "Certified Clinical Trauma Professional (CCTP)",
    category: "Counseling and Psychotherapy",
    badge: "Clinical Specialty",
    icon: "shield",
  },
  {
    title: "Certified Life Coach",
    category: "Coaching & Leadership",
    badge: "Personal Growth",
    icon: "star",
  },
  {
    title: "Certified Relationship Coach",
    category: "Counseling and Psychotherapy",
    badge: "Relational Care",
    icon: "heart",
  },
  {
    title: "Certified NLP Coach Practitioner",
    category: "Coaching & Leadership",
    badge: "Behavioral Change",
    icon: "sparkles",
  },
  {
    title: "Certified Organizational Development Coach",
    category: "Coaching & Leadership",
    badge: "Systems & Teams",
    icon: "zap",
  },
  {
    title: "Certified Grief Professional (CGP)",
    category: "Counseling and Psychotherapy",
    badge: "Bereavement Care",
    icon: "heart",
  },
];

function getCredentialIcon(iconType: string) {
  switch (iconType) {
    case "graduation":
    case "certificate":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "brain":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "briefcase":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "shield":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "heart":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
    case "zap":
    case "sparkles":
    case "star":
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
  }
}

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗"}</span>;
}

export default function AboutPage() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"story" | "journey">("story");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.classList.add("motion-ready");
    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]")
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, [activeTab, filterCategory]);

  return (
    <main className="sample-home about-page" id="top" ref={rootRef}>
      <a className="sample-skip" href="#about-content">
        Skip to main content
      </a>

      <Navbar />

      {/* ABOUT PAGE TOP HERO SECTION (MATCHING SCREENSHOT LAYOUT) */}
      <section className="about-top-hero">
        <div className="about-top-hero-copy" data-reveal>
          <h1 className="about-hero-title">About Navisamarnath</h1>
          <h2 className="about-hero-subtitle">
            Where Aspiration Meets Transformation.
          </h2>
          <p className="about-hero-text">
            Are you feeling overwhelmed, stuck, or searching for clarity? Life’s challenges—whether emotional, relational, or situational—can leave us feeling unsure of the next step. Therapy and coaching offer a safe, supportive space where you can explore your emotions, heal from past wounds, and gain the tools you need to move forward.
          </p>
          <div className="about-hero-actions">
            <Link href="/book-session" className="about-btn-primary">
              BOOK A FREE CONSULTATION <Arrow />
            </Link>
            <a href="#about-content" className="about-btn-secondary">
              DISCOVER THE APPROACH <Arrow down />
            </a>
          </div>
        </div>

        <div className="about-top-hero-visual" data-reveal>
          <div className="about-top-hero-img-wrap">
            <Image
              src="/About - cut.jpg"
              alt="Navisamarnath in his therapy studio"
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 50vw"
              className="about-top-hero-img"
            />
            <div className="about-top-hero-badge">
              <span>THOUGHTFUL SUPPORT</span>
              <span>SHAPED AROUND YOU</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SURFACE WITH COMPACT SPACING */}
      <div className="sample-surface" id="about-content">
        
        {/* SECTION 1: PHILOSOPHY & JOURNEY (FULL WIDTH CONTENT WITH ANIMATED PARAGRAPHS) */}
        <section className="about-story-section" style={{ padding: "60px 24px", borderBottom: "1px solid var(--sample-line)" }}>
          <div className="about-story-layout" style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(260px, 320px) 1fr", gap: "48px", alignItems: "start" }}>
            
            {/* LEFT COLUMN: MEMBERSHIPS & ETHICS / RECOGNIZED AFFILIATIONS */}
            <div className="about-affiliations" data-reveal style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--brand-accent)", fontWeight: 700 }}>
                Memberships &amp; Ethics
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {memberships.map((m) => (
                  <div key={m.abbr} style={{ background: "var(--sample-paper)", border: "1px solid var(--sample-line)", padding: "16px", borderRadius: "12px", transition: "border-color 240ms ease, transform 240ms ease" }}>
                    <strong style={{ color: "var(--brand-accent)", fontSize: "0.92rem", display: "block", marginBottom: "4px" }}>{m.abbr}</strong>
                    <span style={{ fontSize: "0.75rem", color: "#52595d", lineHeight: "1.4", display: "block" }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE ANIMATED TABS */}
            <div className="about-story-content" data-reveal style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Tab Navigation */}
              <div className="about-story-tabs" style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--sample-line)", paddingBottom: "14px", flexWrap: "wrap" }}>
                {[
                  { id: "story", label: "My Philosophy" },
                  { id: "journey", label: "Professional Journey" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      background: activeTab === tab.id ? "var(--brand-accent)" : "transparent",
                      color: activeTab === tab.id ? "#fff" : "var(--sample-muted)",
                      border: "1px solid " + (activeTab === tab.id ? "var(--brand-accent)" : "var(--sample-line)"),
                      padding: "9px 20px",
                      borderRadius: "24px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 250ms cubic-bezier(0.22, 1, 0.36, 1)",
                      outline: "none"
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Panels with Paragraph Text Animations */}
              <div style={{ minHeight: "260px", fontSize: "1rem", lineHeight: "1.75", color: "#3f3f46" }}>
                {activeTab === "story" && (
                  <div key="story" className="about-tab-panel" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <p style={{ margin: 0, fontWeight: 500, color: "#18181b", fontSize: "1.08rem" }}>
                      I am a Registered Psychotherapist, Certified Canadian Counsellor, and Certified Life and Relationship Coach. With over a decade of experience, I specialize in working with clients of all ages, supporting them through a wide range of concerns including anxiety, depression, trauma, self-esteem, life transitions, relationship challenges, and grief.
                    </p>
                    <p style={{ margin: 0 }}>
                      Dedicated to ongoing professional development, I continue to pursue advanced training and remain informed by current research to provide effective and evidence-based care.
                    </p>
                    <p style={{ margin: "8px 0 0", fontStyle: "italic", color: "#314851", borderLeft: "3px solid #314851", paddingLeft: "18px", fontWeight: 500, fontSize: "1.02rem" }}>
                      &ldquo;It would be an honor to support you on your journey toward greater well-being, meaningful growth, and a more fulfilling and balanced life.&rdquo;
                    </p>
                  </div>
                )}

                {activeTab === "journey" && (
                  <div key="journey" className="about-tab-panel" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <p style={{ margin: 0 }}>
                      Over the years, I have worked across diverse settings, including community health centers and private practice, which has strengthened my ability to connect with individuals from different backgrounds and life experiences. This breadth of experience allows me to offer thoughtful, personalized support that honors the uniqueness of each client while fostering a safe, compassionate, and growth-oriented therapeutic space.
                    </p>
                    <p style={{ margin: 0 }}>
                      My educational background includes a Master’s degree in Clinical Counselling from Tyndale University, an MS in Counseling and Psychotherapy, and an MBA in Strategy and Leadership. Complementing my clinical training, I am also trained as an Executive Coach, Organizational Development Coach, and NLP Practitioner. Together, these experiences provide me with both psychological insight and strategic perspective, allowing me to approach each client’s experiences with empathy, curiosity, and care.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CREATIVE CREDENTIALS & CERTIFICATIONS SHOWCASE */}
        <section className="credentials-section">
          <div className="credentials-container">
            <div className="credentials-header" data-reveal>
              <span className="sample-overline" style={{ color: "var(--brand-accent)", fontWeight: 700 }}>
                EXPERTISE &amp; QUALIFICATIONS
              </span>
              <h2>Grounded in Learning. Shaped by Experience.</h2>
            </div>

            {/* CATEGORY FILTER TABS */}
            <div className="credentials-filter-tabs" data-reveal>
              {[
                "Counseling and Psychotherapy",
                "Coaching & Leadership",
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`credentials-filter-btn ${
                    filterCategory === cat || (filterCategory === "All" && cat === "Counseling and Psychotherapy") ? "is-active" : ""
                  }`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="credentials-grid">
              {/* EDUCATIONAL CREDENTIALS COLUMN */}
              <div className="credential-column-card" data-reveal>
                <div className="credential-column-header">
                  <div className="credential-header-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brand-accent)", fontWeight: 700 }}>
                      Academic Degrees
                    </span>
                    <h3>Educational Credentials</h3>
                  </div>
                </div>

                <div className="credential-items-list">
                  {educationalCredentials
                    .filter(
                      (item) =>
                        filterCategory === "All" || item.category === filterCategory || (filterCategory === "All" && item.category === "Counseling and Psychotherapy")
                    )
                    .map((cred) => (
                      <div key={cred.title} className="credential-item-card">
                        <div className="credential-item-left">
                          <div className="credential-item-icon">
                            {getCredentialIcon(cred.icon)}
                          </div>
                          <span className="credential-item-title">{cred.title}</span>
                        </div>
                        <span className="credential-item-type">{cred.type}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* PROFESSIONAL CERTIFICATIONS COLUMN */}
              <div className="credential-column-card" data-reveal>
                <div className="credential-column-header">
                  <div className="credential-header-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brand-accent)", fontWeight: 700 }}>
                      Professional Certifications
                    </span>
                    <h3>Specialized Credentials</h3>
                  </div>
                </div>

                <div className="credential-items-list">
                  {professionalCertifications
                    .filter(
                      (item) =>
                        filterCategory === "All" || item.category === filterCategory || (filterCategory === "All" && item.category === "Counseling and Psychotherapy")
                    )
                    .map((cert) => (
                      <div key={cert.title} className="credential-item-card">
                        <div className="credential-item-left">
                          <div className="credential-item-icon">
                            {getCredentialIcon(cert.icon)}
                          </div>
                          <span className="credential-item-title">{cert.title}</span>
                        </div>
                        <span className="credential-item-type">{cert.badge}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT SECTION 2: SIDE BY SIDE (HOW I DO? + WHY I DO WHAT I DO) */}
        <section style={{ padding: "48px 24px", borderBottom: "1px solid var(--sample-line)" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "48px" }}>
            
            {/* HOW I DO? */}
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <span style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sample-cyan)", fontWeight: 600 }}>Approach</span>
                <h2 style={{ fontSize: "1.8rem", letterSpacing: "-0.02em", margin: "4px 0 0" }}>How I do?</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.95rem", lineHeight: "1.65", color: "#52595d" }}>
                <p style={{ margin: 0 }}>
                  At Navisamarnath, therapy begins with understanding you — your experiences, relationships, patterns, and the things that matter most. I offer a warm, collaborative space to explore what you&apos;re going through with honesty, curiosity, and without judgment.
                </p>
                <p style={{ margin: 0 }}>
                  My work is grounded in a humanistic, person-centred, relational, and insight-oriented approach, drawing from psychodynamic therapy, trauma-informed practice, motivational interviewing, positive psychology, and relationship-focused approaches such as Gottman and Imago. Rather than applying one method to everyone, I tailor the work to your needs, experiences, and goals.
                </p>
                <p style={{ margin: 0 }}>
                  Therapy can be a space to work through what&apos;s difficult — and to understand yourself more deeply, recognize your patterns, build on your strengths, strengthen your relationships, and make meaningful change. Together, we move toward greater clarity, authenticity, and a life that feels more aligned with who you are and who you&apos;re becoming.
                </p>
              </div>
            </div>

            {/* WHY I DO WHAT I DO */}
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <span style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sample-cyan)", fontWeight: 600 }}>Purpose</span>
                <h2 style={{ fontSize: "1.8rem", letterSpacing: "-0.02em", margin: "4px 0 0" }}>Why I do what I do?</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.95rem", lineHeight: "1.65", color: "#52595d" }}>
                <p style={{ margin: 0 }}>
                  Witnessing the transformative power of therapy drives my passion for this work. I believe that every individual has the potential for change and resilience, and it’s incredibly rewarding to guide clients through their struggles toward a more fulfilling life.
                </p>
                <p style={{ margin: 0 }}>
                  Creating a space for open dialogue allows clients to uncover their strengths, set meaningful goals, and navigate life’s challenges with confidence. Each step of their journey, whether it’s gaining emotional insight, developing coping strategies, or rediscovering their purpose, reinforces my commitment to this path.
                </p>
                <p style={{ margin: 0 }}>
                  The breakthroughs clients achieve—big or small—are what inspire me to continually deepen my knowledge and skills. Therapy isn’t just a profession for me; it’s a calling. I strive to serve both the greater good of people and the greater glory of God, knowing that each transformation contributes to a life rich with purpose, connection, and authenticity.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* COMPACT SECTION 3: MISSION & VISION SIDE BY SIDE */}
        <section style={{ padding: "48px 24px", borderBottom: "1px solid var(--sample-line)", background: "rgba(0,0,0,0.015)" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            
            {/* MISSION CARD */}
            <div data-reveal style={{ background: "#fff", border: "1px solid var(--sample-line)", padding: "28px", borderRadius: "14px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sample-cyan)", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                MISSION
              </span>
              <h3 style={{ fontSize: "1.4rem", margin: "0 0 12px 0", color: "#111" }}>Empowering Self-Discovery</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.65", color: "#52595d" }}>
                To empower individuals to embrace their journey of self-discovery and growth through compassionate, client-centered therapy and coaching, fostering resilience and promoting overall well-being.
              </p>
            </div>

            {/* VISION CARD */}
            <div data-reveal style={{ background: "#fff", border: "1px solid var(--sample-line)", padding: "28px", borderRadius: "14px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
              <span style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sample-cyan)", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                VISION
              </span>
              <h3 style={{ fontSize: "1.4rem", margin: "0 0 12px 0", color: "#111" }}>Fulfilling &amp; Authentic Lives</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.65", color: "#52595d" }}>
                To create a supportive environment where everyone has the opportunity to lead a fulfilling and authentic life, equipped with the skills and confidence to navigate life’s challenges.
              </p>
            </div>

          </div>
        </section>

        {/* COMPACT CLOSING CTA */}
        <section className="sample-closing sample-section" style={{ padding: "48px 24px" }}>
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
            <Link href="/book-session">
              Request a consultation <Arrow />
            </Link>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
