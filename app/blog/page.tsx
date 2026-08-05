"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogArticle } from "@/lib/blogArticles";

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        let querySnapshot;
        try {
          const q = query(collection(db, "blogs"), orderBy("date", "desc"));
          querySnapshot = await getDocs(q);
        } catch (orderErr) {
          console.warn("[Firestore] orderBy query failed, falling back to basic getDocs:", orderErr);
          querySnapshot = await getDocs(collection(db, "blogs"));
        }

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
        setArticles(docs);
      } catch (err) {
        console.error("Error fetching articles from Firestore:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Could not connect to Firestore. Please verify your config."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  }

  return (
    <main id="top" className="blog-page">
      <Navbar />

      <div id="main-content">
        {/* BANNER */}
        <section className="page-banner">
          <span className="kicker">Insights & Reflections</span>
          <h1>
            Perspectives on <em>growth & connection.</em>
          </h1>
          <p className="page-lead">
            Articles on psychology, emotional regulation, relationships, and sustainable living written by Navisamarnath.
          </p>
        </section>

        <section className="subpage-container">
          {/* SEARCH & FILTERS */}
          <div className="faq-search-box">
            <span className="faq-search-icon">🔍</span>
            <input
              type="text"
              className="faq-search-input"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* ERROR STATUS */}
          {error && (
            <div style={{ background: "rgba(220, 53, 69, 0.1)", border: "1px solid rgba(220, 53, 69, 0.3)", padding: "20px 24px", borderRadius: "16px", marginBottom: "32px", color: "#dc3545" }}>
              <p style={{ fontWeight: 600, marginBottom: "8px", margin: 0 }}>⚠️ Firestore Database Error</p>
              <p style={{ fontSize: "0.92rem", margin: "4px 0 0 0", color: "var(--grey)" }}>{error}</p>
              <p style={{ fontSize: "0.85rem", marginTop: "12px", color: "var(--grey)", margin: "12px 0 0 0" }}>
                Make sure you have created a <code>.env.local</code> file based on <code>.env.example</code> containing your Firebase project configuration credentials.
              </p>
            </div>
          )}

          {/* ARTICLES GRID */}
          {loading ? (
            <>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes pulse {
                  0%, 100% { opacity: 0.6; }
                  50% { opacity: 1; }
                }
              `}} />
              <div className="sample-journal-grid" style={{ marginTop: "40px" }}>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div className="sample-journal-card" key={idx} style={{ animation: "pulse 1.5s infinite ease-in-out", minHeight: "240px" }}>
                    <div style={{ height: "14px", width: "30%", background: "var(--line)", borderRadius: "4px", marginBottom: "16px" }} />
                    <div style={{ height: "24px", width: "80%", background: "var(--line)", borderRadius: "4px", marginBottom: "16px" }} />
                    <div style={{ height: "14px", width: "100%", background: "var(--line)", borderRadius: "4px", marginBottom: "8px" }} />
                    <div style={{ height: "14px", width: "90%", background: "var(--line)", borderRadius: "4px", marginBottom: "24px" }} />
                    <div className="sample-card-meta" style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderTop: "1px solid var(--line)", paddingTop: "12px" }}>
                      <div style={{ height: "12px", width: "40%", background: "var(--line)", borderRadius: "4px" }} />
                      <div style={{ height: "12px", width: "10%", background: "var(--line)", borderRadius: "4px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : articles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--sample-muted)", border: "1px dashed var(--sample-line)", borderRadius: "16px" }}>
              <p style={{ fontSize: "1.1rem", margin: 0 }}>No articles published yet. Published articles will appear here.</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--grey)" }}>
              <p style={{ fontSize: "1.2rem" }}>No articles found matching your criteria.</p>
              <button
                type="button"
                className="button button-light"
                onClick={() => setSearchQuery("")}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="sample-journal-grid" style={{ marginTop: "40px" }}>
              {filteredArticles.map((article) => (
                <Link
                  className="sample-journal-card"
                  key={article.id}
                  href={`/blogs/${article.id}`}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    border: "1px solid var(--line)",
                  }}
                >
                  <p className="sample-card-tag">{article.category}</p>
                  <h3 style={{ fontSize: "1.35rem", lineHeight: "1.4", margin: "12px 0", color: "var(--sample-ink)", fontFamily: "var(--display)" }}>{article.title}</h3>
                  <p className="sample-card-deck" style={{ flexGrow: 1, fontSize: "0.88rem", lineHeight: "1.6", color: "var(--sample-muted)", marginBottom: "24px" }}>{article.excerpt}</p>
                  <div className="sample-card-meta" style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderTop: "1px solid var(--sample-line)", paddingTop: "12px" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--sample-muted)" }}>{article.readTime} · {article.date}</span>
                    <i aria-hidden="true" style={{ fontSize: "0.85rem", color: "var(--sample-ink)", fontStyle: "normal" }}>→</i>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
