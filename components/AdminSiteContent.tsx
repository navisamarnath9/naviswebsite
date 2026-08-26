"use client";

import { FormEvent, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { defaultSiteSettings, type SiteSettings } from "@/lib/siteSettings";
import { faqs as defaultFaqs, type FAQItem } from "@/app/faq/page";
import { resourceSections as defaultResources } from "@/app/resources/page";

type ResourceItem = { title: string; author?: string; desc: string; url?: string };
type ResourceGroup = { title: string; countLabel: string; featured?: boolean; items: ResourceItem[] };
type ResourceSection = { id: string; title: string; deck: string; summary: string; tags: string[]; groups: ResourceGroup[] };
type ContentTab = "media" | "social" | "faqs" | "resources" | "legal";

const inputStyle = { width: "100%", padding: "11px 13px", borderRadius: "8px", border: "1px solid var(--sample-line)", fontSize: "0.9rem" };
const cardStyle = { background: "#ffffff", border: "1px solid var(--sample-line)", borderRadius: "16px", padding: "24px", marginBottom: "20px" };
const smallButtonStyle = { background: "#ffffff", color: "var(--brand-accent)", border: "1px solid var(--sample-line)", borderRadius: "8px", padding: "8px 12px", fontWeight: 650, cursor: "pointer" };

export default function AdminSiteContent() {
  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);
  const [resources, setResources] = useState<ResourceSection[]>(defaultResources);
  const [privacyText, setPrivacyText] = useState("");
  const [termsText, setTermsText] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<ContentTab>("media");

  useEffect(() => {
    async function load() {
      try {
        const [siteDoc, faqDoc, resourceDoc, legalDoc] = await Promise.all([
          getDoc(doc(db, "settings", "site-content")), getDoc(doc(db, "settings", "faqs")),
          getDoc(doc(db, "settings", "resources")), getDoc(doc(db, "settings", "legal")),
        ]);
        if (siteDoc.exists()) setSite({ ...defaultSiteSettings, ...siteDoc.data() } as SiteSettings);
        if (faqDoc.exists() && Array.isArray(faqDoc.data().items)) setFaqs(faqDoc.data().items);
        if (resourceDoc.exists() && Array.isArray(resourceDoc.data().items)) setResources(resourceDoc.data().items as ResourceSection[]);
        if (legalDoc.exists()) {
          setPrivacyText(legalDoc.data().privacyText || "");
          setTermsText(legalDoc.data().termsText || "");
        }
      } catch {
        setResources(defaultResources);
      }
    }
    load();
  }, []);

  function updateResourceItem(sectionIndex: number, groupIndex: number, itemIndex: number, changes: Partial<ResourceItem>) {
    setResources((current) => current.map((section, currentSectionIndex) => {
      if (currentSectionIndex !== sectionIndex) return section;
      return { ...section, groups: section.groups.map((group, currentGroupIndex) => {
        if (currentGroupIndex !== groupIndex) return group;
        const items = group.items.map((item, currentItemIndex) => currentItemIndex === itemIndex ? { ...item, ...changes } : item);
        return { ...group, items, countLabel: `${items.length} ${group.title.toLowerCase()}` };
      }) };
    }));
  }

  function addResource(sectionIndex: number, groupIndex: number) {
    setResources((current) => current.map((section, currentSectionIndex) => {
      if (currentSectionIndex !== sectionIndex) return section;
      return { ...section, groups: section.groups.map((group, currentGroupIndex) => {
        if (currentGroupIndex !== groupIndex) return group;
        const items = [...group.items, { title: "", desc: "" }];
        return { ...group, items, countLabel: `${items.length} ${group.title.toLowerCase()}` };
      }) };
    }));
  }

  function removeResource(sectionIndex: number, groupIndex: number, itemIndex: number) {
    setResources((current) => current.map((section, currentSectionIndex) => {
      if (currentSectionIndex !== sectionIndex) return section;
      return { ...section, groups: section.groups.map((group, currentGroupIndex) => {
        if (currentGroupIndex !== groupIndex) return group;
        const items = group.items.filter((_, currentItemIndex) => currentItemIndex !== itemIndex);
        return { ...group, items, countLabel: `${items.length} ${group.title.toLowerCase()}` };
      }) };
    }));
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setStatus("");
    setSaving(true);
    try {
      await Promise.all([
        setDoc(doc(db, "settings", "site-content"), { ...site, updatedAt: new Date().toISOString() }),
        setDoc(doc(db, "settings", "faqs"), { items: faqs, updatedAt: new Date().toISOString() }),
        setDoc(doc(db, "settings", "resources"), { items: resources, updatedAt: new Date().toISOString() }),
        setDoc(doc(db, "settings", "legal"), { privacyText, termsText, updatedAt: new Date().toISOString() }),
      ]);
      setStatus("✓ Website content saved. Changes are live after a refresh.");
    } catch (err: any) {
      setStatus(`Could not save: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  const contentTabs: Array<{ id: ContentTab; label: string }> = [
    { id: "media", label: "Media & images" },
    { id: "social", label: "Social media" },
    { id: "faqs", label: "FAQs" },
    { id: "resources", label: "Resources library" },
    { id: "legal", label: "Legal & privacy" },
  ];

  return <form onSubmit={save}>
    <div className="credentials-filter-tabs" role="tablist" aria-label="Website content sections" style={{ marginBottom: "24px", justifyContent: "flex-start" }}>
      {contentTabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} className={`credentials-filter-btn ${activeTab === tab.id ? "is-active" : ""}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}
    </div>

    {activeTab === "media" && <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Media & page imagery</h2>
      <p style={{ color: "var(--sample-muted)", marginTop: 0 }}>Update the video and image assets used on the home and group pages.</p>
      {([['Introduction video URL', 'introVideoSource'], ['Video cover / poster URL', 'introVideoPoster'], ['Group page “Why Join” image URL', 'groupWhyImage']] as const).map(([label, key]) => <label key={key} style={{ display: "block", marginTop: "14px", fontWeight: 650 }}>{label}<input type="url" value={site[key]} onChange={(e) => setSite({ ...site, [key]: e.target.value })} style={{ ...inputStyle, marginTop: "6px" }} /></label>)}
    </div>}

    {activeTab === "social" && <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Social media</h2>
      <p style={{ color: "var(--sample-muted)", marginTop: 0 }}>All footer social icons are managed together here. Add the profile URL for any channel you want to show.</p>
      {([['Instagram profile URL', 'instagramUrl'], ['Facebook profile URL', 'facebookUrl'], ['YouTube channel URL', 'youtubeUrl'], ['X profile URL', 'xUrl'], ['Threads profile URL', 'threadsUrl']] as const).map(([label, key]) => <label key={key} style={{ display: "block", marginTop: "14px", fontWeight: 650 }}>{label}<input type="url" value={site[key]} onChange={(e) => setSite({ ...site, [key]: e.target.value })} style={{ ...inputStyle, marginTop: "6px" }} /></label>)}
    </div>}

    {activeTab === "faqs" && <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Frequently asked questions</h2>
      <p style={{ color: "var(--sample-muted)" }}>Edit any question below, or add a new one. The FAQ page updates from this list.</p>
      {faqs.map((faq, index) => <div key={faq.id || index} style={{ borderTop: "1px solid var(--sample-line)", paddingTop: "14px", marginTop: "14px" }}>
        <div style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}><strong>FAQ {index + 1}</strong><button type="button" onClick={() => setFaqs(faqs.filter((_, i) => i !== index))} style={smallButtonStyle}>Remove</button></div>
        <input value={faq.category} placeholder="Category" onChange={(e) => setFaqs(faqs.map((item, i) => i === index ? { ...item, category: e.target.value } : item))} style={{ ...inputStyle, marginTop: "8px" }} />
        <input value={faq.question} placeholder="Question" onChange={(e) => setFaqs(faqs.map((item, i) => i === index ? { ...item, question: e.target.value } : item))} style={{ ...inputStyle, marginTop: "8px" }} />
        <textarea value={faq.answer} placeholder="Answer" rows={3} onChange={(e) => setFaqs(faqs.map((item, i) => i === index ? { ...item, answer: e.target.value } : item))} style={{ ...inputStyle, marginTop: "8px", resize: "vertical" }} />
      </div>)}
      <button type="button" onClick={() => setFaqs([...faqs, { id: `faq-${Date.now()}`, category: "General", question: "", answer: "" }])} style={{ ...smallButtonStyle, marginTop: "16px" }}>+ Add FAQ</button>
    </div>}

    {activeTab === "resources" && <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Resources library</h2>
      <p style={{ color: "var(--sample-muted)" }}>Add, edit, or remove resources using regular fields—no JSON editing required. Changes to the number of items update the published count automatically.</p>
      {resources.map((section, sectionIndex) => <div key={section.id} style={{ borderTop: sectionIndex ? "1px solid var(--sample-line)" : undefined, paddingTop: sectionIndex ? "22px" : 0, marginTop: sectionIndex ? "22px" : 0 }}>
        <h3 style={{ margin: "0 0 14px" }}>{section.title}</h3>
        {section.groups.map((group, groupIndex) => <div key={`${section.id}-${group.title}`} style={{ background: "#fafafa", border: "1px solid var(--sample-line)", borderRadius: "12px", padding: "16px", marginTop: "14px" }}>
          <h4 style={{ margin: "0 0 10px" }}>{group.title}</h4>
          {group.items.map((item, itemIndex) => <div key={`${section.id}-${group.title}-${itemIndex}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "8px", borderTop: itemIndex ? "1px solid var(--sample-line)" : undefined, paddingTop: itemIndex ? "12px" : 0, marginTop: itemIndex ? "12px" : 0 }}>
            <input aria-label={`${group.title} resource title`} value={item.title} placeholder="Title" onChange={(e) => updateResourceItem(sectionIndex, groupIndex, itemIndex, { title: e.target.value })} style={inputStyle} />
            <input aria-label={`${group.title} resource author`} value={item.author || ""} placeholder="Author (optional)" onChange={(e) => updateResourceItem(sectionIndex, groupIndex, itemIndex, { author: e.target.value })} style={inputStyle} />
            <input aria-label={`${group.title} resource URL`} type="url" value={item.url || ""} placeholder="Link (optional)" onChange={(e) => updateResourceItem(sectionIndex, groupIndex, itemIndex, { url: e.target.value })} style={inputStyle} />
            <textarea aria-label={`${group.title} resource description`} value={item.desc} placeholder="Short description" rows={2} onChange={(e) => updateResourceItem(sectionIndex, groupIndex, itemIndex, { desc: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
            <button type="button" onClick={() => removeResource(sectionIndex, groupIndex, itemIndex)} style={{ ...smallButtonStyle, alignSelf: "start" }}>Remove</button>
          </div>)}
          <button type="button" onClick={() => addResource(sectionIndex, groupIndex)} style={{ ...smallButtonStyle, marginTop: "14px" }}>+ Add {group.title.slice(0, -1) || "resource"}</button>
        </div>)}
      </div>)}
    </div>}

    {activeTab === "legal" && <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Legal & privacy</h2>
      <p style={{ color: "var(--sample-muted)" }}>Optional replacement text for each page. Leave a field empty to retain the current published policy; line breaks are kept.</p>
      <label style={{ display: "block", fontWeight: 650 }}>Privacy policy replacement<textarea value={privacyText} rows={8} onChange={(e) => setPrivacyText(e.target.value)} style={{ ...inputStyle, marginTop: "6px", resize: "vertical" }} /></label>
      <label style={{ display: "block", fontWeight: 650, marginTop: "14px" }}>Terms of service replacement<textarea value={termsText} rows={8} onChange={(e) => setTermsText(e.target.value)} style={{ ...inputStyle, marginTop: "6px", resize: "vertical" }} /></label>
    </div>}

    {status && <p style={{ color: status.startsWith("✓") ? "#15803d" : "#b91c1c", fontWeight: 650 }}>{status}</p>}
    <button type="submit" disabled={saving} style={{ background: "var(--brand-accent)", color: "#fff", border: 0, borderRadius: "12px", padding: "14px 28px", fontWeight: 700, cursor: saving ? "wait" : "pointer" }}>{saving ? "Saving…" : "Save website content"}</button>
  </form>;
}