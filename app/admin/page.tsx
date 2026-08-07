"use client";

import { useState, useEffect, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { PlaylistThumbnail, defaultPlaylists } from "@/lib/playlists";

const ALLOWED_ADMIN_EMAILS = [
  "navisamarnathtech@gmail.com",
  ...(process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : []),
];

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
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"bookings" | "blogs" | "playlists">("bookings");

  // Blog State
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isBlogSaving, setIsBlogSaving] = useState(false);
  const [blogStatusMsg, setBlogStatusMsg] = useState("");

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Playlists State (3 Playlists)
  const [playlists, setPlaylists] = useState<PlaylistThumbnail[]>(defaultPlaylists);
  const [isPlaylistSaving, setIsPlaylistSaving] = useState(false);
  const [playlistStatusMsg, setPlaylistStatusMsg] = useState("");


  // Listen to Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoggingIn(false);
      if (!user?.email) {
        setIsAuthenticated(false);
        setSignedInEmail("");
        return;
      }

      const userEmailLower = user.email.toLowerCase();
      const isAllowed = ALLOWED_ADMIN_EMAILS.some((allowed) => allowed === userEmailLower);

      if (!isAllowed) {
        const errorMsg = `Access Denied: Account "${user.email}" is not authorized. Allowed accounts: ${ALLOWED_ADMIN_EMAILS.join(", ")}`;
        console.warn("[Auth]", errorMsg);
        setAuthError(errorMsg);
        setIsAuthenticated(false);
        setSignedInEmail("");
        await signOut(auth);
        return;
      }

      console.log("[Auth] Admin authenticated successfully:", user.email);
      setSignedInEmail(user.email);
      setIsAuthenticated(true);
      setAuthError("");
    });

    return unsubscribe;
  }, []);

  // Fetch blogs, bookings & playlists when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchArticles();
    fetchBookings();
    fetchPlaylists();
  }, [isAuthenticated]);

  const handleGoogleLoginPopup = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    console.log("[Auth] Attempting Google Popup Login...");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      console.log("[Auth] Popup login succeeded for:", result.user.email);
    } catch (err: any) {
      console.warn("[Auth] Popup login error/blocked:", err);
      const code = err.code || "popup-error";
      const message = err.message || "Popup sign-in failed.";

      if (code === "auth/unauthorized-domain") {
        const currentHostname = typeof window !== "undefined" ? window.location.hostname : "your domain";
        setAuthError(
          `[auth/unauthorized-domain] Domain "${currentHostname}" is not authorized in Firebase Console. Please add "${currentHostname}" in Firebase Console -> Authentication -> Settings -> Authorized Domains.`
        );
        setIsLoggingIn(false);
        return;
      }

      if (code === "auth/popup-blocked" || code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        setAuthError("Sign-in popup was blocked or closed. Please allow popups for this site and try again.");
        setIsLoggingIn(false);
        return;
      }

      setAuthError(`[${code}] ${message}`);
      setIsLoggingIn(false);
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

  // Fetch Playlists from Firestore
  async function fetchPlaylists() {
    try {
      const docRef = doc(db, "settings", "playlists");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists() && Array.isArray(snapshot.data().items)) {
        setPlaylists(snapshot.data().items);
      }
    } catch (err) {
      console.warn("Playlists fetch error:", err);
    }
  }

  // Save all 3 Playlist Thumbnails to Firestore
  async function savePlaylists(e: FormEvent) {
    e.preventDefault();
    setIsPlaylistSaving(true);
    setPlaylistStatusMsg("");

    try {
      const docRef = doc(db, "settings", "playlists");
      await setDoc(docRef, { items: playlists, updatedAt: new Date().toISOString() });
      setPlaylistStatusMsg("✓ All 3 Playlist Thumbnails saved successfully!");
      fetchPlaylists();
    } catch (err: any) {
      setPlaylistStatusMsg("Error saving playlists: " + err.message);
    } finally {
      setIsPlaylistSaving(false);
    }
  }

  // Save Blog Article (Create or Edit)
  async function saveArticle(e: FormEvent) {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;

    const currentUser = auth.currentUser;
    if (
      !currentUser?.email ||
      !ALLOWED_ADMIN_EMAILS.includes(currentUser.email.toLowerCase())
    ) {
      setBlogStatusMsg(
        `Please sign in with an allowed admin account: ${ALLOWED_ADMIN_EMAILS.join(", ")}.`,
      );
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
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 12px 40px rgba(0,0,0,0.04)",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "1.8rem", margin: "0 0 8px 0", color: "var(--sample-ink)", letterSpacing: "-0.02em" }}>
              Admin sign in
            </h1>
            <p style={{ margin: "0 0 24px 0", color: "var(--sample-muted)", fontSize: "0.95rem" }}>
              Sign in with an authorized Google account to manage bookings, articles, and video series.
            </p>

            {authError && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fca5a5",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "20px",
                  textAlign: "left",
                }}
              >
                <p style={{ color: "#991b1b", fontSize: "0.85rem", margin: "0 0 6px 0", fontWeight: 700 }}>
                  Authentication Alert:
                </p>
                <p style={{ color: "#b91c1c", fontSize: "0.82rem", margin: 0, lineHeight: 1.45, wordBreak: "break-word" }}>
                  {authError}
                </p>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                type="button"
                onClick={handleGoogleLoginPopup}
                disabled={isLoggingIn}
                style={{
                  background: "var(--brand-accent)",
                  color: "#ffffff",
                  border: "none",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: isLoggingIn ? "not-allowed" : "pointer",
                  opacity: isLoggingIn ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "opacity 200ms ease",
                }}
              >
                {isLoggingIn ? "Signing in..." : "Sign in with Google"}
              </button>
            </div>

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
                className={`credentials-filter-btn ${activeTab === "playlists" ? "is-active" : ""}`}
                onClick={() => setActiveTab("playlists")}
              >
                YouTube Playlists ({playlists.length})
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

            {/* TAB 3: YOUTUBE PLAYLIST THUMBNAILS */}
            {activeTab === "playlists" && (
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--sample-line)",
                  borderRadius: "20px",
                  padding: "clamp(24px, 4vw, 40px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.015)",
                }}
              >
                <div style={{ marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid var(--sample-line)" }}>
                  <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px 0", color: "#18181b", letterSpacing: "-0.02em" }}>
                    Manage YouTube Playlists (3 Thumbnails)
                  </h2>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--sample-muted)" }}>
                    Configure the 3 featured playlist thumbnail images and their target YouTube links displayed on the home page.
                  </p>
                </div>

                <form onSubmit={savePlaylists} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                    {playlists.map((pl, index) => (
                      <div
                        key={pl.id || index}
                        style={{
                          background: "#fafafa",
                          border: "1px solid var(--sample-line)",
                          borderRadius: "16px",
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--brand-accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            Playlist {index + 1}
                          </span>
                        </div>

                        {/* LIVE THUMBNAIL PREVIEW */}
                        <div style={{ position: "relative", width: "100%", paddingTop: "177.78%", aspectRatio: "9 / 16", background: "#0a0a0a", borderRadius: "10px", overflow: "hidden" }}>
                          <img
                            src={pl.imageUrl || "/homepage-video-thumbnail.png"}
                            alt={pl.title || `Playlist ${index + 1}`}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/homepage-video-thumbnail.png";
                            }}
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <div style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,0.75)", color: "#fff", padding: "4px 8px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 700 }}>
                            ▶ PLAYLIST
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "var(--sample-muted)" }}>
                            Playlist Topic (Fixed)
                          </label>
                          <div
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              borderRadius: "8px",
                              border: "1px solid var(--sample-line)",
                              background: "#f1f5f9",
                              fontSize: "0.9rem",
                              fontWeight: 600,
                              color: "#334155",
                            }}
                          >
                            {pl.title || "Untitled Playlist"}
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#18181b" }}>
                            Playlist Description
                          </label>
                          <textarea
                            rows={2}
                            value={pl.description || ""}
                            onChange={(e) => {
                              const updated = [...playlists];
                              updated[index] = { ...updated[index], description: e.target.value };
                              setPlaylists(updated);
                            }}
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              borderRadius: "8px",
                              border: "1px solid var(--sample-line)",
                              fontSize: "0.88rem",
                              resize: "vertical",
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "var(--sample-muted)" }}>
                            Thumbnail Image (Fixed)
                          </label>
                          <div
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              borderRadius: "8px",
                              border: "1px solid var(--sample-line)",
                              background: "#f1f5f9",
                              fontSize: "0.82rem",
                              color: "#64748b",
                              wordBreak: "break-all",
                            }}
                          >
                            <code>{pl.imageUrl || "/homepage-video-thumbnail.png"}</code>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#18181b" }}>
                            YouTube Playlist Link *
                          </label>
                          <input
                            type="url"
                            required
                            placeholder="https://www.youtube.com/@navisamarnath/playlists"
                            value={pl.playlistUrl || ""}
                            onChange={(e) => {
                              const updated = [...playlists];
                              updated[index] = { ...updated[index], playlistUrl: e.target.value };
                              setPlaylists(updated);
                            }}
                            style={{
                              width: "100%",
                              padding: "10px 14px",
                              borderRadius: "8px",
                              border: "1px solid var(--sample-line)",
                              fontSize: "0.9rem",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {playlistStatusMsg && (
                    <p style={{ margin: 0, fontSize: "0.92rem", color: playlistStatusMsg.startsWith("✓") ? "#16a34a" : "#dc2626", fontWeight: 700 }}>
                      {playlistStatusMsg}
                    </p>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={isPlaylistSaving}
                      style={{
                        background: "var(--brand-accent)",
                        color: "#ffffff",
                        border: "none",
                        padding: "14px 32px",
                        borderRadius: "12px",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        cursor: isPlaylistSaving ? "not-allowed" : "pointer",
                        opacity: isPlaylistSaving ? 0.7 : 1,
                      }}
                    >
                      {isPlaylistSaving ? "Saving Playlists..." : "Save Playlist Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
