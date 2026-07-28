import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export const metadata = {
  title: "About Dr. Navisamarnath | Licensed Psychologist & Coach",
  description:
    "Learn about Dr. Navisamarnath's background, therapeutic approach, credentials, and vision for compassionate, evidence-based therapy and executive coaching.",
};

const values = [
  {
    title: "Relational Warmth",
    desc: "Therapy should never feel cold or transactional. I meet every person with genuine empathy, deep listening, and unconditional positive regard.",
  },
  {
    title: "Clinical Rigor",
    desc: "Every intervention is backed by contemporary neuroscience and clinical evidence, tailored thoughtfully to your specific goals and personality.",
  },
  {
    title: "Practical Momentum",
    desc: "Insight is essential, but action creates lasting transformation. We translate self-awareness into tangible daily tools and healthier habits.",
  },
  {
    title: "Cultural Humility",
    desc: "I honor the unique intersections of your identity, cultural heritage, and lived experience, creating a safe and non-judgmental space.",
  },
];

const modalities = [
  { name: "Cognitive Behavioral Therapy (CBT)", desc: "Reframing automatic thoughts & behavioral loops" },
  { name: "Acceptance & Commitment (ACT)", desc: "Cultivating psychological flexibility & value alignment" },
  { name: "Dialectical Behavior Therapy (DBT)", desc: "Building emotional regulation & distress tolerance" },
  { name: "Trauma-Informed Practice", desc: "Somatic grounding & safe processing of past distress" },
  { name: "Psychodynamic Insight", desc: "Understanding subconscious roots and recurring relational dynamics" },
];

export default function AboutPage() {
  return (
    <main id="top">
      <Navbar />

      <div id="main-content">
        {/* PAGE HEADER */}
        <section className="page-banner">
          <span className="kicker">Meet Your Guide</span>
          <h1>
            A human approach to <em>meaningful change.</em>
          </h1>
          <p className="page-lead">
            Dedicated to helping individuals, couples, and leaders understand their past, connect with their present, and intentionally build their future.
          </p>
        </section>

        {/* BIO SECTION */}
        <section className="subpage-container">
          <div className="about-collage" style={{ marginBottom: "60px" }}>
            <div className="about-image-main">
              <img
                src="/therapy-session.jpg"
                alt="Dr. Navisamarnath in a calm therapy session"
              />
            </div>
            <div className="about-block">
              <span>Grounding Care</span>
              <strong>12+ Years Practice</strong>
            </div>
            <div className="credential">
              <strong>PhD</strong>
              <span>Clinical Psychology</span>
            </div>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto 60px" }}>
            <h2 style={{ fontSize: "2.4rem", marginBottom: "24px" }}>
              Hi, I’m Dr. Navisamarnath.
            </h2>
            <p style={{ fontSize: "1.15rem", lineHeight: "1.8", marginBottom: "20px" }}>
              For over twelve years, I have had the privilege of walking alongside individuals navigating life's most pivotal moments—whether overcoming chronic anxiety, healing from relational fracture, managing executive burnout, or searching for deeper alignment.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "var(--grey)", marginBottom: "20px" }}>
              My philosophy rests on a simple premise: **You are not broken.** You are a complex human being reacting adaptively to your environment, experiences, and history. My role is to help you decipher those reactions, retain what serves you, and build new pathways forward.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "var(--grey)" }}>
              Whether we engage in structured psychotherapy or goal-oriented personal coaching, you will find a quiet, compassionate space where you can speak freely without fear of judgment.
            </p>
          </div>

          {/* VALUES SECTION */}
          <div style={{ marginTop: "80px", marginBottom: "80px" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cyan)", fontWeight: 600 }}>
                Core Philosophy
              </span>
              <h2 style={{ fontSize: "2.5rem", marginTop: "8px" }}>
                Principles that <em>guide our work.</em>
              </h2>
            </div>

            <div className="resource-grid">
              {values.map((v) => (
                <div className="resource-card" key={v.title}>
                  <div>
                    <span className="resource-tag">Value</span>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MODALITIES */}
          <div style={{ background: "var(--mist)", padding: "48px", borderRadius: "24px", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "24px", textAlign: "center" }}>
              Clinical Modalities & Approaches
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {modalities.map((m) => (
                <div key={m.name} style={{ background: "var(--white)", padding: "20px 24px", borderRadius: "14px", border: "1px solid var(--line)" }}>
                  <h4 style={{ color: "var(--blue)", margin: "0 0 8px 0", fontSize: "1.1rem" }}>{m.name}</h4>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--grey)" }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h2 style={{ fontSize: "2.2rem", marginBottom: "16px" }}>Ready to take the next step?</h2>
            <p style={{ color: "var(--grey)", marginBottom: "32px" }}>
              Schedule a complimentary 15-minute consultation to ask questions and see if we're a good fit.
            </p>
            <Link className="button" href="/contact#booking">
              Book a Consultation <ArrowIcon />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
