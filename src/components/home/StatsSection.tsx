import Link from "next/link";

export const STATS = [
  { icon: "health_and_safety", label: "Data Kesehatan", href: "/infografis/kesehatan", desc: "Stunting & gizi warga" },
  { icon: "account_balance", label: "Data Nagari", href: "/infografis/nagari", desc: "Profil & kependudukan" },
  { icon: "history_edu", label: "Data Sejarah", href: "/infografis/sejarah", desc: "Warisan budaya & adat" },
  { icon: "park", label: "Data Potensi", href: "/infografis/potensi", desc: "Alam & sumber daya" },
  { icon: "cleaning_services", label: "Data Sanitasi", href: "/infografis/sanitasi", desc: "Air bersih & sanitasi" },
  { icon: "storefront", label: "Data UMKM", href: "/infografis/umkm", desc: "Usaha & ekonomi lokal" },
];

const glassCSS = `
  .ng-glass-card {
    position: relative;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    padding: 20px 18px;
    border-radius: 14px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.07);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255,255,255,0.6);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    overflow: hidden;
  }
  .ng-glass-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, transparent, rgba(73,80,87,0.15), transparent);
    border-radius: 20px 20px 0 0;
    transition: background 0.3s ease;
  }
  .ng-glass-card:hover {
    transform: translateY(-6px);
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255,255,255,0.6);
    background: #ffffff;
    border-color: rgba(0,0,0,0.12);
  }
  .ng-glass-card:hover::before {
    background: linear-gradient(90deg, transparent, rgba(73,80,87,0.4), transparent);
  }
  .ng-glass-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #f1f3f5;
    border: 1px solid rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  .ng-glass-card:hover .ng-glass-icon {
    background: #e9ecef;
    border-color: rgba(0,0,0,0.1);
  }
  .ng-glass-arrow {
    margin-top: auto;
    padding-top: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gray-500);
    transition: color 0.3s ease, gap 0.3s ease;
  }
  .ng-glass-card:hover .ng-glass-arrow {
    color: var(--gray-900);
    gap: 10px;
  }
`;

export function StatsSection() {
  return (
    <section id="infografis" style={{ width: "100%", background: "transparent", padding: "80px 0" }}>
      <style>{glassCSS}</style>
      <div className="ng-wrap">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "44px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p className="ng-label" style={{ marginBottom: "10px", color: "var(--gray-500)" }}>Open Data</p>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em" }}>
              Infografis &amp; Statistik
            </h2>
            <p style={{ color: "var(--gray-500)", marginTop: "8px", maxWidth: "600px", lineHeight: 1.6 }}>
              Transparansi data statistik Nagari Simawang, bersumber langsung dari pendataan yang dilakukan oleh aparatur nagari.
            </p>
          </div>
        </div>

        <div
          className="ng-cols-stats"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}
        >
          {STATS.map((s) => (
            <Link key={s.label} href={s.href} className="ng-glass-card">
              <div className="ng-glass-icon">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "24px", color: "var(--gray-700, #495057)" }}
                >
                  {s.icon}
                </span>
              </div>
              
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: "8px" }}>
                Open Data
              </p>

              <h3
                className="serif"
                style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-900)", marginBottom: "8px", lineHeight: 1.2 }}
              >
                {s.label}
              </h3>
              
              <p style={{ fontSize: "13px", color: "var(--gray-500)", lineHeight: 1.6, flexGrow: 1 }}>
                {s.desc}
              </p>
              
              <div className="ng-glass-arrow">
                Lihat Data Lengkap
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}