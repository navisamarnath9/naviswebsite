import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export const metadata = {
  title: "Mental Health Resources & Worksheets | Navisamarnath",
  description:
    "Access free mental health guides, grounding exercises, recommended reading, and emergency helpline contacts.",
};

const downloadableGuides = [
  {
    title: "5-Step Nervous System Grounding Reset",
    type: "PDF Worksheet · 4 Pages",
    desc: "A practical guide to de-escalate acute anxiety, panic, or overwhelm using somatic breathwork and sensory anchoring.",
    fileSize: "1.2 MB",
  },
  {
    title: "The Burnout Recovery Audit & Daily Tracker",
    type: "Interactive Self-Check · 6 Pages",
    desc: "Assess emotional exhaustion versus physical fatigue, and design sustainable energy boundaries for work.",
    fileSize: "2.4 MB",
  },
  {
    title: "Couples Communication & De-escalation Script",
    type: "Relationship Guide · 5 Pages",
    desc: "Phrases and pause protocols to use during heated arguments to switch from defense to connection.",
    fileSize: "1.8 MB",
  },
  {
    title: "Values-Based Decision Framework",
    type: "Coaching Tool · 3 Pages",
    desc: "A step-by-step matrix to evaluate career, financial, and personal choices against your top core values.",
    fileSize: "950 KB",
  },
];

const recommendedBooks = [
  { title: "The Body Keeps the Score", author: "Bessel van der Kolk, M.D.", category: "Trauma & Healing" },
  { title: "Attached: The New Science of Adult Attachment", author: "Amir Levine & Rachel Heller", category: "Relationships" },
  { title: "Atomic Habits", author: "James Clear", category: "Behavior & Habit Architecture" },
  { title: "Radical Acceptance", author: "Tara Brach, Ph.D.", category: "Mindfulness & Self-Compassion" },
];

export default function ResourcesPage() {
  return (
    <main id="top">
      <Navbar />

      <div id="main-content">
        {/* BANNER */}
        <section className="page-banner">
          <span className="kicker">Free Tools & Insights</span>
          <h1>
            Resources for your <em>daily wellbeing.</em>
          </h1>
          <p className="page-lead">
            Curated worksheets, science-backed grounding tools, and recommended reading to support your growth beyond the session.
          </p>
        </section>

        <section className="subpage-container">
          {/* FREE GUIDES SECTION */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "2.4rem", marginBottom: "12px" }}>
              Downloadable Worksheets & Guides
            </h2>
            <p style={{ color: "var(--grey)", marginBottom: "36px", fontSize: "1.05rem" }}>
              Free PDF resources created by Dr. Navisamarnath for personal self-reflection and coping skills.
            </p>

            <div className="resource-grid">
              {downloadableGuides.map((guide, i) => (
                <div className="resource-card" key={i}>
                  <div>
                    <span className="resource-tag">{guide.type}</span>
                    <h3>{guide.title}</h3>
                    <p>{guide.desc}</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: "16px", marginTop: "16px" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--grey)" }}>{guide.fileSize}</span>
                    <button
                      type="button"
                      className="line-link"
                      onClick={() => alert(`Downloading "${guide.title}"...`)}
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                      Download PDF <ArrowIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECOMMENDED READING */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "2.4rem", marginBottom: "12px" }}>
              Recommended Reading List
            </h2>
            <p style={{ color: "var(--grey)", marginBottom: "36px", fontSize: "1.05rem" }}>
              Books frequently recommended to clients for deeper self-discovery and relational understanding.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
              {recommendedBooks.map((book, i) => (
                <div key={i} style={{ background: "var(--mist)", padding: "28px", borderRadius: "16px", border: "1px solid var(--line)" }}>
                  <span className="resource-tag" style={{ background: "rgba(43, 84, 126, 0.08)", color: "var(--blue)" }}>{book.category}</span>
                  <h3 style={{ fontSize: "1.35rem", margin: "12px 0 6px 0", color: "var(--blue)" }}>{book.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--grey)" }}>by {book.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CRISIS SUPPORT BOX */}
          <div style={{ background: "#fff5f5", border: "1px solid #fecaca", padding: "40px", borderRadius: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ color: "#dc2626", fontSize: "1.5rem" }}>🚨</span>
              <h3 style={{ fontSize: "1.8rem", color: "#991b1b", margin: 0 }}>Immediate Crisis & Helpline Support</h3>
            </div>
            <p style={{ color: "#7f1d1d", lineHeight: "1.7", marginBottom: "20px" }}>
              If you or someone you know is in immediate danger, experiencing severe distress, or having thoughts of self-harm, please reach out immediately to 24/7 free emergency services:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
              <div style={{ background: "var(--white)", padding: "16px 20px", borderRadius: "12px", border: "1px solid #fca5a5" }}>
                <strong style={{ color: "#991b1b" }}>National Suicide & Crisis Lifeline:</strong>
                <p style={{ margin: "4px 0 0 0", fontSize: "1.1rem", fontWeight: 700 }}>Call or Text 988</p>
              </div>
              <div style={{ background: "var(--white)", padding: "16px 20px", borderRadius: "12px", border: "1px solid #fca5a5" }}>
                <strong style={{ color: "#991b1b" }}>Crisis Text Line:</strong>
                <p style={{ margin: "4px 0 0 0", fontSize: "1.1rem", fontWeight: 700 }}>Text HOME to 741741</p>
              </div>
              <div style={{ background: "var(--white)", padding: "16px 20px", borderRadius: "12px", border: "1px solid #fca5a5" }}>
                <strong style={{ color: "#991b1b" }}>Emergency Services:</strong>
                <p style={{ margin: "4px 0 0 0", fontSize: "1.1rem", fontWeight: 700 }}>Call 911 or visit local ER</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
