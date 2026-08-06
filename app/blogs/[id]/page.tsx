"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { defaultArticles, type BlogArticle } from "@/lib/blogArticles";

export default function BlogArticlePage() {
  const params = useParams<{ id: string }>();
  const articleId = params?.id;
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [allArticles, setAllArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track Reading Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchArticle() {
      try {
        let snapshot;
        try {
          const q = query(collection(db, "blogs"), orderBy("date", "desc"));
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
        setAllArticles(list);
        const match = list.find((item) => item.id === articleId) ?? null;
        setArticle(match);
      } catch {
        setAllArticles(defaultArticles);
        const match = defaultArticles.find((item) => item.id === articleId) ?? null;
        setArticle(match);
      } finally {
        setLoading(false);
      }
    }

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  // Get related articles (same category or recent, excluding current)
  const relatedArticles = allArticles
    .filter((a) => a.id !== articleId)
    .slice(0, 3);

  // Helper to render content with headings, lists, bold text and quotes
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split(/\n\n+/);

    return paragraphs.map((para, idx) => {
      const trimmed = para.trim();

      // Heading 3 (### Heading)
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            style={{
              fontSize: "1.45rem",
              fontWeight: 700,
              color: "#18181b",
              marginTop: "36px",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
              lineHeight: 1.35,
            }}
          >
            {trimmed.replace(/^###\s+/, "")}
          </h3>
        );
      }

      // Heading 2 (## Heading)
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={idx}
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#18181b",
              marginTop: "44px",
              marginBottom: "20px",
              letterSpacing: "-0.025em",
              lineHeight: 1.3,
            }}
          >
            {trimmed.replace(/^##\s+/, "")}
          </h2>
        );
      }

      // Blockquote (> Quote)
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote
            key={idx}
            style={{
              margin: "32px 0",
              padding: "20px 24px",
              background: "rgba(49, 72, 81, 0.05)",
              borderLeft: "4px solid var(--brand-accent)",
              borderRadius: "0 12px 12px 0",
              fontStyle: "italic",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "#27272a",
            }}
          >
            {trimmed.replace(/^>\s+/, "")}
          </blockquote>
        );
      }

      // List Items (- or 1.)
      if (trimmed.includes("\n- ") || trimmed.startsWith("- ") || /^\d+\.\s/.test(trimmed)) {
        const lines = trimmed.split("\n");
        return (
          <ul
            key={idx}
            style={{
              margin: "20px 0 28px 24px",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {lines.map((line, lIdx) => {
              const cleaned = line.replace(/^[-•*]\s+|\d+\.\s+/, "");
              // Parse **bold text**
              const parts = cleaned.split(/(\*\*.*?\*\*)/g);
              return (
                <li
                  key={lIdx}
                  style={{
                    fontSize: "1.08rem",
                    lineHeight: 1.75,
                    color: "#3f3f46",
                  }}
                >
                  {parts.map((part, pIdx) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={pIdx} style={{ color: "#18181b", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard Paragraph with bold text parsing
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <p
          key={idx}
          style={{
            fontSize: idx === 0 ? "1.18rem" : "1.08rem",
            lineHeight: idx === 0 ? 1.85 : 1.8,
            color: idx === 0 ? "#18181b" : "#3f3f46",
            fontWeight: idx === 0 ? 450 : 400,
            marginBottom: "24px",
          }}
        >
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={pIdx} style={{ color: "#18181b", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <main id="top" className="blog-reading-page" style={{ background: "var(--sample-paper)", minHeight: "100vh" }}>
      {/* READING PROGRESS BAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${scrollProgress}%`,
          background: "var(--brand-accent)",
          zIndex: 99999,
          transition: "width 100ms ease-out",
        }}
      />

      <Navbar />

      <div style={{ paddingTop: "110px", paddingBottom: "100px" }}>
        {/* ARTICLE HEADER CONTAINER */}
        <div style={{ maxWidth: "840px", margin: "0 auto", padding: "0 24px" }}>
          {/* BREADCRUMB & BACK ACTION */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "36px", flexWrap: "wrap", gap: "12px" }}>
            <Link
              href="/blogs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.86rem",
                fontWeight: 600,
                color: "var(--brand-accent)",
                textDecoration: "none",
                background: "rgba(49, 72, 81, 0.07)",
                padding: "8px 16px",
                borderRadius: "20px",
                transition: "background 200ms ease",
              }}
            >
              ← Back to all articles
            </Link>

            <button
              type="button"
              onClick={handleShare}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "1px solid var(--sample-line)",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--sample-muted)",
                cursor: "pointer",
              }}
            >
              {copied ? "✓ Link Copied!" : "↗ Share Article"}
            </button>
          </div>

          {loading ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "var(--sample-muted)" }}>
              <p style={{ fontSize: "1.1rem" }}>Loading article...</p>
            </div>
          ) : article ? (
            <>
              {/* ARTICLE META BADGES */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                <span
                  style={{
                    background: "var(--brand-accent)",
                    color: "#ffffff",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    padding: "4px 14px",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {article.category}
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--sample-muted)", fontWeight: 500 }}>
                  • {article.readTime}
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--sample-muted)", fontWeight: 500 }}>
                  • {article.date}
                </span>
              </div>

              {/* ARTICLE MAIN TITLE */}
              <h1
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                  fontWeight: 700,
                  color: "#18181b",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  marginBottom: "24px",
                }}
              >
                {article.title}
              </h1>

              {/* ARTICLE EXCERPT LEAD */}
              {article.excerpt && (
                <p
                  style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
                    lineHeight: 1.6,
                    color: "#475569",
                    marginBottom: "36px",
                    fontWeight: 450,
                  }}
                >
                  {article.excerpt}
                </p>
              )}

              {/* AUTHOR BYLINE BAR */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 20px",
                  background: "#ffffff",
                  border: "1px solid var(--sample-line)",
                  borderRadius: "16px",
                  marginBottom: "48px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ position: "relative", width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  <Image
                    src="/About - cut.jpg"
                    alt="Navisamarnath"
                    fill
                    unoptimized
                    style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  />
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "0.98rem", color: "#18181b" }}>Navisamarnath</strong>
                  <span style={{ fontSize: "0.82rem", color: "var(--sample-muted)" }}>
                    Registered Psychotherapist &amp; Certified Executive Coach
                  </span>
                </div>
              </div>

              {/* MAIN ARTICLE BODY CONTENT */}
              <div
                className="article-body-content"
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--sample-line)",
                  borderRadius: "24px",
                  padding: "clamp(28px, 5vw, 56px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.02)",
                }}
              >
                {renderFormattedContent(article.content)}
              </div>

              {/* AUTHOR BIO CARD FOOTER */}
              <div
                style={{
                  marginTop: "60px",
                  padding: "36px clamp(24px, 4vw, 40px)",
                  background: "rgba(49, 72, 81, 0.04)",
                  border: "1px solid rgba(49, 72, 81, 0.15)",
                  borderRadius: "20px",
                  display: "flex",
                  gap: "24px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ position: "relative", width: "76px", height: "76px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 6px 18px rgba(0,0,0,0.1)" }}>
                  <Image
                    src="/About - cut.jpg"
                    alt="Navisamarnath"
                    fill
                    unoptimized
                    style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--brand-accent)", display: "block", marginBottom: "4px" }}>
                    Written By
                  </span>
                  <h4 style={{ fontSize: "1.2rem", margin: "0 0 6px 0", color: "#18181b" }}>Navisamarnath</h4>
                  <p style={{ margin: "0 0 16px 0", fontSize: "0.92rem", color: "var(--sample-muted)", lineHeight: 1.55 }}>
                    Registered Psychotherapist, Certified Canadian Counsellor, and Certified Executive Coach. Dedicated to helping individuals and couples build resilience, heal past wounds, and create authentic personal growth.
                  </p>
                  <Link
                    href="/book-session"
                    style={{
                      fontSize: "0.86rem",
                      fontWeight: 700,
                      color: "var(--brand-accent)",
                      textDecoration: "none",
                      borderBottom: "1.5px solid var(--brand-accent)",
                      paddingBottom: "2px",
                    }}
                  >
                    Schedule a Consultation with Navisamarnath ↗
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: "60px 32px", background: "#ffffff", border: "1px solid var(--sample-line)", borderRadius: "20px", textAlign: "center" }}>
              <h1 style={{ fontSize: "1.8rem", margin: "0 0 12px 0", color: "#18181b" }}>Article Not Found</h1>
              <p style={{ color: "var(--sample-muted)", marginBottom: "24px" }}>The requested article could not be located.</p>
              <Link
                href="/blogs"
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
                Return to Articles Library ↗
              </Link>
            </div>
          )}
        </div>

        {/* RELATED ARTICLES SECTION */}
        {article && relatedArticles.length > 0 && (
          <div style={{ maxWidth: "1140px", margin: "80px auto 0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-accent)", display: "block", marginBottom: "6px" }}>
                  More Reflections &amp; Insights
                </span>
                <h2 style={{ fontSize: "1.8rem", margin: 0, color: "#18181b", letterSpacing: "-0.02em" }}>
                  Related Articles
                </h2>
              </div>
              <Link
                href="/blogs"
                style={{ fontSize: "0.9rem", color: "var(--brand-accent)", fontWeight: 600, textDecoration: "none" }}
              >
                View all articles ↗
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {relatedArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/blogs/${item.id}`}
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--sample-line)",
                    borderRadius: "16px",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    transition: "transform 220ms ease, box-shadow 220ms ease",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.015)",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--brand-accent)", marginBottom: "8px" }}>
                    {item.category} • {item.readTime}
                  </span>
                  <h3 style={{ fontSize: "1.15rem", color: "#18181b", margin: "0 0 10px 0", lineHeight: 1.35 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--sample-muted)", margin: "0 0 20px 0", lineHeight: 1.5, flex: 1 }}>
                    {item.excerpt}
                  </p>
                  <div style={{ marginTop: "auto", fontSize: "0.84rem", fontWeight: 600, color: "var(--brand-accent)", display: "flex", alignItems: "center", gap: "6px" }}>
                    Read article ↗
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}