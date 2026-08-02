import { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Inter, Merriweather } from "next/font/google";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeri Nagari Simawang",
  description: "Dokumentasi visual kegiatan, budaya, dan kehidupan masyarakat Nagari Simawang.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const CSS = `
  .ng {
    --white:    #ffffff;
    --gray-50:  #f8f9fa;
    --gray-100: #f1f3f5;
    --gray-200: #e9ecef;
    --gray-300: #dee2e6;
    --gray-400: #ced4da;
    --gray-500: #adb5bd;
    --gray-600: #6c757d;
    --gray-700: #495057;
    --gray-800: #343a40;
    --gray-900: #212529;
    --accent:   #495057;
    --accent-l: #6c757d;
    --line:     #e9ecef;
    --gold:     #c9943a;
    --forest:   #1a3c30;

    font-family: var(--font-body), system-ui, sans-serif;
    background-color: #faf8f5;
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    background-attachment: fixed;
    color: var(--gray-900);
    -webkit-font-smoothing: antialiased;
  }
  .ng .serif { font-family: var(--font-display), Georgia, serif; }
  .ng-wrap   { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) { .ng-wrap { padding: 0 20px; } }

  /* ── Hero Banner ── */
  .gal-hero {
    position: relative;
    height: 460px; /* Increased height to account for top overlap */
    overflow: hidden;
    background: var(--forest);
  }
  .gal-hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #0b1f18 0%, #1a3c30 50%, #2e6652 100%);
  }
  .gal-hero-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }
  .gal-hero-deco-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .gal-hero-content {
    position: relative; z-index: 2;
    height: 100%;
    display: flex; flex-direction: column;
    align-items: flex-start; justify-content: flex-end;
    padding: 120px 0 52px 0; /* Added top padding to clear the navbar */
  }
  .gal-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 14px;
  }
  .gal-eyebrow::before {
    content: ''; display: block;
    width: 28px; height: 1.5px; background: var(--gold);
  }
  .gal-hero h1 {
    font-size: clamp(34px, 5vw, 60px);
    font-weight: 700; line-height: 1.05;
    letter-spacing: -0.025em; color: #ffffff;
    margin-bottom: 18px;
  }
  .gal-hero-desc {
    font-size: 16px; font-weight: 300;
    color: rgba(255,255,255,0.62); line-height: 1.7;
    max-width: 520px;
  }
  .gal-badge {
    position: absolute; top: 120px; right: 40px; /* Adjusted top to account for navbar */
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.14);
    backdrop-filter: blur(12px);
    padding: 14px 22px; border-radius: 14px;
    text-align: center;
  }
  .gal-badge-num {
    font-size: 36px; font-weight: 800;
    color: #ffffff; line-height: 1;
    display: block; font-family: Georgia, serif;
  }
  .gal-badge-label {
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); margin-top: 6px; display: block;
  }
  .gal-hero-wave {
    position: absolute; bottom: -1px; left: 0;
    width: 100%; pointer-events: none;
  }

  /* ── Grid Section ── */
  .gal-section { padding: 72px 0 100px; }
  .gal-section-header {
    display: flex; align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 36px;
    gap: 12px; flex-wrap: wrap;
  }
  .gal-divider {
    height: 1px; background: var(--line);
    margin-bottom: 48px;
  }

  /* ── Masonry Grid ── */
  .gal-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 250px;
    gap: 8px;
  }
  @media (max-width: 900px) {
    .gal-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; }
  }
  @media (max-width: 520px) {
    .gal-grid { grid-template-columns: 1fr; grid-auto-rows: 220px; }
  }

  /* Span patterns matching wireframe */
  .gal-cell { display: flex; flex-direction: column; }
  .gal-r2   { grid-row: span 2; }

  .gal-img-wrap {
    position: relative; overflow: hidden;
    flex-grow: 1; background: var(--gray-100);
    border-radius: 10px;
    cursor: pointer;
  }
  .gal-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .gal-img-wrap:hover img { transform: scale(1.06); }

  /* Overlay */
  .gal-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(11,31,24,0.82) 0%, rgba(11,31,24,0.2) 40%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 18px 16px 16px;
    border-radius: 10px;
  }
  .gal-img-wrap:hover .gal-overlay { opacity: 1; }
  .gal-overlay-title {
    font-size: 13px; font-weight: 600; color: #fff;
    line-height: 1.4; margin-bottom: 4px;
  }
  .gal-overlay-desc {
    font-size: 11px; color: rgba(255,255,255,0.65);
    line-height: 1.5;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
  }
  .gal-overlay-icon {
    position: absolute; top: 14px; right: 14px;
    width: 34px; height: 34px; border-radius: 50%;
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
  }
  .gal-overlay-category {
    display: inline-block;
    padding: 4px 10px;
    background: var(--gold);
    color: var(--white);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 100px;
    margin-bottom: 8px;
    width: fit-content;
  }

  /* Caption below photo */
  .gal-caption {
    display: flex; align-items: center;
    gap: 8px;
    padding: 10px 4px 0;
  }
  .gal-caption-num {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; color: var(--gold);
    opacity: 0.8;
  }
  .gal-caption-title {
    font-size: 13px; font-weight: 500;
    color: var(--gray-700);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* ── Stats bar ── */
  .gal-stats {
    display: flex; gap: 0;
    border: 1px solid var(--line);
    border-radius: 14px; overflow: hidden;
    background: var(--white);
    margin-bottom: 60px;
    box-shadow: 0 2px 16px -4px rgba(0,0,0,0.06);
  }
  .gal-stat-item {
    flex: 1; padding: 22px 24px;
    text-align: center;
    border-right: 1px solid var(--line);
  }
  .gal-stat-item:last-child { border-right: none; }
  .gal-stat-val {
    font-size: 28px; font-weight: 800;
    color: var(--forest); line-height: 1;
    margin-bottom: 4px; font-family: Georgia, serif;
  }
  .gal-stat-lbl {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--gray-500);
  }

  /* ── Empty state ── */
  .gal-empty {
    text-align: center; padding: 80px 24px;
    border: 2px dashed var(--line); border-radius: 20px;
    background: var(--white);
  }
  .gal-empty-icon {
    font-size: 52px; color: var(--gray-300);
    margin-bottom: 16px;
    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;
  }
  
  /* Filter Category */
  .gal-filter {
    display: flex; gap: 10px; flex-wrap: wrap;
    margin-bottom: 32px;
  }
  .gal-filter-btn {
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 12px; font-weight: 600;
    color: var(--gray-600);
    background: var(--gray-100);
    text-decoration: none;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }
  .gal-filter-btn:hover {
    background: var(--gray-200);
    color: var(--gray-900);
  }
  .gal-filter-btn.active {
    background: var(--forest);
    color: var(--white);
    border-color: var(--forest);
  }
