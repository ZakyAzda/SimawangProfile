import Link from "next/link";
import { HeroSlideshow } from "./HeroSlideshow";

export function HeroSection() {
  return (
    <section
      style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}
    >
      {/* ── Slideshow background ── */}
      <HeroSlideshow />
      {/* Clean dark overlay — sits above slides (z:2) */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(0deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.15) 100%)" }} />

      <div className="ng-wrap" style={{ position: "relative", width: "100%", padding: "0 40px", zIndex: 3, marginTop: "60px" }}>
        {/* Location pill */}
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", marginBottom: "28px",
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.20)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>location_on</span>
          <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", color: "rgba(255,255,255,0.85)" }}>
            Nagari Simawang · Batipuh Selatan · Kab. Tanah Datar · Sumatera Barat
          </span>
        </div>

        <h1
          className="serif"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            maxWidth: "700px",
          }}
        >
          Nagari Simawang
        </h1>

        <p style={{ fontSize: "17px", fontWeight: 300, color: "rgba(255,255,255,0.75)", maxWidth: "480px", lineHeight: 1.8, marginBottom: "40px" }}>
          Portal informasi resmi Nagari Simawang — data terbuka, berita, dan arsip pemerintahan untuk seluruh warga.
        </p>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Link
            href="/profil"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px",
              background: "var(--accent)",
              color: "#fff",
              fontSize: "14px", fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
          >
            Tentang Nagari
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
          <Link
            href="/infografis/nagari"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px",
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.45)",
              color: "#fff",
              fontSize: "14px", fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Lihat Data
          </Link>
        </div>
      </div>

      {/* scroll hint */}
      <div style={{ position: "absolute", right: "48px", bottom: "40px", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <span className="material-symbols-outlined ng-bounce" style={{ fontSize: "22px", color: "rgba(255,255,255,0.45)" }}>keyboard_arrow_down</span>
      </div>
    </section>
  );
}
