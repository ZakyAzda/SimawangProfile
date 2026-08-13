"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Avoid hydration mismatch
  if (!mounted) return <div style={{ width: "36px", height: "36px" }} />;

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "100px",
        border: "1px solid rgba(128,128,128,0.25)",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s ease, border-color 0.2s ease",
        flexShrink: 0,
      }}
      className="theme-toggle-btn"
    >
      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
        {dark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
