import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link className="brand footer-brand" href="/">
          <span className="brand-symbol inverse" aria-hidden="true">
            N
          </span>
          <span className="brand-name">
            Navi
            <strong>samarnath</strong>
          </span>
        </Link>
        <p>
          Space to understand.
          <br />
          Support to move forward.
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
            <Link href="/services">Services</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link href="/services#individual">Individual Therapy</Link></li>
            <li><Link href="/services#coaching">Personal Coaching</Link></li>
            <li><Link href="/services#couples">Couples Therapy</Link></li>
            <li><Link href="/services#groups">Group Sessions</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Practice</h4>
          <p className="footer-contact-info">
            <strong>Navisamarnath, PhD</strong><br />
            Licensed Psychologist & Executive Coach<br />
            <span>hello@navisamarnath.com</span><br />
            <span>+1 (555) 392-8410</span>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Navisamarnath. All rights reserved.</p>
        <p className="legal-links">
          <span>Privacy Policy</span> · <span>Terms of Service</span> · <span>Good Faith Estimate</span>
        </p>
      </div>
    </footer>
  );
}
