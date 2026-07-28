"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
}

const articles: Article[] = [
  {
    id: "high-functioning-burnout",
    title: "Breaking the Cycle of High-Functioning Burnout",
    category: "Burnout & Purpose",
    readTime: "6 min read",
    date: "July 18, 2026",
    excerpt: "Why achievement doesn't always bring peace, and how high-performers can restore genuine psychological rest without sacrificing excellence.",
    content: `High-functioning burnout is one of the most deceptive forms of emotional distress because it hides behind a mask of productivity. You continue meeting deadlines, showing up for meetings, and maintaining a composed exterior—yet internally, you feel drained, detached, and perpetually operating on empty.

### The Hidden Roots
Often, high-functioning burnout stems from an implicit belief that your self-worth is tied to continuous output. When resting feels like guilt or failure, your nervous system remains stuck in chronic sympathetic arousal (fight-or-flight).

### 3 Steps to Recalibrate
1. **Differentiate Rest from Relief:** Relief is passive scrolling or streaming; true rest requires intentional nervous system down-regulation like nature walks or somatic breathing.
2. **Set Non-Negotiable Depletion Triggers:** Notice physical warnings (jaw clenching, sleep disruption) before reaching emotional collapse.
3. **Decouple Value from Production:** Remind yourself that you have intrinsic value simply by existing, separate from your to-do list.`,
  },
  {
    id: "navigating-relationship-patterns",
    title: "Rewriting Recurring Arguments in Your Relationship",
    category: "Relationships",
    readTime: "7 min read",
    date: "July 10, 2026",
    excerpt: "Why couples find themselves fighting over the same small things over and over, and how to uncover the core emotional need beneath the surface conflict.",
    content: `If you and your partner find yourselves repeating the exact same argument—whether about dishes, schedules, or family—it's rarely about the topic itself. It is almost always about connection, appreciation, and safety.

### The Attack-Defend Cycle
In Gottman's research, perpetual conflicts account for nearly 69% of all relationship disagreements. When one partner feels unheard, they escalate (pursue), while the other feels overwhelmed and retreats (withdraws).

### How to Break the Loop
- **Name the Cycle, Not the Partner:** Instead of saying "You never listen," try "We are getting caught in our old pattern again."
- **Speak from Vulnerability:** Swap defensive statements for raw needs: "I feel lonely when we don't connect in the evenings" vs "You always ignore me."`,
  },
  {
    id: "quieting-the-anxious-mind",
    title: "Quieting the Anxious Mind: Beyond Positive Thinking",
    category: "Anxiety & Stress",
    readTime: "5 min read",
    date: "June 28, 2026",
    excerpt: "Telling an anxious mind to 'just relax' rarely works. Here is how Acceptance & Commitment Therapy (ACT) helps you unhook from catastrophic thoughts.",
    content: `When anxiety spikes, our instinct is often to fight the thoughts or force ourselves to feel calm. However, fighting anxious thoughts frequently amplifies their volume.

### Thought Defusion Technique
Rather than arguing with a catastrophic thought, practice "defusion"—noticing thoughts as passing words rather than absolute truths.

- **Formula:** Instead of thinking *"I am going to fail this presentation,"* reframe to *"I notice my mind is having the thought that I might fail."*
- **Somatic Anchoring:** Place one hand on your heart and feel the physical breath, anchoring yourself in the present room.`,
  },
  {
    id: "art-of-self-compassion",
    title: "The Art of Self-Compassion in Times of Transition",
    category: "Mindfulness",
    readTime: "6 min read",
    date: "June 14, 2026",
    excerpt: "Life transitions—career shifts, breakups, moves—challenge our identity. Discover why self-compassion is your most resilient anchor.",
    content: `Uncertainty is uncomfortable. During major life shifts, our internal critic often becomes loudest, demanding quick fixes or blaming us for feeling unsettled.

Dr. Kristin Neff identifies three core elements of self-compassion:
1. **Self-Kindness vs. Self-Judgment:** Treating yourself with the gentleness you would extend to a dear friend.
2. **Common Humanity vs. Isolation:** Recognizing that struggle is a shared human experience, not a personal flaw.
3. **Mindfulness vs. Over-Identification:** Holding pain in balanced awareness without being overwhelmed by it.`,
  },
];

