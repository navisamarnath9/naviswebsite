"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  const [privacyText, setPrivacyText] = useState("");
  useEffect(() => { getDoc(doc(db, "settings", "legal")).then((snapshot) => { if (snapshot.exists()) setPrivacyText(snapshot.data().privacyText || ""); }).catch(() => undefined); }, []);
  return (
    <main className="sample-home privacy-page" id="top">
      <Navbar />

      <div id="main-content" className="sample-surface">
        <section className="sample-section" style={{ padding: "100px 24px 80px", maxWidth: "900px", margin: "0 auto" }}>
          <p className="sample-overline" style={{ color: "var(--brand-accent)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Legal &amp; Data Transparency
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#18181b", margin: "12px 0 24px", fontFamily: "var(--display)", fontWeight: 500, lineHeight: 1.15 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--sample-muted)", lineHeight: 1.7, marginBottom: "40px" }}>
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          {privacyText && <div className="privacy-body" style={{ whiteSpace: "pre-line", color: "#27272a", fontSize: "1rem", lineHeight: 1.75, marginBottom: "40px" }}>{privacyText}</div>}
          {!privacyText && <>
          <div style={{ background: "rgba(49, 72, 81, 0.04)", borderLeft: "4px solid #314851", padding: "24px 28px", borderRadius: "8px", marginBottom: "48px" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#314851", fontSize: "1.15rem", fontWeight: 600 }}>
              🔒 Essential Data Promise
            </h3>
            <p style={{ margin: 0, color: "#27272a", fontSize: "1rem", lineHeight: 1.65 }}>
              We collect your personal information (such as name, email, phone number, and consultation requests) <strong>strictly for the purpose of communicating with you</strong> and scheduling your sessions. Once our communication and engagement with you is concluded, your personal contact data is promptly deleted.
            </p>
          </div>

          <div className="privacy-body" style={{ display: "flex", flexDirection: "column", gap: "36px", color: "#27272a", fontSize: "1rem", lineHeight: 1.75 }}>
            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                1. Information We Collect
              </h2>
              <p>
                When you request a consultation, book a session, or contact us through our website, we may ask for minimal information necessary to get in touch with you:
              </p>
              <ul style={{ paddingLeft: "24px", margin: "12px 0" }}>
                <li>Full Name</li>
                <li>Email Address</li>
                <li>WhatsApp / Phone Number</li>
                <li>Preferred session type &amp; scheduling preferences</li>
                <li>Brief optional notes regarding your consultation request</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                2. How We Use Your Information
              </h2>
              <p>
                Your information is used solely for:
              </p>
              <ul style={{ paddingLeft: "24px", margin: "12px 0" }}>
                <li>Responding to your inquiries and consultation requests.</li>
                <li>Coordinating date and time availability for therapy or coaching sessions.</li>
                <li>Sending automated booking confirmation emails regarding your request.</li>
              </ul>
              <p>
                We <strong>never</strong> sell, rent, trade, or share your contact information with third-party advertisers or marketers.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                3. Data Retention &amp; Deletion Policy
              </h2>
              <p>
                We believe in strict data minimization. Contact information provided via our online consultation forms is retained only as long as necessary to complete our communication with you. Once your inquiry or session engagement is completed, your personal contact records are permanently deleted from our active communication queues.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                4. Confidentiality &amp; Security
              </h2>
              <p>
                All communications and clinical discussions adhere to strict professional ethics and confidentiality guidelines. Technical safeguards are implemented to protect form submissions in transit.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                5. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or wish to request immediate deletion of your communication details, please reach out to us at:
              </p>
              <p style={{ fontWeight: 600, color: "#314851" }}>
                Email: <a href="mailto:navisamarnathofc@gmail.com" style={{ textDecoration: "underline", color: "#314851" }}>navisamarnathofc@gmail.com</a>
              </p>
            </section>
          </div>

          </>}
          <div style={{ marginTop: "56px", paddingTop: "28px", borderTop: "1px solid var(--sample-line)" }}>
            <Link href="/" style={{ color: "#314851", fontWeight: 600, textDecoration: "none" }}>
              ← Return to Home
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