`;

export default async function GaleriPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | any;
}) {
  // Await searchParams for Next.js 15+ compatibility
  const searchParams = props.searchParams ? await props.searchParams : {};
  const currentCat = typeof searchParams.category === "string" ? searchParams.category : null;

  type GalleryItemWithCategory = {
    id: string;
    image: string;
    title: string;
    description: string | null;
    category?: string | null;
  };

  const rawItems = await prisma.galleryItem.findMany({
    orderBy: { id: "desc" },
  });
  const galleryItems = rawItems as unknown as GalleryItemWithCategory[];

  const totalFoto = galleryItems.length;
  
  // Extract unique categories
  const categories = Array.from(new Set(galleryItems.map(item => item.category).filter(Boolean))) as string[];

  // Filter items
  const filteredItems = currentCat ? galleryItems.filter(item => item.category === currentCat) : galleryItems;

  // Wireframe pattern: row 1 [col-span-1 row-span-2, 1x1, 1x1, 1x1]
  //                   row 2 [continue tall-1, 1x1, col-span-1 row-span-2, 1x1]
  //                   row 3 [continue,          1x1, continue-tall-2,    1x1, 1x1]
  // Simplified: alternate tall cells every 5th item pattern
  const isTall = (i: number) => {
    const pos = i % 10;
    return pos === 0 || pos === 5;
  };

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{CSS}</style>
      <div className="ng">
        <NavBar />

        {/* ── Hero Banner ── */}
        <section className="gal-hero">
          <div className="gal-hero-bg" />
          <div className="gal-hero-noise" />

          {/* Decorative rings */}
          <div className="gal-hero-deco-ring" style={{ width: 400, height: 400, top: -100, right: -80, opacity: 0.5 }} />
          <div className="gal-hero-deco-ring" style={{ width: 220, height: 220, top: 30, right: 120, opacity: 0.3 }} />
          <div className="gal-hero-deco-ring" style={{ width: 600, height: 600, bottom: -200, left: -100, opacity: 0.2 }} />

          {/* Count badge */}
          {totalFoto > 0 && (
            <div className="gal-badge">
              <span className="gal-badge-num serif">{totalFoto}</span>
              <span className="gal-badge-label">Foto</span>
            </div>
          )}

          <div className="ng-wrap gal-hero-content">
            <p className="gal-eyebrow">Dokumentasi Visual</p>
            <h1 className="serif">Galeri Nagari<br />Simawang</h1>
            <p className="gal-hero-desc">
              Kumpulan potret kehidupan, budaya, kegiatan kemasyarakatan, dan program pembangunan Nagari Simawang.
            </p>
          </div>

          {/* Wave divider */}
          <svg className="gal-hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 52 }}>
            <path d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z" fill="#faf8f5" />
          </svg>
        </section>

        {/* ── Main Content ── */}
        <section className="gal-section">
          <div className="ng-wrap">

            {/* Stats Bar */}
            {totalFoto > 0 && (
              <div className="gal-stats">
                <div className="gal-stat-item">
                  <div className="gal-stat-val serif">{totalFoto}</div>
                  <div className="gal-stat-lbl">Total Foto</div>
                </div>
                <div className="gal-stat-item">
                  <div className="gal-stat-val serif">8</div>
                  <div className="gal-stat-lbl">Jorong</div>
                </div>
                <div className="gal-stat-item">
                  <div className="gal-stat-val serif">2024</div>
                  <div className="gal-stat-lbl">Tahun Aktif</div>
                </div>
              </div>
            )}

            {/* Section header */}
            <div className="gal-section-header">
              <div>
                <div className="gal-eyebrow" style={{ marginBottom: "10px" }}>Koleksi Foto</div>
                <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Momen &amp; Dokumentasi
                </h2>
              </div>
              <span style={{ fontSize: "13px", color: "var(--gray-500)", fontWeight: 500 }}>
                Menampilkan {totalFoto} foto
              </span>
            </div>
            <div className="gal-divider" style={{ marginBottom: "24px" }} />

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="gal-filter">
                <Link href="/galeri" className={`gal-filter-btn ${!currentCat ? 'active' : ''}`}>Semua</Link>
                {categories.map(cat => (
                  <Link 
                    key={cat} 
                    href={`/galeri?category=${encodeURIComponent(cat)}`} 
                    className={`gal-filter-btn ${currentCat === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}

            {/* Grid */}
            {filteredItems.length === 0 ? (
              <div className="gal-empty">
                <div className="material-symbols-outlined gal-empty-icon">photo_library</div>
                <p className="serif" style={{ fontSize: "22px", fontWeight: 700, color: "var(--gray-800)", marginBottom: "8px" }}>
                  Belum Ada Foto
                </p>
                <p style={{ fontSize: "14px", color: "var(--gray-500)" }}>
                  {currentCat ? `Belum ada foto dokumentasi untuk kategori "${currentCat}".` : "Foto dokumentasi kegiatan nagari akan ditampilkan di sini."}
                </p>
              </div>
            ) : (
              <div className="gal-grid">
                {filteredItems.map((item, i) => (
                  <div key={item.id} className={`gal-cell ${isTall(i) ? "gal-r2" : ""}`}>
                    <div className="gal-img-wrap">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gray-100)" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "var(--gray-400)" }}>image</span>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="gal-overlay">
                        <div className="gal-overlay-icon">
                          <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#fff" }}>zoom_in</span>
                        </div>
                        {item.category && (
                          <span className="gal-overlay-category">{item.category}</span>
                        )}
                        <p className="gal-overlay-title">{item.title}</p>
                        {item.description && (
                          <p className="gal-overlay-desc">{item.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Caption below */}
                    <div className="gal-caption">
                      <span className="gal-caption-num">{String(i + 1).padStart(3, "0")}</span>
                      <span className="gal-caption-title">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
