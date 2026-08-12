import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";
import { PieChart } from "@/components/PieChart";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Data Kesehatan - Nagari Simawang",
  description: "Data Stunting dan Gizi Warga Nagari Simawang",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-display" });

export default async function KesehatanPage() {
  const kesehatan = await prisma.dataKesehatan.findMany();
  
  const totalStunting = kesehatan.reduce((a, b) => a + b.jumlahStunting, 0);

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
                Kasus Stunting & Gizi Warga
              </h1>
              <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.6, maxWidth: "600px" }}>
                Pantauan rutin tingkat stunting di seluruh jorong Nagari Simawang sebagai upaya bersama dalam meningkatkan kesehatan dan gizi balita.
              </p>
            </div>

            {/* Highlight Stunting */}
            <div style={{ background: "#fff", padding: "40px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", display: "flex", alignItems: "center", gap: "32px", marginBottom: "48px", flexWrap: "wrap" }}>
              <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: totalStunting > 0 ? "#fef2f2" : "#f0fdf4", color: totalStunting > 0 ? "#ef4444" : "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", border: `4px solid ${totalStunting > 0 ? '#fee2e2' : '#dcfce7'}` }}>
                <span className="serif" style={{ fontSize: "48px", fontWeight: 700 }}>{totalStunting}</span>
              </div>
              <div style={{ flex: 1, minWidth: "250px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: "8px" }}>
                  Status Keseluruhan
                </p>
                <h3 className="serif" style={{ fontSize: "32px", fontWeight: 700, color: "var(--gray-900)", marginBottom: "12px" }}>
                  {totalStunting === 0 ? "Nagari Bebas Stunting!" : "Perlu Perhatian Bersama"}
                </h3>
                <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.6 }}>
                  {totalStunting === 0 
                    ? "Alhamdulillah, berkat kerja keras para kader posyandu dan kesadaran masyarakat, saat ini tidak ada kasus stunting yang tercatat." 
                    : `Terdapat ${totalStunting} balita yang sedang dalam pantauan khusus untuk perbaikan gizi di tingkat nagari.`}
                </p>
              </div>
            </div>

            {/* Pie Chart */}
            <div style={{ background: "#fff", padding: "40px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", marginBottom: "48px" }}>
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h3 className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "var(--gray-900)" }}>Distribusi Kasus Stunting</h3>
                <p style={{ fontSize: "14px", color: "var(--gray-500)", marginTop: "8px" }}>Berdasarkan wilayah jorong</p>
              </div>
              <PieChart data={kesehatan.map(k => ({ label: k.jorong, value: k.jumlahStunting }))} />
            </div>

            {/* Table Detail per Jorong */}
            <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.02)" }}>
              <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#f8f9fa" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-900)" }}>Sebaran Kasus Per Jorong</h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#fff", color: "var(--gray-500)", borderBottom: "2px solid rgba(0,0,0,0.06)" }}>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Jorong</th>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Jumlah Stunting (Anak)</th>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kesehatan.map((k, i) => (
                      <tr key={k.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", background: i % 2 === 0 ? "#fff" : "#fbfbfb" }}>
                        <td style={{ padding: "16px 32px", fontWeight: 600, color: "var(--gray-800)" }}>{k.jorong}</td>
                        <td style={{ padding: "16px 32px", color: "var(--gray-900)", fontWeight: 700, fontSize: "16px" }}>{k.jumlahStunting}</td>
                        <td style={{ padding: "16px 32px" }}>
                          {k.jumlahStunting === 0 ? (
                            <span style={{ background: "#f0fdf4", color: "#166534", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>Aman</span>
                          ) : (
                            <span style={{ background: "#fef2f2", color: "#991b1b", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>Pantauan</span>
                          )}
                        </td>
                      </tr>
                    ))}
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