const categories = ["All", "Anxiety & Stress", "Relationships", "Burnout & Purpose", "Mindfulness"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  }

  return (
    <main id="top">
      <Navbar />

      <div id="main-content">
        {/* BANNER */}
        <section className="page-banner">
          <span className="kicker">Insights & Reflections</span>
          <h1>
            Perspectives on <em>growth & connection.</em>
          </h1>
          <p className="page-lead">
            Articles on psychology, emotional regulation, relationships, and sustainable living written by Dr. Navisamarnath.
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

          {/* ARTICLES GRID */}
          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--grey)" }}>
              <p style={{ fontSize: "1.2rem" }}>No articles found matching your criteria.</p>
              <button
                type="button"
                className="button button-light"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredArticles.map((article) => (
                <div className="blog-card" key={article.id}>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>{article.category}</span> · <span>{article.readTime}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
                      <span style={{ fontSize: "0.82rem", color: "var(--grey)" }}>{article.date}</span>
                      <button
                        type="button"
                        className="read-more-btn"
                        onClick={() => setActiveArticle(article)}
                      >
                        Read Article <ArrowIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NEWSLETTER BOX */}
          <div style={{ marginTop: "80px", background: "var(--blue-deep)", color: "var(--white)", padding: "48px", borderRadius: "24px", textAlign: "center" }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cyan)", fontWeight: 600 }}>
              Monthly Reflections
            </span>
            <h3 style={{ fontSize: "2.2rem", margin: "12px 0 16px 0", color: "var(--white)" }}>
              Subscribe to Gentle Thought Letters
            </h3>
            <p style={{ maxWidth: "560px", margin: "0 auto 28px", color: "rgba(255,255,255,0.85)" }}>
              Join over 4,000 readers receiving monthly essays on psychology, mindfulness, and practical mental health tools. No spam, ever.
            </p>

            {subscribed ? (
              <div style={{ background: "rgba(58, 166, 185, 0.2)", border: "1px solid var(--cyan)", padding: "16px 24px", borderRadius: "999px", display: "inline-block", color: "var(--white)", fontWeight: 600 }}>
                ✓ Thank you for subscribing! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", justifyContent: "center", gap: "12px", maxWidth: "480px", margin: "0 auto", flexWrap: "wrap" }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{ flexGrow: 1, padding: "14px 20px", borderRadius: "999px", border: "none", fontSize: "0.95rem", outline: "none" }}
                />
                <button type="submit" className="button" style={{ background: "var(--cyan)", color: "var(--blue-deep)", fontWeight: 700 }}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>

        {/* MODAL ARTICLE READER */}
        {activeArticle && (
          <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
              >
                ✕
              </button>
              <div className="blog-meta" style={{ marginBottom: "8px" }}>
                <span>{activeArticle.category}</span> · <span>{activeArticle.readTime}</span>
              </div>
              <h2 style={{ fontSize: "2.2rem", marginBottom: "12px", color: "var(--blue)" }}>{activeArticle.title}</h2>
              <div style={{ fontSize: "0.85rem", color: "var(--grey)", marginBottom: "28px" }}>Published on {activeArticle.date} by Dr. Navisamarnath</div>
              <div style={{ fontSize: "1.08rem", lineHeight: "1.8", color: "var(--grey)", whiteSpace: "pre-line" }}>
                {activeArticle.content}
              </div>
              <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--line)", textAlign: "center" }}>
                <Link className="button" href="/contact#booking" onClick={() => setActiveArticle(null)}>
                  Book a Session with Dr. Navisamarnath <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
