"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ─── REAL SITE DATA ──────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "individual",
    name: "Individual Therapy",
    price: "₹3000 per session",
    description: "A safe, supportive space to explore emotions, heal from past wounds, and gain the tools you need to move forward. Uses CBT, DBT, psychoanalysis, and trauma-informed care.",
    link: "/services/individual",
  },
  {
    id: "couples",
    name: "Couples Therapy",
    price: "₹4000 per session",
    description: "Rebuild trust, improve communication, and foster deeper connection with your partner. Uses EFT, Gottman Method, and Imago Therapy.",
    link: "/services/couples",
  },
  {
    id: "coaching",
    name: "Personal & Executive Coaching",
    price: "₹3500 per session",
    description: "Goal-oriented coaching for career transitions, leadership growth, personal development, and overcoming burnout.",
    link: "/services/coaching",
  },
  {
    id: "groups",
    name: "Group Sessions",
    price: "Contact for pricing",
    description: "A supportive group environment covering topics like healing the inner child, relationships, self-discovery, and coping mechanisms.",
    link: "/services/groups",
  },
];

const FAQS = [
  { q: "Are sessions in-person or virtual?", a: "Currently, all sessions are conducted virtually to ensure flexibility and convenience for clients anywhere." },
  { q: "Are your services confidential?", a: "Yes, all sessions are strictly confidential. Navisamarnath adheres to professional guidelines and ethics to ensure your privacy and trust are respected at all times." },
  { q: "What can I expect from a therapy session?", a: "A safe, non-judgmental space where we explore your thoughts, emotions, and behaviors using CBT, DBT, psychoanalysis, and trauma-informed care." },
  { q: "What is the difference between therapy and coaching?", a: "Therapy focuses on exploring past experiences and healing emotional pain. Coaching is future-oriented, helping you set and achieve personal or professional goals." },
  { q: "How do I know which service is right for me?", a: "During a complimentary initial consultation, we can discuss your goals and decide together what kind of support fits best." },
  { q: "What are the fees?", a: "Individual Therapy: ₹3000/session · Couples Therapy: ₹4000/session · Coaching: ₹3500/session. A sliding scale is available for those who need it." },
  { q: "What services do you offer?", a: "Individual Therapy, Couples Therapy, Personal & Executive Coaching, Group Sessions, and Christian Counseling." },
  { q: "How long does a session last?", a: "Most sessions are 45 minutes. Length may be adjusted based on your needs." },
  { q: "How many sessions will I need?", a: "It varies by individual goals. Therapy can be short-term or long-term. Coaching typically has a clear set number of sessions focused on goal achievement." },
  { q: "Do you accept insurance?", a: "You'll receive a receipt after each session which you can submit to your insurance provider for possible reimbursement. Please check with your provider beforehand." },
  { q: "What happens in the first session?", a: "Your first session focuses on understanding your unique situation, discussing your goals, and co-creating a personalized plan for your journey." },
  { q: "What therapeutic approaches do you use?", a: "Person-centered therapy is the foundation, complemented by CBT, DBT, trauma-informed care, psychoanalysis, and psychodynamics." },
  { q: "How do I prepare for a virtual session?", a: "Ensure you have a quiet, private space with a reliable internet connection. Come prepared with any concerns or questions you'd like to address." },
  { q: "Do you offer Couples Therapy?", a: "Yes. Couples Therapy helps partners navigate relationship challenges, improve communication, resolve conflicts, and strengthen emotional connection." },
  { q: "How can couples therapy benefit my relationship?", a: "It enhances understanding, facilitates conflict resolution, and provides tools to navigate challenges — fostering a healthier and more fulfilling relationship." },
  { q: "What happens in a couples therapy session?", a: "Guided discussions about relationship dynamics, identifying patterns, and developing strategies for effective communication and problem-solving." },
];

const ABOUT = {
  name: "Navisamarnath",
  credentials: "MSc Psychology · PG Diploma Counselling · Certified Life Coach · 5+ Years Experience",
  mission: "Inspired by the Jesuit principle of Magis — seeking the greater — Navisamarnath provides a safe, empathetic, and growth-oriented space for individuals, couples, and groups to transform their lives.",
  specialties: ["Anxiety & Depression", "Trauma & PTSD", "Relationships & Couples", "Career Burnout", "Life Transitions", "Christian Counseling", "Inner Child Healing"],
  email: "navisamarnathofc@gmail.com",
  instagram: "https://www.instagram.com/navisamarnath",
  youtube: "https://www.youtube.com/@navisamarnath",
  facebook: "https://www.facebook.com/share/14nQckuA18H/?mibextid=wwXIfr",
};

