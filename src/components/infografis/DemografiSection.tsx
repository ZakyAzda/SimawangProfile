import React from "react";

const DEMOGRAFI_DATA = [
  { label: "Total Penduduk", value: "5.432", unit: "Jiwa" },
  { label: "Laki-laki", value: "2.650", unit: "Jiwa" },
  { label: "Perempuan", value: "2.782", unit: "Jiwa" },
  { label: "Kepala Keluarga", value: "1.254", unit: "KK" },
];

const JORONG_DATA = [
  { name: "Simawang", percent: 35 },
  { name: "Bukik Kanduang", percent: 25 },
  { name: "Koto Gadang", percent: 20 },
  { name: "Piliang", percent: 15 },
  { name: "Lainnya", percent: 5 },
];

export function DemografiSection() {
  return (
    <section style={{ padding: "80px 0", background: "#ffffff" }}>
      <div className="ng-wrap">
        <div style={{ marginBottom: "48px" }}>
          <p className="ng-label" style={{ marginBottom: "12px" }}>Data Penduduk</p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 700,
              color: "var(--gray-900)",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Demografi & Wilayah
          </h2>
          <div style={{ width: "40px", height: "3px", background: "var(--accent)", borderRadius: "2px" }} />
        </div>

        {/* Big Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "64px",
          }}
        >
          {DEMOGRAFI_DATA.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "32px 24px",
                background: "#f8f9fa",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              <div style={{ marginBottom: "8px", color: "var(--gray-500)", fontSize: "14px", fontWeight: 500 }}>
                {item.label}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "6px" }}>
                <span className="serif" style={{ fontSize: "40px", fontWeight: 700, color: "var(--gray-900)", lineHeight: 1 }}>
                  {item.value}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent)" }}>
                  {item.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Distribution Bars */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--line)",
            padding: "40px",
            borderRadius: "20px",
          }}
        >
          <h3 className="serif" style={{ fontSize: "20px", fontWeight: 700, marginBottom: "32px", color: "var(--gray-900)" }}>
            Sebaran Penduduk per Jorong
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {JORONG_DATA.map((j) => (
              <div key={j.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gray-700)" }}>{j.name}</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--accent)" }}>{j.percent}%</span>
                </div>
                <div style={{ width: "100%", height: "12px", background: "var(--gray-100)", borderRadius: "100px", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${j.percent}%`,
                      height: "100%",
                      background: "var(--accent)",
                      borderRadius: "100px",
                      transition: "width 1s ease-in-out",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
