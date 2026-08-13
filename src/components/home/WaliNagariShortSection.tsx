"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function WaliNagariShortSection() {
  return (
    <section style={{ padding: "80px 0", background: "var(--white)" }}>
      <div className="ng-wrap" style={{ 
        display: "flex", 
        flexDirection: "row",
        alignItems: "center",
        gap: "48px",
        flexWrap: "wrap",
        background: "var(--gray-50)",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
        border: "1px solid var(--line)"
      }}>
        <div style={{ flex: "1 1 250px", maxWidth: "300px", position: "relative", margin: "0 auto" }}>
          <img 
            src="/images/kepala/Wali Nagari.jpeg" 
            alt="Firman Malin Panduko - Wali Nagari Simawang"
            style={{ width: "100%", borderRadius: "16px", objectFit: "cover", aspectRatio: "4/5", boxShadow: "0 15px 35px rgba(0,0,0,0.1)" }}
          />
        </div>
        <div style={{ flex: "2 1 400px", padding: "20px 0" }}>
          <p className="ng-label" style={{ marginBottom: "12px", color: "var(--accent)" }}>Pemerintahan Nagari</p>
          <h2 className="serif" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--gray-900)", marginBottom: "8px", lineHeight: 1.2 }}>
            FIRMAN MALIN PANDUKO
          </h2>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--accent-l)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "24px" }}>
            Wali Nagari Simawang
          </p>
          <p style={{ fontSize: "16px", color: "var(--gray-600)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "600px", fontStyle: "italic" }}>
            "Pemerintahan Nagari Simawang berkomitmen untuk memberikan pelayanan publik terbaik, transparan, dan responsif. Mari bersama kita bangun nagari yang sejahtera, mandiri, dan berbudaya berlandaskan nilai-nilai Adat Basandi Syarak, Syarak Basandi Kitabullah."
          </p>
          
          <Link href="/profil#walinagari" style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "8px", 
            background: "var(--gray-900)", 
            color: "#fff", 
            padding: "12px 28px", 
            borderRadius: "100px", 
            fontSize: "14px", 
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = "var(--gray-800)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "var(--gray-900)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Baca Profil Lengkap <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
