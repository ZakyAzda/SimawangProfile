"use client";

import { useState } from "react";
import { Lock, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { signOut } from "next-auth/react";

const CSS = `
  .admin-page { max-width: 800px; margin: 0 auto; font-family: var(--font-body), sans-serif; }
  .page-header { margin-bottom: 32px; }
  .page-title { font-size: 28px; font-weight: 700; color: #111827; margin: 0; }
  .page-subtitle { color: #6b7280; margin: 4px 0 0 0; }
  
  .settings-card { background: #fff; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; overflow: hidden; }
  .card-header { padding: 24px 32px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 12px; }
  .card-icon { width: 40px; height: 40px; background: rgba(201, 148, 58, 0.1); color: #c9943a; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
  .card-title { font-size: 18px; font-weight: 600; color: #111827; margin: 0; }
  .card-desc { font-size: 13px; color: #6b7280; margin: 4px 0 0 0; }
  
  .card-body { padding: 32px; }
  .form-group { margin-bottom: 24px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
  .form-input { width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid #d1d5db; font-size: 14px; transition: all 0.2s; background: #f9fafb; }
  .form-input:focus { outline: none; border-color: #1a3c30; background: #fff; box-shadow: 0 0 0 3px rgba(26, 60, 48, 0.1); }
  
  .card-footer { padding: 24px 32px; background: #f9fafb; border-top: 1px solid #f3f4f6; display: flex; justify-content: flex-end; }
  .btn-submit { background: #1a3c30; color: #fff; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
  .btn-submit:hover:not(:disabled) { background: #0b1f18; }
  .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
  
  .alert-box { padding: 16px; border-radius: 8px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 24px; font-size: 14px; line-height: 1.5; }
  .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
  .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
`;

export default function PengaturanPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Konfirmasi password baru tidak cocok!" });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password baru minimal 6 karakter." });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Gagal mengubah password" });
      } else {
        setMessage({ type: "success", text: "Password berhasil diubah! Sesi Anda akan otomatis keluar dalam 3 detik untuk login ulang." });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
        // Force logout after 3 seconds for security
        setTimeout(() => {
          signOut({ callbackUrl: "/admin/login" });
        }, 3000);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan jaringan." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <style>{CSS}</style>
      <div className="page-header">
        <h1 className="page-title">Pengaturan Akun</h1>
        <p className="page-subtitle">Kelola keamanan dan preferensi akun Anda.</p>
      </div>

      <div className="settings-card">
        <div className="card-header">
          <div className="card-icon"><Lock size={20} /></div>
          <div>
            <h2 className="card-title">Ganti Password</h2>
            <p className="card-desc">Pastikan akun Anda menggunakan kombinasi password yang kuat.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-body">
            {message && (
              <div className={`alert-box ${message.type === 'error' ? 'alert-error' : 'alert-success'}`}>
                {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                <div>{message.text}</div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Password Saat Ini</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Masukkan password Anda saat ini"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password Baru</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Minimal 6 karakter"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Konfirmasi Password Baru</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Ulangi password baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="card-footer">
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isLoading ? 'Menyimpan...' : 'Simpan Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