// ─── RULE ENGINE ─────────────────────────────────────────────────────────────

interface BotRule {
  patterns: string[];
  respond: () => BotMessage;
}

interface BotMessage {
  text: string;
  links?: { label: string; href: string }[];
  suggestions?: string[];
}

function matchIntent(input: string): BotMessage {
  const msg = input.toLowerCase().trim();

  // GREETING
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|namaste)\b/.test(msg)) {
    return {
      text: `Hello! 👋 Welcome to Navisamarnath's practice. I'm here to help you learn about our services, answer your questions, or guide you to book a session.\n\nHow can I help you today?`,
      suggestions: ["What services do you offer?", "What are the fees?", "Book a session", "Tell me about Navisamarnath"],
    };
  }

  // BOOKING / APPOINTMENT
  if (/book|appointment|consult|schedule|session|start|begin|get started/.test(msg)) {
    return {
      text: `To book a session with Navisamarnath, visit our booking page. The first consultation is complimentary — a low-pressure 15-minute conversation to see if we're the right fit.`,
      links: [{ label: "Book a Free Consultation ↗", href: "/book-session" }],
      suggestions: ["What are the fees?", "Are sessions virtual?", "What services do you offer?"],
    };
  }

  // FEES / PRICING
  if (/fee|price|pricing|cost|how much|rate|charge|afford|sliding scale/.test(msg)) {
    return {
      text: `Here are our current session fees:\n\n• Individual Therapy — ₹3,000 / session\n• Couples Therapy — ₹4,000 / session\n• Personal / Executive Coaching — ₹3,500 / session\n\n💛 A sliding scale is available to ensure therapy remains accessible to everyone. Please reach out to discuss flexible options.`,
      links: [{ label: "Book a Free Consultation ↗", href: "/book-session" }],
      suggestions: ["Are sessions virtual?", "What is covered in individual therapy?", "How many sessions will I need?"],
    };
  }

  // ALL SERVICES
  if (/services|offer|what do you do|what can you help|list of/.test(msg)) {
    return {
      text: `Navisamarnath offers the following services:\n\n${SERVICES.map((s) => `• ${s.name} — ${s.price}`).join("\n")}\n\nChristian Counseling is also available upon request. Which service would you like to know more about?`,
      links: SERVICES.map((s) => ({ label: s.name, href: s.link })),
      suggestions: ["Individual Therapy", "Couples Therapy", "Coaching", "Group Sessions"],
    };
  }

  // INDIVIDUAL THERAPY
  if (/individual therapy|personal therapy|one.on.one|solo therapy|anxiety|depression|trauma|ptsd|burnout|stress|emotional/.test(msg)) {
    const s = SERVICES[0];
    return {
      text: `**Individual Therapy** — ${s.price}\n\n${s.description}\n\nApproaches used: CBT, DBT, Trauma-Informed Care, Psychodynamics, and Person-Centered Therapy.`,
      links: [{ label: "Learn more ↗", href: s.link }, { label: "Book a session ↗", href: "/book-session" }],
      suggestions: ["What are the fees?", "How many sessions will I need?", "Are sessions virtual?"],
    };
  }

  // COUPLES THERAPY
  if (/couple|relationship|partner|marriage|spouse|boyfriend|girlfriend|conflict|communication/.test(msg)) {
    const s = SERVICES[1];
    return {
      text: `**Couples Therapy** — ${s.price}\n\n${s.description}\n\nSessions involve guided discussions on relationship dynamics, communication patterns, and practical conflict-resolution strategies.`,
      links: [{ label: "Learn more ↗", href: s.link }, { label: "Book a session ↗", href: "/book-session" }],
      suggestions: ["How long is a couples session?", "What are the fees?", "Book a session"],
    };
  }

  // COACHING
  if (/coach|coaching|career|goal|professional|executive|leadership|performance|productivity|life coach/.test(msg)) {
    const s = SERVICES[2];
    return {
      text: `**Personal & Executive Coaching** — ${s.price}\n\n${s.description}\n\nTypes offered: Life Coaching, Executive Coaching, OD Coaching, and NLP Coaching.`,
      links: [{ label: "Learn more ↗", href: s.link }, { label: "Book a session ↗", href: "/book-session" }],
      suggestions: ["Difference between therapy and coaching?", "What are the fees?", "Book a session"],
    };
  }

  // GROUP SESSIONS
  if (/group|community|group session|group therapy|inner child|collective/.test(msg)) {
    const s = SERVICES[3];
    return {
      text: `**Group Sessions** — ${s.price}\n\n${s.description}\n\nTopics covered: Healing the Inner Child, Relationships, Self-Discovery, and Coping Mechanisms.`,
      links: [{ label: "Learn more ↗", href: s.link }, { label: "Book a session ↗", href: "/book-session" }],
      suggestions: ["What are the fees?", "Book a session", "What other services are available?"],
    };
  }

  // CHRISTIAN COUNSELING
  if (/christian|faith|religion|spiritual|church|god|bible|pastoral/.test(msg)) {
    return {
      text: `Navisamarnath offers **Christian Counseling** — integrating faith-based perspectives with evidence-based therapeutic approaches. This is ideal for individuals seeking support that aligns with their spiritual values.\n\nPlease get in touch or book a consultation to learn more.`,
      links: [{ label: "Book a Consultation ↗", href: "/book-session" }],
      suggestions: ["What are the fees?", "What other services are offered?"],
    };
  }

  // VIRTUAL / FORMAT
  if (/virtual|online|in.person|in person|remote|zoom|video call|location|where/.test(msg)) {
    return {
      text: `All sessions with Navisamarnath are currently conducted **virtually** via secure video call. This ensures flexibility and convenience no matter where you are located.\n\nYou'll need a quiet, private space and a reliable internet connection.`,
      suggestions: ["How do I book a session?", "What are the fees?", "What to expect in first session?"],
    };
  }

  // CONFIDENTIALITY
  if (/confidential|private|privacy|secret|safe|trust/.test(msg)) {
    return {
      text: `Yes — all sessions are **strictly confidential**. Navisamarnath adheres to professional guidelines and ethical codes to ensure your privacy is protected at all times.\n\nYour comfort and trust are the foundation of every session.`,
      suggestions: ["Are sessions virtual?", "What are the fees?", "Book a session"],
    };
  }

  // FIRST SESSION
  if (/first session|first appointment|what to expect|new client|starting/.test(msg)) {
    return {
      text: `Your first session focuses on:\n\n• Understanding your unique situation and background\n• Discussing your goals and what you'd like to work on\n• Co-creating a personalized plan for your journey\n\nIt's an open, low-pressure space — you can ask any questions and share what feels comfortable.`,
      suggestions: ["How do I book a session?", "Are sessions virtual?", "What are the fees?"],
    };
  }

  // DURATION / LENGTH
  if (/how long|duration|length|45|50|minute/.test(msg)) {
    return {
      text: `Most sessions are **45 minutes** long. Depending on your needs and the type of session, the length or frequency may be adjusted to ensure the best outcomes for your journey.`,
      suggestions: ["How many sessions will I need?", "What are the fees?", "Book a session"],
    };
  }

  // HOW MANY SESSIONS
  if (/how many|number of session|how often|frequency/.test(msg)) {
    return {
      text: `The number of sessions varies by individual:\n\n• **Therapy** can be short-term (8–12 sessions) or long-term depending on your progress and the challenges being addressed.\n• **Coaching** typically has a defined set of sessions with a clear focus on goal achievement.\n\nYou'll discuss this together during your initial consultation.`,
      suggestions: ["Book a free consultation ↗", "What are the fees?"],
    };
  }

  // INSURANCE
  if (/insurance|reimbursement|covered|health plan|medical/.test(msg)) {
    return {
      text: `Navisamarnath is not directly tied to insurance networks. However, **you'll receive a receipt after each session** which you can submit to your insurance provider for possible reimbursement.\n\nPlease check with your provider to confirm their policy on therapy and counseling coverage.`,
      suggestions: ["What are the fees?", "Is there a sliding scale?", "Book a session"],
    };
  }

  // THERAPEUTIC APPROACHES / MODALITIES
  if (/cbt|dbt|approach|modality|method|psychoanalysis|trauma.informed|person.centered|technique|evidence.based/.test(msg)) {
    return {
      text: `Navisamarnath's therapeutic foundation is **Person-Centered Therapy**, tailored to your unique needs. This is complemented by:\n\n• **CBT** — changing negative thought patterns\n• **DBT** — managing intense emotions through mindfulness\n• **Trauma-Informed Care** — processing trauma safely\n• **Psychodynamics & Psychoanalysis** — exploring unconscious patterns\n• **EFT** (for couples) — improving emotional bonds\n• **Gottman Method** (for couples) — research-based relationship tools`,
      suggestions: ["What is individual therapy?", "What is couples therapy?", "Book a session"],
    };
  }

  // THERAPY VS COACHING
  if (/difference|vs|versus|therapy or coach|coach or therapy|which is better/.test(msg)) {
    return {
      text: `Great question! Here's the key difference:\n\n**Therapy** — explores past experiences, heals emotional pain, and addresses mental health challenges. Ideal for anxiety, depression, trauma, and relationship wounds.\n\n**Coaching** — future-focused, helps you set and achieve personal or professional goals. Ideal for career transitions, leadership growth, and performance.\n\nNot sure which is right for you? Book a free consultation to discuss.`,
      links: [{ label: "Book a Free Consultation ↗", href: "/book-session" }],
      suggestions: ["Individual Therapy details", "Coaching details", "What are the fees?"],
    };
  }

  // ABOUT NAVISAMARNATH
  if (/about|who is|navisamarnath|dr\.|doctor|background|qualifications|credentials|experience/.test(msg)) {
    return {
      text: `**Navisamarnath**\n\n${ABOUT.credentials}\n\n${ABOUT.mission}\n\n**Specialties:** ${ABOUT.specialties.join(" · ")}`,
      links: [{ label: "Learn more about Navisamarnath ↗", href: "/about" }],
      suggestions: ["What services are offered?", "Book a session", "What are the fees?"],
    };
  }

  // SPECIALTIES
  if (/specialt|speciali|focus|expert|help with|deal with/.test(msg)) {
    return {
      text: `Navisamarnath specialises in:\n\n${ABOUT.specialties.map((s) => `• ${s}`).join("\n")}\n\nIf you don't see your concern listed, feel free to ask — support may still be available.`,
      links: [{ label: "Book a Free Consultation ↗", href: "/book-session" }],
      suggestions: ["What is individual therapy?", "What are the fees?", "Book a session"],
    };
  }

  // CONTACT
  if (/contact|email|reach|get in touch|social|instagram|facebook|youtube/.test(msg)) {
    return {
      text: `You can reach Navisamarnath through the following channels:\n\n📧 Email: ${ABOUT.email}\n📸 Instagram: @navisamarnath\n▶️ YouTube: @navisamarnath\n📘 Facebook: Navisamarnath`,
      links: [
        { label: "Instagram ↗", href: ABOUT.instagram },
        { label: "YouTube ↗", href: ABOUT.youtube },
        { label: "Book a Session ↗", href: "/book-session" },
      ],
      suggestions: ["Book a session", "What services are offered?"],
    };
  }

  // RESOURCES PAGE
  if (/resource|book recommend|podcast|website|reading|self.help|inner child healing|positive thinking|self.esteem/.test(msg)) {
    return {
      text: `We have a curated **Resources page** with hand-picked books, podcasts, and websites across three pillars:\n\n• Healing the Inner Child\n• Positive Thinking & Mindset\n• Building Self-Esteem`,
      links: [{ label: "Visit Resources Page ↗", href: "/resources" }],
      suggestions: ["What is individual therapy?", "Book a session", "What are the fees?"],
    };
  }

  // FAQ PAGE
  if (/faq|question|common question|frequently asked/.test(msg)) {
    return {
      text: `You can find answers to all common questions on our FAQ page — covering virtual sessions, fees, therapeutic modalities, and what to expect.`,
      links: [{ label: "View All FAQs ↗", href: "/faq" }],
      suggestions: ["What are the fees?", "Are sessions virtual?", "Book a session"],
    };
  }

  // THANK YOU / GOODBYE
  if (/thank|thanks|bye|goodbye|see you|that's all|no more|that's it/.test(msg)) {
    return {
      text: `You're very welcome! 🌿 Wishing you well on your journey. If you ever have more questions or are ready to take the next step, we're here for you.\n\nTake care.`,
      suggestions: ["Book a session", "What services are offered?"],
    };
  }

  // FALLBACK
  return {
    text: `I may not have the answer to that just yet. Here's what I can help you with — feel free to pick one or type your question differently:`,
      suggestions: [
      "What services do you offer?",
      "What are the fees?",
      "Are sessions virtual?",
      "Tell me about Navisamarnath",
      "Book a session",
    ],
  };
}

