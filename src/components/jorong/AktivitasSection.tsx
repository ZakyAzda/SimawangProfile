import type { Jorong } from "@/data/jorong";

interface Props {
  jorong: Jorong;
}

export function AktivitasSection({ jorong }: Props) {
  return (
    <section
      id="aktivitas"
      style={{
        padding: "96px 0",
        borderTop: "1px solid var(--line)",
        background: "#ffffff",
        scrollMarginTop: "100px",
      }}
    >
      <div className="ng-wrap" style={{ maxWidth: "900px" }}>
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <p className="ng-label" style={{ marginBottom: "12px" }}>Kehidupan Masyarakat</p>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 700,
              color: "var(--gray-900)",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Aktivitas &amp; Kegiatan
          </h2>
          <div
            style={{
              width: "40px",
              height: "3px",
              background: "var(--accent)",
              borderRadius: "2px",
              margin: "0 auto",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {jorong.aktivitas.map((item, i) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "20px 24px",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              className="ng-aktivitas-item"
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--gray-100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--gray-600)",
                }}
              >
                {i + 1}
              </span>
              <p
                style={{
                  fontSize: "14.5px",
                  color: "var(--gray-700)",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
