"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function ContactPage() {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service") ?? undefined;

  return (
    <main id="top">
      <Navbar />

      <div id="main-content">
        {/* BANNER */}
        <section className="page-banner">
          <span className="kicker">Get in Touch</span>
          <h1>
            Begin your journey with <em>clarity.</em>
          </h1>
          <p className="page-lead">
            Request a complimentary 15-minute consultation or reach out directly with your questions. We reply within one business day.
          </p>
        </section>

        <section className="subpage-container">
          <div className="contact-layout">
            {/* CONTACT INFORMATION CARD */}
            <div>
              <div className="contact-info-card">
                <span className="resource-tag">Practice Details</span>
                <h3 style={{ fontSize: "2rem", marginBottom: "24px", color: "var(--blue)" }}>
                  Dr. Navisamarnath, PhD
                </h3>

                <div className="contact-info-item">
                  <h4>Email Us</h4>
                  <p>hello@navisamarnath.com</p>
                  <small style={{ color: "var(--cyan)" }}>Monitored confidentially Mon-Fri</small>
                </div>

                <div className="contact-info-item">
                  <h4>Call / Message</h4>
                  <p>+1 (555) 392-8410</p>
                  <small style={{ color: "var(--cyan)" }}>Secure clinical voicemail</small>
                </div>

                <div className="contact-info-item">
                  <h4>Practice Location</h4>
                  <p>100 Telehealth Way, Suite 400<br />San Francisco, CA 94107</p>
                  <small style={{ color: "var(--cyan)" }}>Online telehealth available statewide & PSYPACT states</small>
                </div>

                <div className="contact-info-item" style={{ marginBottom: 0 }}>
                  <h4>Office Hours</h4>
                  <p>Monday – Thursday: 9:00 AM – 6:00 PM<br />Friday: 9:00 AM – 2:00 PM</p>
                </div>
              </div>

              {/* REASSURANCE CARD */}
              <div style={{ marginTop: "32px", padding: "28px", borderRadius: "16px", border: "1px solid var(--line)", background: "var(--white)" }}>
                <h4 style={{ color: "var(--blue)", marginBottom: "8px" }}>🔒 Privacy & Security</h4>
                <p style={{ fontSize: "0.92rem", color: "var(--grey)", margin: 0 }}>
                  All consultations and message submissions are encrypted and handled with strict HIPAA-compliant confidentiality.
                </p>
              </div>
            </div>

            {/* BOOKING FORM */}
            <div id="booking">
              <BookingForm defaultService={selectedService} />
            </div>
          </div>

          {/* NEED QUICK ANSWERS */}
          <div style={{ marginTop: "80px", textAlign: "center", background: "var(--mist)", padding: "40px", borderRadius: "20px", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Have questions before booking?</h3>
            <p style={{ color: "var(--grey)", marginBottom: "24px" }}>
              Explore our comprehensive FAQ page for details on insurance, session structure, cancellation policies, and telehealth setup.
            </p>
            <Link className="button button-light" href="/faq">
              Visit FAQ Page <ArrowIcon />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
