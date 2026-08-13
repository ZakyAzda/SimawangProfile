import { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";
import { Inter, Merriweather } from "next/font/google";
import GalleryClientView from "@/components/GalleryClientView";

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

  // isTall pattern is now handled inside GalleryClientView

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
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
            <path d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8f9fa" />
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

            {/* Grid / Empty state */}
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
              <GalleryClientView filteredItems={filteredItems} />
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
