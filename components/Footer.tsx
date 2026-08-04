import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link className="brand footer-brand" href="/" style={{ color: "#fafafa", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <Image
            src="/logo.jpg"
            alt="Navisamarnath Logo"
            width={34}
            height={34}
            unoptimized
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              flexShrink: 0,
            }}
          />
          <span className="brand-name" style={{ fontWeight: 500, fontSize: "1.15rem", color: "#fafafa", letterSpacing: "-0.01em" }}>
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
          <h4>Navigation</h4>
          <nav aria-label="Footer sitemap">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/#services">Services</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/book-session">Book Session</Link>
            <Link href="/admin">Admin Portal</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link href="/services/individual">Individual Therapy</Link></li>
            <li><Link href="/services/coaching">Personal Coaching</Link></li>
            <li><Link href="/services/couples">Couples Therapy</Link></li>
            <li><Link href="/services/groups">Group Sessions</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <p className="footer-contact-info">
            <a href="mailto:navisamarnathofc@gmail.com" style={{ textDecoration: "underline" }}>navisamarnathofc@gmail.com</a>
          </p>
          <div style={{ marginTop: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
            <a
              href="https://www.instagram.com/navisamarnath?igsh=MWw5aHRob3FzaWpybg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "38px", height: "38px", borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", color: "#fff",
                fontSize: "1.05rem", textDecoration: "none", transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
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
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "38px", height: "38px", borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", color: "#fff",
                fontSize: "1.05rem", textDecoration: "none", transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
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
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "38px", height: "38px", borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", color: "#fff",
                fontSize: "1.05rem", textDecoration: "none", transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Navisamarnath. All rights reserved.</p>
      </div>
    </footer>
  );
}
