import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";
import { InfografisHero } from "@/components/infografis/InfografisHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Infografis - Nagari Simawang",
  description: "Data dan Statistik Nagari Simawang",
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

    font-family: var(--font-body), system-ui, sans-serif;
    background-color: var(--white);
    background-image: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
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

  .ng-wrap { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) {
    .ng-wrap { padding: 0 20px; }
    .ng-cols-stats { grid-template-columns: 1fr !important; }
  }

  .ng-glass-card {
    position: relative;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    padding: 24px;
    border-radius: 16px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.07);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    overflow: hidden;
  }
  .ng-glass-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
    border-color: rgba(0,0,0,0.12);
  }
  .ng-glass-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #f8f9fa;
    border: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  .ng-glass-card:hover .ng-glass-icon {
    background: #e9ecef;
    border-color: rgba(0,0,0,0.1);
  }
`;

export default async function InfografisPage() {
  const kesehatanAgg = await prisma.dataKesehatan.aggregate({ _sum: { jumlahStunting: true } });
  const nagariAgg = await prisma.dataNagari.aggregate({ _sum: { jumlah: true } });
  const sejarahCount = await prisma.dataSejarahBudaya.count();
  const potensiCount = await prisma.dataPotensiAlam.count();
  const sanitasiCount = await prisma.dataSanitasi.count();
  const umkmAgg = await prisma.dataUmkm.aggregate({ _sum: { jumlah: true } });

  // 2. Prepare the 6 stats with their dynamic counts
  const dynamicStats = [
    {
      icon: "health_and_safety",
      label: "Data Kesehatan",
      desc: "Kasus Stunting",
      count: kesehatanAgg._sum.jumlahStunting ?? 0,
      href: "/infografis/kesehatan",
    },
    {
      icon: "account_balance",
      label: "Data Nagari",
      desc: "Total Populasi",
      count: nagariAgg._sum.jumlah ?? 0,
      href: "/infografis/nagari",
    },
    {
      icon: "history_edu",
      label: "Data Sejarah",
      desc: "Situs & Budaya",
      count: sejarahCount,
      href: "/infografis/sejarah",
    },
    {
      icon: "park",
      label: "Data Potensi",
      desc: "Titik Potensi Alam",
      count: potensiCount,
      href: "/infografis/potensi",
    },
    {
      icon: "cleaning_services",
      label: "Data Sanitasi",
      desc: "Data Jorong",
      count: sanitasiCount,
      href: "/infografis/sanitasi",
    },
    {
      icon: "storefront",
      label: "Data UMKM",
      desc: "Total Usaha Warga",
      count: umkmAgg._sum.jumlah ?? 0,
      href: "/infografis/umkm",
    },
  ];

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{CSS}</style>
      <div className="ng">
        <NavBar />
        <main style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <InfografisHero />
          
          <section style={{ padding: "80px 0 120px", background: "#f8f9fa" }}>
            <div className="ng-wrap">
              <div
                className="ng-cols-stats"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }}
              >
                {dynamicStats.map((s) => (
                  <Link key={s.label} href={s.href} className="ng-glass-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div className="ng-glass-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "var(--gray-700)" }}>
                          {s.icon}
                        </span>
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        marginBottom: "4px",
                      }}
                    >
                      {s.label}
                    </p>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
                      <h3
                        className="serif"
                        style={{
                          fontSize: "36px",
                          fontWeight: 700,
                          color: "var(--gray-900)",
                          lineHeight: 1,
                        }}
                      >
                        {s.count}
                      </h3>
                    </div>

                    <p style={{ fontSize: "13px", color: "var(--gray-600)", fontWeight: 500 }}>
                      {s.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </div>
  );
}
