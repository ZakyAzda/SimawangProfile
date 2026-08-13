import Image from "next/image";
import Link from "next/link";

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

const getSafeImage = (img?: string | null) => {
  if (!img) return "/berita-1.png";
  if (img.startsWith("/") || img.startsWith("http")) return img;
  return "/berita-1.png";
};

const CSS = `
  .news-section {
    padding: 100px 0;
    background: #f8f9fa;
  }
  .news-featured-img {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    background: #f1f3f5;
    border-radius: 20px;
  }
  .news-featured-img img {
    transition: transform 0.5s ease !important;
  }
  .news-featured-link:hover .news-featured-img img {
    transform: scale(1.04) !important;
  }
  .news-category-pill {
    position: absolute;
    top: 16px;
    left: 16px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: #1a3c30;
    color: #fff;
    padding: 5px 12px;
    border-radius: 100px;
    z-index: 2;
  }
  .news-small-card {
    display: flex;
    gap: 16px;
    text-decoration: none;
    padding: 18px 0;
    transition: opacity 0.2s;
  }
  .news-small-card:hover { opacity: 0.8; }
  .news-small-thumb {
    position: relative;
    width: 76px;
    height: 60px;
    flex-shrink: 0;
    overflow: hidden;
    background: #f1f3f5;
    border-radius: 10px;
  }
  .news-small-thumb img { transition: transform 0.4s ease !important; }
  .news-small-card:hover .news-small-thumb img { transform: scale(1.08) !important; }
  .news-promo {
    margin-top: auto;
    padding: 20px;
    background: linear-gradient(135deg, rgba(26,60,48,0.06), rgba(26,60,48,0.02));
    border: 1px solid rgba(26,60,48,0.1);
    border-radius: 16px;
  }
`;

export function NewsSection({ posts }: { posts: any[] }) {
  const featured = posts?.[0];
  const rest = posts?.slice(1, 3) ?? [];

  return (
    <section className="news-section">
      <style>{CSS}</style>
      <div className="ng-wrap">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p className="ng-label" style={{ marginBottom: "12px", color: "#1a3c30" }}>Informasi Terkini</p>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Berita Terbaru
            </h2>
          </div>
          <Link href="/berita" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#1a3c30", textDecoration: "none", background: "rgba(26,60,48,0.07)", padding: "10px 18px", borderRadius: "100px" }}>
            Lihat semua
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>

        {!featured ? (
          <div style={{ padding: "80px 0", textAlign: "center", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", borderRadius: "20px", background: "#f8f9fa" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "40px", color: "#d1d5db", display: "block", marginBottom: "12px" }}>newspaper</span>
            <p style={{ fontSize: "15px", color: "#9ca3af" }}>Belum ada berita yang diterbitkan.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: "48px" }}>
            {/* Featured */}
            <Link href={`/berita/${featured.slug}`} className="news-featured-link" style={{ textDecoration: "none", display: "block" }}>
              <div className="news-featured-img">
                <Image
                  src={getSafeImage(featured.image)}
                  alt={featured.title}
                  fill
                  sizes="(max-width:768px) 100vw, 640px"
                  style={{ objectFit: "cover" }}
                />
                {featured.category && (
                  <span className="news-category-pill">{featured.category}</span>
                )}
              </div>
              <div style={{ padding: "28px 0 0" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", marginBottom: "12px" }}>
                  {fmtDate(featured.publishedAt)}
                </p>
                <h3 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 800, color: "#111827", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: "14px" }}>
                  {featured.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.8 }}>
                  {featured.content?.slice(0, 160)}…
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "22px", fontSize: "13px", fontWeight: 700, color: "#1a3c30" }}>
                  Baca selengkapnya
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0", borderLeft: "1px solid rgba(0,0,0,0.07)", paddingLeft: "40px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "4px" }}>
                Berita Lainnya
              </p>
              {rest.length === 0 ? (
                <p style={{ fontSize: "14px", color: "#9ca3af", paddingTop: "16px" }}>Belum ada berita lainnya.</p>
              ) : (
                rest.map((n, idx) => (
                  <Link
                    key={n.id}
                    href={`/berita/${n.slug}`}
                    className="news-small-card"
                    style={{ borderBottom: idx < rest.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}
                  >
                    <div className="news-small-thumb">
                      <Image src={getSafeImage(n.image)} alt={n.title} fill sizes="80px" style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "6px", fontWeight: 500 }}>{fmtDate(n.publishedAt)}</p>
                      <h4 className="serif" style={{ fontSize: "14px", fontWeight: 700, color: "#111827", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {n.title}
                      </h4>
                    </div>
                  </Link>
                ))
              )}

              <div className="news-promo" style={{ marginTop: "auto", paddingTop: "24px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#1a3c30", display: "block", marginBottom: "10px" }}>campaign</span>
                <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7 }}>
                  Tetap terhubung dengan pengumuman dan berita nagari terbaru.
                </p>
                <Link href="/berita" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: "#1a3c30", textDecoration: "none", marginTop: "12px" }}>
                  Kunjungi arsip berita <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}