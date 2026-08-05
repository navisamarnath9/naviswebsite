"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { defaultArticles, type BlogArticle } from "@/lib/blogArticles";

const services = [
  {
    number: "01",
    title: "Individual therapy",
    copy: "A private, thoughtful space to understand what is weighing on you and build steadier ways forward.",
    details: ["Anxiety & stress", "Burnout", "Life transitions"],
    href: "/services/individual",
    image: "/service-individual.png",
  },
  {
    number: "02",
    title: "Coaching",
    copy: "Focused support for meaningful ambitions, clearer decisions, and momentum that still feels like your own.",
    details: ["Clarity", "Confidence", "Purpose"],
    href: "/services/coaching",
    image: "/service-coaching.png",
  },
  {
    number: "03",
    title: "Couples/Family Therapy",
    copy: "Guided conversations that make room for honesty, repair recurring patterns, and deepen connection.",
    details: ["Communication", "Trust", "Connection"],
    href: "/services/couples",
    image: "/service-couples.png",
  },
  {
    number: "04",
    title: "Group sessions",
    copy: "Carefully facilitated spaces where shared experience becomes a source of perspective and support.",
    details: ["Community", "Resilience", "Growth"],
    href: "/services/groups",
    image: "/service-groups.png",
  },
];

const introWords = [
  { text: "Where", highlight: false },
  { text: "aspiration", highlight: false },
  { text: "meets", highlight: false },
  { text: "transformation.", highlight: false },
  { text: "A", highlight: false },
  { text: "space", highlight: false },
  { text: "to", highlight: false },
  { text: "embrace", highlight: false },
  { text: "continuous", highlight: false },
  { text: "personal", highlight: false },
  { text: "growth,", highlight: false },
  { text: "build", highlight: false },
  { text: "lasting", highlight: false },
  { text: "resilience,", highlight: false },
  { text: "and", highlight: false },
  { text: "unlock", highlight: true, brandColor: true },
  { text: "your", highlight: true, brandColor: true },
  { text: "fullest", highlight: true, brandColor: true },
  { text: "potential.", highlight: true, brandColor: true },
];

