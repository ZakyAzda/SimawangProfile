import Link from "next/link";
import { dataJorong } from "@/data/jorong";

interface Props {
  currentSlug: string;
}

export function JorongNavSection({ currentSlug }: Props) {
  const others = dataJorong.filter((j) => j.slug !== currentSlug);

  return (
    <section
      style={{
        padding: "80px 0 96px",
        borderTop: "1px solid var(--line)",
        background: "#ffffff",
      }}
    >
      <div className="ng-wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <p className="ng-label" style={{ marginBottom: "10px" }}>Jelajahi Nagari</p>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                color: "var(--gray-900)",
                letterSpacing: "-0.02em",
              }}
            >
              Jorong Lainnya
            </h2>
          </div>
          <Link
            href="/jorong"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            Lihat semua jorong
          </Link>
        </div>

        <div
          className="ng-cols-jorong"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "14px",
          }}
        >
          {others.map((j) => (
            <Link
              key={j.slug}
              href={`/jorong/${j.slug}`}
              className="ng-card"
              style={{
                padding: "22px 20px",
                borderRadius: "14px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gray-400)",
                }}
              >
                {j.kategori}
              </p>
              <h3
                className="serif"
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--gray-900)",
                  lineHeight: 1.3,
                }}
              >
                {j.nama.replace("Jorong ", "")}
              </h3>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "var(--gray-500)",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {j.ringkasan}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ng-cols-jorong { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
