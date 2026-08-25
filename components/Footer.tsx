"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { defaultSiteSettings, type SiteSettings } from "@/lib/siteSettings";

export default function Footer() {
  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    getDoc(doc(db, "settings", "site-content")).then((snapshot) => {
      if (snapshot.exists()) setSite({ ...defaultSiteSettings, ...snapshot.data() } as SiteSettings);
    }).catch(() => undefined);
  }, []);

  const socialStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#ffffff", fontSize: "1.05rem", textDecoration: "none" };

  return (
    <footer className="footer">
      <div className="footer-top">
        <Link className="brand footer-brand" href="/" style={{ color: "#ffffff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src="/logo-white.png"
              alt="Navisamarnath Logo"
              width={42}
              height={42}
              unoptimized
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                transform: "scale(2.35)",
              }}
            />
          </div>
          <span className="brand-name" style={{ fontWeight: 600, fontSize: "1.2rem", color: "#ffffff", letterSpacing: "-0.01em" }}>
            Navisamarnath
          </span>
        </Link>
        <p>
          Step into your greater self.
          <br />
          Where Aspiration Meets Transformation.
        </p>
        <a className="footer-circle" href="#top" aria-label="Back to top">
          ↑
        </a>
      </div>

      <div className="footer-middle-sitemap">
        <div className="footer-col">
          <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
            Navigation
          </h4>
          <nav aria-label="Footer sitemap">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/#services">Services</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/book-session">Book Session</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
            Services
          </h4>
          <ul>
            <li><Link href="/services/individual">Individual Therapy</Link></li>
            <li><Link href="/services/coaching">Coaching</Link></li>
            <li><Link href="/services/couples">Couples/Family Therapy</Link></li>
            <li><Link href="/services/groups">Group Sessions</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
            Legal &amp; Privacy
          </h4>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
            Connect
          </h4>
          <p className="footer-contact-info">
            <a href="mailto:navisamarnathofc@gmail.com" style={{ color: "#ffffff", textDecoration: "underline" }}>
              navisamarnathofc@gmail.com
            </a>
          </p>
          <div style={{ marginTop: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
            <a
              href="https://www.instagram.com/navisamarnath?igsh=MWw5aHRob3FzaWpybg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                color: "#ffffff",
                fontSize: "1.05rem",
                textDecoration: "none",
                transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://www.facebook.com/share/14nQckuA18H/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                color: "#ffffff",
                fontSize: "1.05rem",
                textDecoration: "none",
                transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="https://www.youtube.com/@navisamarnath"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                color: "#ffffff",
                fontSize: "1.05rem",
                textDecoration: "none",
                transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </a>

            {site.xUrl && <a href={site.xUrl} target="_blank" rel="noopener noreferrer" aria-label="X" style={socialStyle}>𝕏</a>}
            {site.threadsUrl && <a href={site.threadsUrl} target="_blank" rel="noopener noreferrer" aria-label="Threads" style={{ ...socialStyle, fontSize: "0.76rem", fontWeight: 800 }}>@</a>}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Navisamarnath. All rights reserved.</p>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginTop: "6px", maxWidth: "600px" }}>
          Privacy Notice: We collect user data strictly for communicating with you. All personal information is deleted once our communication is completed.
        </p>
        <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
          <Link href="/privacy" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", textDecoration: "underline" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", textDecoration: "underline" }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
