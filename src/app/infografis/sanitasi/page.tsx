import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Data Sanitasi - Nagari Simawang",
  description: "Capaian Sanitasi dan Lingkungan Nagari Simawang",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-display" });

const CSS = `
  .chart-circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
`;

function DonutChart({ percentage, label, color, icon }: { percentage: number, label: string, color: string, icon: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: '#fff', padding: '32px 20px', borderRadius: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        <svg width="120" height="120" className="chart-circle">
          <circle cx="60" cy="60" r={radius} fill="transparent" stroke="#f1f3f5" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.03em' }}>
            {Math.round(percentage)}<span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-500)' }}>%</span>
          </span>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: color }}>{icon}</span>
          <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-800)', lineHeight: 1.2 }}>{label}</p>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Rata-rata Nagari</p>
      </div>
    </div>
  )
}

export default async function SanitasiPage() {
  const sanitasi = await prisma.dataSanitasi.findMany();
  
  const count = sanitasi.length || 1;
  const avgSampah = sanitasi.reduce((a, b) => a + b.sampahMS, 0) / count;
  const avgSpal = sanitasi.reduce((a, b) => a + b.spalMS, 0) / count;
  const avgJamban = sanitasi.reduce((a, b) => a + b.jambanSehat, 0) / count;
  const avgAir = sanitasi.reduce((a, b) => a + b.aksesAir, 0) / count;

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{CSS}</style>
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
                Capaian Sanitasi & Lingkungan
              </h1>
              <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.6, maxWidth: "600px" }}>
                Visualisasi persentase capaian sarana sanitasi dan air bersih yang layak bagi masyarakat di seluruh jorong Nagari Simawang.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "48px" }}>
              <DonutChart percentage={avgSampah || 0} label="Tempat Sampah MS" color="#10b981" icon="delete" />
              <DonutChart percentage={avgSpal || 0} label="SPAL MS" color="#3b82f6" icon="water_drop" />
              <DonutChart percentage={avgJamban || 0} label="Jamban Sehat" color="#8b5cf6" icon="wc" />
              <DonutChart percentage={avgAir || 0} label="Akses Air Minum" color="#0ea5e9" icon="faucet" />
            </div>

            {/* Table Detail per Jorong */}
            <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.02)" }}>
              <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#f8f9fa" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-900)" }}>Rincian Per Jorong</h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#fff", color: "var(--gray-500)", borderBottom: "2px solid rgba(0,0,0,0.06)" }}>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Jorong</th>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Sampah MS</th>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>SPAL MS</th>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Jamban Sehat</th>
                      <th style={{ padding: "16px 32px", fontWeight: 600 }}>Air Minum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sanitasi.map((s, i) => (
                      <tr key={s.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)", background: i % 2 === 0 ? "#fff" : "#fbfbfb" }}>
                        <td style={{ padding: "16px 32px", fontWeight: 600, color: "var(--gray-800)" }}>{s.jorong}</td>
                        <td style={{ padding: "16px 32px", color: "var(--gray-600)" }}>{s.sampahMS}%</td>
                        <td style={{ padding: "16px 32px", color: "var(--gray-600)" }}>{s.spalMS}%</td>
                        <td style={{ padding: "16px 32px", color: "var(--gray-600)" }}>{s.jambanSehat}%</td>
                        <td style={{ padding: "16px 32px", color: "var(--gray-600)" }}>{s.aksesAir}%</td>
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
