import React from "react";

const UMKM_DATA = [
  { kategory: "Kuliner", count: 124, color: "#f59f00" },
  { kategory: "Kriya / Kerajinan", count: 45, color: "#0c8599" },
  { kategory: "Jasa", count: 32, color: "#e03131" },
  { kategory: "Pertanian & Peternakan", count: 86, color: "#2f9e44" },
];

export function EkonomiSection() {
  const totalUMKM = UMKM_DATA.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <section style={{ padding: "80px 0", background: "#ffffff", borderTop: "1px solid var(--line)" }}>
      <div className="ng-wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="ng-ekonomi-grid"
        >
          {/* Text & Stats */}
          <div>
            <p className="ng-label" style={{ marginBottom: "12px" }}>Potensi Ekonomi</p>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(26px, 3vw, 40px)",
                fontWeight: 700,
                color: "var(--gray-900)",
                letterSpacing: "-0.02em",
                marginBottom: "24px",
              }}
            >
              Kekuatan UMKM Nagari
            </h2>
            <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.8, marginBottom: "32px" }}>
              Nagari Simawang memiliki pertumbuhan usaha mikro, kecil, dan menengah yang cukup pesat, menjadi tulang punggung perekonomian masyarakat lokal.
            </p>
            
            <div
              style={{
                padding: "24px",
                background: "#f8f9fa",
                border: "1px solid var(--line)",
                borderLeft: "4px solid var(--accent)",
                borderRadius: "12px",
                display: "inline-block"
              }}
            >
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: "8px" }}>
                Total UMKM Aktif
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span className="serif" style={{ fontSize: "48px", fontWeight: 700, color: "var(--gray-900)", lineHeight: 1 }}>
                  {totalUMKM}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent)" }}>
                  Unit Usaha
                </span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div
            style={{
              padding: "40px",
              background: "#ffffff",
              border: "1px solid var(--line)",
              borderRadius: "20px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.03)"
            }}
          >
            <h3 className="serif" style={{ fontSize: "18px", fontWeight: 700, marginBottom: "24px", color: "var(--gray-900)" }}>
              Sebaran Kategori UMKM
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {UMKM_DATA.map((item) => {
                const percentage = Math.round((item.count / totalUMKM) * 100);
                return (
                  <div key={item.kategory}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--gray-700)" }}>{item.kategory}</span>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: item.color }}>{item.count} ({percentage}%)</span>
                    </div>
                    <div style={{ width: "100%", height: "10px", background: "var(--gray-100)", borderRadius: "100px", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: "100%",
                          background: item.color,
                          borderRadius: "100px",
                          transition: "width 1s ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ng-ekonomi-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
