"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const JORONG_LIST = [
  "Batu Limbak", "Piliang Bendang", "Pincuran Gadang", "Koto Gadang",
  "Ombilin", "Padang Data", "Baduih", "Darek"
];

const NAV_LINKS = [
  { href: "/",           label: "Home"       },
  { href: "/profil",     label: "Profil"     },
  { href: "/jorong",     label: "Jorong",    dropdown: true },

  { href: "/berita",     label: "Berita"     },
  { href: "/galeri",     label: "Galeri"     },
];

export function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    // run once on mount
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isTransparent = isHome && !scrolled;

  return (
    <header className={`navbar-dynamic ${isTransparent ? "transparent" : "scrolled"}`}>
      <div className="navbar-inner">
        {/* Brand */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="nav-brand-name" style={{ fontFamily: "var(--font-display), serif" }}>Nagari Simawang</div>
          <div className="nav-brand-sub">Kecamatan Rambatan</div>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links" id="desktop-nav">
          {NAV_LINKS.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.href} className="dropdown-wrapper">
                  <Link href={link.href} className={`nav-link ${pathname.startsWith(link.href) ? "active" : ""}`} style={{ cursor: "pointer" }}>
                    {link.label}
                    <span className="material-symbols-outlined" style={{ fontSize: "14px", marginLeft: "4px", verticalAlign: "middle" }}>expand_more</span>
                  </Link>
                  <div className="dropdown-menu">
                    <Link href={link.href} className="dropdown-item" style={{ fontWeight: 700, borderBottom: "1px solid rgba(0,0,0,0.06)", borderRadius: "8px 8px 0 0", marginBottom: "4px", paddingBottom: "12px", color: "var(--accent, #000)" }}>
                      Lihat Semua Jorong
                    </Link>
                    {JORONG_LIST.map((jorong) => {
                      const slug = jorong.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <Link key={jorong} href={`/jorong/${slug}`} className="dropdown-item">
                          {jorong}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Scoped CSS for Dynamic Island effect & Transparent State */}
      <style>{`
        .navbar-dynamic {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: 900px;
          z-index: 100;
          border-radius: 100px;
          transition: box-shadow 0.3s ease, top 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        }
        
        /* State 1: Transparent (Top of Home Page) */
        .navbar-dynamic.transparent {
          background-color: transparent;
          border: 1px solid transparent;
          box-shadow: none;
        }
        .navbar-dynamic.transparent .nav-brand-name {
          color: #ffffff;
        }
        .navbar-dynamic.transparent .nav-brand-sub {
          color: rgba(255, 255, 255, 0.7);
        }
        .navbar-dynamic.transparent .nav-link {
          color: rgba(255, 255, 255, 0.85);
        }
        .navbar-dynamic.transparent .nav-link:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.15);
        }
        .navbar-dynamic.transparent .nav-link.active {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.15);
        }

        /* State 2: Scrolled (or on other pages) */
        .navbar-dynamic.scrolled {
          top: 16px;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        .navbar-dynamic.scrolled .nav-brand-name {
          color: #212529;
        }
        .navbar-dynamic.scrolled .nav-brand-sub {
          color: #495057; /* Grey accent */
        }
        .navbar-dynamic.scrolled .nav-link {
          color: #495057;
        }
        .navbar-dynamic.scrolled .nav-link:hover {
          color: #212529;
          background-color: #f1f3f5; /* Light grey */
        }
        .navbar-dynamic.scrolled .nav-link.active {
          color: #212529;
          background-color: #f1f3f5;
        }

        /* Inner Layout */
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          padding: 0 32px;
        }
        .nav-brand-name {
          font-size: 19px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          transition: color 0.3s ease;
        }
        .nav-brand-sub {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: 2px;
          transition: color 0.3s ease;
        }
        
        /* Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          border-radius: 100px;
          transition: color 0.3s ease, background-color 0.3s ease;
        }

        /* Dropdown */
        .dropdown-wrapper {
          position: relative;
        }
        .dropdown-menu {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          top: calc(100% + 4px);
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.15);
          padding: 12px;
          min-width: 180px;
          border: 1px solid rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
        }
        .dropdown-wrapper:hover .dropdown-menu {
          visibility: visible;
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .dropdown-item {
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #495057;
          text-decoration: none;
          border-radius: 8px;
          transition: background-color 0.2s, color 0.2s;
        }
        .dropdown-item:hover {
          background-color: #f1f3f5;
          color: #212529;
        }
        
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .navbar-inner { padding: 0 24px; }
        }
      `}</style>
    </header>
  );
}
