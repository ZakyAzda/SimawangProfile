"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Loader2, FileText, CheckCircle, Clock, X, ArrowRight } from "lucide-react";

type Pengaduan = {
  id: string;
  nama: string;
  noWa: string | null;
  kategori: string;
  laporan: string;
  status: string;
  createdAt: string;
};

const CSS = `
  .admin-page { max-width: 1200px; margin: 0 auto; font-family: var(--font-body), sans-serif; }
  .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
  .page-title { font-size: 28px; font-weight: 700; color: #111827; margin: 0; }
  .page-subtitle { color: #6b7280; margin: 4px 0 0 0; }
  .table-container { background: #fff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; overflow: hidden; }
  .filament-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
  .filament-table th { background: #f9fafb; padding: 14px 24px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
  .filament-table td { padding: 16px 24px; border-bottom: 1px solid #f3f4f6; color: #4b5563; vertical-align: middle; }
  .filament-table tr:last-child td { border-bottom: none; }
  .filament-table tr:hover { background: #f9fafb; }
  .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
  .status-pending { background: #fef3c7; color: #d97706; }
  .status-proses { background: #e0e7ff; color: #4f46e5; }
  .status-selesai { background: #d1fae5; color: #059669; }
  .table-actions { display: flex; gap: 8px; justify-content: flex-end; }
  .action-btn { background: #fff; border: 1px solid #d1d5db; color: #374151; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
  .action-btn:hover { background: #f3f4f6; border-color: #9ca3af; }
  .action-icon-btn { background: transparent; border: none; color: #6b7280; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; }
  .action-icon-btn:hover { background: #f3f4f6; color: #111827; }
  .action-icon-btn.delete:hover { color: #ef4444; background: #fef2f2; }
  
  .modal-overlay { position: fixed; inset: 0; background: rgba(11, 31, 24, 0.4); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-content { background: #fff; border-radius: 24px; width: 100%; max-width: 600px; position: relative; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); max-height: 90vh; display: flex; flex-direction: column; }
  .modal-header { padding: 24px 32px; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
  .modal-title { margin: 0; font-size: 20px; font-weight: 700; color: #111827; }
  .modal-close { background: #f3f4f6; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #6b7280; transition: background 0.2s; }
  .modal-close:hover { background: #e5e7eb; color: #111827; }
  .modal-body { padding: 32px; overflow-y: auto; }
  .detail-group { margin-bottom: 24px; }
  .detail-label { display: block; font-size: 13px; font-weight: 600; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
  .detail-value { font-size: 15px; color: #111827; line-height: 1.6; }
  .detail-box { background: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; border-radius: 12px; font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-wrap; }
  .modal-footer { padding: 24px 32px; border-top: 1px solid #f3f4f6; display: flex; justify-content: flex-end; gap: 12px; background: #f9fafb; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; flex-shrink: 0; }
  
  .status-select { padding: 8px 16px; border-radius: 8px; border: 1px solid #d1d5db; font-size: 14px; font-weight: 500; cursor: pointer; background: #fff; outline: none; }
  .status-select:focus { border-color: #1a3c30; box-shadow: 0 0 0 3px rgba(26, 60, 48, 0.1); }
`;

export default function AdminPengaduanPage() {
  const [items, setItems] = useState<Pengaduan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedItem, setSelectedItem] = useState<Pengaduan | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/pengaduan");
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/pengaduan/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setItems(items.map(item => item.id === id ? { ...item, status: newStatus } : item));
        if (selectedItem && selectedItem.id === id) {
          setSelectedItem({ ...selectedItem, status: newStatus });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pengaduan ini secara permanen?")) return;
    try {
      const res = await fetch(`/api/pengaduan/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
        if (selectedItem?.id === id) setSelectedItem(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("id-ID", { 
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" 
    }).format(date);
  };

  return (
    <div className="admin-page">
      <style>{CSS}</style>
      <div className="page-header">
        <div>
          <h1 className="page-title">Pengaduan Warga</h1>
          <p className="page-subtitle">Kelola dan tindaklanjuti laporan masyarakat Nagari Simawang.</p>
        </div>
      </div>

      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "64px 0" }}>
          <Loader2 className="animate-spin" size={40} color="#c9943a" />
        </div>
      ) : (
        <div className="table-container">
          <table className="filament-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Pengirim</th>
                <th>Kategori</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
                    Belum ada pengaduan warga.
                  </td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{formatDate(item.createdAt)}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: "#111827" }}>{item.nama}</div>
                      {item.noWa && <div style={{ fontSize: "12px", marginTop: "2px" }}>WA: {item.noWa}</div>}
                    </td>
                    <td>
                      <span style={{ 
                        background: "#f3f4f6", color: "#4b5563", padding: "4px 8px", 
                        borderRadius: "6px", fontSize: "12px", fontWeight: 500 
                      }}>
                        {item.kategori}
                      </span>
                    </td>
                    <td>
                      <div className={`status-badge ${
                        item.status === 'Pending' ? 'status-pending' : 
                        item.status === 'Diproses' ? 'status-proses' : 'status-selesai'
                      }`}>
                        {item.status === 'Pending' && <Clock size={14} />}
                        {item.status === 'Diproses' && <Loader2 size={14} className="animate-spin" />}
                        {item.status === 'Selesai' && <CheckCircle size={14} />}
                        {item.status}
                      </div>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn" onClick={() => setSelectedItem(item)}>
                          <FileText size={16} /> Detail
                        </button>
                        <button className="action-icon-btn delete" onClick={() => handleDelete(item.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
              <div className="modal-header">
                <h2 className="modal-title">Detail Pengaduan</h2>
                <button className="modal-close" onClick={() => setSelectedItem(null)}><X size={20} /></button>
              </div>
              
              <div className="modal-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                  <div>
                    <div className="detail-label">Pengirim</div>
                    <div className="detail-value" style={{ fontWeight: 600 }}>{selectedItem.nama}</div>
                    {selectedItem.noWa && (
                      <div style={{ marginTop: "4px" }}>
                        <a href={`https://wa.me/${selectedItem.noWa.replace(/^0/, "62")}`} target="_blank" rel="noreferrer" style={{ color: "#059669", textDecoration: "none", fontSize: "14px", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          Hubungi via WhatsApp <ArrowRight size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="detail-label">Tanggal Laporan</div>
                    <div className="detail-value">{formatDate(selectedItem.createdAt)}</div>
                  </div>
                </div>

                <div className="detail-group">
                  <div className="detail-label">Kategori</div>
                  <div className="detail-value">
                    <span style={{ background: "#f3f4f6", padding: "6px 12px", borderRadius: "8px", fontWeight: 500 }}>
                      {selectedItem.kategori}
                    </span>
                  </div>
                </div>

                <div className="detail-group" style={{ marginBottom: 0 }}>
                  <div className="detail-label">Isi Laporan</div>
                  <div className="detail-box">
                    {selectedItem.laporan}
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>Ubah Status:</span>
                  <select 
                    className="status-select" 
                    value={selectedItem.status}
                    onChange={(e) => handleUpdateStatus(selectedItem.id, e.target.value)}
                    disabled={isUpdatingStatus}
                  >
                    <option value="Pending">Pending (Menunggu)</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
                <button type="button" className="action-btn" onClick={() => setSelectedItem(null)} style={{ padding: "10px 20px" }}>
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
