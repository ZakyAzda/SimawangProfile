import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { JorongHero } from "@/components/jorong/JorongHero";
import { ProfilJorongSection } from "@/components/jorong/ProfilJorongSection";
import { KepalaJorongSection } from "@/components/jorong/KepalaJorongSection";
import { PotensiSection } from "@/components/jorong/PotensiSection";
import { JorongNavSection } from "@/components/jorong/JorongNavSection";
import { getJorongBySlug, getAllJorongSlugs } from "@/data/jorong";
import { inter, merriweather } from "@/lib/ng-theme";
import prisma from "@/lib/db";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

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

  const jorongNamePlain = jorong.nama.replace(/Jorong /i, "").trim();
  const umkmData = await prisma.dataUmkm.findMany({
    where: {
      jorong: {
        contains: jorongNamePlain,
        mode: "insensitive"
      }
    }
  });

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <div className="ng">
        <NavBar />
        <main style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <JorongHero jorong={jorong} />
          <ScrollAnimationWrapper>
            <ProfilJorongSection jorong={jorong} />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.1}>
            <KepalaJorongSection jorong={jorong} />
          </ScrollAnimationWrapper>
          {umkmData.length > 0 && (
            <ScrollAnimationWrapper delay={0.1}>
              <PotensiSection umkm={umkmData} />
            </ScrollAnimationWrapper>
          )}
          <ScrollAnimationWrapper delay={0.1}>
            <JorongNavSection currentSlug={jorong.slug} />
          </ScrollAnimationWrapper>
        </main>
        <Footer />
      </div>
    </div>
  );
}
