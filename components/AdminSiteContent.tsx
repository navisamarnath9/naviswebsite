"use client";

import { FormEvent, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { defaultSiteSettings, type SiteSettings } from "@/lib/siteSettings";
import { faqs as defaultFaqs, type FAQItem } from "@/app/faq/page";
import { resourceSections as defaultResources } from "@/app/resources/page";

const inputStyle = { width: "100%", padding: "11px 13px", borderRadius: "8px", border: "1px solid var(--sample-line)", fontSize: "0.9rem" };
const cardStyle = { background: "#ffffff", border: "1px solid var(--sample-line)", borderRadius: "16px", padding: "24px", marginBottom: "20px" };

export default function AdminSiteContent() {
  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);
  const [resourcesText, setResourcesText] = useState("");
  const [privacyText, setPrivacyText] = useState("");
  const [termsText, setTermsText] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [siteDoc, faqDoc, resourceDoc, legalDoc] = await Promise.all([
          getDoc(doc(db, "settings", "site-content")), getDoc(doc(db, "settings", "faqs")),
          getDoc(doc(db, "settings", "resources")), getDoc(doc(db, "settings", "legal")),
        ]);
        if (siteDoc.exists()) setSite({ ...defaultSiteSettings, ...siteDoc.data() } as SiteSettings);
        if (faqDoc.exists() && Array.isArray(faqDoc.data().items)) setFaqs(faqDoc.data().items);
        setResourcesText(JSON.stringify(resourceDoc.exists() ? resourceDoc.data().items : defaultResources, null, 2));
        if (legalDoc.exists()) {
          setPrivacyText(legalDoc.data().privacyText || "");
          setTermsText(legalDoc.data().termsText || "");
        }
      } catch { setResourcesText(JSON.stringify(defaultResources, null, 2)); }
    }
    load();
  }, []);

  async function save(e: FormEvent) {
    e.preventDefault(); setStatus(""); setSaving(true);
    try {
      const resources = JSON.parse(resourcesText);
      if (!Array.isArray(resources)) throw new Error("Resources must be a list.");
      await Promise.all([
        setDoc(doc(db, "settings", "site-content"), { ...site, updatedAt: new Date().toISOString() }),
        setDoc(doc(db, "settings", "faqs"), { items: faqs, updatedAt: new Date().toISOString() }),
        setDoc(doc(db, "settings", "resources"), { items: resources, updatedAt: new Date().toISOString() }),
        setDoc(doc(db, "settings", "legal"), { privacyText, termsText, updatedAt: new Date().toISOString() }),
      ]);
      setStatus("✓ Website content saved. Changes are live after a refresh.");
    } catch (err: any) { setStatus(`Could not save: ${err.message}`); }
    finally { setSaving(false); }
  }

  return <form onSubmit={save}>
    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Home, group page & footer</h2>
      <p style={{ color: "var(--sample-muted)", marginTop: 0 }}>Use a direct video URL. The current value is Cloudinary; paste the Cloudflare Stream delivery URL here when it is ready.</p>
      {([['Introduction video URL', 'introVideoSource'], ['Video cover / poster URL', 'introVideoPoster'], ['Group page “Why Join” image URL', 'groupWhyImage'], ['X profile URL', 'xUrl'], ['Threads profile URL', 'threadsUrl']] as const).map(([label, key]) => <label key={key} style={{ display: 'block', marginTop: '14px', fontWeight: 650 }}>{label}<input type="url" value={site[key]} onChange={(e) => setSite({ ...site, [key]: e.target.value })} style={{ ...inputStyle, marginTop: '6px' }} /></label>)}
    </div>

    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Frequently asked questions</h2>
      <p style={{ color: "var(--sample-muted)" }}>Edit any question below, or add a new one. The FAQ page updates from this list.</p>
      {faqs.map((faq, index) => <div key={faq.id || index} style={{ borderTop: '1px solid var(--sample-line)', paddingTop: '14px', marginTop: '14px' }}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}><strong>FAQ {index + 1}</strong><button type="button" onClick={() => setFaqs(faqs.filter((_, i) => i !== index))}>Remove</button></div>
        <input value={faq.category} placeholder="Category" onChange={(e) => setFaqs(faqs.map((item, i) => i === index ? { ...item, category: e.target.value } : item))} style={{ ...inputStyle, marginTop: '8px' }} />
        <input value={faq.question} placeholder="Question" onChange={(e) => setFaqs(faqs.map((item, i) => i === index ? { ...item, question: e.target.value } : item))} style={{ ...inputStyle, marginTop: '8px' }} />
        <textarea value={faq.answer} placeholder="Answer" rows={3} onChange={(e) => setFaqs(faqs.map((item, i) => i === index ? { ...item, answer: e.target.value } : item))} style={{ ...inputStyle, marginTop: '8px', resize: 'vertical' }} />
      </div>)}
      <button type="button" onClick={() => setFaqs([...faqs, { id: `faq-${Date.now()}`, category: 'General', question: '', answer: '' }])} style={{ marginTop: '16px' }}>+ Add FAQ</button>
    </div>

    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Resources library</h2>
      <p style={{ color: "var(--sample-muted)" }}>This is the complete resources list. To add a resource, duplicate an item inside the relevant Books, Podcasts, or Websites list and update its title, author, description, and optional URL.</p>
      <textarea value={resourcesText} onChange={(e) => setResourcesText(e.target.value)} rows={18} spellCheck={false} style={{ ...inputStyle, fontFamily: 'ui-monospace, monospace', fontSize: '0.78rem', resize: 'vertical' }} />
    </div>

    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Legal & privacy</h2>
      <p style={{ color: "var(--sample-muted)" }}>Optional replacement text for each page. Leave a field empty to retain the current published policy; line breaks are kept.</p>
      <label style={{ display: 'block', fontWeight: 650 }}>Privacy policy replacement<textarea value={privacyText} rows={8} onChange={(e) => setPrivacyText(e.target.value)} style={{ ...inputStyle, marginTop: '6px', resize: 'vertical' }} /></label>
      <label style={{ display: 'block', fontWeight: 650, marginTop: '14px' }}>Terms of service replacement<textarea value={termsText} rows={8} onChange={(e) => setTermsText(e.target.value)} style={{ ...inputStyle, marginTop: '6px', resize: 'vertical' }} /></label>
    </div>
    {status && <p style={{ color: status.startsWith('✓') ? '#15803d' : '#b91c1c', fontWeight: 650 }}>{status}</p>}
    <button type="submit" disabled={saving} style={{ background: 'var(--brand-accent)', color: '#fff', border: 0, borderRadius: '12px', padding: '14px 28px', fontWeight: 700, cursor: saving ? 'wait' : 'pointer' }}>{saving ? 'Saving…' : 'Save website content'}</button>
  </form>;
}
