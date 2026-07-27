import Image from "next/image";
import Link from "next/link";

export function GallerySection({ galleryItems }: { galleryItems: any[] }) {
  const padded = [...(galleryItems ?? [])];
  while (padded.length < 6) padded.push(null);
  const items = padded.slice(0, 6);

  const spans = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];

  return (
    <section style={{ width: "100%", background: "transparent", padding: "80px 0" }}>
      <div className="ng-wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p className="ng-label" style={{ marginBottom: "10px" }}>Dokumentasi</p>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em" }}>
              Galeri Nagari
            </h2>
          </div>
          <Link href="/galeri" className="ng-link">
            Lihat semua
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
          </Link>
        </div>

        <div
          className="ng-cols-gal"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "150px", gap: "6px" }}
        >
          {items.map((item, i) => (
            <div
              key={item?.id || i}
              className={`${spans[i]} ng-gal`}
              style={{
                position: "relative", overflow: "hidden",
                background: "var(--gray-100)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {item?.image ? (
                <>
                  <Image
                    src={item.image}
                    alt={item.title || "Galeri"}
                    fill
                    sizes="(max-width:640px) 50vw, 360px"
                    style={{ objectFit: "cover" }}
                    className="ng-img"
                  />
                  <div className="ng-overlay">
                    <span
                      style={{
                        fontSize: "12px", fontWeight: 600, color: "#fff",
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.35 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "var(--gray-400)" }}>image</span>
                  <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)" }}>
                    Foto {i + 1}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
