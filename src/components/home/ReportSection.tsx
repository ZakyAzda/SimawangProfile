"use client";

import { useState } from "react";
import { dataJorong } from "@/data/jorong";

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
    <section style={{ width: "100%", padding: "80px 0", background: "transparent" }}>
      <div className="ng-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
        {/* Left Side: Info */}
        <div>
          <p className="ng-label" style={{ marginBottom: "10px" }}>Layanan Publik</p>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            Layanan Pengaduan & Aspirasi Warga
          </h2>
          <p style={{ fontSize: "15px", color: "var(--gray-600)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "480px" }}>
            Punya masukan, keluhan, atau menemukan fasilitas publik yang rusak di lingkungan Nagari Simawang? Laporkan segera kepada kami melalui formulir ini. Laporan Anda akan langsung diteruskan ke instansi terkait untuk segera ditindaklanjuti.
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--accent-50)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--accent)" }}>verified_user</span>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--gray-800)", marginBottom: "2px" }}>Aman & Rahasia</p>
                <p style={{ fontSize: "12px", color: "var(--gray-500)" }}>Data pribadi pelapor dijaga kerahasiaannya.</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--accent-50)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--accent)" }}>bolt</span>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--gray-800)", marginBottom: "2px" }}>Respon Cepat</p>
                <p style={{ fontSize: "12px", color: "var(--gray-500)" }}>Akan diproses pada hari kerja berikutnya.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", padding: "40px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 12px 40px rgba(0,0,0,0.04)" }}>
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "var(--accent)", marginBottom: "16px" }}>check_circle</span>
              <h3 className="serif" style={{ fontSize: "22px", fontWeight: 700, color: "var(--gray-900)", marginBottom: "8px" }}>Laporan Terkirim!</h3>
              <p style={{ fontSize: "14px", color: "var(--gray-600)", marginBottom: "24px" }}>Terima kasih atas partisipasi Anda membangun Nagari Simawang.</p>
              <button onClick={() => setStatus("idle")} style={{ background: "var(--gray-900)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "100px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                Kirim Laporan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--gray-700)" }}>Nama Lengkap *</label>
                  <input required name="nama" value={formData.nama} onChange={handleChange} placeholder="Budi Santoso" style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--gray-300)", background: "#fff", fontSize: "14px", fontFamily: "inherit", outline: "none" }} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--gray-700)" }}>No WhatsApp (Opsional)</label>
                  <input name="noWa" value={formData.noWa} onChange={handleChange} placeholder="081234567890" style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--gray-300)", background: "#fff", fontSize: "14px", fontFamily: "inherit", outline: "none" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", flexDirection: "row" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--gray-700)" }}>Jorong (Opsional)</label>
                  <select name="jorong" value={formData.jorong} onChange={handleChange} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--gray-300)", background: "#fff", fontSize: "14px", fontFamily: "inherit", outline: "none" }}>
                    <option value="">-- Pilih Jorong --</option>
                    {dataJorong.map(j => <option key={j.slug} value={j.nama}>{j.nama}</option>)}
                  </select>
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--gray-700)" }}>Kategori Laporan *</label>
                  <select required name="kategori" value={formData.kategori} onChange={handleChange} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--gray-300)", background: "#fff", fontSize: "14px", fontFamily: "inherit", outline: "none", appearance: "none" }}>
                    <option value="Infrastruktur">Infrastruktur (Jalan, Jembatan, dll)</option>
                    <option value="Pelayanan Publik">Pelayanan Publik</option>
                    <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                    <option value="Kesehatan & Lingkungan">Kesehatan & Lingkungan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--gray-700)" }}>Isi Laporan *</label>
                <textarea required name="laporan" value={formData.laporan} onChange={handleChange} placeholder="Ceritakan detail keluhan atau masukan Anda..." rows={4} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--gray-300)", background: "#fff", fontSize: "14px", fontFamily: "inherit", outline: "none", resize: "vertical" }} />
              </div>

              {status === "error" && (
                <div style={{ fontSize: "13px", color: "#dc2626", background: "#fef2f2", padding: "12px", borderRadius: "8px", border: "1px solid #fecaca" }}>
                  {errorMessage}
                </div>
              )}

              <button disabled={status === "loading"} type="submit" style={{ width: "100%", background: "var(--gray-900)", color: "#fff", border: "none", padding: "14px 24px", borderRadius: "100px", fontSize: "14px", fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer", transition: "background 0.2s", opacity: status === "loading" ? 0.7 : 1 }}>
                {status === "loading" ? "Mengirim..." : "Kirim Laporan"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
