"use client";

import { useState } from "react";
import { dataJorong } from "@/data/jorong";
import { Send, CheckCircle, ShieldCheck, Zap, MessageSquare } from "lucide-react";

const CSS = `
  .report-section {
    padding: 100px 0;
    background: #ffffff;
    position: relative;
  }
  .report-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  @media (max-width: 900px) {
    .report-layout { grid-template-columns: 1fr; gap: 40px; }
  }

  /* Left info side */
  .report-info-eyebrow {
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
  .report-info-title {
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin-bottom: 20px;
  }
  .report-info-desc {
    font-size: 15px;
    color: #6b7280;
    line-height: 1.8;
    margin-bottom: 40px;
    max-width: 440px;
  }
  .report-features {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .report-feature-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .report-feature-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Right form side */
  .report-form-wrap {
    background: #f8f9fa;
    border: 1px solid #e5e7eb;
    border-radius: 28px;
    padding: 44px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.05);
  }
  .report-form-title {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 6px;
  }
  .report-form-sub {
    font-size: 13px;
    color: #9ca3af;
    margin-bottom: 28px;
  }
  .report-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6b7280;
    margin-bottom: 8px;
  }
  .report-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    font-size: 14px;
    color: #111827;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .report-input::placeholder { color: #d1d5db; }
  .report-input:focus {
    border-color: #1a3c30;
    box-shadow: 0 0 0 3px rgba(26,60,48,0.08);
  }
  .report-row-2 { display: flex; gap: 16px; }
  .report-row-2 > div { flex: 1; }
  @media (max-width: 560px) {
    .report-row-2 { flex-direction: column; }
    .report-form-wrap { padding: 28px 20px; }
  }
  .report-submit-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #1a3c30;
    color: #fff;
    padding: 15px 24px;
    border-radius: 14px;
    border: none;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 16px rgba(26,60,48,0.2);
    letter-spacing: 0.02em;
  }
  .report-submit-btn:hover:not(:disabled) {
    background: #0f2319;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(26,60,48,0.3);
  }
  .report-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .report-success {
    text-align: center;
    padding: 48px 20px;
  }
`;

const features = [
  {
    icon: <ShieldCheck size={18} color="#1a3c30" />,
    title: "Aman & Rahasia",
    desc: "Data pribadi pelapor dijaga kerahasiaannya.",
  },
  {
    icon: <Zap size={18} color="#d97706" />,
    title: "Respon Cepat",
    desc: "Akan diproses pada hari kerja berikutnya.",
  },
  {
    icon: <MessageSquare size={18} color="#1d4ed8" />,
    title: "Langsung ke Perangkat Nagari",
    desc: "Laporan diteruskan ke instansi terkait.",
  },
];

export function ReportSection() {
  const [formData, setFormData] = useState({
    nama: "",
    noWa: "",
    jorong: "",
    kategori: "Infrastruktur",
    laporan: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/pengaduan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengirim laporan");
      setStatus("success");
      setFormData({ nama: "", noWa: "", jorong: "", kategori: "Infrastruktur", laporan: "" });
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="report-section">
      <style>{CSS}</style>
      <div className="ng-wrap report-layout">
        {/* LEFT: Info */}
        <div>
          <span className="report-info-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a3c30", display: "inline-block" }} />
            Layanan Publik
          </span>
          <h2 className="serif report-info-title">
            Layanan Pengaduan &<br />Aspirasi Warga
          </h2>
          <p className="report-info-desc">
            Punya masukan, keluhan, atau menemukan fasilitas publik yang rusak? Laporkan langsung kepada kami. Setiap laporan akan ditindaklanjuti serius.
          </p>
          <div className="report-features">
            {features.map((f) => (
              <div key={f.title} className="report-feature-row">
                <div className="report-feature-icon">{f.icon}</div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "2px" }}>{f.title}</p>
                  <p style={{ fontSize: "13px", color: "#6b7280" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="report-form-wrap">
          {status === "success" ? (
            <div className="report-success">
              <CheckCircle size={56} color="#16a34a" style={{ marginBottom: 16 }} />
              <h3 className="serif" style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>Laporan Terkirim!</h3>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "28px" }}>Terima kasih. Laporan Anda sedang kami proses.</p>
              <button onClick={() => setStatus("idle")} style={{ background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb", padding: "10px 24px", borderRadius: "100px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                Kirim Laporan Lain
              </button>
            </div>
          ) : (
            <>
              <p className="report-form-title">Kirim Laporan</p>
              <p className="report-form-sub">Isi formulir di bawah ini dengan lengkap dan jelas.</p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div className="report-row-2">
                  <div>
                    <label className="report-label">Nama Lengkap *</label>
                    <input required name="nama" value={formData.nama} onChange={handleChange} placeholder="Budi Santoso" className="report-input" />
                  </div>
                  <div>
                    <label className="report-label">No WhatsApp</label>
                    <input name="noWa" value={formData.noWa} onChange={handleChange} placeholder="081234567890" className="report-input" />
                  </div>
                </div>

                <div className="report-row-2">
                  <div>
                    <label className="report-label">Jorong</label>
                    <select name="jorong" value={formData.jorong} onChange={handleChange} className="report-input">
                      <option value="">-- Pilih Jorong --</option>
                      {dataJorong.map(j => <option key={j.slug} value={j.nama}>{j.nama}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="report-label">Kategori *</label>
                    <select required name="kategori" value={formData.kategori} onChange={handleChange} className="report-input">
                      <option value="Infrastruktur">Infrastruktur</option>
                      <option value="Pelayanan Publik">Pelayanan Publik</option>
                      <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                      <option value="Kesehatan & Lingkungan">Kesehatan & Lingkungan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="report-label">Isi Laporan *</label>
                  <textarea required name="laporan" value={formData.laporan} onChange={handleChange} placeholder="Ceritakan dengan jelas keluhan atau laporan Anda..." rows={4} className="report-input" style={{ resize: "vertical" }} />
                </div>

                {status === "error" && (
                  <div style={{ fontSize: "13px", color: "#dc2626", background: "#fef2f2", padding: "12px 16px", borderRadius: "10px", border: "1px solid #fecaca" }}>
                    {errorMessage}
                  </div>
                )}

                <button disabled={status === "loading"} type="submit" className="report-submit-btn">
                  {status === "loading" ? "Mengirim..." : <><Send size={18} /> Kirim Laporan</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
