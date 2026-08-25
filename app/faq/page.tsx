"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "sessions-format",
    category: "Sessions & Logistics",
    question: "Are sessions in-person or virtual?",
    answer:
      "Currently, all sessions are conducted virtually to ensure flexibility and convenience for clients. This allows you to attend sessions from anywhere with privacy and ease.",
  },
  {
    id: "confidentiality",
    category: "Privacy & Ethics",
    question: "Are your services confidential?",
    answer:
      "Yes, all sessions are strictly confidential. I adhere to professional guidelines and ethics to ensure your privacy and trust are respected at all times.",
  },
  {
    id: "therapy-expectations",
    category: "Therapy Process",
    question: "What can I expect from a therapy session?",
    answer:
      "In therapy, you can expect a safe, non-judgmental space where we explore your thoughts, emotions, and behaviors. Together, we work through challenges using various therapeutic modalities, including CBT, DBT, psychoanalysis, and trauma-informed care, to support your healing and personal growth.",
  },
  {
    id: "therapy-vs-coaching",
    category: "Services Overview",
    question: "What is the difference between therapy and coaching?",
    answer:
      "Therapy focuses on exploring past experiences, healing emotional pain, and managing mental health challenges. Coaching is future-oriented, helping you set and achieve personal or professional goals. Both approaches offer guidance but have different focuses based on your objectives.",
  },
  {
    id: "choosing-service",
    category: "Services Overview",
    question: "How do I know which service is right for me?",
    answer:
      "Choosing a service depends on your goals. Therapy is ideal for addressing mental health concerns, while coaching focuses on personal and professional development. Group sessions provide a supportive environment to share and heal collectively. During an initial consultation, we can discuss what suits your needs best.",
  },
  {
    id: "fees-pricing",
    category: "Fees & Accessibility",
    question: "What are the fees for your services?",
    answer:
      "Services are priced as follows:\n• Individual Therapy: ₹3000 per session\n• Couples/Family Therapy: ₹4000 per session\n• Coaching: ₹3500 per session\n\nI’m committed to making therapy accessible to everyone. To support this, I offer a sliding scale to ensure services remain available to all those in need. Please feel free to reach out to explore flexible options.",
  },
  {
    id: "services-offered",
    category: "Services Overview",
    question: "What services do you offer?",
    answer:
      "I offer a range of services, including Therapy, Coaching, Christian Counseling, Group Therapy Sessions, and Couples/Family Therapy. Each service is designed to support your personal growth and well-being, tailored to your individual needs.",
  },
  {
    id: "session-duration",
    category: "Sessions & Logistics",
    question: "How long does a typical session last?",
    answer:
      "Most sessions are 45 minutes long. Depending on your needs, we may adjust session length or frequency to ensure the best outcomes for your personal journey.",
  },
  {
    id: "session-count",
    category: "Therapy Process",
    question: "How many sessions will I need?",
    answer:
      "The number of sessions varies depending on your goals. Therapy can be short-term or long-term, depending on your progress and the issues being addressed. Coaching typically involves a set number of sessions with a clear focus on goal achievement.",
  },
  {
    id: "insurance-coverage",
    category: "Fees & Accessibility",
    question: "Do you accept insurance?",
    answer:
      "Please check with your insurance provider to confirm if they cover therapy or counseling services. You’ll receive a receipt after each session, which you can submit to your provider for reimbursement if applicable.",
  },
  {
    id: "first-session",
    category: "First Session",
    question: "What can I expect during my first session?",
    answer:
      "Your first session will focus on understanding your unique situation, discussing your goals, and creating a personalized plan for your therapeutic or coaching journey. This session is an opportunity to ask any questions and share your concerns.",
  },
  {
    id: "modalities-approaches",
    category: "Therapy Process",
    question: "What therapeutic approaches do you use?",
    answer:
      "Therapy is grounded in a humanistic approach, placing your experiences, needs, and goals at the centre of the therapeutic process. From this foundation, I draw on different evidence-informed approaches—including Psychodynamic Therapy, Trauma-Informed Practice, and Positive Psychology—tailored to support your personal growth and healing journey.",
  },
  {
    id: "virtual-preparation",
    category: "Sessions & Logistics",
    question: "How do I prepare for my virtual session?",
    answer:
      "Ensure you have a quiet, private space with a reliable internet connection for your session. It’s helpful to come prepared with any specific concerns or questions you want to address during your session.",
  },
  {
    id: "couples-therapy-offer",
    category: "Couples/Family Therapy",
    question: "Do you offer Couples/Family Therapy?",
    answer:
      "Yes, I provide Couples/Family Therapy to help partners and family members navigate their relationship challenges. Together, we work to improve communication, resolve conflicts, and strengthen your emotional connection.",
  },
  {
    id: "couples-therapy-benefits",
    category: "Couples/Family Therapy",
    question: "How can couples/family therapy benefit my relationship?",
    answer:
      "Couples/Family therapy can enhance understanding between partners and family members, facilitate conflict resolution, and provide tools to navigate challenges, ultimately fostering a healthier and more fulfilling relationship.",
  },
  {
    id: "couples-session-expectations",
    category: "Couples/Family Therapy",
    question: "What can I expect during a couples/family therapy session?",
    answer:
      "In couples/family therapy, sessions typically involve guided discussions about relationship dynamics, identifying patterns, and developing strategies for effective communication and problem-solving.",
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>("sessions-format");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [faqItems, setFaqItems] = useState<FAQItem[]>(faqs);

  useEffect(() => {
    getDoc(doc(db, "settings", "faqs")).then((snapshot) => {
      if (snapshot.exists() && Array.isArray(snapshot.data().items)) setFaqItems(snapshot.data().items as FAQItem[]);
    }).catch(() => undefined);
  }, []);

  const categories = ["All", ...Array.from(new Set(faqItems.map((f) => f.category)))];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqItems
      : faqItems.filter((f) => f.category === selectedCategory);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main id="top" className="sample-home faq-page">
      <Navbar />

      {/* FAQ PAGE TOP HERO SECTION (MATCHING ABOUT & RESOURCES SPACIOUSNESS) */}
      <section className="about-top-hero">
        <div className="about-top-hero-copy" style={{ padding: "clamp(100px, 12vh, 128px) clamp(32px, 5vw, 80px) clamp(48px, 6vw, 80px)" }}>
          <span className="sample-overline" style={{ color: "var(--brand-accent)", fontWeight: 700, marginBottom: "12px", display: "block" }}>
            TRANSPARENCY &amp; CARE
          </span>
          <h1 className="about-hero-title" style={{ marginBottom: "28px" }}>
            Frequently Asked Questions
          </h1>
          <p className="about-hero-text" style={{ marginBottom: "36px", fontSize: "clamp(0.96rem, 1.15vw, 1.1rem)", lineHeight: 1.75 }}>
            Everything you need to know about our virtual sessions, fees, therapeutic modalities, and what to expect on your journey with Navisamarnath.
          </p>

          <div className="about-hero-actions" style={{ gap: "32px" }}>
            <Link href="/book-session" className="about-btn-primary">
              BOOK A FREE CONSULTATION ↗
            </Link>
            <a href="#main-content" className="about-btn-secondary">
              EXPLORE FAQS ↓
            </a>
          </div>
        </div>

        <div className="about-top-hero-visual">
          <div className="about-top-hero-img-wrap">
            <Image
              src="https://res.cloudinary.com/ndgpjcbs/image/upload/v1786116850/faq-hero_hnpo5g.jpg"
              alt="Clear Answers & Practice Guidance"
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 50vw"
              className="about-top-hero-img"
              style={{ objectPosition: "center center" }}
            />
            <div className="about-top-hero-badge">
              <span>CLEAR ANSWERS</span>
              <span>PERSONALIZED CARE</span>
            </div>
          </div>
        </div>
      </section>

      <div id="main-content" className="sample-surface">
        <section className="sample-section faq-content-section" style={{ padding: "80px 24px" }}>
          <div className="faq-content" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            
            {/* CATEGORY TABS */}
            <div className="credentials-filter-tabs mobile-scroll-tabs" style={{ marginBottom: "56px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`credentials-filter-btn ${
                    selectedCategory === cat ? "is-active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ACCORDION LIST */}
            <div className="mobile-faq-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    className="mobile-faq-item"
                    key={faq.id}
                    style={{
                      background: "#ffffff",
                      border: "1px solid var(--sample-line)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "box-shadow 200ms ease",
                      boxShadow: isOpen ? "0 8px 24px rgba(0,0,0,0.03)" : "none",
                    }}
                  >
                    <button
                      className="mobile-faq-question"
                      type="button"
                      onClick={() => toggle(faq.id)}
                      style={{
                        width: "100%",
                        padding: "22px 28px",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        gap: "16px",
                      }}
                    >
                      <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "#18181b", lineHeight: 1.4 }}>
                        {faq.question}
                      </span>
                      <span
                        style={{
                          fontSize: "1.4rem",
                          color: "var(--brand-accent)",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 200ms ease",
                          lineHeight: 1,
                        }}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mobile-faq-answer" style={{ padding: "0 28px 24px 28px", borderTop: "1px solid var(--sample-line)" }}>
                        <p style={{ fontSize: "0.98rem", color: "var(--sample-muted)", lineHeight: 1.7, margin: "16px 0 0 0", whiteSpace: "pre-line" }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="faq-contact-card" style={{ marginTop: "64px", textAlign: "center", padding: "48px 40px", background: "#ffffff", borderRadius: "20px", border: "1px solid var(--sample-line)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", marginBottom: "20px", position: "relative", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", flexShrink: 0 }}>
                <Image
                  src="/logo-white.png"
                  alt="Navisamarnath logo"
                  fill
                  unoptimized
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                />
              </div>
              <h3 style={{ fontSize: "1.4rem", margin: "0 0 10px 0", color: "#18181b" }}>Have additional questions?</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--sample-muted)", margin: "0 0 24px 0", maxWidth: "480px" }}>
                Reach out directly or schedule a complimentary 15-minute consultation.
              </p>
              <Link
                href="/book-session"
                style={{
                  display: "inline-block",
                  background: "var(--brand-accent)",
                  color: "#ffffff",
                  padding: "12px 28px",
                  borderRadius: "24px",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                }}
              >
                Schedule Free Consultation ↗
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
