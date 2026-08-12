import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";
import { PieChart } from "@/components/PieChart";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Data UMKM - Nagari Simawang",
  description: "Data Usaha Mikro Kecil dan Menengah Nagari Simawang",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-display" });

export default async function UMKMPage() {
  const umkm = await prisma.dataUmkm.findMany({
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
                Potensi UMKM Lokal
              </h1>
              <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.6, maxWidth: "600px" }}>
                Distribusi berbagai jenis Usaha Mikro, Kecil, dan Menengah yang menjadi motor penggerak ekonomi warga Nagari Simawang.
              </p>
            </div>

            {/* Pie Chart */}
            <div style={{ background: "#fff", padding: "40px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", marginBottom: "48px" }}>
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h3 className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "var(--gray-900)" }}>Persentase Jenis Usaha</h3>
                <p style={{ fontSize: "14px", color: "var(--gray-500)", marginTop: "8px" }}>Proporsi masing-masing bidang UMKM</p>
              </div>
              <PieChart data={umkm.map(u => ({ label: u.productUmkm, value: u.jumlah }))} />
            </div>

            {/* Bar Charts Section */}
            <div style={{ background: "#fff", padding: "40px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "var(--accent)" }}>bar_chart</span>
                <h3 className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "var(--gray-900)" }}>Distribusi Jenis Usaha</h3>
              </div>
              
              {umkm.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {umkm.map((u, i) => (
                    <div key={u.id} style={{ position: "relative" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--gray-800)" }}>
                          {i + 1}. {u.productUmkm}
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--accent)" }}>
                          {u.jumlah}%
                        </span>
                      </div>
                      <div style={{ width: "100%", height: "12px", background: "var(--gray-100)", borderRadius: "100px", overflow: "hidden" }}>
                        <div 
                          style={{ 
                            width: `${u.jumlah}%`, 
                            height: "100%", 
                            background: "linear-gradient(90deg, var(--gray-700), var(--gray-900))", 
                            borderRadius: "100px",
                            transition: "width 1s ease-in-out" 
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "var(--gray-300)", marginBottom: "16px" }}>store_off</span>
                  <p style={{ fontSize: "15px", color: "var(--gray-500)", fontWeight: 500 }}>Belum ada data UMKM yang tercatat.</p>
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
