"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <main className="sample-home terms-page" id="top">
      <Navbar />

      <div id="main-content" className="sample-surface">
        <section className="sample-section" style={{ padding: "100px 24px 80px", maxWidth: "900px", margin: "0 auto" }}>
          <p className="sample-overline" style={{ color: "var(--brand-accent)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Terms &amp; Conditions
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#18181b", margin: "12px 0 24px", fontFamily: "var(--display)", fontWeight: 500, lineHeight: 1.15 }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--sample-muted)", lineHeight: 1.7, marginBottom: "40px" }}>
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div style={{ background: "rgba(10, 48, 61, 0.04)", borderLeft: "4px solid #0A303D", padding: "24px 28px", borderRadius: "8px", marginBottom: "48px" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#0A303D", fontSize: "1.15rem", fontWeight: 600 }}>
              📋 Communication &amp; Data Notice
            </h3>
            <p style={{ margin: 0, color: "#27272a", fontSize: "1rem", lineHeight: 1.65 }}>
              Information submitted through this website is strictly used to communicate with you regarding your consultation or session request. Upon conclusion of our communication, all user contact information is safely deleted.
            </p>
          </div>

          <div className="terms-body" style={{ display: "flex", flexDirection: "column", gap: "36px", color: "#27272a", fontSize: "1rem", lineHeight: 1.75 }}>
            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the website of <strong>Navisamarnath Psychology &amp; Coaching Practice</strong>, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our site or submit consultation forms.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                2. Scope of Services
              </h2>
              <p>
                Navisamarnath provides individual therapy, couples therapy, personal &amp; executive coaching, and group session services. Online consultation forms serve solely as a preliminary inquiry channel and do not constitute an immediate therapeutic client relationship until formal intake and agreement are completed.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                3. User Data &amp; Deletion Agreement
              </h2>
              <p>
                Any personal details (including name, email, phone number, and message notes) provided through our website are gathered strictly for the purpose of getting in touch with you. Once our communication regarding your inquiry or session booking has ended, your personal data is promptly deleted from our communication logs.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                4. Emergency &amp; Crisis Disclaimer
              </h2>
              <p>
                This website and its consultation request forms are <strong>not intended for emergency or crisis situations</strong>. If you are experiencing a mental health crisis, feeling unsafe, or facing an immediate medical emergency, please call your local emergency services (e.g., 911 / 112 / local crisis helpline) immediately.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                5. Intellectual Property
              </h2>
              <p>
                All original content, text, branding, logos, and materials on this site are the property of Navisamarnath and are protected by applicable copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.4rem", color: "#18181b", marginBottom: "14px", fontWeight: 600 }}>
                6. Contact Information
              </h2>
              <p>
                For any questions or inquiries regarding these Terms of Service, please contact:
              </p>
              <p style={{ fontWeight: 600, color: "#0A303D" }}>
                Email: <a href="mailto:navisamarnathofc@gmail.com" style={{ textDecoration: "underline", color: "#0A303D" }}>navisamarnathofc@gmail.com</a>
              </p>
            </section>
          </div>

          <div style={{ marginTop: "56px", paddingTop: "28px", borderTop: "1px solid var(--sample-line)" }}>
            <Link href="/" style={{ color: "#0A303D", fontWeight: 600, textDecoration: "none" }}>
              ← Return to Home
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
