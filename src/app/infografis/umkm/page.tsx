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
    orderBy: { jorong: 'asc' }
  });

  const aggregatedByProduct = umkm.reduce((acc, curr) => {
    const existing = acc.find(item => item.productUmkm === curr.productUmkm);
    if (existing) {
      existing.jumlah += curr.jumlah;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, [] as typeof umkm).sort((a, b) => b.jumlah - a.jumlah);

  const totalAll = umkm.reduce((a, b) => a + b.jumlah, 0);

  const circleCSS = `
  .circle-container { display: flex; flex-wrap: wrap; gap: 32px; margin-bottom: 48px; justify-content: center; }
  .concentric-card { position: relative; width: 240px; height: 240px; display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease; cursor: default; }
  .concentric-card:hover { transform: translateY(-8px) scale(1.02); }
  .circle-outer { position: absolute; width: 240px; height: 240px; border-radius: 50%; background: #0f271f; color: #8fa99e; display: flex; justify-content: center; padding-top: 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; box-shadow: 0 10px 30px rgba(15, 39, 31, 0.3); }
  .circle-middle { position: absolute; width: 180px; height: 180px; border-radius: 50%; background: #1a3c30; color: #ffffff; display: flex; justify-content: center; padding-top: 20px; font-size: 14px; font-weight: 700; text-align: center; padding-left: 10px; padding-right: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .circle-inner { position: absolute; width: 90px; height: 90px; border-radius: 50%; background: linear-gradient(135deg, #e3b64c, #c9943a); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; box-shadow: 0 6px 16px rgba(0,0,0,0.4); text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
  `;

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

            {/* Concentric Circles Section */}
            <div style={{ background: "#fff", padding: "40px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", marginBottom: "48px" }}>
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h3 className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "var(--gray-900)" }}>Pemetaan Detail UMKM</h3>
                <p style={{ fontSize: "14px", color: "var(--gray-500)", marginTop: "8px" }}>Visualisasi komposisi UMKM berdasarkan jorong</p>
              </div>
              <style dangerouslySetInnerHTML={{ __html: circleCSS }} />
              {umkm.length > 0 ? (
                <div className="circle-container">
                  {umkm.map(item => {
                    const percentage = totalAll > 0 ? ((item.jumlah / totalAll) * 100).toFixed(1) : "0";
                    return (
                      <div key={`circle-${item.id}`} className="concentric-card">
                        <div className="circle-outer">{item.jorong}</div>
                        <div className="circle-middle">{item.productUmkm}</div>
                        <div className="circle-inner">{percentage}%</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px", color: "var(--gray-500)" }}>Belum ada data</div>
              )}
            </div>

            {/* Pie Chart */}
            <div style={{ background: "#fff", padding: "40px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", marginBottom: "48px" }}>
              <div style={{ textAlign: "center", margin: "40px 0" }}>
                <h3 className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "var(--gray-900)" }}>Sebaran Jenis Usaha</h3>
                <p style={{ fontSize: "14px", color: "var(--gray-500)", marginTop: "8px" }}>Proporsi jumlah masing-masing bidang UMKM</p>
              </div>
              <PieChart data={aggregatedByProduct.map(u => ({ label: u.productUmkm, value: u.jumlah }))} />
            </div>

            {/* Bar Charts Section */}
            <div style={{ background: "#fff", padding: "40px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "var(--accent)" }}>bar_chart</span>
                <h3 className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "var(--gray-900)" }}>Distribusi Jenis Usaha</h3>
              </div>
              
              {aggregatedByProduct.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {aggregatedByProduct.map((u, i) => (
                    <div key={u.id} style={{ position: "relative" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--gray-800)" }}>
                          {i + 1}. {u.productUmkm}
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--accent)" }}>
                          {u.jumlah} Unit
                        </span>
                      </div>
                      <div style={{ width: "100%", height: "12px", background: "var(--gray-100)", borderRadius: "100px", overflow: "hidden" }}>
                        <div 
                          style={{ 
                            width: `${Math.min((u.jumlah / Math.max(1, ...aggregatedByProduct.map(x => x.jumlah))) * 100, 100)}%`, 
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

            {/* Table Detail per Jorong */}
            <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.02)" }}>
              <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#f8f9fa" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-900)" }}>Rincian UMKM per Jorong</h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#fff", color: "var(--gray-500)", borderBottom: "2px solid rgba(0,0,0,0.06)" }}>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Jorong</th>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Produk UMKM</th>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Jumlah Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {umkm.map((k, i) => (
                      <tr key={k.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", background: i % 2 === 0 ? "#fff" : "#fbfbfb" }}>
                        <td style={{ padding: "16px 32px", fontWeight: 600, color: "var(--gray-800)" }}>{k.jorong}</td>
                        <td style={{ padding: "16px 32px", color: "var(--gray-900)" }}>{k.productUmkm}</td>
                        <td style={{ padding: "16px 32px", color: "var(--gray-900)", fontWeight: 700 }}>{k.jumlah}</td>
                      </tr>
                    ))}
                    {umkm.length === 0 && (
                      <tr>
                        <td colSpan={3} style={{ padding: "32px", textAlign: "center", color: "var(--gray-500)" }}>Belum ada data</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
