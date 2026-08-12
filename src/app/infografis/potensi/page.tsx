import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Data Potensi Alam - Nagari Simawang",
  description: "Data Potensi Sumber Daya Alam di Nagari Simawang",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-display" });

export default async function PotensiPage() {
  const potensi = await prisma.dataPotensiAlam.findMany({
    orderBy: { jumlah: 'desc' }
  });

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <div className="ng" style={{ background: "#f8f9fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <NavBar />
        
        <main style={{ flex: 1, padding: "120px 0 80px" }}>
          <div className="ng-wrap" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
            
            <Link href="/#infografis" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--gray-500)", textDecoration: "none", fontSize: "14px", fontWeight: 600, marginBottom: "32px", transition: "color 0.2s" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
              Kembali ke Home
            </Link>

            <div style={{ marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "12px" }}>
                Detail Data
              </p>
              <h1 className="serif" style={{ fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em", marginBottom: "16px" }}>
                Potensi Alam
              </h1>
              <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.6, maxWidth: "600px" }}>
                Pemetaan jumlah titik potensi dan kekayaan sumber daya alam yang tersebar di wilayah Nagari Simawang.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "48px" }}>
              {potensi.length > 0 ? (
                potensi.map((item, index) => (
                  <div key={item.id} style={{ background: "#fff", padding: "32px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", gap: "16px", transition: "transform 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>park</span>
                      </div>
                      <span className="serif" style={{ fontSize: "36px", fontWeight: 700, color: "var(--gray-900)" }}>
                        {item.jumlah}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                        Kategori Potensi
                      </p>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-900)" }}>
                        {item.kategori}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0", background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "var(--gray-300)", marginBottom: "16px" }}>park</span>
                  <p style={{ fontSize: "15px", color: "var(--gray-500)", fontWeight: 500 }}>Belum ada data potensi alam yang tercatat.</p>
                </div>
              )}
            </div>

          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
