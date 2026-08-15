import { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";
import { Inter, Merriweather } from "next/font/google";
import GalleryClientView from "@/components/GalleryClientView";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

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
      <div className="ng" style={{ background: "#f8f9fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <NavBar />
        
        <main style={{ flex: 1, padding: "120px 0 80px" }}>
          <div className="ng-wrap" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--gray-500)", textDecoration: "none", fontSize: "14px", fontWeight: 600, marginBottom: "32px", transition: "color 0.2s" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
              Kembali ke Beranda
            </Link>

            <div style={{ marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "12px" }}>
                Koleksi Foto
              </p>
              <h1 className="serif" style={{ fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em", marginBottom: "16px" }}>
                Galeri Nagari Simawang
              </h1>
              <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.6, maxWidth: "600px" }}>
                Kumpulan potret kehidupan, budaya, kegiatan kemasyarakatan, dan program pembangunan Nagari Simawang.
              </p>
            </div>

            {/* Stats Bar */}
            {totalFoto > 0 && (
              <ScrollAnimationWrapper delay={0.1}>
                <div style={{ background: "#fff", padding: "32px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", display: "flex", gap: "32px", marginBottom: "48px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: "8px" }}>
                      Total Foto
                    </p>
                    <h3 className="serif" style={{ fontSize: "36px", fontWeight: 700, color: "var(--gray-900)", marginBottom: "0" }}>
                      {totalFoto}
                    </h3>
                  </div>
                  <div style={{ width: "1px", background: "var(--gray-200)", margin: "0 16px" }} />
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: "8px" }}>
                      Kategori
                    </p>
                    <h3 className="serif" style={{ fontSize: "36px", fontWeight: 700, color: "var(--gray-900)", marginBottom: "0" }}>
                      {categories.length}
                    </h3>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            )}

            {/* Category Filter */}
            {categories.length > 0 && (
              <ScrollAnimationWrapper delay={0.1}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
                  <Link 
                    href="/galeri" 
                    style={{
                      padding: "10px 20px", borderRadius: "100px", fontSize: "14px", fontWeight: 600, textDecoration: "none", transition: "all 0.2s ease",
                      background: !currentCat ? "var(--gray-900)" : "#fff",
                      color: !currentCat ? "#fff" : "var(--gray-600)",
                      border: `1px solid ${!currentCat ? "var(--gray-900)" : "rgba(0,0,0,0.1)"}`,
                      boxShadow: !currentCat ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
                    }}
                  >
                    Semua
                  </Link>
                  {categories.map(cat => (
                    <Link 
                      key={cat} 
                      href={`/galeri?category=${encodeURIComponent(cat)}`} 
                      style={{
                        padding: "10px 20px", borderRadius: "100px", fontSize: "14px", fontWeight: 600, textDecoration: "none", transition: "all 0.2s ease",
                        background: currentCat === cat ? "var(--gray-900)" : "#fff",
                        color: currentCat === cat ? "#fff" : "var(--gray-600)",
                        border: `1px solid ${currentCat === cat ? "var(--gray-900)" : "rgba(0,0,0,0.1)"}`,
                        boxShadow: currentCat === cat ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
                      }}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </ScrollAnimationWrapper>
            )}

            {/* Grid / Empty state */}
            <ScrollAnimationWrapper delay={0.1}>
              {filteredItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 24px", background: "#fff", borderRadius: "24px", border: "1px dashed var(--gray-300)" }}>
                  <div className="material-symbols-outlined" style={{ fontSize: "52px", color: "var(--gray-300)", marginBottom: "16px" }}>photo_library</div>
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
            </ScrollAnimationWrapper>

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
