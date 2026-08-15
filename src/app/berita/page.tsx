import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { CalendarRange, Clock, ArrowRight, Search } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita & Publikasi - Nagari Simawang",
  description: "Portal berita dan publikasi resmi Nagari Simawang.",
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
    --accent:     #495057;
    --accent-l:   #6c757d;
    --accent-50:  #f8f9fa;
    --accent-100: #e9ecef;
    --line:     #e9ecef;
    --surface-container-lowest: #ffffff;
    --surface-container-low: #f8f9fa;
    --outline-variant: #e9ecef;
    --on-surface-variant: #6c757d;
    --primary: #212529;

    font-family: var(--font-body), system-ui, sans-serif;
    background-color: var(--white);
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
    background-attachment: fixed;
    color: var(--gray-900);
    -webkit-font-smoothing: antialiased;
  }
  .ng .serif { font-family: var(--font-display), Georgia, serif; }
  .ng-wrap { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) { .ng-wrap { padding: 0 20px; } }
`;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getAgendaDateInfo(date: Date) {
  const d = new Date(date);
  return {
    date: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('id-ID', { month: 'short' }),
    time: d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB",
  };
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80";

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  noStore();
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : "";

  const posts = await prisma.post.findMany({
    where: {
      category: { not: "Agenda Nagari" },
      ...(q ? {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { content: { contains: q, mode: "insensitive" } }
        ]
      } : {})
    },
    orderBy: { publishedAt: "desc" },
  });

  const agendaPosts = await prisma.post.findMany({
    where: { category: "Agenda Nagari" },
    orderBy: { publishedAt: "desc" },
    take: 4,
  });

  const sortedByViews = [...posts].sort((a, b) => b.views - a.views);
  
  // 1. Featured Post (Sorotan Utama) is the #1 Most Viewed
  const featuredPost = sortedByViews.length > 0 ? sortedByViews[0] : null;

  // 2. Top 4 by views for sidebar (excluding the #1 featured post)
  const popularPosts = sortedByViews.slice(1, 5);

  // 3. Filter out featured post from the recent posts list to avoid duplicates
  const recentPosts = posts.filter(p => p.id !== featuredPost?.id);

  // 4. Next 4 recent posts for Grid (Pilihan Redaksi)
  const topStoriesGrid = recentPosts.slice(0, 4);

  // 5. Remaining for Latest Stories list
  const latestStories = q ? posts : recentPosts.slice(4);

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{CSS}</style>
      <div className="ng">
        <NavBar />

        <main className="ng-wrap" style={{ paddingTop: "120px", paddingBottom: "80px" }}>

          {/* Header & Search Section */}
          <ScrollAnimationWrapper>
            <div className="w-full border-b border-[var(--line)] pb-16 mb-16" style={{ paddingBottom: "48px", marginBottom: "56px" }}>
            {/* Page Header */}
            <div className="w-full flex flex-col items-center justify-center text-center mb-10 px-4">
              <h1 className="serif text-4xl lg:text-5xl font-bold text-[var(--gray-900)] mb-4">Berita & Publikasi Nagari</h1>
              <p className="text-[var(--gray-500)] text-lg max-w-2xl">Temukan informasi terbaru, kegiatan, dan program-program dari Nagari Simawang</p>
            </div>
            
            {/* Hero Search Bar */}
            <div className="w-full flex justify-center px-4" style={{ paddingBottom: "8px" }}>
              <form action="/berita" method="GET" className="relative w-full max-w-2xl">
                <input 
                  type="text" 
                  name="q" 
                  defaultValue={q} 
                  placeholder="Cari berita seputar Nagari Simawang..." 
                  className="w-full h-[68px] bg-white border border-[var(--gray-300)] rounded-full text-[var(--gray-900)] text-lg focus:outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--gray-100)] transition-all shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                  style={{ paddingLeft: "48px", paddingRight: "80px" }}
                />
                <button type="submit" aria-label="Cari Berita" className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 bg-[var(--primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--gray-800)] transition-transform hover:scale-105 active:scale-95 shadow-sm">
                  <Search size={22} strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </ScrollAnimationWrapper>

          {/* 1. Hero Section (Sorotan & Populer) */}
          {!q && (
            <ScrollAnimationWrapper delay={0.1}>
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" style={{ marginBottom: "100px" }}>

              {/* Kiri: Featured Story */}
              {featuredPost && (
                <Link href={`/berita/${featuredPost.slug}`} className="lg:col-span-8 relative rounded-2xl overflow-hidden group h-[400px] lg:h-[500px] block border border-[var(--line)]">
                  <img
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={featuredPost.image || DEFAULT_IMAGE}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                    Sorotan Utama
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                    <div className="flex gap-3 items-center mb-4">
                      <span className="bg-white/20 backdrop-blur text-white text-[11px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                        {featuredPost.category}
                      </span>
                      <span className="text-white/90 text-sm font-medium">{featuredPost.authorName}</span>
                      <span className="text-white/60 text-sm">•</span>
                      <span className="text-white/80 text-sm">{formatDate(featuredPost.publishedAt)}</span>
                    </div>
                    <h1 className="serif text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 group-hover:underline decoration-white/50 leading-tight">
                      {featuredPost.title}
                    </h1>
                    <p className="text-white/80 text-base md:text-lg line-clamp-2 w-full md:w-5/6 leading-relaxed">
                      {featuredPost.content.replace(/<[^>]*>?/gm, '')}
                    </p>
                  </div>
                </Link>
              )}

              {!featuredPost && (
                <div className="lg:col-span-8 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 h-[400px]">
                  Belum ada berita.
                </div>
              )}

              {/* Kanan: Sidebar Berita Populer */}
              <div className="lg:col-span-4 flex flex-col gap-5">
                <h2 className="serif text-2xl font-bold border-b border-[var(--line)] pb-3 text-[var(--gray-900)]">
                  Berita Terpopuler
                </h2>
                {popularPosts.map((post) => (
                  <Link key={post.id} href={`/berita/${post.slug}`} className="flex gap-4 group hover:bg-[var(--gray-50)] p-2 rounded-xl transition-colors -mx-2">
                    <img
                      alt={post.title}
                      className="w-24 h-24 object-cover rounded-lg border border-[var(--line)] shrink-0"
                      src={post.image || DEFAULT_IMAGE}
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[var(--gray-500)] text-xs font-medium">{formatDate(post.publishedAt)}</span>
                        <span className="text-[var(--gray-400)] text-[10px]">•</span>
                        <span className="text-[var(--gray-500)] text-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          {post.views}
                        </span>
                      </div>
                      <h3 className="serif text-base font-bold group-hover:text-[var(--gray-600)] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            </ScrollAnimationWrapper>
          )}

          {/* 2. Top Stories Grid */}
          {!q && topStoriesGrid.length > 0 && (
            <ScrollAnimationWrapper delay={0.1}>
              <section style={{ marginBottom: "100px" }}>
              <h2 className="serif text-3xl font-bold mb-8 border-b border-[var(--line)] pb-4 text-[var(--gray-900)]">
                Pilihan Redaksi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topStoriesGrid.map((post) => (
                  <Link key={post.id} href={`/berita/${post.slug}`} className="group flex flex-col">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 border border-[var(--line)]">
                      <img
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={post.image || DEFAULT_IMAGE}
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase">
                        {post.category}
                      </div>
                    </div>
                    <h3 className="serif text-lg font-bold group-hover:text-[var(--gray-600)] transition-colors line-clamp-2 mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <div className="mt-auto pt-2 text-[var(--gray-500)] text-xs flex items-center gap-2 font-medium">
                      <span>{post.authorName}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--gray-300)]"></span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            </ScrollAnimationWrapper>
          )}

          {/* 3. Main Content Split (Latest & Widget) */}
          <ScrollAnimationWrapper delay={0.1}>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10" style={{ marginBottom: "100px" }}>

            {/* Kiri: Latest Stories */}
            <div className="lg:col-span-8">
              <h2 className="serif text-3xl font-bold mb-8 border-b border-[var(--line)] pb-4 text-[var(--gray-900)]">
                {q ? `Hasil Pencarian: "${q}"` : "Berita Terbaru"}
              </h2>
              <div className="flex flex-col gap-8">
                {latestStories.map((post) => (
                  <Link key={post.id} href={`/berita/${post.slug}`} className="flex flex-col-reverse md:flex-row gap-6 group pb-8 border-b border-[var(--line)] last:border-0">
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-[var(--gray-200)] flex items-center justify-center text-[var(--gray-600)]">
                            <span className="material-symbols-outlined text-[14px]">person</span>
                          </div>
                          <span className="text-sm font-medium text-[var(--gray-600)]">{post.authorName}</span>
                        </div>
                        <h3 className="serif text-2xl font-bold mb-3 group-hover:text-[var(--gray-600)] transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-[var(--gray-600)] text-base line-clamp-2 mb-4 leading-relaxed">
                          {post.content.replace(/<[^>]*>?/gm, '')}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-[var(--gray-500)] text-xs font-medium">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          {post.views} Views
                        </span>
                      </div>
                    </div>
                    <img
                      alt={post.title}
                      className="w-full md:w-72 h-64 md:h-56 object-cover rounded-xl border border-[var(--line)] shrink-0"
                      src={post.image || DEFAULT_IMAGE}
                    />
                  </Link>
                ))}

                {latestStories.length === 0 && (
                  <div className="text-center py-10 bg-[var(--gray-50)] rounded-2xl border border-dashed border-[var(--line)]">
                    <p className="text-[var(--gray-500)] mb-2">Belum ada berita yang ditemukan.</p>
                    {q && (
                      <Link href="/berita" className="text-[var(--primary)] font-bold text-sm hover:underline">
                        Lihat semua berita
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Kanan: Widget Samping (Agenda Dinamis - Premium Design) */}
            <div className="lg:col-span-4">
              <div className="w-full sticky top-32">
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h2 className="serif text-3xl font-bold text-gray-900 leading-none mb-2">
                      Agenda
                    </h2>
                    <p className="text-gray-500 text-sm">Jadwal kegiatan nagari</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[var(--gray-100)] text-[var(--gray-900)] flex items-center justify-center shrink-0">
                    <CalendarRange size={22} strokeWidth={2} />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {agendaPosts.length > 0 ? agendaPosts.map((agenda) => {
                    const { date, month, time } = getAgendaDateInfo(agenda.publishedAt);
                    return (
                      <Link
                        key={agenda.id}
                        href={`/berita/${agenda.slug}`}
                        className="group flex gap-4 items-center p-4 rounded-2xl bg-[var(--gray-50)] border border-[var(--line)] hover:bg-white hover:border-[var(--gray-400)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200"
                      >
                        <div
                          className="shrink-0 w-16 h-16 rounded-2xl bg-white border border-[var(--gray-200)] flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] transition-colors duration-200"
                          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                        >
                          <div className="absolute top-0 w-full h-1.5 bg-[var(--primary)] group-hover:bg-white/30" />
                          <span
                            className="font-bold text-gray-500 group-hover:text-white/80 uppercase tracking-widest mt-1.5"
                            style={{ fontSize: "10px" }}
                          >
                            {month}
                          </span>
                          <span className="text-2xl font-black text-gray-900 group-hover:text-white leading-none mt-0.5">
                            {date}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 py-0.5">
                          <h4
                            className="font-bold text-[var(--gray-900)] group-hover:text-[var(--gray-600)] transition-colors leading-snug mb-2"
                            style={{
                              fontSize: "14px",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {agenda.title}
                          </h4>
                          <div
                            className="flex items-center gap-1.5 font-medium text-gray-500"
                            style={{ fontSize: "12px" }}
                          >
                            <Clock size={14} />
                            {time}
                          </div>
                        </div>

                        <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-[var(--gray-200)] flex items-center justify-center text-[var(--gray-400)] opacity-40 group-hover:opacity-100 group-hover:text-[var(--primary)] group-hover:border-[var(--primary)] group-hover:translate-x-0.5 transition-all duration-200">
                          <ArrowRight size={16} />
                        </div>
                      </Link>
                    );
                  }) : (
                    <div className="p-8 text-center text-sm text-[var(--gray-500)] border border-dashed border-[var(--line)] rounded-2xl">
                      Belum ada agenda dalam waktu dekat.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          </ScrollAnimationWrapper>
        </main>

        <Footer />
      </div>
    </div>
  );
}