function ScrollRevealHeading() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the viewport:
      // Starts revealing when top enters 85% of viewport
      // Fully revealed when top reaches 35% of viewport
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.35;

      const current = rect.top;
      let rawProgress = (start - current) / (start - end);
      if (rawProgress < 0) rawProgress = 0;
      if (rawProgress > 1) rawProgress = 1;

      setScrollProgress(rawProgress);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalWords = introWords.length;

  return (
    <h2 className="scroll-reveal-h2" ref={containerRef}>
      {introWords.map((word, idx) => {
        const wordStart = idx / totalWords;
        const wordEnd = Math.min(1, (idx + 1.5) / totalWords);

        let wordProgress = (scrollProgress - wordStart) / (wordEnd - wordStart);
        if (wordProgress < 0) wordProgress = 0;
        if (wordProgress > 1) wordProgress = 1;

        // Opacity ranges from 0.2 (light version) to 1.0 (dark solid version)
        const opacity = 0.2 + 0.8 * wordProgress;

        return (
          <span
            key={idx}
            className={`scroll-word ${word.highlight ? "highlight-word" : ""} ${word.brandColor ? "brand-word" : ""}`}
            style={{
              opacity,
              transition: "opacity 160ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {word.text}{" "}
          </span>
        );
      })}
    </h2>
  );
}

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗"}</span>;
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [latestArticles, setLatestArticles] = useState<BlogArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function fetchLatestArticles() {
      try {
        const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(4));
        const querySnapshot = await getDocs(q);
        const docs: BlogArticle[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          docs.push({
            id: doc.id,
            title: data.title || "",
            category: data.category || "",
            readTime: data.readTime || "",
            date: data.date || "",
            excerpt: data.excerpt || "",
            content: data.content || "",
          });
        });
        setLatestArticles(docs);
      } catch (err) {
        console.error("Error fetching latest articles:", err);
      } finally {
        setLoadingArticles(false);
      }
    }
    fetchLatestArticles();
  }, []);

  const displayArticles = latestArticles.length > 0 ? latestArticles : defaultArticles.slice(0, 4);

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

    return () => {
      observer.disconnect();
    };
  }, [loadingArticles]);

  return (
    <main className="sample-home home-page" id="top" ref={rootRef}>
      <a className="sample-skip" href="#home-content">
        Skip to main content
      </a>

      <Navbar />

      <section className="sample-hero" aria-labelledby="home-heading">
        <div className="sample-hero-media">
          <Image
            src="/Antony.jpg"
            alt="Navisamarnath"
            fill
            priority
            unoptimized
            sizes="(max-width: 900px) 100vw, 55vw"
            className="sample-hero-img"
          />
        </div>

        <div className="sample-hero-grid">
          <div className="sample-hero-copy">
            <h1 id="home-heading">
              <small className="hero-lead">Step into your greater self.</small>
              <span>Where Aspiration Meets Transformation.</span>
            </h1>
          </div>


        </div>
      </section>

      <div className="sample-surface" id="home-content">
        <section className="sample-section mobile-intro-reel" id="intro-reel" style={{ padding: "80px 24px 0", background: "var(--sample-paper)" }}>
          <div className="intro-reel-inner" style={{ maxWidth: "1180px", margin: "0 auto" }}>

            {/* EDITORIAL LABEL + HEADING */}
            <div className="intro-reel-heading" data-reveal style={{ display: "flex", alignItems: "flex-start", gap: "clamp(24px, 4vw, 64px)", marginBottom: "48px", flexWrap: "wrap" }}>
              <div className="intro-reel-label" style={{ flex: "0 0 auto" }}>
                <span style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--brand-accent)",
                  fontWeight: 700,
                  display: "block",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  paddingTop: "4px",
                }}>
                  Inspired by Magis
                </span>
              </div>

              <div className="intro-reel-copy" style={{ flex: 1, minWidth: "280px" }}>
                <p style={{ fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-accent)", fontWeight: 700, margin: "0 0 16px 0" }}>
                  Seeking the Greater
                </p>
                <ScrollRevealHeading />
              </div>
            </div>

            {/* FULL-WIDTH 16:9 VIDEO */}
            <div
              className="intro-reel-video"
              data-reveal
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#0a0a0a",
                boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
              }}
            >
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/ndgpjcbs/video/upload/v1785835870/f_out_1_z2fwcd.mp4"
                poster="/homepage-video-thumbnail.png"
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                    } else {
                      videoRef.current.pause();
                    }
                  }
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 35%",
                  cursor: "pointer",
                }}
                aria-label="Navisamarnath Introduction — Inspired by Magis"
              />

              {/* Centered Play Button Overlay */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={() => videoRef.current?.play()}
                  aria-label="Play Introduction Video"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "76px",
                    height: "76px",
                    borderRadius: "50%",
                    background: "rgba(10, 48, 61, 0.85)",
                    backdropFilter: "blur(8px)",
                    border: "2px solid rgba(255, 255, 255, 0.5)",
                    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 10,
                    transition: "transform 200ms ease, background 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.08)";
                    e.currentTarget.style.background = "#0A303D";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
                    e.currentTarget.style.background = "rgba(10, 48, 61, 0.85)";
                  }}
                >
                  <svg
                    width="26"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "4px" }}
                  >
                    <path d="M5 3L19 12L5 21V3Z" fill="#ffffff" />
                  </svg>
                </button>
              )}

            </div>

          </div>
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
                <div className="sample-service-card-image">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="sample-card-img"
                  />
                </div>
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

        <section className="sample-journal sample-section">
          <div className="sample-section-heading">
            <p className="sample-side-label" data-reveal>
              Blogs
            </p>
            <div data-reveal>
              <p className="sample-overline">Recent writing</p>
              <h2>Ideas, reflections, and practical tools.</h2>
            </div>
          </div>

          <div className="sample-journal-grid">
            {loadingArticles ? (
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="sample-service-card" style={{ opacity: 0.6, padding: "24px", minHeight: "180px", background: "var(--white)", border: "1px solid var(--line)", borderRadius: "12px" }}>
                  <div style={{ height: "14px", width: "40%", background: "var(--line)", borderRadius: "4px", marginBottom: "12px" }} />
                  <div style={{ height: "22px", width: "80%", background: "var(--line)", borderRadius: "4px", marginBottom: "12px" }} />
                  <div style={{ height: "14px", width: "100%", background: "var(--line)", borderRadius: "4px" }} />
                </div>
              ))
            ) : (
              displayArticles.map((article) => (
                <Link href={`/blogs/${article.id}`} key={article.id} data-reveal style={{ display: "flex", flexDirection: "column", border: "1px solid var(--line)" }}>
                  <span>{article.category} · {article.readTime}</span>
                  <h3>{article.title}</h3>
                  <p style={{ marginTop: "auto" }}>{article.excerpt}</p>
                  <i>↗</i>
                </Link>
              ))
            )}
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
            <Link
              href="/book-session"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "24px",
                padding: "16px 36px",
                borderRadius: "999px",
                background: "#0A303D",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "1.05rem",
                boxShadow: "0 10px 25px rgba(10, 48, 61, 0.25)",
                textDecoration: "none",
                transition: "transform 200ms ease, background 200ms ease",
              }}
            >
              Request a consultation <Arrow />
            </Link>
          </div>
        </section>
      </div>

      <div className="sample-footer">
        <Footer />
      </div>
    </main>
  );
}
