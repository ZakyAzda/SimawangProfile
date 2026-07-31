import { Inter, Merriweather } from "next/font/google";
import { NavBar }          from "@/components/NavBar";
import { Footer }          from "@/components/Footer";
import { ProfilHero }      from "@/components/profil/ProfilHero";
import { SejarahSection }  from "@/components/profil/SejarahSection";
import { SukuSection }     from "@/components/profil/SukuSection";
import { PemimpinSection } from "@/components/profil/PemimpinSection";

export const metadata = {
  title: "Profil Nagari — Nagari Simawang",
  description:
    "Sejarah, hak asal usul, tatanan sosial suku, dan silsilah kepemimpinan Nagari Simawang.",
  keywords:
    "Profil Nagari Simawang, Sejarah, Suku, Wali Nagari, Tanah Datar, Minangkabau",
};

/* ─── Fonts (sama dengan home) ─── */
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

/* ─────────────────────────────────────────────────────────────
   Scoped CSS — token & komponen ini SAMA dengan yang dipakai di
   halaman Home. Sebelumnya halaman Profil tidak menyertakan blok
   ini sama sekali, sehingga semua variabel (--gray-900, --accent,
   --line, dst.), font serif, dan class util (.ng-card, .ng-label,
   .ng-wrap) tidak pernah ter-resolve → halaman tampak polos/rusak.
   ───────────────────────────────────────────────────────────── */
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
    background-color: #ffffff;
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    background-attachment: fixed;
    color: var(--gray-900);
    -webkit-font-smoothing: antialiased;
  }
  .ng .serif { font-family: var(--font-display), Georgia, serif; }

  .ng-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
  }

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

  .ng-wrap { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) {
    .ng-wrap { padding: 0 20px; }
  }
`;

export default function ProfilPage() {
  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{CSS}</style>
      {/* wrapper .ng agar semua CSS variables (--gray-*, --accent, --line) tersedia */}
      <div className="ng">
        <NavBar />
        <main style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <ProfilHero />
          <SejarahSection />
          <SukuSection />
          <PemimpinSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}