import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Data Sejarah & Budaya - Nagari Simawang",
  description: "Daftar Situs Sejarah dan Warisan Budaya di Nagari Simawang",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-display" });

export default async function SejarahPage() {
  const sejarah = await prisma.dataSejarahBudaya.findMany({
    orderBy: { jorong: 'asc' }
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
                Warisan Sejarah & Budaya
              </h1>
              <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.6, maxWidth: "600px" }}>
                Pendataan lokasi peninggalan sejarah dan situs budaya yang tersebar di berbagai jorong di Nagari Simawang.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "48px" }}>
              {sejarah.length > 0 ? (
                sejarah.map((item, index) => (
                  <div key={item.id} style={{ background: "#fff", padding: "28px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.02)", display: "flex", alignItems: "flex-start", gap: "16px", transition: "transform 0.2s" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--gray-100)", color: "var(--gray-700)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>account_balance</span>
                    </div>
                    <div>
                      <h3 className="serif" style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-900)", marginBottom: "6px" }}>
                        {item.namaTempat}
                      </h3>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--accent)", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>location_on</span>
                        Jorong {item.jorong}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0", background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "var(--gray-300)", marginBottom: "16px" }}>history_edu</span>
                  <p style={{ fontSize: "15px", color: "var(--gray-500)", fontWeight: 500 }}>Belum ada data sejarah yang tercatat.</p>
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
