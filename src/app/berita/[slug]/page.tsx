import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Inter, Merriweather } from "next/font/google";
import { ReadingProgress } from "./ReadingProgress";
import { unstable_noStore as noStore } from "next/cache";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

export const dynamic = "force-dynamic";

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

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/gm, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Berita Tidak Ditemukan" };
  return {
    title: `${post.title} — Nagari Simawang`,
    description: post.content.replace(/<[^>]*>/gm, "").slice(0, 160),
    openGraph: {
      title: post.title,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  noStore();
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) notFound();

  prisma.post
    .update({ where: { slug }, data: { views: { increment: 1 } } })
    .catch(() => {});

  const relatedPosts = await prisma.post.findMany({
    where: { category: post.category, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  let suggestions = relatedPosts;
  if (suggestions.length < 3) {
    const more = await prisma.post.findMany({
      where: {
        slug: { not: slug, notIn: relatedPosts.map((p) => p.slug) },
      },
      orderBy: { publishedAt: "desc" },
      take: 3 - suggestions.length,
    });
    suggestions = [...suggestions, ...more];
  }

  const readTime = estimateReadTime(post.content);
  const isHTML = /<[a-z][\s\S]*>/i.test(post.content);
  const plainText = post.content.replace(/<[^>]*>/gm, "");

  const CSS = `
    /* ═══════════════════════════════════════════
       BASE — sama persis dengan halaman .ng lain
       ═══════════════════════════════════════════ */
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
      --forest-mid: #2e6652;

      font-family: var(--font-body), system-ui, sans-serif;
      background-color: #faf8f5;
      color: var(--gray-900);
      -webkit-font-smoothing: antialiased;
    }
    .ng .serif { font-family: var(--font-display), Georgia, serif; }
    .ng-wrap   { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
    @media (max-width: 768px) { .ng-wrap { padding: 0 20px; } }

    /* ═══════════════════════════════════════════
       HERO BANNER
       ═══════════════════════════════════════════ */
    .bd-hero {
      position: relative;
      width: 100%;
      height: 520px;
      overflow: hidden;
    }
    @media (max-width: 768px) { .bd-hero { height: 340px; } }
    .bd-hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .bd-hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(11,31,24,0.10) 0%,
        rgba(11,31,24,0.55) 55%,
        rgba(11,31,24,0.90) 100%
      );
    }
    .bd-hero-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 48px 80px;
    }
    @media (max-width: 768px) { .bd-hero-content { padding: 28px 20px; } }

    /* ── Breadcrumb ── */
    .bd-breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.6);
      margin-bottom: 14px;
    }
    .bd-breadcrumb a { color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
    .bd-breadcrumb a:hover { color: #fff; }
    .bd-breadcrumb-sep { color: rgba(255,255,255,0.3); }

    /* ── Category badge ── */
    .bd-category {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      border-radius: 100px;
      background: var(--gold);
      color: #fff;
      margin-bottom: 14px;
    }
    .bd-category .material-symbols-outlined { font-size: 12px; }

    /* ── Hero title ── */
    .bd-hero-title {
      font-family: var(--font-display), Georgia, serif;
      font-size: clamp(26px, 4vw, 52px);
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #fff;
      max-width: 820px;
      margin-bottom: 18px;
    }

    /* ── Meta row ── */
    .bd-meta {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .bd-meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: rgba(255,255,255,0.75);
    }
    .bd-meta-item .material-symbols-outlined { font-size: 15px; opacity: 0.7; }

    /* ═══════════════════════════════════════════
       LAYOUT — artikel + sidebar
       ═══════════════════════════════════════════ */
    .bd-layout {
      display: grid;
      grid-template-columns: 1fr 296px;
      gap: 64px;
      padding-top: 56px;
      padding-bottom: 80px;
      align-items: start;
    }
    @media (max-width: 1024px) { .bd-layout { grid-template-columns: 1fr; gap: 40px; } }

    /* ═══════════════════════════════════════════
       KONTEN ARTIKEL
       ═══════════════════════════════════════════ */
    .bd-article { min-width: 0; }

    .bd-content {
      font-size: 18px;
      line-height: 1.85;
      font-weight: 300;
      color: var(--gray-800);
    }
    .bd-content p { margin-bottom: 24px; }
    .bd-content h2 {
      font-family: var(--font-display), Georgia, serif;
      font-size: 30px;
      font-weight: 600;
      color: var(--gray-900);
      margin: 40px 0 16px;
      line-height: 1.2;
    }
    .bd-content h3 {
      font-family: var(--font-display), Georgia, serif;
      font-size: 22px;
      font-weight: 600;
      color: var(--gray-900);
      margin: 32px 0 12px;
    }
    .bd-content strong { font-weight: 600; color: var(--gray-900); }
    .bd-content em { font-style: italic; }
    .bd-content ul, .bd-content ol { padding-left: 24px; margin-bottom: 24px; }
    .bd-content li { margin-bottom: 8px; }
    .bd-content blockquote {
      border-left: 3px solid var(--gold);
      padding: 16px 24px;
      margin: 32px 0;
      background: #fdf6e9;
      border-radius: 0 8px 8px 0;
      font-size: 19px;
      font-style: italic;
      color: var(--gray-700);
      font-family: var(--font-display), Georgia, serif;
    }
    .bd-content img { width: 100%; border-radius: 8px; margin: 32px 0; }
    .bd-plain {
      font-size: 18px;
      line-height: 1.85;
      font-weight: 300;
      color: var(--gray-800);
      white-space: pre-line;
    }

    /* ── Share bar ── */
    .bd-action-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 0;
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
      margin: 40px 0;
      flex-wrap: wrap;
    }
    .bd-share-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--gray-400);
      margin-right: 4px;
    }
    .bd-share-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1.5px solid var(--line);
      background: var(--white);
      color: var(--gray-600);
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .bd-share-btn:hover {
      border-color: var(--forest-mid);
      color: var(--forest-mid);
      background: #f2faf7;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(46,102,82,0.12);
    }
    .bd-share-btn .material-symbols-outlined { font-size: 18px; }
    .bd-views {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      color: var(--gray-400);
    }
    .bd-views .material-symbols-outlined { font-size: 15px; }

    /* ── Author box ── */
    .bd-author-box {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 22px 28px;
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: 16px;
      margin-bottom: 56px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.04);
      flex-wrap: wrap;
    }
    .bd-author-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--forest-mid), var(--gold));
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display), Georgia, serif;
      font-size: 22px;
      font-weight: 600;
      color: #fff;
      flex-shrink: 0;
    }
    .bd-author-name { font-size: 15px; font-weight: 600; color: var(--gray-900); margin-bottom: 3px; }
    .bd-author-sub { font-size: 12px; color: var(--gray-500); letter-spacing: 0.04em; }
    .bd-author-link {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--forest-mid);
      text-decoration: none;
      padding: 8px 18px;
      border: 1.5px solid var(--line);
      border-radius: 100px;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .bd-author-link:hover { border-color: var(--forest-mid); background: #f2faf7; }
    .bd-author-link .material-symbols-outlined { font-size: 14px; }

    /* ═══════════════════════════════════════════
       SIDEBAR
       ═══════════════════════════════════════════ */
    .bd-sidebar { position: sticky; top: 100px; }

    .bd-sidebar-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--gray-400);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .bd-sidebar-label::after { content: ''; flex: 1; height: 1px; background: var(--line); }

    .bd-read-card {
      padding: 18px 20px;
      background: linear-gradient(135deg, #f2faf7, #fdf6e9);
      border-radius: 12px;
      border: 1px solid var(--line);
      margin-bottom: 28px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .bd-read-card-time {
      font-family: var(--font-display), Georgia, serif;
      font-size: 22px;
      font-weight: 600;
      color: var(--gray-900);
      line-height: 1;
      margin-bottom: 4px;
    }
    .bd-read-card-sub { font-size: 11px; color: var(--gray-500); }

    .bd-sidebar-post {
      display: flex;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--gray-100);
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .bd-sidebar-post:last-child { border-bottom: 0; }
    .bd-sidebar-post:hover { opacity: 0.72; }
    .bd-sidebar-thumb {
      width: 64px;
      height: 64px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      border: 1px solid var(--gray-100);
    }
    .bd-sidebar-post-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--gray-900);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 4px;
    }
    .bd-sidebar-meta { font-size: 11px; color: var(--gray-500); }

    .bd-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 100px;
      background: #fdf6e9;
      color: var(--gray-800);
      text-decoration: none;
      border: 1px solid var(--line);
      transition: all 0.2s;
    }
    .bd-tag:hover { background: #f2faf7; border-color: var(--forest-mid); color: var(--forest-mid); }
    .bd-tag .material-symbols-outlined { font-size: 14px; }

    .bd-back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--gray-600);
      text-decoration: none;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      transition: color 0.2s;
      margin-bottom: 28px;
    }
    .bd-back-link:hover { color: var(--forest-mid); }
    .bd-back-link .material-symbols-outlined { font-size: 16px; }

    /* ═══════════════════════════════════════════
       BERITA LAINNYA — bottom grid
       ═══════════════════════════════════════════ */
    .bd-related-section {
      padding: 72px 0 0;
      border-top: 1px solid var(--line);
    }
    .bd-related-header {
      display: flex;
      align-items: baseline;
      gap: 16px;
      margin-bottom: 36px;
    }
    .bd-related-title {
      font-family: var(--font-display), Georgia, serif;
      font-size: 32px;
      font-weight: 600;
      color: var(--gray-900);
    }
    .bd-related-sub { font-size: 13px; color: var(--gray-500); }

    .bd-related-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    @media (max-width: 768px) { .bd-related-grid { grid-template-columns: 1fr; } }
    @media (max-width: 1024px) and (min-width: 769px) { .bd-related-grid { grid-template-columns: repeat(2, 1fr); } }

    .bd-related-card {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--line);
      background: var(--white);
      transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s cubic-bezier(0.22,1,0.36,1);
    }
    .bd-related-card:hover { transform: translateY(-5px); box-shadow: 0 12px 36px rgba(0,0,0,0.1); }

    .bd-related-img-wrap {
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      position: relative;
      background: var(--gray-100);
    }
    .bd-related-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
    }
    .bd-related-card:hover .bd-related-img { transform: scale(1.06); }

    .bd-related-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 3px 10px;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      border-radius: 100px;
      background: rgba(11,31,24,0.65);
      backdrop-filter: blur(8px);
      color: #fff;
    }
    .bd-related-body {
      padding: 18px 20px 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .bd-related-date {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--gold);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .bd-related-date::before { content: ''; display: inline-block; width: 14px; height: 1.5px; background: var(--gold); flex-shrink: 0; }

    .bd-related-card-title {
      font-family: var(--font-display), Georgia, serif;
      font-size: 18px;
      font-weight: 600;
      color: var(--gray-900);
      line-height: 1.25;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: color 0.2s;
    }
    .bd-related-card:hover .bd-related-card-title { color: var(--forest-mid); }

    .bd-related-card-meta {
      margin-top: auto;
      padding-top: 12px;
      font-size: 11px;
      color: var(--gray-500);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .bd-related-card-meta .material-symbols-outlined { font-size: 13px; }

    .bd-related-read {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      color: var(--forest-mid);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .bd-related-read .material-symbols-outlined { font-size: 14px; transition: transform 0.2s; }
    .bd-related-card:hover .bd-related-read .material-symbols-outlined { transform: translateX(3px); }

    /* ── Divider & back-to-top ── */
    .bd-divider {
      display: flex;
      align-items: center;
      gap: 16px;
      color: var(--gray-400);
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 600;
      margin: 56px 0 36px;
    }
    .bd-divider::before, .bd-divider::after { content: ''; flex: 1; height: 1px; background: var(--line); }

    .bd-back-top {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      border: 1.5px solid var(--line);
      border-radius: 100px;
      color: var(--gray-600);
      text-decoration: none;
      background: var(--white);
      transition: all 0.22s ease;
      cursor: pointer;
    }
    .bd-back-top:hover { border-color: var(--forest-mid); color: var(--forest-mid); background: #f2faf7; }
    .bd-back-top .material-symbols-outlined { font-size: 14px; }
  `;

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{CSS}</style>
      <ReadingProgress />

      <div className="ng">
        <NavBar />

        {/* ── Hero ── */}
        <ScrollAnimationWrapper>
          <div className="bd-hero" id="top">
            <img
              src={post.image || DEFAULT_IMAGE}
              alt={post.title}
              className="bd-hero-img"
            />
            <div className="bd-hero-overlay" />
            <div className="bd-hero-content ng-wrap">
              <nav className="bd-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="bd-breadcrumb-sep">/</span>
                <Link href="/berita">Berita</Link>
                <span className="bd-breadcrumb-sep">/</span>
                <span style={{ color: "rgba(255,255,255,0.9)" }}>{post.category}</span>
              </nav>

              <div className="bd-category">
                <span className="material-symbols-outlined">label</span>
                {post.category}
              </div>

              <h1 className="bd-hero-title">{post.title}</h1>

              <div className="bd-meta">
                <span className="bd-meta-item">
                  <span className="material-symbols-outlined">person</span>
                  {post.authorName}
                </span>
                <span className="bd-meta-item">
                  <span className="material-symbols-outlined">calendar_today</span>
                  {formatDate(post.publishedAt)}
                </span>
                <span className="bd-meta-item">
                  <span className="material-symbols-outlined">schedule</span>
                  {readTime} menit baca
                </span>
                <span className="bd-meta-item">
                  <span className="material-symbols-outlined">visibility</span>
                  {post.views.toLocaleString("id-ID")} tayangan
                </span>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* ── Layout ── */}
        <div className="ng-wrap">
          <ScrollAnimationWrapper delay={0.1}>
            <div className="bd-layout" id="article-body">

              {/* Artikel */}
              <article className="bd-article">
                {isHTML ? (
                  <div
                    className="bd-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                ) : (
                  <p className="bd-plain">{plainText}</p>
                )}

                {/* Share bar */}
                <div className="bd-action-bar">
                  <span className="bd-share-label">Bagikan</span>
                  <a
                    className="bd-share-btn"
                    href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("https://simawang.desa.id/berita/" + post.slug)}
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Facebook" title="Facebook"
                  >
                    <span className="material-symbols-outlined">public</span>
                  </a>
                  <a
                    className="bd-share-btn"
                    href={"https://twitter.com/intent/tweet?url=" + encodeURIComponent("https://simawang.desa.id/berita/" + post.slug) + "&text=" + encodeURIComponent(post.title)}
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Twitter/X" title="Twitter / X"
                  >
                    <span className="material-symbols-outlined">alternate_email</span>
                  </a>
                  <a
                    className="bd-share-btn"
                    href={"https://api.whatsapp.com/send?text=" + encodeURIComponent(post.title + " — https://simawang.desa.id/berita/" + post.slug)}
                    target="_blank" rel="noopener noreferrer"
                    aria-label="WhatsApp" title="WhatsApp"
                  >
                    <span className="material-symbols-outlined">chat</span>
                  </a>
                  <div className="bd-views">
                    <span className="material-symbols-outlined">visibility</span>
                    {post.views.toLocaleString("id-ID")} tayangan
                  </div>
                </div>

                {/* Author box */}
                <div className="bd-author-box">
                  <div className="bd-author-avatar">
                    {post.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="bd-author-name">{post.authorName}</div>
                    <div className="bd-author-sub">Penulis · Nagari Simawang</div>
                  </div>
                  <Link href="/berita" className="bd-author-link">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Semua Berita
                  </Link>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="bd-sidebar">
                <Link href="/berita" className="bd-back-link">
                  <span className="material-symbols-outlined">chevron_left</span>
                  Kembali ke Berita
                </Link>

                {/* Reading time */}
                <div className="bd-read-card">
                  <span className="material-symbols-outlined" style={{ fontSize: "26px", color: "#c9943a" }}>
                    menu_book
                  </span>
                  <div>
                    <div className="bd-read-card-time">{readTime} menit</div>
                    <div className="bd-read-card-sub">estimasi waktu baca</div>
                  </div>
                </div>

                {/* Related posts */}
                {suggestions.length > 0 && (
                  <>
                    <div className="bd-sidebar-label">Berita Lainnya</div>
                    {suggestions.slice(0, 4).map((s) => (
                      <Link key={s.id} href={"/berita/" + s.slug} className="bd-sidebar-post">
                        <img src={s.image || DEFAULT_IMAGE} alt={s.title} className="bd-sidebar-thumb" />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="bd-sidebar-post-title">{s.title}</div>
                          <div className="bd-sidebar-meta">{formatDate(s.publishedAt)}</div>
                        </div>
                      </Link>
                    ))}
                  </>
                )}

                {/* Category tag */}
                <div style={{ marginTop: "24px" }}>
                  <div className="bd-sidebar-label">Kategori</div>
                  <Link href={"/berita?q=" + encodeURIComponent(post.category)} className="bd-tag">
                    <span className="material-symbols-outlined">folder_open</span>
                    {post.category}
                  </Link>
                </div>
              </aside>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* ── Berita Lainnya bottom grid ── */}
        {suggestions.length > 0 && (
          <div className="ng-wrap">
            <ScrollAnimationWrapper delay={0.1}>
              <div className="bd-related-section">
                <div className="bd-related-header">
                  <h2 className="bd-related-title">Berita Lainnya</h2>
                  <span className="bd-related-sub">Mungkin kamu tertarik juga</span>
                </div>

                <div className="bd-related-grid">
                  {suggestions.map((s) => (
                    <Link key={s.id} href={"/berita/" + s.slug} className="bd-related-card">
                      <div className="bd-related-img-wrap">
                        <img src={s.image || DEFAULT_IMAGE} alt={s.title} className="bd-related-img" />
                        <span className="bd-related-badge">{s.category}</span>
                      </div>
                      <div className="bd-related-body">
                        <div className="bd-related-date">{formatDate(s.publishedAt)}</div>
                        <div className="bd-related-card-title">{s.title}</div>
                        <div className="bd-related-card-meta">
                          <span className="material-symbols-outlined">person</span>
                          {s.authorName}
                          <div className="bd-related-read">
                            Baca
                            <span className="material-symbols-outlined">arrow_forward</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="bd-divider">selesai membaca</div>
                <div style={{ display: "flex", justifyContent: "center", paddingBottom: "80px" }}>
                  <a href="#top" className="bd-back-top">
                    <span className="material-symbols-outlined">arrow_upward</span>
                    Kembali ke atas
                  </a>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}