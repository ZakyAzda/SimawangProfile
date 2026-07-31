import Link from "next/link";

export function InfografisHero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "160px 0 80px",
        background: "#ffffff",
        borderBottom: "1px solid var(--line)",
        overflow: "hidden",
      }}
    >
      <div className="ng-wrap" style={{ position: "relative", zIndex: 1 }}>
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
            Info Grafis
          </span>
        </div>

        <p
          className="ng-label"
          style={{ marginBottom: "16px", color: "var(--accent)", letterSpacing: "0.2em" }}
        >
          Data & Statistik
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
            maxWidth: "700px",
          }}
        >
          Infografis Nagari Simawang
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
          Menyajikan rangkuman data demografi, kesehatan, hingga potensi ekonomi masyarakat nagari secara visual untuk transparansi dan kemudahan informasi.
        </p>
      </div>
    </section>
  );
}
