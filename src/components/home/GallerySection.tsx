import Image from "next/image";
import Link from "next/link";

const CSS = `
  .gallery-section {
    padding: 100px 0;
    background: #ffffff;
  }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 160px;
    gap: 8px;
    border-radius: 20px;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 120px; }
  }
  .gallery-cell {
    position: relative;
    overflow: hidden;
    background: #e9ecef;
    cursor: pointer;
  }
  .gallery-cell img { transition: transform 0.5s ease !important; }
  .gallery-cell:hover img { transform: scale(1.08) !important; }
  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 55%);
    display: flex;
    align-items: flex-end;
    padding: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .gallery-cell:hover .gallery-overlay { opacity: 1; }
  .gallery-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 100%;
    opacity: 0.35;
  }
  .gallery-view-all {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #1a3c30;
    text-decoration: none;
    background: rgba(26,60,48,0.07);
    padding: 10px 18px;
    border-radius: 100px;
    transition: background 0.2s;
  }
  .gallery-view-all:hover { background: rgba(26,60,48,0.12); }
`;

export function GallerySection({ galleryItems }: { galleryItems: any[] }) {
  const padded = [...(galleryItems ?? [])];
  while (padded.length < 6) padded.push(null);
  const items = padded.slice(0, 6);

  const gridStyles = [
    { gridColumn: "span 2", gridRow: "span 2" },
    { gridColumn: "span 1", gridRow: "span 1" },
    { gridColumn: "span 1", gridRow: "span 1" },
    { gridColumn: "span 2", gridRow: "span 1" },
    { gridColumn: "span 1", gridRow: "span 1" },
    { gridColumn: "span 1", gridRow: "span 1" },
  ];

  return (
    <section className="gallery-section">
      <style>{CSS}</style>
      <div className="ng-wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p className="ng-label" style={{ marginBottom: "12px", color: "#1a3c30" }}>Dokumentasi</p>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Galeri Nagari
            </h2>
            <p style={{ fontSize: "15px", color: "#6b7280", marginTop: "12px", lineHeight: 1.7 }}>
              Momen dan dokumentasi dari kegiatan Nagari Simawang.
            </p>
          </div>
          <Link href="/galeri" className="gallery-view-all">
            Lihat semua
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>

        <div className="gallery-grid">
          {items.map((item, i) => (
            <div key={item?.id || i} className="gallery-cell" style={gridStyles[i]}>
              {item?.image ? (
                <>
                  <Image
                    src={item.image}
                    alt={item.title || "Galeri"}
                    fill
                    sizes="(max-width:640px) 50vw, 360px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="gallery-overlay">
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.title}
                    </span>
                  </div>
                </>
              ) : (
                <div className="gallery-placeholder">
                  <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#9ca3af" }}>image</span>
                  <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af" }}>Foto {i + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
