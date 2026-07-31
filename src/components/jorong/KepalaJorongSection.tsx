import type { Jorong } from "@/data/jorong";
import { KepalaAvatar } from "./KepalaAvatar";

interface Props {
  jorong: Jorong;
}

export function KepalaJorongSection({ jorong }: Props) {
  const { kepala } = jorong;

  return (
    <section
      id="kepala-jorong"
      style={{
        padding: "96px 0",
        borderTop: "1px solid var(--line)",
        background: "#ffffff",
        scrollMarginTop: "100px",
      }}
    >
      <div className="ng-wrap">
        <div style={{ marginBottom: "48px" }}>
          <p className="ng-label" style={{ marginBottom: "12px" }}>Kepemimpinan Jorong</p>
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
            Kepala Jorong
          </h2>
          <div style={{ width: "40px", height: "3px", background: "var(--accent)", borderRadius: "2px" }} />
        </div>

        <div
          className="ng-cols-2"
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <KepalaAvatar
            nama={kepala.nama}
            foto={kepala.foto}
            slug={jorong.slug}
            size="detail"
          />

          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gray-500)",
                marginBottom: "10px",
              }}
            >
              {jorong.nama}
            </p>
            <h3
              className="serif"
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 700,
                color: "var(--gray-900)",
                marginBottom: "8px",
                letterSpacing: "-0.02em",
              }}
            >
              {kepala.nama}
            </h3>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--gray-500)",
                marginBottom: "28px",
              }}
            >
              Periode {kepala.periode}
            </p>

            <div
              style={{
                padding: "24px 28px",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gray-500)",
                  marginBottom: "12px",
                }}
              >
                Visi Kepemimpinan
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--gray-700)",
                  lineHeight: 1.85,
                  fontWeight: 400,
                }}
              >
                {kepala.visi}
              </p>
            </div>

            {kepala.telepon && (
              <p style={{ fontSize: "13px", color: "var(--gray-500)" }}>
                Kontak:{" "}
                <span style={{ fontWeight: 600, color: "var(--gray-700)" }}>
                  {kepala.telepon}
                </span>
                <span style={{ marginLeft: "8px", fontSize: "12px", color: "var(--gray-400)" }}>
                  (data dummy)
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
