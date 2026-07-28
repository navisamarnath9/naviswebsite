"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "therapy-vs-coaching",
    category: "Therapy vs Coaching",
    question: "What is the difference between individual therapy and personal coaching?",
    answer:
      "Therapy focuses on clinical mental health, emotional healing, resolving past trauma, and managing conditions like anxiety or depression. Coaching is goal-oriented, focusing on forward momentum, career transitions, habit formation, and performance optimization for mentally healthy individuals.",
  },
  {
    id: "first-session-expectations",
    category: "First Session",
    question: "What happens during the initial consultation and first session?",
    answer:
      "Our initial 15-minute consultation is a complimentary, low-pressure conversation to discuss what brings you here and ensure we are a good clinical fit. In your first full 50-minute session, we dive deeper into your history, current challenges, and co-create a personalized plan tailored to your goals.",
  },
  {
    id: "insurance-reimbursement",
    category: "Insurance & Fees",
    question: "Do you accept insurance?",
    answer:
      "Dr. Navisamarnath is an out-of-network provider. This ensures your care is completely private and not limited by insurance company mandates. We provide detailed monthly superbills which you can submit to your PPO insurance for partial reimbursement.",
  },
  {
    id: "cancellation-policy",
    category: "Insurance & Fees",
    question: "What is your session cancellation policy?",
    answer:
      "We require at least 24 hours advance notice to cancel or reschedule a session without charge. Cancellations with less than 24 hours notice incur the standard session fee, as that time block is reserved exclusively for you.",
  },
  {
    id: "telehealth-security",
    category: "Telehealth & Tech",
    question: "How does online therapy work and is it secure?",
    answer:
      "All sessions are conducted via a encrypted, HIPAA-compliant video platform. You simply click a secure link sent to your email from your computer, tablet, or smartphone in a private room. Studies show telehealth therapy is just as effective as in-person therapy.",
  },
  {
    id: "frequency-of-sessions",
    category: "First Session",
    question: "How often will we meet?",
    answer:
      "Most clients begin with weekly 50-minute sessions to build momentum and establish strong therapeutic rapport. As progress is made and tools are integrated, we often transition to bi-weekly or monthly maintenance sessions.",
  },
  {
    id: "confidentiality-privacy",
    category: "Therapy vs Coaching",
    question: "Is everything I share kept strictly confidential?",
    answer:
      "Yes. Confidentiality is the cornerstone of therapy. Everything discussed remains strictly private between you and Dr. Navisamarnath, subject only to standard legal boundaries (e.g., imminent harm to self/others, child/elder abuse, or court order).",
  },
];

const categories = ["All", "Therapy vs Coaching", "Insurance & Fees", "First Session", "Telehealth & Tech"];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<string[]>(["therapy-vs-coaching", "insurance-reimbursement"]);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function toggleFaq(id: string) {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    <main id="top">
      <Navbar />

      <div id="main-content">
        {/* BANNER */}
        <section className="page-banner">
          <span className="kicker">Clear Answers</span>
          <h1>
            Frequently asked <em>questions.</em>
          </h1>
          <p className="page-lead">
            Find answers regarding session structure, fees, insurance reimbursement, confidentiality, and what to expect on your journey.
          </p>
        </section>

        <section className="subpage-container">
          {/* SEARCH BOX */}
          <div className="faq-search-box">
            <span className="faq-search-icon">🔍</span>
            <input
              type="text"
              className="faq-search-input"
              placeholder="Search questions (e.g., insurance, first session, cancellation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* TABS */}
          <div className="faq-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`faq-tab-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ACCORDION LIST */}
          <div className="faq-accordion-list">
            {filteredFaqs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--grey)" }}>
                <p>No questions matched your search query.</p>
                <button
                  type="button"
                  className="button button-light"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openIds.includes(faq.id);
                return (
                  <div key={faq.id} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-icon">+</span>
                    </button>
                    {isOpen && <div className="faq-answer">{faq.answer}</div>}
                  </div>
                );
              })
            )}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "80px", background: "var(--mist)", padding: "48px", borderRadius: "24px", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "2rem", marginBottom: "12px" }}>Didn’t find the answer you were looking for?</h3>
            <p style={{ color: "var(--grey)", marginBottom: "28px", maxWidth: "560px", margin: "0 auto 28px" }}>
              We are happy to answer any questions about our practice, approach, or scheduling. Reach out to us anytime.
            </p>
            <Link className="button" href="/contact">
              Ask a Question or Book <ArrowIcon />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
