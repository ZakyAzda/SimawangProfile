import React from "react";

const KESEHATAN_STATS = [
  { label: "Posyandu Aktif", value: "8", icon: "vaccines" },
  { label: "Bidan Desa", value: "3", icon: "medical_services" },
  { label: "Kader Kesehatan", value: "45", icon: "health_and_safety" },
  { label: "Rumah Sehat", value: "85%", icon: "home_health" },
];

export function KesehatanSection() {
  return (
    <section style={{ padding: "80px 0 120px", background: "#f8f9fa", borderTop: "1px solid var(--line)" }}>
      <div className="ng-wrap">
        <div style={{ textAlign: "center", marginBottom: "56px", maxWidth: "600px", marginInline: "auto" }}>
          <p className="ng-label" style={{ marginBottom: "12px", justifyContent: "center" }}>Fasilitas & Layanan</p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 700,
              color: "var(--gray-900)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Kesehatan & Sanitasi
          </h2>
          <p style={{ fontSize: "15px", color: "var(--gray-600)", lineHeight: 1.7 }}>
            Infrastruktur kesehatan dasar yang terus ditingkatkan untuk menjamin kesejahteraan dan kualitas hidup masyarakat nagari.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {KESEHATAN_STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "#ffffff",
                padding: "32px 24px",
                borderRadius: "16px",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              className="ng-kesehatan-card"
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: "var(--gray-50)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  color: "var(--accent)"
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                  {stat.icon}
                </span>
              </div>
              <h3
                className="serif"
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "var(--gray-900)",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </h3>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ng-kesehatan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
        }
      `}</style>
    </section>
  );
}
