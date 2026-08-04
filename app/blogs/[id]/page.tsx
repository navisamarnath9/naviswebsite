"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const q = query(collection(db, "blogs"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
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

        const match = docs.find((item) => item.id === articleId) ?? defaultArticles.find((item) => item.id === articleId) ?? null;
        setArticle(match);
      } catch {
        setArticle(defaultArticles.find((item) => item.id === articleId) ?? null);
      } finally {
        setLoading(false);
      }
    }

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  return (
    <main id="top" className="blog-page">
      <Navbar />

      <div id="main-content" className="subpage-container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <Link className="button" href="/blogs">
              Back to Blogs
            </Link>
          </div>

          {loading ? (
            <p style={{ color: "var(--grey)" }}>Loading article...</p>
          ) : article ? (
            <article className="modal-content" style={{ margin: 0, maxWidth: "none" }}>
              <div className="blog-meta" style={{ marginBottom: "8px" }}>
                <span>{article.category}</span> · <span>{article.readTime}</span>
              </div>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: "12px", color: "var(--blue)" }}>{article.title}</h1>
              <div style={{ fontSize: "0.85rem", color: "var(--grey)", marginBottom: "28px" }}>Published on {article.date} by Navisamarnath</div>
              <div style={{ fontSize: "1.08rem", lineHeight: "1.8", color: "var(--grey)", whiteSpace: "pre-line" }}>
                {article.content}
              </div>
            </article>
          ) : (
            <div style={{ padding: "48px 24px", background: "#fff", border: "1px solid var(--line)", borderRadius: "16px" }}>
              <h1 style={{ marginTop: 0 }}>Article not found</h1>
              <p style={{ color: "var(--grey)" }}>The blog post you selected could not be loaded.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}