/* ────────────────────────────────────────────────────────────
   ProfilHero.tsx — Hero banner halaman Profil
   Konsisten dengan HeroSection (home): dark base, overlay tipis,
   breadcrumb pill, dan aksen lingkaran dekoratif.
   ──────────────────────────────────────────────────────────── */
import Link from "next/link";

export function ProfilHero() {
  return (
    <section
      className="ng-profil-hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "56vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* subtle noise texture — sama seperti body .ng */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          opacity: 0.1,
        }}
      />

      {/* decorative arcs, sama gaya dengan aksen lain di situs */}
      <div
        style={{
          position: "absolute",
          right: "-120px",
          top: "-120px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-60px",
          top: "-60px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.03)",
        }}
      />
      {/* watermark ikon, konsisten dengan gaya Footer/LocationSection */}
      <span
        className="material-symbols-outlined"
        style={{
          position: "absolute",
          left: "-40px",
          bottom: "-60px",
          fontSize: "260px",
          color: "rgba(0,0,0,0.02)",
          pointerEvents: "none",
        }}
      >
        account_balance
      </span>

      <div
        className="ng-wrap"
        style={{ position: "relative", zIndex: 1, padding: "116px 40px 88px" }}
      >
        {/* breadcrumb pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            marginBottom: "28px",
            background: "#f8f9fa",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "100px",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#6c757d",
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            Beranda
          </Link>
          <span style={{ color: "#adb5bd", fontSize: "10px" }}>/</span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#212529",
              letterSpacing: "0.04em",
            }}
          >
            Profil Nagari
          </span>
        </div>

        <p
          className="ng-label"
          style={{ marginBottom: "16px", color: "var(--accent)", letterSpacing: "0.2em" }}
        >
          Penyelenggaraan Urusan Pemerintahan Nagari
        </p>

        <h1
          className="serif"
          style={{
            fontSize: "clamp(34px, 5vw, 62px)",
            fontWeight: 700,
            lineHeight: 1.08,
            color: "#212529",
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            maxWidth: "640px",
          }}
        >
          Profil &amp; Sejarah Nagari Simawang
        </h1>

        <p
          style={{
            fontSize: "16px",
            fontWeight: 300,
            color: "#495057",
            maxWidth: "520px",
            lineHeight: 1.8,
            marginBottom: "32px",
          }}
        >
          Menelusuri jejak sejarah, hak asal usul, dan silsilah kepemimpinan yang membentuk
          identitas budaya serta pemerintahan Nagari Simawang dari masa ke masa.
        </p>

        {/* quick-jump anchors, membantu navigasi halaman panjang */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[
            { href: "#sejarah", label: "Sejarah" },
            { href: "#suku", label: "Suku & Adat" },
            { href: "#pemimpin", label: "Kepemimpinan" },
          ].map((a) => (
            <a
              key={a.href}
              href={a.href}
              style={{
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#495057",
                textDecoration: "none",
                padding: "9px 18px",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "100px",
                transition: "background-color 0.2s ease, border-color 0.2s ease",
              }}
              className="ng-hero-anchor"
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .ng-hero-anchor:hover {
          background-color: #f8f9fa;
          border-color: rgba(0,0,0,0.15) !important;
          color: #212529 !important;
        }
        @media (max-width: 640px) {
          .ng-profil-hero { min-height: 48vh; }
        }
      `}</style>
    </section>
  );
}