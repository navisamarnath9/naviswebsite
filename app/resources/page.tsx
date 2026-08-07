"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ResourceItem = {
  title: string;
  author?: string;
  desc: string;
  url?: string;
};

type ResourceGroup = {
  title: string;
  countLabel: string;
  featured?: boolean;
  items: ResourceItem[];
};

type ResourceSection = {
  id: "all" | "inner-child" | "positive-thinking" | "self-esteem" | "relationships";
  title: string;
  deck: string;
  summary: string;
  tags: string[];
  groups: ResourceGroup[];
};

const resourceSections: ResourceSection[] = [
  {
    id: "inner-child",
    title: "Healing the Inner Child",
    deck: "Reparenting, trauma recovery, and reconnection with younger parts of yourself.",
    summary:
      "Inner child work helps uncover unresolved emotions, early coping patterns, and the beliefs that keep old wounds active. The resources below support self-compassion, emotional resilience, and practical healing.",
    tags: ["Reparenting", "Trauma recovery", "Attachment"],
    groups: [
      {
        title: "Books",
        countLabel: "5 books",
        featured: true,
        items: [
          { title: "Homecoming", author: "John Bradshaw", desc: "A foundational guide to understanding and nurturing the inner child." },
          { title: "The Inner Child Workbook", author: "Cathryn L. Taylor", desc: "Practical exercises for processing old wounds and creating new patterns." },
          { title: "Recovery of Your Inner Child", author: "Lucia Capacchione", desc: "A classic method for reconnecting with and liberating your inner self." },
          { title: "The Emotionally Absent Mother", author: "Jasmin Lee Cori", desc: "A guide to healing from neglect and unmet emotional needs." },
          { title: "It Didn’t Start with You", author: "Mark Wolynn", desc: "Explores how inherited family trauma can shape the present." },
        ],
      },
      {
        title: "Podcasts",
        countLabel: "5 podcasts",
        items: [
          { title: "The Healing Trauma Podcast", desc: "Focuses on inner child work, trauma recovery, and emotional healing." },
          { title: "The Adult Chair Podcast", desc: "Explores inner child healing, emotional regulation, and transformation." },
          { title: "Therapy Chat", desc: "Covers trauma, attachment, and the therapeutic process with depth." },
          { title: "UnF*ck Your Brain", desc: "Discusses emotional resilience, self-worth, and healing old patterns." },
          { title: "Dear Gabby", desc: "Offers spiritual and psychological guidance for personal healing." },
        ],
      },
      {
        title: "Websites",
        countLabel: "5 websites",
        items: [
          { title: "NICABM", url: "https://www.nicabm.com/", desc: "Research-backed trauma resources and expert insights." },
          { title: "The Center for Healing and Transformation", url: "https://drarielleschwartz.com/", desc: "Trauma-informed approaches, self-help techniques, and healing exercises." },
          { title: "Psychology Today", url: "https://www.psychologytoday.com/ca", desc: "Articles from licensed therapists on reparenting and emotional healing." },
          { title: "Inner Bonding", url: "https://innerbondinghub.com/", desc: "A self-healing process focused on reconnecting with the inner child." },
          { title: "Mindful", url: "https://www.mindful.org/", desc: "Mindfulness-based approaches for self-compassion and healing." },
        ],
      },
    ],
  },
  {
    id: "positive-thinking",
    title: "Positive Thinking",
    deck: "Mindset tools that support resilience, hope, and practical growth under pressure.",
    summary:
      "Positive thinking is not denial. It is a way of reframing challenges so you can respond with clarity, confidence, and a more constructive inner voice.",
    tags: ["Mindset", "Resilience", "Growth"],
    groups: [
      {
        title: "Books",
        countLabel: "5 books",
        featured: true,
        items: [
          { title: "The Power of Positive Thinking", author: "Norman Vincent Peale", desc: "A classic introduction to optimism and self-belief." },
          { title: "Learned Optimism", author: "Martin Seligman", desc: "Evidence-based tools for shifting explanatory style." },
          { title: "The Happiness Advantage", author: "Shawn Achor", desc: "Shows how positivity can improve performance and wellbeing." },
          { title: "Mindset", author: "Carol S. Dweck", desc: "Explains the growth mindset and its impact on learning." },
          { title: "Hardwiring Happiness", author: "Rick Hanson", desc: "Practical ways to train the brain toward resilience." },
        ],
      },
      {
        title: "Podcasts",
        countLabel: "5 podcasts",
        items: [
          { title: "The Happiness Lab", desc: "Laurie Santos explores the science behind happiness and positivity." },
          { title: "The Daily Boost", desc: "Short motivational episodes for daily action and momentum." },
          { title: "The Tony Robbins Podcast", desc: "Insights on growth, mindset shifts, and motivation." },
          { title: "The Science of Happiness", desc: "Research-backed strategies for cultivating positivity." },
          { title: "Feel Better, Live More", desc: "Rangan Chatterjee discusses mindset, health, and wellbeing." },
        ],
      },
      {
        title: "Websites",
        countLabel: "5 websites",
        items: [
          { title: "Greater Good Science Center", url: "https://greatergood.berkeley.edu/", desc: "Science-backed resources on happiness and wellbeing." },
          { title: "Mindful.org", url: "https://www.mindful.org/", desc: "Guides on mindfulness and positive psychology." },
          { title: "Psychology Today", url: "https://www.psychologytoday.com/ca", desc: "Articles on optimism, mental health, and self-improvement." },
          { title: "Action for Happiness", url: "https://actionforhappiness.org/", desc: "Practical steps to improve daily positivity." },
          { title: "Verywell Mind", url: "https://www.verywellmind.com/", desc: "Trusted articles on mental wellbeing and positive thinking." },
        ],
      },
    ],
  },
  {
    id: "self-esteem",
    title: "Building Self-Esteem",
    deck: "References that strengthen self-worth, confidence, and a steadier sense of self.",
    summary:
      "Self-esteem grows when self-doubt, negative self-talk, and limiting beliefs are replaced with affirming thoughts and actions that support confidence and acceptance.",
    tags: ["Self-worth", "Confidence", "Boundaries"],
    groups: [
      {
        title: "Books",
        countLabel: "5 books",
        featured: true,
        items: [
          { title: "The Six Pillars of Self-Esteem", author: "Nathaniel Branden", desc: "A practical framework for building durable self-esteem." },
          { title: "The Gifts of Imperfection", author: "Brené Brown", desc: "Invites readers to embrace vulnerability and authenticity." },
          { title: "Radical Self-Love", author: "Gala Darling", desc: "A direct, energetic approach to self-acceptance." },
          { title: "The Self-Esteem Workbook", author: "Glenn R. Schiraldi", desc: "Exercises and guidance for self-worth work." },
          { title: "You Are a Badass", author: "Jen Sincero", desc: "A motivational companion for confidence and action." },
        ],
      },
      {
        title: "Podcasts",
        countLabel: "5 podcasts",
        items: [
          { title: "The Self-Esteem and Confidence Mindset Podcast", desc: "Hosted by Jonny Pardoe with practical confidence tools." },
          { title: "UnF*ck Your Brain", desc: "Kara Loewentheil on self-worth, boundaries, and mindset." },
          { title: "The Confidence Podcast", desc: "Trish Blackwell offers encouragement and practical advice." },
          { title: "The Mindful Kind", desc: "Rachael Kable explores calm and self-acceptance." },
          { title: "The Thoughtful Leader Podcast", desc: "Simon Dowling on confidence, presence, and growth." },
        ],
      },
      {
        title: "Websites",
        countLabel: "5 websites",
        items: [
          { title: "Psychology Today", url: "https://www.psychologytoday.com/us", desc: "Articles and advice on self-esteem and wellbeing." },
          { title: "Mind Tools", url: "https://www.mindtools.com/", desc: "Tools for personal growth and confidence building." },
          { title: "Verywell Mind", url: "https://www.verywellmind.com/", desc: "Practical information on mental health and self-worth." },
          { title: "The Self-Esteem Experts", url: "https://www.selfesteem-experts.com/", desc: "Resources and workshops focused on self-esteem." },
          { title: "Therapist Aid", url: "https://www.therapistaid.com/", desc: "Worksheets and tools for confidence and mental health." },
        ],
      },
    ],
  },
  {
    id: "relationships",
    title: "Relationships",
    deck: "Communication, emotional awareness, empathy, and building healthier connections.",
    summary:
      "Healthy relationships are built through communication, trust, emotional awareness, empathy, and a willingness to understand ourselves and each other. Exploring our relationship patterns can help us build deeper, healthier, and more fulfilling connections.",
    tags: ["Communication", "Connection", "Empathy", "Attachment"],
    groups: [
      {
        title: "Books",
        countLabel: "5 books",
        featured: true,
        items: [
          { title: "The Seven Principles for Making Marriage Work", author: "John Gottman & Nan Silver", desc: "Research-informed strategies for strengthening communication, connection, and conflict management." },
          { title: "Hold Me Tight", author: "Sue Johnson", desc: "Explores emotional connection and the patterns that can bring couples closer or create distance." },
          { title: "Attached", author: "Amir Levine & Rachel Heller", desc: "Introduces attachment styles and how they influence the way we connect with others." },
          { title: "Nonviolent Communication", author: "Marshall B. Rosenberg", desc: "Practical guidance for communicating with greater empathy, clarity, and understanding." },
          { title: "Mating in Captivity", author: "Esther Perel", desc: "Explores intimacy, desire, individuality, and connection in long-term relationships." },
        ],
      },
      {
        title: "Podcasts",
        countLabel: "4 podcasts",
        items: [
          { title: "Where Should We Begin? with Esther Perel", desc: "Real conversations exploring relationships, intimacy, conflict, and connection." },
          { title: "The Gottman Institute Podcast", desc: "Research-informed conversations about communication, conflict, and stronger relationships." },
          { title: "Dear Therapists", desc: "Therapists explore personal and relationship challenges through thoughtful conversations." },
          { title: "The Psychology Podcast", author: "Scott Barry Kaufman", desc: "Explores psychology, human connection, relationships, and personal growth." },
        ],
      },
      {
        title: "Websites",
        countLabel: "5 websites",
        items: [
          { title: "The Gottman Institute", url: "https://www.gottman.com/", desc: "Research-informed resources on communication, conflict, intimacy, and relationships." },
          { title: "Psychology Today", url: "https://www.psychologytoday.com/us", desc: "Accessible articles covering relationships, attachment, communication, boundaries, and intimacy." },
          { title: "Esther Perel", url: "https://www.estherperel.com/", desc: "Insights and resources on relationships, intimacy, desire, and connection." },
          { title: "Greater Good Science Center", url: "https://greatergood.berkeley.edu/", desc: "Research-informed resources on empathy, compassion, forgiveness, and relationships." },
          { title: "Mindful", url: "https://www.mindful.org/", desc: "Resources on mindfulness, self-awareness, compassion, and healthier relationships." },
        ],
      },
    ],
  },
];

