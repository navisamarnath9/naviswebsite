"use client";

import { useState, useEffect, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { YouTubeVideo, getYouTubeVideoId, getYouTubeThumbnail } from "@/lib/videoSeries";

const ADMIN_EMAIL = "navisamarnathtech@gmail.com";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  appointmentDate: string;
  appointmentTime?: string;
  note?: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signedInEmail, setSignedInEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"bookings" | "blogs" | "videos">("bookings");

  // Blog State
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isBlogSaving, setIsBlogSaving] = useState(false);
  const [blogStatusMsg, setBlogStatusMsg] = useState("");

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // YouTube Videos State
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [editingVideo, setEditingVideo] = useState<Partial<YouTubeVideo> | null>(null);
  const [isVideoSaving, setIsVideoSaving] = useState(false);
  const [videoStatusMsg, setVideoStatusMsg] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user?.email) {
        setIsAuthenticated(false);
        setSignedInEmail("");
        return;
      }

      if (user.email.toLowerCase() !== ADMIN_EMAIL) {
        setAuthError(`Email ${user.email} is not authorized. Please sign in with ${ADMIN_EMAIL}.`);
        setIsAuthenticated(false);
        setSignedInEmail("");
        await signOut(auth);
        return;
      }

      setSignedInEmail(user.email);
      setIsAuthenticated(true);
      setAuthError("");
    });

    return unsubscribe;
  }, []);

  // Fetch blogs, bookings & videos when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchArticles();
    fetchBookings();
    fetchVideos();
  }, [isAuthenticated]);

  const handleGoogleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
    } catch (err) {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
      } catch (fallbackErr) {
        const message = fallbackErr instanceof Error ? fallbackErr.message : "Unable to sign in with Google.";
        setAuthError(message);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSignedInEmail("");
    signOut(auth).catch(() => undefined);
  };

  // Fetch articles from Firestore
  async function fetchArticles() {
    try {
      const q = query(collection(db, "blogs"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const docs: Article[] = [];
      snapshot.forEach((d) => {
        docs.push({ id: d.id, ...(d.data() as Omit<Article, "id">) });
      });

      setArticles(docs);
    } catch (err) {
      console.warn("Firestore fetch error:", err);
      setArticles([]);
    }
  }

  // Fetch bookings from Firestore
  async function fetchBookings() {
    setLoadingBookings(true);
    try {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const docs: Booking[] = [];
      snapshot.forEach((d) => {
        docs.push({ id: d.id, ...(d.data() as Omit<Booking, "id">) });
      });
      setBookings(docs);
    } catch (err) {
      console.warn("Bookings fetch error:", err);
    } finally {
      setLoadingBookings(false);
    }
  }

  // Fetch YouTube Videos from Firestore
  async function fetchVideos() {
    try {
      const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const docs: YouTubeVideo[] = [];
      snapshot.forEach((d) => {
        docs.push({ id: d.id, ...(d.data() as Omit<YouTubeVideo, "id">) });
      });
      setVideos(docs);
    } catch (err) {
      console.warn("Videos fetch error:", err);
      setVideos([]);
    }
  }

  // Save YouTube Video Link (Create or Edit)
  async function saveVideo(e: FormEvent) {
    e.preventDefault();
    if (!editingVideo || !editingVideo.youtubeUrl || !editingVideo.title) return;

    const youtubeId = getYouTubeVideoId(editingVideo.youtubeUrl);
    if (!youtubeId) {
      setVideoStatusMsg("⚠️ Please enter a valid YouTube video link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser?.email || currentUser.email.toLowerCase() !== ADMIN_EMAIL) {
      setVideoStatusMsg(`Please sign in with ${ADMIN_EMAIL} before saving.`);
      return;
    }

    await currentUser.getIdToken(true).catch(() => undefined);

    setIsVideoSaving(true);
    setVideoStatusMsg("");

    const docId = editingVideo.id || `video-${Date.now()}`;
    const payload: Omit<YouTubeVideo, "id"> = {
      youtubeUrl: editingVideo.youtubeUrl,
      title: editingVideo.title,
      description: editingVideo.description || "",
      createdAt: editingVideo.createdAt || new Date().toISOString().split("T")[0],
    };

    try {
      await setDoc(doc(db, "videos", docId), payload);
      setVideoStatusMsg("✓ YouTube Video link saved successfully!");
      setEditingVideo(null);
      fetchVideos();
    } catch (err: any) {
      setVideoStatusMsg("Error saving video link: " + err.message);
    } finally {
      setIsVideoSaving(false);
    }
  }

  // Delete YouTube Video Link
  async function deleteVideo(id: string) {
    if (!confirm(`Are you sure you want to remove this video link?`)) return;
    try {
      await deleteDoc(doc(db, "videos", id));
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (err: any) {
      alert("Error deleting video link: " + err.message);
    }
  }

  // Save Blog Article (Create or Edit)
  async function saveArticle(e: FormEvent) {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;

    const currentUser = auth.currentUser;
    if (!currentUser?.email || currentUser.email.toLowerCase() !== ADMIN_EMAIL) {
      setBlogStatusMsg(`Please sign in with ${ADMIN_EMAIL} before saving.`);
      return;
    }

    await currentUser.getIdToken(true).catch(() => undefined);

    setIsBlogSaving(true);
    setBlogStatusMsg("");

    const slug =
      editingArticle.id ||
      editingArticle.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const payload: Omit<Article, "id"> = {
      title: editingArticle.title || "",
      category: editingArticle.category || "General",
      readTime: editingArticle.readTime || "5 min read",
      date: editingArticle.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      excerpt: editingArticle.excerpt || "",
      content: editingArticle.content || "",
    };

    try {
      await setDoc(doc(db, "blogs", slug), payload);
      setBlogStatusMsg("✓ Article saved successfully!");
      setEditingArticle(null);
      fetchArticles();
    } catch (err: any) {
      setBlogStatusMsg("Error saving article: " + err.message);
    } finally {
      setIsBlogSaving(false);
    }
  }

  // Delete Blog Article
  async function deleteArticle(id: string) {
    if (!confirm(`Are you sure you want to delete article "${id}"?`)) return;
    try {
      await deleteDoc(doc(db, "blogs", id));
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert("Error deleting article: " + err.message);
    }
  }

  // Update Booking Status
  async function updateBookingStatus(
    id: string,
    newStatus: Booking["status"]
  ) {
    try {
      const target = bookings.find((b) => b.id === id);
      if (!target) return;

      const updated = { ...target, status: newStatus };
      await setDoc(doc(db, "bookings", id), updated);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err: any) {
      alert("Error updating booking status: " + err.message);
    }
  }

  // Delete Booking
  async function deleteBooking(id: string) {
    if (!confirm("Are you sure you want to remove this booking request?")) return;
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      alert("Error deleting booking: " + err.message);
    }
  }

  if (!isAuthenticated) {
    return (
      <main id="top" className="sample-home">
        <Navbar />
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid var(--sample-line)",
              borderRadius: "20px",
              padding: "44px 36px",
              maxWidth: "440px",
              width: "100%",
              boxShadow: "0 12px 40px rgba(0,0,0,0.04)",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "1.8rem", margin: "0 0 8px 0", color: "var(--sample-ink)", letterSpacing: "-0.02em" }}>
              Admin sign in
            </h1>
            <p style={{ margin: "0 0 24px 0", color: "var(--sample-muted)", fontSize: "0.95rem" }}>
              Use the Google account linked to this admin panel.
            </p>

            <form onSubmit={handleGoogleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {authError && (
                <p style={{ color: "#dc2626", fontSize: "0.84rem", margin: 0 }}>{authError}</p>
              )}

              <button
                type="submit"
                style={{
                  background: "var(--brand-accent)",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "opacity 200ms ease",
                }}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main id="top" className="sample-home">
      <Navbar />

      {/* HEADER BAR */}
      <section className="about-top-hero" style={{ minHeight: "auto", paddingBottom: "36px" }}>
        <div className="about-top-hero-copy">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 className="about-hero-title" style={{ marginBottom: "6px" }}>Admin</h1>
              <p style={{ margin: 0, color: "var(--sample-muted)", fontSize: "0.95rem" }}>
                Manage bookings and blog posts.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--sample-muted)" }}>
                {signedInEmail}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  background: "rgba(0,0,0,0.06)",
                  color: "#18181b",
                  border: "1px solid var(--sample-line)",
                  padding: "8px 18px",
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      <div id="main-content" className="sample-surface">
        <section className="sample-section" style={{ padding: "60px 24px" }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
            {/* ADMIN MODULE TABS */}
            <div className="credentials-filter-tabs" style={{ marginBottom: "48px", justifyContent: "flex-start" }}>
              <button
                type="button"
                className={`credentials-filter-btn ${activeTab === "bookings" ? "is-active" : ""}`}
                onClick={() => setActiveTab("bookings")}
              >
                Bookings ({bookings.length})
              </button>
              <button
                type="button"
                className={`credentials-filter-btn ${activeTab === "blogs" ? "is-active" : ""}`}
                onClick={() => setActiveTab("blogs")}
              >
                Blog posts ({articles.length})
              </button>
              <button
                type="button"
                className={`credentials-filter-btn ${activeTab === "videos" ? "is-active" : ""}`}
                onClick={() => setActiveTab("videos")}
              >
                YouTube Videos ({videos.length})
              </button>
            </div>

            {/* TAB 1: CONSULTATION BOOKINGS */}
            {activeTab === "bookings" && (
              <div style={{ background: "#ffffff", border: "1px solid var(--sample-line)", borderRadius: "20px", padding: "clamp(24px, 4vw, 40px)", boxShadow: "0 8px 30px rgba(0,0,0,0.015)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid var(--sample-line)", flexWrap: "wrap", gap: "16px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px 0", color: "#18181b", letterSpacing: "-0.02em" }}>
                      Incoming Client Appointments
                    </h2>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--sample-muted)" }}>
                      Live consultation requests submitted via website booking forms.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fetchBookings}
                    style={{
                      background: "rgba(10, 48, 61, 0.08)",
                      color: "var(--brand-accent)",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Refresh
                  </button>
                </div>

                {loadingBookings ? (
                  <p style={{ color: "var(--sample-muted)", fontSize: "0.95rem" }}>Loading appointments from Firestore...</p>
                ) : bookings.length === 0 ? (
                  <div style={{ padding: "48px", textAlign: "center", color: "var(--sample-muted)", background: "#fcfcfb", borderRadius: "14px", border: "1px solid var(--sample-line)" }}>
                    <p style={{ fontSize: "1.1rem", margin: "0 0 8px 0" }}>No consultation requests received yet.</p>
                    <p style={{ fontSize: "0.88rem", margin: 0 }}>New booking submissions from the website will appear here in real-time.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid var(--sample-line)", color: "var(--sample-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          <th style={{ padding: "12px 16px" }}>Client</th>
                          <th style={{ padding: "12px 16px" }}>WhatsApp / Phone</th>
                          <th style={{ padding: "12px 16px" }}>Email</th>
                          <th style={{ padding: "12px 16px" }}>Session Type</th>
                          <th style={{ padding: "12px 16px" }}>Status</th>
                          <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => {
                          const cleanPhone = booking.phone?.replace(/[^0-9+]/g, "");
                          const waLink = cleanPhone ? `https://wa.me/${cleanPhone.replace("+", "")}` : null;

                          return (
                            <tr key={booking.id} style={{ borderBottom: "1px solid var(--sample-line)" }}>
                              <td style={{ padding: "16px", fontWeight: 600, color: "#18181b" }}>
                                {booking.name || "Anonymous Client"}
                                <span style={{ display: "block", fontSize: "0.75rem", color: "var(--sample-muted)", fontWeight: 400 }}>
                                  {new Date(booking.createdAt).toLocaleDateString()}
                                </span>
                              </td>
                              <td style={{ padding: "16px", color: "#18181b" }}>
                                {booking.phone || "—"}
                              </td>
                              <td style={{ padding: "16px", color: "var(--sample-muted)" }}>
                                {booking.email || "—"}
                              </td>
                              <td style={{ padding: "16px", color: "#18181b", fontWeight: 500 }}>
                                {booking.sessionType}
                              </td>
                              <td style={{ padding: "16px" }}>
                                <select
                                  value={booking.status || "requested"}
                                  onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                                  style={{
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    border: "none",
                                    background:
                                      booking.status === "confirmed"
                                        ? "#dbeafe"
                                        : booking.status === "completed"
                                        ? "#dcfce7"
                                        : booking.status === "cancelled"
                                        ? "#fee2e2"
                                        : "#fef3c7",
                                    color:
                                      booking.status === "confirmed"
                                        ? "#1e40af"
                                        : booking.status === "completed"
                                        ? "#166534"
                                        : booking.status === "cancelled"
                                        ? "#991b1b"
                                        : "#92400e",
                                    cursor: "pointer",
                                  }}
                                >
                                  <option value="requested">Requested</option>
                                              <option value="confirmed">Confirmed</option>
                                              <option value="completed">Completed</option>
                                              <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td style={{ padding: "16px", textAlign: "right" }}>
                                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", alignItems: "center" }}>
                                  {waLink && (
                                    <a
                                      href={waLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        background: "#25D366",
                                        color: "#ffffff",
                                        padding: "6px 12px",
                                        borderRadius: "16px",
                                        fontSize: "0.78rem",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                      }}
                                    >
                                      WhatsApp 💬
                                    </a>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => deleteBooking(booking.id)}
                                    style={{
                                      background: "none",
                                      border: "1px solid #fca5a5",
                                      color: "#dc2626",
                                      padding: "6px 12px",
                                      borderRadius: "16px",
                                      fontSize: "0.78rem",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: BLOG ARTICLES */}
            {activeTab === "blogs" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                {/* CREATE / EDIT FORM */}
                <div style={{ background: "#ffffff", border: "1px solid var(--sample-line)", borderRadius: "20px", padding: "clamp(24px, 4vw, 40px)", boxShadow: "0 8px 30px rgba(0,0,0,0.015)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid var(--sample-line)" }}>
                    <h2 style={{ fontSize: "1.5rem", margin: 0, color: "#18181b" }}>
                      {editingArticle ? `Edit Article: "${editingArticle.title}"` : "Create New Blog Post"}
                    </h2>
                    {editingArticle && (
                      <button
                        type="button"
                        onClick={() => setEditingArticle(null)}
                        style={{ background: "none", border: "none", color: "var(--sample-muted)", cursor: "pointer", fontSize: "0.85rem", textDecoration: "underline" }}
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  <form onSubmit={saveArticle} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                      <div>
                        <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--sample-muted)", display: "block", marginBottom: "6px" }}>
                          Article Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingArticle?.title || ""}
                          onChange={(e) => setEditingArticle((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Breaking the Cycle of High-Functioning Burnout"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--sample-line)", fontSize: "0.92rem" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--sample-muted)", display: "block", marginBottom: "6px" }}>
                          Category Tag
                        </label>
                        <input
                          type="text"
                          value={editingArticle?.category || ""}
                          onChange={(e) => setEditingArticle((prev) => ({ ...prev, category: e.target.value }))}
                          placeholder="e.g. Burnout & Purpose, Relationships, Anxiety"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--sample-line)", fontSize: "0.92rem" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--sample-muted)", display: "block", marginBottom: "6px" }}>
                          Read Time
                        </label>
                        <input
                          type="text"
                          value={editingArticle?.readTime || ""}
                          onChange={(e) => setEditingArticle((prev) => ({ ...prev, readTime: e.target.value }))}
                          placeholder="e.g. 5 min read"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--sample-line)", fontSize: "0.92rem" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--sample-muted)", display: "block", marginBottom: "6px" }}>
                          Publish Date
                        </label>
                        <input
                          type="text"
                          value={editingArticle?.date || ""}
                          onChange={(e) => setEditingArticle((prev) => ({ ...prev, date: e.target.value }))}
                          placeholder="e.g. August 4, 2026"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--sample-line)", fontSize: "0.92rem" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--sample-muted)", display: "block", marginBottom: "6px" }}>
                        Short Excerpt / Teaser *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingArticle?.excerpt || ""}
                        onChange={(e) => setEditingArticle((prev) => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Brief 1-2 sentence summary displayed on the blog list cards"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--sample-line)", fontSize: "0.92rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--sample-muted)", display: "block", marginBottom: "6px" }}>
                        Full Article Content (Markdown supported) *
                      </label>
                      <textarea
                        required
                        rows={10}
                        value={editingArticle?.content || ""}
                        onChange={(e) => setEditingArticle((prev) => ({ ...prev, content: e.target.value }))}
                        placeholder="Write article content here. Use ### Headings, bullet points, and paragraphs..."
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--sample-line)", fontSize: "0.92rem", fontFamily: "inherit", lineHeight: 1.6 }}
                      />
                    </div>

                    {blogStatusMsg && (
                      <p style={{ fontSize: "0.88rem", fontWeight: 600, color: blogStatusMsg.startsWith("✓") ? "#166534" : "#dc2626", margin: 0 }}>
                        {blogStatusMsg}
                      </p>
                    )}

                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        type="submit"
                        disabled={isBlogSaving}
                        style={{
                          background: "var(--brand-accent)",
                          color: "#ffffff",
                          border: "none",
                          padding: "10px 24px",
                          borderRadius: "20px",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {isBlogSaving ? "Saving..." : editingArticle ? "Update article" : "Publish article"}
                      </button>

                    </div>
                  </form>
                </div>

                {/* PUBLISHED BLOG POSTS LIST */}
                <div style={{ background: "#ffffff", border: "1px solid var(--sample-line)", borderRadius: "20px", padding: "clamp(24px, 4vw, 40px)", boxShadow: "0 8px 30px rgba(0,0,0,0.015)" }}>
                  <h2 style={{ fontSize: "1.5rem", margin: "0 0 24px 0", color: "#18181b", paddingBottom: "16px", borderBottom: "1px solid var(--sample-line)" }}>
                    Published Blog Posts ({articles.length})
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {articles.map((art) => (
                      <div
                        key={art.id}
                        style={{
                          background: "#fcfcfb",
                          border: "1px solid var(--sample-line)",
                          borderRadius: "14px",
                          padding: "20px 24px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "20px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ maxWidth: "800px" }}>
                          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                            <span style={{ fontSize: "0.72rem", background: "rgba(10, 48, 61, 0.08)", color: "var(--brand-accent)", padding: "4px 10px", borderRadius: "20px", fontWeight: 700 }}>
                              {art.category}
                            </span>
                            <span style={{ fontSize: "0.78rem", color: "var(--sample-muted)" }}>
                              {art.date} &bull; {art.readTime}
                            </span>
                          </div>
                          <h3 style={{ fontSize: "1.15rem", margin: "0 0 6px 0", color: "#18181b" }}>
                            {art.title}
                          </h3>
                          <p style={{ fontSize: "0.88rem", color: "var(--sample-muted)", margin: 0, lineHeight: 1.5 }}>
                            {art.excerpt}
                          </p>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            type="button"
                            onClick={() => setEditingArticle(art)}
                            style={{
                              background: "rgba(10, 48, 61, 0.08)",
                              color: "var(--brand-accent)",
                              border: "none",
                              padding: "8px 16px",
                              borderRadius: "16px",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteArticle(art.id)}
                            style={{
                              background: "none",
                              border: "1px solid #fca5a5",
                              color: "#dc2626",
                              padding: "8px 16px",
                              borderRadius: "16px",
                              fontSize: "0.82rem",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: YOUTUBE VIDEOS */}
            {activeTab === "videos" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* VIDEO EDIT / CREATE FORM */}
                {editingVideo && (
                  <div
                    style={{
                      background: "#ffffff",
                      border: "1px solid var(--brand-accent-border)",
                      borderRadius: "20px",
                      padding: "clamp(24px, 4vw, 36px)",
                      boxShadow: "0 12px 36px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <h2 style={{ fontSize: "1.4rem", margin: 0, color: "#18181b" }}>
                        {editingVideo.id ? "Edit YouTube Video Link" : "Add New YouTube Video Link"}
                      </h2>
                      <button
                        type="button"
                        onClick={() => { setEditingVideo(null); setVideoStatusMsg(""); }}
                        style={{ background: "none", border: "none", color: "var(--sample-muted)", cursor: "pointer", fontSize: "1.2rem" }}
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={saveVideo} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 700, marginBottom: "6px", color: "#18181b" }}>
                          YouTube Video URL *
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                          value={editingVideo.youtubeUrl || ""}
                          onChange={(e) => setEditingVideo({ ...editingVideo, youtubeUrl: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            border: "1px solid var(--sample-line)",
                            fontSize: "0.92rem",
                          }}
                        />
                      </div>

                      {/* LIVE THUMBNAIL PREVIEW */}
                      {editingVideo.youtubeUrl && getYouTubeVideoId(editingVideo.youtubeUrl) && (
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                          <img
                            src={getYouTubeThumbnail(editingVideo.youtubeUrl)}
                            alt="YouTube Thumbnail Preview"
                            style={{ width: "120px", height: "68px", borderRadius: "8px", objectFit: "cover" }}
                          />
                          <div>
                            <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 700, textTransform: "uppercase" }}>✓ Valid YouTube Video ID</span>
                            <p style={{ margin: "2px 0 0 0", fontSize: "0.82rem", color: "#475569" }}>
                              ID: <code>{getYouTubeVideoId(editingVideo.youtubeUrl)}</code>
                            </p>
                          </div>
                        </div>
                      )}

                      <div>
                        <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 700, marginBottom: "6px", color: "#18181b" }}>
                          Video Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Episode 1: Where Aspiration Meets Transformation"
                          value={editingVideo.title || ""}
                          onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            border: "1px solid var(--sample-line)",
                            fontSize: "0.92rem",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 700, marginBottom: "6px", color: "#18181b" }}>
                          Short Description (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Brief summary or key takeaways from this video episode..."
                          value={editingVideo.description || ""}
                          onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            border: "1px solid var(--sample-line)",
                            fontSize: "0.92rem",
                            resize: "vertical",
                          }}
                        />
                      </div>

                      {videoStatusMsg && (
                        <p style={{ margin: 0, fontSize: "0.9rem", color: videoStatusMsg.startsWith("✓") ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                          {videoStatusMsg}
                        </p>
                      )}

                      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                        <button
                          type="submit"
                          disabled={isVideoSaving}
                          style={{
                            background: "var(--brand-accent)",
                            color: "#ffffff",
                            border: "none",
                            padding: "12px 28px",
                            borderRadius: "12px",
                            fontSize: "0.92rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            opacity: isVideoSaving ? 0.7 : 1,
                          }}
                        >
                          {isVideoSaving ? "Saving..." : "Save Video Link"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setEditingVideo(null); setVideoStatusMsg(""); }}
                          style={{
                            background: "none",
                            border: "1px solid var(--sample-line)",
                            color: "var(--sample-muted)",
                            padding: "12px 24px",
                            borderRadius: "12px",
                            fontSize: "0.92rem",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* YOUTUBE VIDEOS LIST */}
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--sample-line)",
                    borderRadius: "20px",
                    padding: "clamp(24px, 4vw, 40px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.015)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid var(--sample-line)", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px 0", color: "#18181b", letterSpacing: "-0.02em" }}>
                        YouTube Video Series
                      </h2>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--sample-muted)" }}>
                        Add and manage YouTube video links displayed on the home page.
                      </p>
                    </div>
                    {!editingVideo && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingVideo({ title: "", youtubeUrl: "", description: "" });
                          setVideoStatusMsg("");
                        }}
                        style={{
                          background: "var(--brand-accent)",
                          color: "#ffffff",
                          border: "none",
                          padding: "12px 24px",
                          borderRadius: "12px",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        + Add YouTube Video Link
                      </button>
                    )}
                  </div>

                  {videos.length === 0 ? (
                    <div style={{ padding: "48px", textAlign: "center", color: "var(--sample-muted)", background: "#fcfcfb", borderRadius: "14px", border: "1px solid var(--sample-line)" }}>
                      <p style={{ fontSize: "1.1rem", margin: "0 0 8px 0" }}>No YouTube videos added yet.</p>
                      <p style={{ fontSize: "0.88rem", margin: 0 }}>Click "+ Add YouTube Video Link" above to add your first episode.</p>
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
                      {videos.map((vid) => (
                        <div
                          key={vid.id}
                          style={{
                            background: "#fafafa",
                            border: "1px solid var(--sample-line)",
                            borderRadius: "16px",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            transition: "transform 200ms ease, box-shadow 200ms ease",
                          }}
                        >
                          <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#0a0a0a" }}>
                            <img
                              src={getYouTubeThumbnail(vid.youtubeUrl)}
                              alt={vid.title}
                              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.75)", color: "#fff", padding: "4px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 700 }}>
                              ▶ YouTube
                            </div>
                          </div>

                          <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                            <h3 style={{ fontSize: "1.05rem", margin: "0 0 8px 0", color: "#18181b", lineHeight: 1.35 }}>
                              {vid.title}
                            </h3>
                            {vid.description && (
                              <p style={{ fontSize: "0.84rem", color: "var(--sample-muted)", margin: "0 0 16px 0", lineHeight: 1.5, flex: 1 }}>
                                {vid.description}
                              </p>
                            )}

                            <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <a
                                href={vid.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "0.8rem", color: "var(--brand-accent)", fontWeight: 600, textDecoration: "none" }}
                              >
                                Watch on YouTube ↗
                              </a>

                              <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                  type="button"
                                  onClick={() => setEditingVideo(vid)}
                                  style={{
                                    background: "rgba(49, 72, 81, 0.08)",
                                    color: "var(--brand-accent)",
                                    border: "none",
                                    padding: "6px 14px",
                                    borderRadius: "12px",
                                    fontSize: "0.78rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteVideo(vid.id)}
                                  style={{
                                    background: "none",
                                    border: "1px solid #fca5a5",
                                    color: "#dc2626",
                                    padding: "6px 14px",
                                    borderRadius: "12px",
                                    fontSize: "0.78rem",
                                    cursor: "pointer",
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
