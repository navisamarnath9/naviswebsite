"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [compactNav, setCompactNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompactNav(window.scrollY > 72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`sample-nav ${compactNav ? "is-compact" : ""} ${
          menuOpen ? "menu-is-open" : ""
        }`}
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <Link className="sample-nav-brand" href="/" onClick={closeMenu}>
          <span>Navisamarnath</span>
        </Link>

        <nav className="sample-nav-links" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "is-active" : ""}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/book-session"
            className="button book-session-btn sample-nav-booking-link"
            onClick={closeMenu}
          >
            Book Session
          </Link>
        </nav>

        <div className="nav-actions">
          <Link href="/book-session" className="button book-session-btn" onClick={closeMenu}>
            Book Session
          </Link>
        </div>

        <button
          className="sample-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((val) => !val)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Floating mobile booking button that appears on all pages */}
      <div className="mobile-floating-booking">
        <Link href="/book-session" className="button mobile-booking-btn">
          Book Session ↗
        </Link>
      </div>
    </>
  );
}
