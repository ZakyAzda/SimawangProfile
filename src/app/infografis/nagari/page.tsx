import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";
import { PieChart } from "@/components/PieChart";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Data Nagari - Nagari Simawang",
  description: "Data Kependudukan dan Profil Nagari Simawang",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-display" });

export default async function NagariPage() {
  const kependudukan = await prisma.dataNagari.findMany({
    orderBy: { jumlah: 'desc' }
  });
  
  const totalPenduduk = kependudukan.reduce((a, b) => a + b.jumlah, 0);

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
                Profil Kependudukan
              </h1>
              <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.6, maxWidth: "600px" }}>
                Informasi demografi dan distribusi kependudukan berdasarkan data wilayah administrasi Nagari Simawang.
              </p>
            </div>

            {/* Highlight Kependudukan */}
            <div style={{ background: "var(--gray-900)", padding: "40px", borderRadius: "24px", color: "white", position: "relative", overflow: "hidden", marginBottom: "48px", display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
              <span className="material-symbols-outlined" style={{ position: "absolute", right: "-20px", bottom: "-40px", fontSize: "240px", opacity: 0.05, pointerEvents: "none" }}>groups</span>
              <div style={{ zIndex: 1 }}>
                <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-l)", marginBottom: "16px" }}>
                  Total Penduduk Terdata
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                  <span className="serif" style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1 }}>
                    {totalPenduduk > 0 ? totalPenduduk.toLocaleString('id-ID') : "0"}
                  </span>
                  <span style={{ fontSize: "20px", color: "rgba(255,255,255,0.7)" }}>Jiwa</span>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div style={{ background: "#fff", padding: "40px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.03)", marginBottom: "48px" }}>
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h3 className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "var(--gray-900)" }}>Distribusi Penduduk</h3>
                <p style={{ fontSize: "14px", color: "var(--gray-500)", marginTop: "8px" }}>Berdasarkan kategori / wilayah</p>
              </div>
              <PieChart data={kependudukan.map(k => ({ label: k.nama, value: k.jumlah }))} />
            </div>

            {/* Table Detail Kependudukan */}
            <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.02)" }}>
              <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#f8f9fa" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-900)" }}>Distribusi Penduduk</h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#fff", color: "var(--gray-500)", borderBottom: "2px solid rgba(0,0,0,0.06)" }}>
                      <th style={{ padding: "16px 32px", fontWeight: 600, width: "70%" }}>Kategori / Wilayah</th>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Jumlah Jiwa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kependudukan.length > 0 ? (
                      kependudukan.map((k, i) => (
                        <tr key={k.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", background: i % 2 === 0 ? "#fff" : "#fbfbfb" }}>
                          <td style={{ padding: "16px 32px", fontWeight: 600, color: "var(--gray-800)" }}>{k.nama}</td>
                          <td style={{ padding: "16px 32px", color: "var(--gray-900)", fontWeight: 700, fontSize: "15px" }}>{k.jumlah.toLocaleString('id-ID')}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} style={{ padding: "32px", textAlign: "center", color: "var(--gray-500)" }}>
                          Belum ada data kependudukan yang tercatat.
                        </td>
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
