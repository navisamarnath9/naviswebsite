"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="announcement">
        <p>
          <span className="availability-dot" aria-hidden="true" />
          Now welcoming new online clients
        </p>
        <Link href="/contact#booking">
          Complimentary consultation <ArrowIcon />
        </Link>
      </div>

      <header className="site-header">
        <Link className="brand" href="/" aria-label="Navisamarnath home">
          <span className="brand-symbol" aria-hidden="true">
            N
          </span>
          <span className="brand-name">
            Navi
            <strong>samarnath</strong>
          </span>
        </Link>

        <nav
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active-nav-item" : ""}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            className="mobile-book"
            href="/contact#booking"
            onClick={closeMenu}
          >
            Book a session <ArrowIcon />
          </Link>
        </nav>

        <div className="header-actions">
          <Link
            className={`button button-compact header-cta ${
              scrolled ? "scrolled-visible" : ""
            }`}
            href="/contact#booking"
          >
            Begin your journey <ArrowIcon />
          </Link>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((val) => !val)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
}
