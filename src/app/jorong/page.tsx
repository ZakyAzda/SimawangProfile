import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { JorongCard } from "@/components/jorong/JorongCard";
import { dataJorong } from "@/data/jorong";
import { inter, merriweather } from "@/lib/ng-theme";

export const metadata = {
  title: "Jorong — Nagari Simawang",
  description:
    "Profil delapan jorong di Nagari Simawang: karakteristik, potensi, kepala jorong, dan kegiatan masyarakat.",
};

export default function JorongIndexPage() {
  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>

      <div className="ng">
        <NavBar />
        <main style={{ width: "100%", display: "flex", flexDirection: "column" }}>

          {/* ── Hero ── */}
          <section
            style={{
              position: "relative",
              width: "100%",
              minHeight: "52vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: "#ffffff",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <div style={{
              position: "absolute", right: "-120px", top: "-120px",
              width: "500px", height: "500px", borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.05)",
            }} />
            <div style={{
              position: "absolute", right: "-60px", top: "-60px",
              width: "300px", height: "300px", borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.08)",
            }} />
            <div style={{
              position: "absolute", left: "-80px", bottom: "-80px",
              width: "400px", height: "400px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)",
            }} />

            {/* Dot grid pattern */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }} />

            {/* Content */}
            <div className="ng-wrap" style={{ position: "relative", zIndex: 1, padding: "128px 40px 64px" }}>
              {/* Stat chips row */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
                {[
                  { icon: "location_city", label: "8 Jorong" },
                  { icon: "groups", label: "± 2.998 Jiwa" },
                  { icon: "landscape", label: "Batipuh Selatan" },
                ].map((chip) => (
                  <div key={chip.label} style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "6px 14px",
                    background: "#f8f9fa",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "100px",
                    fontSize: "12px", fontWeight: 600,
                    color: "#495057",
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{chip.icon}</span>
                    {chip.label}
                  </div>
                ))}
              </div>

              <p className="ng-label" style={{ marginBottom: "14px", color: "#6c757d", letterSpacing: "0.2em" }}>
                Wilayah Administratif
              </p>
              <h1
                className="serif"
                style={{
                  fontSize: "clamp(32px, 5vw, 58px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  color: "#212529",
                  letterSpacing: "-0.025em",
                  marginBottom: "20px",
                  maxWidth: "620px",
                }}
              >
                Delapan Jorong<br />
                <span style={{ color: "#868e96", fontWeight: 300 }}>Nagari Simawang</span>
              </h1>
              <p style={{
                fontSize: "16px", fontWeight: 300,
                color: "#495057",
                maxWidth: "500px", lineHeight: 1.85,
              }}>
                Setiap jorong memiliki karakteristik, potensi, dan kepemimpinan tersendiri.
                Pilih jorong untuk melihat profil lengkapnya.
              </p>
            </div>

            {/* Bottom fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.02))",
            }} />
          </section>

          {/* ── Grid ── */}
          <section style={{ padding: "72px 0 100px", background: "#ffffff" }}>
            <div className="ng-wrap">
              {/* Section label */}
              <div style={{ marginBottom: "40px" }}>
                <p className="ng-label" style={{ marginBottom: "8px" }}>Semua Jorong</p>
                <h2 className="serif" style={{
                  fontSize: "clamp(22px, 2.5vw, 30px)",
                  fontWeight: 700, color: "#212529",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}>
                  Profil Wilayah
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                }}
              >
                {dataJorong.map((j, idx) => (
                  <JorongCard key={j.slug} jorong={j} index={idx} />
                ))}
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </div>
  );
}
