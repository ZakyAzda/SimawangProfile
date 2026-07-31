import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { JorongHero } from "@/components/jorong/JorongHero";
import { ProfilJorongSection } from "@/components/jorong/ProfilJorongSection";
import { KepalaJorongSection } from "@/components/jorong/KepalaJorongSection";
import { PotensiSection } from "@/components/jorong/PotensiSection";
import { AktivitasSection } from "@/components/jorong/AktivitasSection";
import { JorongNavSection } from "@/components/jorong/JorongNavSection";
import { getJorongBySlug, getAllJorongSlugs } from "@/data/jorong";
import { inter, merriweather, NG_CSS } from "@/lib/ng-theme";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getAllJorongSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const jorong = getJorongBySlug(slug);
  if (!jorong) return { title: "Jorong Tidak Ditemukan" };

  return {
    title: `${jorong.nama} — Nagari Simawang`,
    description: jorong.ringkasan,
    keywords: `${jorong.nama}, Nagari Simawang, Tanah Datar, Minangkabau, ${jorong.kategori}`,
  };
}

export default async function JorongDetailPage({ params }: Props) {
  const { slug } = await params;
  const jorong = getJorongBySlug(slug);

  if (!jorong) notFound();

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{NG_CSS}</style>
      <div className="ng">
        <NavBar />
        <main style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <JorongHero jorong={jorong} />
          <ProfilJorongSection jorong={jorong} />
          <KepalaJorongSection jorong={jorong} />
          <PotensiSection jorong={jorong} />
          <AktivitasSection jorong={jorong} />
          <JorongNavSection currentSlug={jorong.slug} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
