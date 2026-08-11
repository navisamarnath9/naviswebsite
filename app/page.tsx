"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { defaultArticles, type BlogArticle } from "@/lib/blogArticles";
import { defaultPlaylists, type PlaylistThumbnail } from "@/lib/playlists";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

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

  // Playlists State (3 Featured Playlists)
  const [playlists, setPlaylists] = useState<PlaylistThumbnail[]>(defaultPlaylists);

  useEffect(() => {
    async function fetchLatestArticles() {
      try {
        let snapshot;
        try {
          const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(4));
          snapshot = await getDocs(q);
        } catch (orderErr) {
          console.warn("[Firestore] orderBy query failed, falling back to basic getDocs:", orderErr);
          snapshot = await getDocs(collection(db, "blogs"));
        }

        const docs: BlogArticle[] = [];
        snapshot.forEach((doc) => {
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
        const list = docs.length > 0 ? docs : defaultArticles;
        setLatestArticles(list.slice(0, 4));
      } catch (err) {
        console.error("Error fetching latest articles:", err);
        setLatestArticles(defaultArticles.slice(0, 4));
      } finally {
        setLoadingArticles(false);
      }
    }

    async function fetchPlaylists() {
      try {
        const docRef = doc(db, "settings", "playlists");
        const snapshot = await getDoc(docRef);
        if (snapshot.exists() && Array.isArray(snapshot.data().items)) {
          setPlaylists(snapshot.data().items);
        }
      } catch (err) {
        console.error("Error fetching playlists:", err);
      }
    }

    fetchLatestArticles();
    fetchPlaylists();
  }, []);

  const displayArticles = latestArticles;

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
  }, [loadingArticles, latestArticles, playlists]);

  return (
    <main className="sample-home home-page" id="top" ref={rootRef}>
      <a className="sample-skip" href="#home-content">
        Skip to main content
      </a>

      <Navbar />

      <section className="sample-hero" aria-labelledby="home-heading">
        <div className="sample-hero-media">
          <Image
            src="https://res.cloudinary.com/ndgpjcbs/image/upload/v1786116768/hero-navis-pic_uf9rl2.jpg"
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
                poster="/web. Intro. cover pic.jpg"
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
                    background: "rgba(49, 72, 81, 0.85)",
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
                    e.currentTarget.style.background = "#314851";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
                    e.currentTarget.style.background = "rgba(49, 72, 81, 0.85)";
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
                  <span className="service-card-index">{service.number}</span>
                  <span className="service-card-kind">Signature support</span>
                </div>
                <div className="service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <ul className="service-card-details" aria-label={`${service.title} focus areas`}>
                  {service.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <span className="service-read-more">
                  Explore service <span aria-hidden="true">→</span>
                </span>
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
            ) : displayArticles.length === 0 ? (
              <div style={{ padding: "40px 24px", textAlign: "center", color: "var(--sample-muted)", gridColumn: "1 / -1", border: "1px dashed var(--sample-line)", borderRadius: "14px" }}>
                <p style={{ margin: 0, fontSize: "0.95rem" }}>No blog articles published yet. Published articles will appear here.</p>
              </div>
            ) : (
              displayArticles.map((article) => (
                <Link
                  href={`/blogs/${article.id}`}
                  key={article.id}
                  className="sample-journal-card"
                  data-reveal
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    height: "100%",
                  }}
                >
                  <p className="sample-card-tag" style={{ margin: 0 }}>
                    {article.category} • {article.readTime}
                  </p>
                  <h3 style={{ fontSize: "1.3rem", lineHeight: "1.4", margin: "12px 0 8px 0" }}>
                    {article.title}
                  </h3>
                  <p className="sample-card-deck" style={{ flexGrow: 1, fontSize: "0.9rem", lineHeight: "1.6", color: "var(--sample-muted)", marginBottom: "20px" }}>
                    {article.excerpt}
                  </p>
                  <div className="sample-card-meta" style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderTop: "1px solid var(--sample-line)", paddingTop: "12px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--sample-muted)" }}>{article.date}</span>
                    <i aria-hidden="true" style={{ fontStyle: "normal", fontSize: "0.9rem", color: "var(--brand-accent)", fontWeight: 700 }}>↗</i>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* YOUTUBE PLAYLIST THUMBNAILS SECTION */}
        <section className="sample-section sample-video-series" id="videos" style={{ padding: "80px 24px", background: "var(--sample-paper)", borderTop: "1px solid var(--sample-line)" }}>
          <div className="sample-section-heading">
            <p className="sample-side-label" data-reveal>
              Playlists
            </p>
            <div data-reveal>
              <h2>From Reflection to Growth</h2>
            </div>
          </div>

          <div
            className="sample-video-series-grid"
            data-reveal
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "28px",
              marginTop: "48px",
            }}
          >
            {playlists.map((pl, idx) => (
              <a
                key={pl.id || idx}
                href={pl.playlistUrl || "https://www.youtube.com/@navisamarnath/playlists"}
                target="_blank"
                rel="noopener noreferrer"
                className="sample-video-card"
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--sample-line)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease",
                }}
              >
                {/* PLAYLIST THUMBNAIL */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "177.78%",
                    aspectRatio: "9 / 16",
                    background: "#0a0a0a",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={pl.imageUrl || "/homepage-video-thumbnail.png"}
                    alt={pl.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/homepage-video-thumbnail.png";
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 400ms ease",
                    }}
                  />
                  {/* PLAY OVERLAY BUTTON */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "rgba(49, 72, 81, 0.9)",
                      backdropFilter: "blur(6px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                      transition: "transform 200ms ease, background 200ms ease",
                    }}
                  >
                    <svg width="22" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "3px" }}>
                      <path d="M5 3L19 12L5 21V3Z" fill="#ffffff" />
                    </svg>
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      background: "rgba(0, 0, 0, 0.8)",
                      color: "#ffffff",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "4px 8px",
                      borderRadius: "6px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ▶ WATCH PLAYLIST
                  </span>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "1.15rem", margin: "0 0 8px 0", color: "#18181b", lineHeight: 1.35 }}>
                    {pl.title}
                  </h3>
                  {pl.description && (
                    <p style={{ fontSize: "0.88rem", color: "var(--sample-muted)", margin: "0 0 16px 0", lineHeight: 1.5, flex: 1 }}>
                      {pl.description}
                    </p>
                  )}
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 600, color: "var(--brand-accent)" }}>
                    <span>Open YouTube Playlist ↗</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--sample-muted)", fontWeight: 400 }}>YouTube</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <a
              href="https://www.youtube.com/@navisamarnath/playlists"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--brand-accent)",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                borderBottom: "1.5px solid var(--brand-accent)",
                paddingBottom: "4px",
              }}
            >
              Visit Navisamarnath YouTube Channel ↗
            </a>
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
                background: "#314851",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "1.05rem",
                boxShadow: "0 10px 25px rgba(49, 72, 81, 0.25)",
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