const tabs = [
  { id: "all", label: "All topics" },
  { id: "inner-child", label: "Inner child" },
  { id: "positive-thinking", label: "Mindset" },
  { id: "self-esteem", label: "Self-esteem" },
  { id: "relationships", label: "Relationships" },
] as const;

function ResourceCard({ item }: { item: ResourceItem }) {
  const content = (
    <>
      <strong className="resource-item-title">{item.title}</strong>
      {item.author && <span className="resource-item-author">{item.author}</span>}
      <span className="resource-item-desc">{item.desc}</span>
      {item.url && <span className="resource-item-action">Open resource</span>}
    </>
  );

  if (item.url) {
    return (
      <a className="resource-item-card" href={item.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <div className="resource-item-card">{content}</div>;
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("all");

  const visibleSections = resourceSections.filter((section) => activeTab === "all" || section.id === activeTab);

  return (
    <main id="top" className="sample-home resources-page">
      <Navbar />

      {/* RESOURCES PAGE TOP HERO SECTION (MATCHING ABOUT PAGE SPACIOUSNESS & LAYOUT) */}
      <section className="about-top-hero">
        <div className="about-top-hero-copy" style={{ padding: "clamp(100px, 12vh, 128px) clamp(32px, 5vw, 80px) clamp(48px, 6vw, 80px)" }}>
          <span className="sample-overline" style={{ color: "var(--brand-accent)", fontWeight: 700, marginBottom: "12px", display: "block" }}>
            Curated Knowledge Base
          </span>
          <h1 className="about-hero-title" style={{ marginBottom: "28px" }}>
            Resources for Transformation
          </h1>
          <p className="about-hero-text" style={{ marginBottom: "36px", fontSize: "clamp(0.96rem, 1.15vw, 1.1rem)", lineHeight: 1.75 }}>
            A curated library of recommended books, podcasts, and trusted tools for deep personal growth, inner child healing, mindset shifts, and healthy relationships.
          </p>

          <div className="about-hero-actions" style={{ gap: "32px", marginBottom: "40px" }}>
            <Link href="/book-session" className="about-btn-primary">
              BOOK A FREE CONSULTATION ↗
            </Link>
            <a href="#resource-library" className="about-btn-secondary">
              BROWSE RESOURCES ↓
            </a>
          </div>

          <div style={{ display: "flex", gap: "36px", paddingTop: "24px", borderTop: "1px solid var(--sample-line)" }}>
            <div>
              <strong style={{ display: "block", fontSize: "1.3rem", color: "var(--brand-accent)", fontWeight: 700 }}>4 Topics</strong>
              <span style={{ fontSize: "0.82rem", color: "var(--sample-muted)" }}>Focused Categories</span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "1.3rem", color: "var(--brand-accent)", fontWeight: 700 }}>20+ Items</strong>
              <span style={{ fontSize: "0.82rem", color: "var(--sample-muted)" }}>Curated References</span>
            </div>
          </div>
        </div>

        <div className="about-top-hero-visual">
          <div className="about-top-hero-img-wrap">
            <Image
              src="https://res.cloudinary.com/ndgpjcbs/image/upload/v1786116865/resources-hero_etwt8i.jpg"
              alt="Curated Mental Health & Growth Library"
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 50vw"
              className="about-top-hero-img"
              style={{ objectPosition: "center center" }}
            />
            <div className="about-top-hero-badge">
              <span>CURATED TOOLS FOR THE</span>
              <span>WORK BETWEEN SESSIONS</span>
            </div>
          </div>
        </div>
      </section>

      <div id="main-content" className="sample-surface">
        <section className="sample-section resources-content-section" id="resource-library">
          <div className="resources-content">
            <div className="resources-toolbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`resource-filter-btn ${activeTab === tab.id ? "is-active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="resource-stack">
              {visibleSections.map((section) => (
                <article key={section.id} className="resource-pillar-card">
                  <div className="resource-pillar-header">
                    <div>
                      <h2>{section.title}</h2>
                      <p>{section.deck}</p>
                    </div>

                    <div className="resource-pillar-tags" aria-label={`${section.title} tags`}>
                      {section.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <p className="resource-pillar-summary">{section.summary}</p>

                  <div className="resource-groups-grid">
                    {section.groups.map((group) => (
                      <details key={group.title} className="resource-group-card" open={group.featured}>
                        <summary>
                          <div>
                            <strong>{group.title}</strong>
                            <span>{group.countLabel}</span>
                          </div>
                          <i aria-hidden="true">+</i>
                        </summary>

                        <div className="resource-items-grid">
                          {group.items.map((item) => (
                            <ResourceCard key={item.title} item={item} />
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
