"use client";

import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Inter, Merriweather } from "next/font/google";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dataJorong } from "@/data/jorong";

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
    --gold:     #c9943a;
    --forest:   #1a3c30;
    
    font-family: var(--font-body), system-ui, sans-serif;
    background-color: #faf8f5;
    background-image:
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    background-attachment: fixed;
    color: var(--gray-900);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .ng .serif { font-family: var(--font-display), Georgia, serif; }
  .ng-wrap   { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) { .ng-wrap { padding: 0 20px; } }

  .hero-section {
    position: relative;
    padding: 160px 0 80px;
    background: var(--forest);
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #0b1f18 0%, #1a3c30 50%, #2e6652 100%);
  }
  .hero-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }
  .hero-content {
    position: relative; z-index: 2;
    text-align: center;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 16px;
  }
  .hero-eyebrow::before, .hero-eyebrow::after {
    content: ''; display: block;
    width: 24px; height: 1.5px; background: var(--gold);
  }
  .hero-title {
    font-size: clamp(32px, 5vw, 54px);
    font-weight: 700; line-height: 1.1;
    letter-spacing: -0.02em; color: #ffffff;
    margin-bottom: 20px;
  }
  .hero-desc {
    font-size: 16px; font-weight: 300;
    color: rgba(255,255,255,0.7); line-height: 1.7;
    max-width: 600px; margin: 0 auto;
  }
  .hero-wave {
    position: absolute; bottom: -1px; left: 0;
    width: 100%; pointer-events: none;
  }

  .form-section {
    padding: 60px 0 100px;
    flex: 1;
  }
  .form-container {
    background: #ffffff;
    border-radius: 24px;
    padding: 48px;
    max-width: 700px;
    margin: -80px auto 0;
    position: relative;
    z-index: 10;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.05);
  }
  @media (max-width: 640px) {
    .form-container { padding: 32px 24px; margin-top: -40px; }
  }

  .form-group {
    margin-bottom: 24px;
  }
  .form-label {
    display: block; font-size: 13px; font-weight: 600; 
    color: var(--gray-700); margin-bottom: 8px;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .form-input {
    width: 100%; padding: 14px 18px;
    border-radius: 12px; border: 1px solid var(--gray-300);
    font-size: 15px; color: var(--gray-900);
    transition: all 0.2s; background: var(--gray-50);
  }
  .form-input:focus {
    outline: none; border-color: var(--forest);
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(26, 60, 48, 0.1);
  }
  textarea.form-input {
    min-height: 150px; resize: vertical;
  }
  
  .btn-submit {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
    background: var(--forest); color: #fff;
    padding: 16px; border-radius: 12px; border: none;
    font-weight: 600; font-size: 16px;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 10px 25px -5px rgba(26, 60, 48, 0.3);
  }
  .btn-submit:hover:not(:disabled) {
    background: #102a21; transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(26, 60, 48, 0.4);
  }
  .btn-submit:disabled {
    opacity: 0.7; cursor: not-allowed;
  }

  .success-box {
    text-align: center; padding: 40px 20px;
  }
  .success-icon {
    width: 80px; height: 80px; border-radius: 50%;
    background: #d1fae5; color: #059669;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
  }
  .success-title {
    font-size: 24px; font-weight: 700; color: var(--gray-900);
    margin-bottom: 12px;
  }
  .success-desc {
    color: var(--gray-600); line-height: 1.6;
    margin-bottom: 32px;
  }
  .btn-reset {
    background: var(--gray-100); color: var(--gray-800);
    padding: 12px 24px; border-radius: 10px; border: none;
    font-weight: 600; cursor: pointer; transition: background 0.2s;
  }
  .btn-reset:hover { background: var(--gray-200); }
`;

export default function PengaduanWargaPage() {
  const [formData, setFormData] = useState({
    nama: "",
    noWa: "",
    jorong: "",
    kategori: "Infrastruktur",
    laporan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/pengaduan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg(json.error || "Gagal mengirim laporan.");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <style>{CSS}</style>
      <div className="ng">
        <NavBar />

        <section className="hero-section">
          <div className="hero-bg" />
          <div className="hero-noise" />
          <div className="ng-wrap hero-content">
            <span className="hero-eyebrow">Layanan Publik</span>
            <h1 className="hero-title serif">Pengaduan Warga</h1>
            <p className="hero-desc">
              Sampaikan laporan, keluhan, maupun aspirasi Anda mengenai infrastruktur, pelayanan publik, atau hal lainnya di Nagari Simawang.
            </p>
          </div>
          <svg className="hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60 }}>
            <path d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z" fill="#faf8f5" />
          </svg>
        </section>

        <section className="form-section">
          <div className="ng-wrap">
            <div className="form-container">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="success-box"
                  >
                    <div className="success-icon">
                      <CheckCircle size={40} />
                    </div>
                    <h2 className="success-title serif">Laporan Berhasil Terkirim!</h2>
                    <p className="success-desc">
                      Terima kasih, laporan Anda telah masuk ke sistem kami dan akan segera ditindaklanjuti oleh Pemerintah Nagari Simawang.
                    </p>
                    <button className="btn-reset" onClick={() => {
                      setFormData({ nama: "", noWa: "", jorong: "", kategori: "Infrastruktur", laporan: "" });
                      setIsSuccess(false);
                    }}>
                      Kirim Laporan Lain
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                  >
                    {errorMsg && (
                      <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "16px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px", fontWeight: 500 }}>
                        Error: {errorMsg}
                      </div>
                    )}

                    <div className="form-group">
                      <label className="form-label">Nama Lengkap *</label>
                      <input 
                        type="text" className="form-input" placeholder="Masukkan nama Anda"
                        value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})}
                        required minLength={3}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Nomor WhatsApp (Opsional)</label>
                      <input 
                        type="tel" className="form-input" placeholder="Contoh: 081234567890"
                        value={formData.noWa} onChange={e => setFormData({...formData, noWa: e.target.value})}
                      />
                      <span style={{ display: "block", fontSize: "12px", color: "var(--gray-500)", marginTop: "6px" }}>
                        Agar kami bisa menghubungi Anda jika dibutuhkan tindak lanjut.
                      </span>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Jorong (Opsional)</label>
                      <select 
                        className="form-input" 
                        value={formData.jorong} 
                        onChange={e => setFormData({...formData, jorong: e.target.value})}
                      >
                        <option value="">-- Pilih Jorong (Boleh dikosongkan) --</option>
                        {dataJorong.map((j) => (
                          <option key={j.slug} value={j.nama}>{j.nama}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Kategori Laporan *</label>
                      <select 
                        className="form-input" 
                        value={formData.kategori} 
                        onChange={e => setFormData({...formData, kategori: e.target.value})}
                        required
                      >
                        <option value="Infrastruktur">Infrastruktur (Jalan, Irigasi, Jembatan)</option>
                        <option value="Pelayanan Publik">Pelayanan Publik (Administrasi, Surat-menyurat)</option>
                        <option value="Kebersihan & Sanitasi">Kebersihan & Sanitasi (Sampah, Air Bersih)</option>
                        <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                        <option value="Bantuan Sosial">Bantuan Sosial (BLT, Sembako)</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Isi Laporan / Keluhan *</label>
                      <textarea 
                        className="form-input" placeholder="Ceritakan dengan jelas keluhan atau laporan Anda..."
                        value={formData.laporan} onChange={e => setFormData({...formData, laporan: e.target.value})}
                        required minLength={10}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <><Loader2 className="animate-spin" size={20} /> Mengirim Laporan...</>
                      ) : (
                        <><Send size={20} /> Kirim Pengaduan</>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
