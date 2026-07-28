import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export const metadata = {
  title: "Services & Pricing | Navisamarnath Psychology & Coaching",
  description:
    "Explore individual therapy, personal coaching, couples counseling, and group sessions with transparent pricing and clear session expectations.",
};

const serviceDetails = [
  {
    id: "individual",
    number: "01",
    name: "Individual Therapy",
    badge: "Most Popular",
    duration: "50 minutes",
    investment: "$180 / session",
    tagline: "Understand what is weighing on you and build steadier, healthier patterns.",
    description:
      "Individual therapy offers a confidential, compassionate space to unpack emotional stress, heal past hurts, and cultivate psychological resilience. We combine evidence-based CBT and mindfulness tools with psychodynamic insight.",
    deliverables: [
      "Deep exploration of root triggers & thought patterns",
      "Customized anxiety & mood management toolkits",
      "Somatic grounding & stress-reduction techniques",
      "Bi-weekly progress check-ins & reflection exercises",
    ],
  },
  {
    id: "coaching",
    number: "02",
    name: "Personal & Executive Coaching",
    badge: "Goal-Oriented",
    duration: "50 minutes",
    investment: "$200 / session",
    tagline: "Turn meaningful ambitions into clear decisions, structured habits, and progress.",
    description:
      "Coaching is designed for high-achievers, creatives, and professionals seeking clarity in career, leadership, or major life shifts. We focus on actionable strategy, overcoming imposter syndrome, and optimizing focus.",
    deliverables: [
      "360° goal setting & vision clarity roadmap",
      "Accountability structures & habit architecture",
      "Leadership communication & boundary setting",
      "Direct email support between weekly sessions",
    ],
  },
  {
    id: "couples",
    number: "03",
    name: "Couples Therapy",
    badge: "Relational",
    duration: "60 minutes",
    investment: "$220 / session",
    tagline: "Guided conversations that repair recurring arguments and restore intimacy.",
    description:
      "Relationships thrive when both partners feel heard, valued, and understood. We use Gottman-informed and Emotionally Focused Therapy (EFT) methods to dismantle toxic communication loops and rebuild trust.",
    deliverables: [
      "Conflict resolution & de-escalation frameworks",
      "Emotional intimacy & attachment repair",
      "Shared value mapping for future planning",
      "Practical joint exercises between sessions",
    ],
  },
  {
    id: "groups",
    number: "04",
    name: "Group Sessions",
    badge: "Community",
    duration: "75 minutes",
    investment: "$75 / session",
    tagline: "Facilitated cohort experiences where shared wisdom fosters rapid growth.",
    description:
      "Group therapy provides powerful validation, reducing isolation while offering diverse perspectives. Cohorts are small (6-8 participants) and meet weekly around specific themes such as burnout, grief, or mindful living.",
    deliverables: [
      "Small cohort size ensuring personalized attention",
      "Curated weekly worksheets & reflection prompts",
      "Peer encouragement & supportive community network",
      "Safe, structured space moderated by Dr. Navisamarnath",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main id="top">
      <Navbar />

      <div id="main-content">
        {/* BANNER */}
        <section className="page-banner">
          <span className="kicker">Ways to Work Together</span>
          <h1>
            Support shaped around <em>real life.</em>
          </h1>
          <p className="page-lead">
            Transparent pricing, flexible scheduling, and evidence-based approaches designed to fit your unique needs.
          </p>
        </section>

        {/* SERVICES GRID */}
        <section className="subpage-container">
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            {serviceDetails.map((service) => (
              <div
                key={service.id}
                id={service.id}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "24px",
                  padding: "clamp(28px, 5vw, 48px)",
                  background: "var(--white)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
                  <div>
                    <span className="resource-tag">{service.badge}</span>
                    <h2 style={{ fontSize: "2.4rem", margin: "12px 0 6px 0" }}>
                      {service.number}. {service.name}
                    </h2>
                    <p style={{ fontStyle: "italic", color: "var(--cyan)", fontSize: "1.1rem" }}>
                      {service.tagline}
                    </p>
                  </div>
                  <div style={{ background: "var(--mist)", padding: "16px 24px", borderRadius: "16px", textAlign: "right" }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--blue)" }}>{service.investment}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--grey)" }}>{service.duration}</div>
                  </div>
                </div>

                <p style={{ fontSize: "1.05rem", lineHeight: "1.7", color: "var(--grey)", marginBottom: "32px" }}>
                  {service.description}
                </p>

                <div style={{ marginBottom: "36px" }}>
                  <h4 style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--blue)", marginBottom: "16px" }}>
                    What’s included:
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "0.95rem" }}>
                        <span style={{ color: "var(--cyan)", fontWeight: 700 }}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <Link className="button" href={`/contact?service=${encodeURIComponent(service.name)}#booking`}>
                    Book {service.name} <ArrowIcon />
                  </Link>
                  <Link className="button button-light" href="/faq">
                    View FAQ
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* FINANCIALS & INSURANCE NOTE */}
          <div style={{ marginTop: "80px", background: "var(--mist)", padding: "40px", borderRadius: "20px", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "16px" }}>Insurance & Payment Transparency</h3>
            <p style={{ color: "var(--grey)", lineHeight: "1.7", marginBottom: "16px" }}>
              To protect your clinical privacy and ensure care is dictated solely by your needs (rather than insurance company caps), Dr. Navisamarnath is an out-of-network provider.
            </p>
            <p style={{ color: "var(--grey)", lineHeight: "1.7" }}>
              We provide itemized monthly superbills which you can submit to your PPO insurance provider for partial reimbursement. Major credit cards, HSA, and FSA cards are accepted.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
