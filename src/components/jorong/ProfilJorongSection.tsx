import type { Jorong } from "@/data/jorong";

interface Props {
  jorong: Jorong;
}

export function ProfilJorongSection({ jorong }: Props) {
  return (
    <section
      id="profil"
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
            marginBottom: "56px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p className="ng-label" style={{ marginBottom: "12px" }}>Profil Wilayah</p>
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
              Karakteristik &amp; Identitas
            </h2>
            <div style={{ width: "40px", height: "3px", background: "var(--accent)", borderRadius: "2px" }} />
          </div>
        </div>

        {jorong.etimologi && (
          <div
            style={{
              padding: "28px 32px",
              background: "#ffffff",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              marginBottom: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "12px",
              }}
            >
              Etimologi
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 400,
                color: "var(--gray-700)",
                lineHeight: 1.85,
                maxWidth: "720px",
              }}
            >
              {jorong.etimologi}
            </p>
          </div>
        )}

        <div
          className="ng-cols-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            className="ng-card"
            style={{ padding: "32px", borderRadius: "14px" }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gray-500)",
                marginBottom: "16px",
              }}
            >
              Karakteristik
            </p>
            <p style={{ fontSize: "14.5px", color: "var(--gray-700)", lineHeight: 1.85 }}>
              {jorong.karakteristik}
            </p>
          </div>

          <div
            className="ng-card"
            style={{ padding: "32px", borderRadius: "14px" }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gray-500)",
                marginBottom: "16px",
              }}
            >
              Potensi
            </p>
            <p style={{ fontSize: "14.5px", color: "var(--gray-700)", lineHeight: 1.85 }}>
              {jorong.potensi}
            </p>
          </div>
        </div>

        <div
          style={{
            padding: "24px 28px",
            borderLeft: "3px solid var(--accent)",
            background: "#ffffff",
            borderTop: "1px solid var(--line)",
            borderRight: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gray-500)",
              marginBottom: "10px",
            }}
          >
            Fokus Konten
          </p>
          <p style={{ fontSize: "14.5px", color: "var(--gray-700)", lineHeight: 1.8 }}>
            {jorong.fokusKonten}
          </p>
        </div>
      </div>
    </section>
  );
}