// ─── CHAT UI ─────────────────────────────────────────────────────────────────

interface ChatEntry {
  from: "user" | "bot";
  text: string;
  links?: { label: string; href: string }[];
  suggestions?: string[];
}

const WELCOME: ChatEntry = {
  from: "bot",
  text: `👋 Hi! I'm the Navis Virtual Assistant.\n\nI can answer questions about services, fees, appointments, and more — all using real information from this practice.`,
  suggestions: ["What services do you offer?", "What are the fees?", "Book a session", "Tell me about Navisamarnath"],
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatEntry[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: ChatEntry = { from: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = matchIntent(text.trim());
      setMessages((prev) => [...prev, { from: "bot", ...reply }]);
      setIsTyping(false);
    }, 600);
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        id="chatbot-toggle-btn"
        className="chatbot-toggle"
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        aria-label={isOpen ? "Close chat" : "Open Navis Virtual Assistant"}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#0A303D",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(10,48,61,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 200ms ease, box-shadow 200ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(10,48,61,0.45)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(10,48,61,0.35)"; }}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* CHAT PANEL */}
      {isOpen && (
        <div
            id="chatbot-panel"
            className="chatbot-panel"
          style={{
            position: "fixed",
            bottom: "96px",
            right: "28px",
            zIndex: 9998,
            width: "clamp(320px, 90vw, 420px)",
            maxHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.14)",
            overflow: "hidden",
            border: "1px solid rgba(10,48,61,0.12)",
          }}
        >
          {/* HEADER */}
          <div style={{
            background: "#0A303D",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.2rem",
            }}>🌿</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>Navis Virtual Assistant</p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.65)" }}>Dr. Navisamarnath's Practice</p>
            </div>
            <span style={{ marginLeft: "auto", width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80" }} />
          </div>

          {/* MESSAGES */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "16px",
            display: "flex", flexDirection: "column", gap: "12px",
            background: "#f9fafb",
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: msg.from === "user" ? "flex-end" : "flex-start", gap: "6px" }}>
                <div style={{
                  maxWidth: "88%",
                  padding: "10px 14px",
                  borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.from === "user" ? "#0A303D" : "#ffffff",
                  color: msg.from === "user" ? "#ffffff" : "#18181b",
                  fontSize: "0.875rem",
                  lineHeight: 1.55,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  whiteSpace: "pre-wrap",
                  border: msg.from === "bot" ? "1px solid #e4e4e7" : "none",
                }}>
                  {msg.text}
                </div>
                {msg.links && msg.links.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxWidth: "88%" }}>
                    {msg.links.map((lnk, i) => (
                      <Link
                        key={i}
                        href={lnk.href}
                        target={lnk.href.startsWith("http") ? "_blank" : undefined}
                        rel={lnk.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        style={{
                          fontSize: "0.78rem", fontWeight: 600,
                          color: "#0A303D", background: "rgba(10,48,61,0.07)",
                          padding: "5px 12px", borderRadius: "20px",
                          textDecoration: "none", border: "1px solid rgba(10,48,61,0.15)",
                        }}
                      >
                        {lnk.label}
                      </Link>
                    ))}
                  </div>
                )}
                {msg.from === "bot" && msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxWidth: "88%" }}>
                    {msg.suggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => send(s)}
                        style={{
                          fontSize: "0.76rem", fontWeight: 600,
                          color: "#0A303D", background: "#fff",
                          padding: "4px 10px", borderRadius: "20px",
                          textDecoration: "none", border: "1px solid rgba(10,48,61,0.2)",
                          cursor: "pointer", transition: "background 150ms",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(10,48,61,0.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{
                  padding: "10px 16px", borderRadius: "16px 16px 16px 4px",
                  background: "#fff", border: "1px solid #e4e4e7",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                  <span style={{ display: "flex", gap: "4px" }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} style={{
                        width: "7px", height: "7px", borderRadius: "50%", background: "#0A303D",
                        animation: `chatBotBounce 1s ease-in-out ${i * 0.15}s infinite`,
                        display: "inline-block",
                      }} />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid #e4e4e7",
            background: "#fff",
            display: "flex",
            gap: "8px",
            alignItems: "flex-end",
          }}>
            <input
              id="chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "12px",
                border: "1px solid #e4e4e7",
                fontSize: "0.875rem",
                outline: "none",
                background: "#f9fafb",
                resize: "none",
              }}
            />
            <button
              id="chatbot-send-btn"
              type="button"
              onClick={() => send(input)}
              disabled={!input.trim()}
              aria-label="Send message"
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: input.trim() ? "#0A303D" : "#e4e4e7",
                color: "#fff", border: "none", cursor: input.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 150ms",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatBotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
