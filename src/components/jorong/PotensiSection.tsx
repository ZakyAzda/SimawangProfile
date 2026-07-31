import type { Jorong } from "@/data/jorong";

interface Props {
  jorong: Jorong;
}

export function PotensiSection({ jorong }: Props) {
  return (
    <section
      id="potensi"
      style={{
        padding: "96px 0",
        borderTop: "1px solid var(--line)",
        background: "#ffffff",
        scrollMarginTop: "100px",
      }}
    >
      <div className="ng-wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p className="ng-label" style={{ marginBottom: "12px" }}>Keunggulan</p>
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
              Sorotan &amp; Daya Tarik
            </h2>
            <div style={{ width: "40px", height: "3px", background: "var(--accent)", borderRadius: "2px" }} />
          </div>
        </div>

        <div
          className="ng-cols-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "14px",
            marginBottom: "56px",
          }}
        >
          {jorong.stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "24px 20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
                <span
                  className="serif"
                  style={{ fontSize: "26px", fontWeight: 700, color: "var(--gray-900)" }}
                >
                  {s.value}
                </span>
                {s.unit && (
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--gray-500)" }}>
                    {s.unit}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "12px", color: "var(--gray-500)", lineHeight: 1.4 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div
          className="ng-cols-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {jorong.highlights.map((h, i) => (
            <div
              key={h.title}
              className="ng-card"
              style={{
                padding: "28px",
                borderRadius: "14px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--gray-300)",
                  letterSpacing: "0.05em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="serif"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--gray-900)",
                  marginBottom: "12px",
                  paddingRight: "32px",
                }}
              >
                {h.title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--gray-600)", lineHeight: 1.8 }}>
                {h.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
