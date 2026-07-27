import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsSection } from "@/components/home/NewsSection";
import { ReportSection } from "@/components/home/ReportSection";
import { GallerySection } from "@/components/home/GallerySection";
import prisma from "@/lib/db";
import {LocationSection} from "@/components/home/LocationSection";

export const dynamic = "force-dynamic";

/* ─── Fonts ─── */
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

/* ─── Scoped CSS ─── */
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
    --accent:     #495057;
    --accent-l:   #6c757d;
    --accent-50:  #f8f9fa;
    --accent-100: #e9ecef;
    --line:     #e9ecef;

    font-family: var(--font-body), system-ui, sans-serif;
    background-color: var(--white);
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E"),
      radial-gradient(at 15% 50%, rgba(233, 236, 239, 0.6) 0px, transparent 50%),
      radial-gradient(at 85% 30%, rgba(222, 226, 230, 0.4) 0px, transparent 50%);
    background-attachment: fixed;
    color: var(--gray-900);
    -webkit-font-smoothing: antialiased;
  }
  .ng .serif { font-family: var(--font-display), Georgia, serif; }

  /* label/eyebrow */
  .ng-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
  }

  /* cards */
  .ng-card {
    border: 1px solid var(--line);
    background: var(--white);
    transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  }
  .ng-card:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    transform: translateY(-2px);
    border-color: var(--gray-300);
  }

  /* premium stat cards */
  .ng-stat-premium {
    position: relative;
    background: var(--gray-900);
    border-radius: 16px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    overflow: hidden;
    border: 1px solid var(--gray-800);
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .ng-stat-premium:hover {
    transform: translateY(-6px);
    border-color: var(--gray-600);
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);
  }
  .ng-stat-deco {
    position: absolute; top: -20px; right: -20px;
    width: 120px; height: 120px;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 70%);
    border-radius: 50%;
    transition: transform 0.5s ease;
  }
  .ng-stat-premium:hover .ng-stat-deco {
    transform: scale(1.5);
  }
  .ng-stat-arrow {
    margin-top: 32px;
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--gray-500);
    transition: color 0.3s ease, gap 0.3s ease;
  }
  .ng-stat-premium:hover .ng-stat-arrow {
    color: #ffffff;
    gap: 12px;
  }

  /* news img zoom */
  .ng-img { transition: transform 0.5s ease; }
  .ng-news:hover .ng-img { transform: scale(1.04); }

  /* gallery overlay */
  .ng-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(33,37,41,0.75) 0%, transparent 55%);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex; align-items: flex-end; padding: 14px;
  }
  .ng-gal:hover .ng-overlay { opacity: 1; }
  .ng-gal { transition: transform 0.25s ease; }
  .ng-gal:hover { transform: scale(1.02); z-index: 1; }

  /* page padding */
  .ng-wrap { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) {
    .ng-wrap { padding: 0 20px; }
    .ng-cols-news { grid-template-columns: 1fr !important; }
    .ng-cols-stats { grid-template-columns: 1fr 1fr !important; }
    .ng-cols-gal { grid-template-columns: 1fr 1fr !important; }
    .ng-facts { grid-template-columns: 1fr 1fr !important; }
    .ng-footer-grid { grid-template-columns: 1fr !important; }
  }

  /* hero scroll indicator */
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
  .ng-bounce { animation: bounce 2s ease-in-out infinite; }

  /* smooth link underline */
  .ng-link {
    position: relative; display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
    color: var(--accent); text-decoration: none;
    transition: color 0.2s ease;
  }
  .ng-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 100%; height: 1px; background: var(--accent);
    transform: scaleX(0); transition: transform 0.25s ease;
  }
  .ng-link:hover::after { transform: scaleX(1); }
`;


/* ══════════════════════════════ PAGE ══════════════════════════════ */
export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const galleryItems = await prisma.galleryItem.findMany({ take: 6 });

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{CSS}</style>
      <div className="ng">
        <NavBar />
        <main style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <HeroSection />
          <NewsSection posts={posts} />
          <GallerySection galleryItems={galleryItems} />
          <ReportSection />
          <LocationSection/>
        </main>
        <Footer />
      </div>
    </div>
  );
}