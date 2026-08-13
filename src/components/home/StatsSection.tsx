import Link from "next/link";

export const STATS = [
  { icon: "health_and_safety", label: "Data Kesehatan", href: "/infografis/kesehatan", desc: "Stunting & gizi warga", color: "#16a34a", bg: "#f0fdf4" },
  { icon: "account_balance",   label: "Data Nagari",    href: "/infografis/nagari",    desc: "Profil & kependudukan", color: "#1d4ed8", bg: "#eff6ff" },
  { icon: "history_edu",       label: "Data Sejarah",   href: "/infografis/sejarah",   desc: "Warisan budaya & adat", color: "#7c3aed", bg: "#f5f3ff" },
  { icon: "park",              label: "Data Potensi",   href: "/infografis/potensi",   desc: "Alam & sumber daya", color: "#065f46", bg: "#ecfdf5" },
  { icon: "cleaning_services", label: "Data Sanitasi",  href: "/infografis/sanitasi",  desc: "Air bersih & sanitasi", color: "#0e7490", bg: "#ecfeff" },
  { icon: "storefront",        label: "Data UMKM",      href: "/infografis/umkm",      desc: "Usaha & ekonomi lokal", color: "#b45309", bg: "#fffbeb" },
];

const CSS = `
  .stats-section {
    padding: 100px 0;
    background: #f8f9fa;
    position: relative;
  }
  .stats-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,60,48,0.03), transparent);
    pointer-events: none;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 900px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .stats-grid { grid-template-columns: 1fr; }
  }
  .stats-card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    padding: 28px 28px 24px;
    border-radius: 20px;
    background: #fff;
    border: 1px solid rgba(0,0,0,0.07);
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .stats-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--card-color);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .stats-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.10);
    border-color: rgba(0,0,0,0.1);
  }
  .stats-card:hover::before {
    opacity: 1;
  }
  .stats-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    transition: transform 0.3s ease;
  }
  .stats-card:hover .stats-icon-wrap {
    transform: scale(1.08) rotate(-3deg);
  }
  .stats-label-tag {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 8px;
  }
  .stats-title {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
    line-height: 1.25;
  }
  .stats-desc {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.6;
    flex-grow: 1;
    margin-bottom: 20px;
  }
  .stats-arrow {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9ca3af;
    transition: color 0.3s ease, gap 0.3s ease;
    margin-top: auto;
  }
  .stats-card:hover .stats-arrow {
    color: #111827;
    gap: 10px;
  }
`;

export function StatsSection() {
  return (
    <section id="infografis" className="stats-section">
      <style>{CSS}</style>
      <div className="ng-wrap">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <p className="ng-label" style={{ marginBottom: "12px", color: "#1a3c30" }}>Open Data</p>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Infografis & Statistik
            </h2>
            <p style={{ color: "#6b7280", marginTop: "14px", maxWidth: "500px", lineHeight: 1.7, fontSize: "15px" }}>
              Transparansi data langsung dari pendataan aparatur nagari untuk warga.
            </p>
          </div>
          <Link href="/infografis/nagari" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#1a3c30", textDecoration: "none", background: "rgba(26,60,48,0.07)", padding: "10px 18px", borderRadius: "100px", transition: "background 0.2s" }}>
            Lihat semua data
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>

        <div className="stats-grid">
          {STATS.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="stats-card"
              style={{ "--card-color": s.color } as React.CSSProperties}
            >
              <div className="stats-icon-wrap" style={{ background: s.bg }}>
                <span className="material-symbols-outlined" style={{ fontSize: "26px", color: s.color }}>
                  {s.icon}
                </span>
              </div>
              <p className="stats-label-tag">Open Data</p>
              <h3 className="serif stats-title">{s.label}</h3>
              <p className="stats-desc">{s.desc}</p>
              <div className="stats-arrow">
                Lihat Data
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}