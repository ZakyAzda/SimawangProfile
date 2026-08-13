"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Heart, Star } from "lucide-react";

const CSS = `
  .wn-section {
    padding: 100px 0;
    background: #ffffff;
    position: relative;
    overflow: hidden;
  }
  .wn-section::before {
    content: '';
    position: absolute;
    top: -200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(26,60,48,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .wn-card {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 0;
    background: #ffffff;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 20px 60px -10px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
    border: 1px solid rgba(0,0,0,0.06);
    flex-wrap: wrap;
  }
  .wn-photo-wrap {
    flex: 0 0 360px;
    position: relative;
    min-height: 480px;
    overflow: hidden;
    background: #1a3c30;
  }
  .wn-photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    position: absolute;
    inset: 0;
    transition: transform 0.6s ease;
  }
  .wn-card:hover .wn-photo-wrap img {
    transform: scale(1.04);
  }
  .wn-photo-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 50%);
    z-index: 1;
  }
  .wn-photo-badge {
    position: absolute;
    bottom: 24px;
    left: 24px;
    right: 24px;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px;
    padding: 10px 14px;
  }
  .wn-content {
    flex: 1 1 400px;
    padding: 56px 52px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .wn-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #1a3c30;
    margin-bottom: 20px;
    background: rgba(26,60,48,0.07);
    padding: 6px 14px;
    border-radius: 100px;
    width: fit-content;
  }
  .wn-name {
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 6px;
  }
  .wn-title {
    font-size: 14px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 32px;
  }
  .wn-divider {
    width: 48px;
    height: 3px;
    background: linear-gradient(90deg, #1a3c30, #4a9070);
    border-radius: 2px;
    margin-bottom: 32px;
  }
  .wn-quote {
    font-size: 16px;
    color: #4b5563;
    line-height: 1.8;
    font-style: italic;
    position: relative;
    padding-left: 20px;
    border-left: 3px solid rgba(26,60,48,0.2);
    margin-bottom: 40px;
  }
  .wn-meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 40px;
  }
  .wn-meta-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #6b7280;
  }
  .wn-meta-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(26,60,48,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .wn-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #1a3c30;
    color: #fff;
    padding: 14px 32px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.25s ease;
    width: fit-content;
    box-shadow: 0 4px 16px rgba(26,60,48,0.25);
  }
  .wn-btn:hover {
    background: #0f2319;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(26,60,48,0.35);
  }
  @media (max-width: 768px) {
    .wn-photo-wrap { flex: 0 0 100%; min-height: 320px; }
    .wn-content { padding: 36px 28px; }
  }
`;

export function WaliNagariShortSection() {
  return (
    <section className="wn-section">
      <style>{CSS}</style>
      <div className="ng-wrap">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="ng-label" style={{ marginBottom: "12px", color: "#1a3c30" }}>Pemerintahan Nagari</p>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Kepemimpinan Nagari Simawang
          </h2>
          <p style={{ fontSize: "16px", color: "#6b7280", marginTop: "16px", maxWidth: "560px", margin: "16px auto 0", lineHeight: 1.7 }}>
            Memimpin dengan semangat adat dan kearifan lokal untuk nagari yang sejahtera.
          </p>
        </div>

        <div className="wn-card">
          {/* Photo Side */}
          <div className="wn-photo-wrap">
            <img
              src="/images/kepala/Wali Nagari.jpeg"
              alt="Firman Malin Panduko - Wali Nagari Simawang"
            />
            <div className="wn-photo-overlay" />
            <div className="wn-photo-badge">
              <Star size={14} color="#f59e0b" fill="#f59e0b" />
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>Wali Nagari Aktif</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="wn-content">
            <span className="wn-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a3c30", display: "inline-block" }} />
              Profil Pemimpin
            </span>

            <h3 className="serif wn-name">Firman Malin Panduko</h3>
            <p className="wn-title">Wali Nagari Simawang</p>

            <div className="wn-divider" />

            <p className="wn-quote">
              "Mari bersama kita bangun nagari yang sejahtera, mandiri, dan berbudaya berlandaskan nilai-nilai Adat Basandi Syarak, Syarak Basandi Kitabullah."
            </p>

            <div className="wn-meta">
              <div className="wn-meta-row">
                <div className="wn-meta-icon">
                  <MapPin size={15} color="#1a3c30" />
                </div>
                <span>Jorong Darek, Nagari Simawang</span>
              </div>
              <div className="wn-meta-row">
                <div className="wn-meta-icon">
                  <Heart size={15} color="#1a3c30" />
                </div>
                <span>Islam · Kawin · Lahir 25 Desember 1978</span>
              </div>
            </div>

            <Link href="/profil#walinagari" className="wn-btn">
              Baca Profil Lengkap <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
