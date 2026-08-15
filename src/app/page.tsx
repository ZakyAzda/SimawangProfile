import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsSection } from "@/components/home/NewsSection";
import { ReportSection } from "@/components/home/ReportSection";
import { GallerySection } from "@/components/home/GallerySection";
import prisma from "@/lib/db";
import { StatsSection } from "@/components/home/StatsSection";
import { MapGallerySection } from "@/components/home/MapGallerySection";
import { WaliNagariShortSection } from "@/components/home/WaliNagariShortSection";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

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



/* ══════════════════════════════ PAGE ══════════════════════════════ */
export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const galleryItems = await prisma.galleryItem.findMany({ take: 6 });

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <div className="ng">
        <NavBar />
        <main style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <HeroSection/>
          <ScrollAnimationWrapper>
            <StatsSection/>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.1}>
            <WaliNagariShortSection />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.1}>
            <NewsSection posts={posts} />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.1}>
            <GallerySection galleryItems={galleryItems} />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.1}>
            <MapGallerySection />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.1}>
            <ReportSection />
          </ScrollAnimationWrapper>
          
        </main>
        <Footer />
      </div>
    </div>
  );
}