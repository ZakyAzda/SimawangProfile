import Image from "next/image";
import Link from "next/link";

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

export function NewsSection({ posts }: { posts: any[] }) {
  const featured = posts?.[0];
  const rest = posts?.slice(1, 3) ?? [];

  return (
    <section style={{ width: "100%", padding: "80px 0", background: "transparent" }}>
      <div className="ng-wrap">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "44px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p className="ng-label" style={{ marginBottom: "10px", color: "var(--gray-500)" }}>Informasi Terkini</p>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em" }}>
              Berita Terbaru
            </h2>
          </div>
          <Link href="/berita" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--gray-500)", textDecoration: "none" }}>
            Lihat semua
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
          </Link>
        </div>

        {!featured ? (
          <div style={{ padding: "60px 0", textAlign: "center", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "var(--gray-300)", display: "block", marginBottom: "10px" }}>newspaper</span>
            <p style={{ fontSize: "14px", color: "var(--gray-500)" }}>Belum ada berita yang diterbitkan.</p>
          </div>
        ) : (
          <div
            className="ng-cols-news"
            style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: "40px" }}
          >
            {/* Featured */}
            <Link href={`/berita/${featured.slug}`} className="ng-news" style={{ textDecoration: "none", display: "block" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#f1f3f5" }}>
                <Image
                  src={featured.image || "/berita-1.png"}
                  alt={featured.title}
                  fill
                  sizes="(max-width:768px) 100vw, 640px"
                  style={{ objectFit: "cover" }}
                  className="ng-img"
                />
                {featured.category && (
                  <span
                    style={{
                      position: "absolute", top: "14px", left: "14px",
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      background: "var(--accent)", color: "#fff",
                      padding: "4px 10px",
                    }}
                  >
                    {featured.category}
                  </span>
                )}
              </div>
              <div style={{ padding: "24px 0 0" }}>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--gray-500)", letterSpacing: "0.04em", marginBottom: "10px" }}>
                  {fmtDate(featured.publishedAt)}
                </p>
                <h3
                  className="serif"
                  style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 700, color: "var(--gray-900)", lineHeight: 1.3, letterSpacing: "-0.01em", marginBottom: "12px" }}
                >
                  {featured.title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--gray-500)", lineHeight: 1.75 }}>
                  {featured.content?.slice(0, 160)}…
                </p>
                <div
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    marginTop: "20px", fontSize: "13px", fontWeight: 600,
                    color: "var(--accent)",
                  }}
                >
                  Baca selengkapnya
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* Sidebar list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0", borderLeft: "1px solid rgba(0,0,0,0.07)", paddingLeft: "40px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: "20px" }}>
                Berita Lainnya
              </p>
              {rest.length === 0 ? (
                <p style={{ fontSize: "14px", color: "var(--gray-400)" }}>Belum ada berita lainnya.</p>
              ) : (
                rest.map((n, idx) => (
                  <Link
                    key={n.id}
                    href={`/berita/${n.slug}`}
                    className="ng-news"
                    style={{
                      textDecoration: "none", display: "flex", gap: "16px",
                      padding: "20px 0",
                      borderBottom: idx < rest.length - 1 ? "1px solid var(--line)" : "none",
                    }}
                  >
                    <div style={{ position: "relative", width: "80px", height: "64px", flexShrink: 0, overflow: "hidden", background: "#f1f3f5" }}>
                      <Image src={n.image || "/berita-1.png"} alt={n.title} fill sizes="80px" style={{ objectFit: "cover" }} className="ng-img" />
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", color: "var(--gray-500)", marginBottom: "6px" }}>{fmtDate(n.publishedAt)}</p>
                      <h4
                        className="serif"
                        style={{
                          fontSize: "15px", fontWeight: 700, color: "var(--gray-900)", lineHeight: 1.35,
                          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                        }}
                      >
                        {n.title}
                      </h4>
                    </div>
                  </Link>
                ))
              )}

              {/* Promo box */}
              <div style={{ marginTop: "auto", paddingTop: "28px" }}>
                <div style={{ background: "#f8f9fa", padding: "24px", display: "flex", flexDirection: "column", gap: "10px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "var(--accent)" }}>campaign</span>
                  <p style={{ fontSize: "14px", fontWeight: 400, color: "var(--gray-700, #333)", lineHeight: 1.6 }}>
                    Tetap terhubung dengan pengumuman dan berita nagari terbaru.
                  </p>
                  <Link href="/berita" style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
                    Kunjungi arsip →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}