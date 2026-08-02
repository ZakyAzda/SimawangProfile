"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Pencil, Trash2, Loader2 } from "lucide-react";

type DataNagari = {
  id: string;
  nama: string;
  jumlah: number;
};

const CSS = `
  .admin-page { max-width: 1200px; margin: 0 auto; font-family: var(--font-body), sans-serif; }
  .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
  .page-title { font-size: 28px; font-weight: 700; color: #111827; margin: 0; }
  .page-subtitle { color: #6b7280; margin: 4px 0 0 0; }
  .btn-primary { display: flex; align-items: center; gap: 8px; background: #1a3c30; color: #fff; padding: 12px 20px; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(26, 60, 48, 0.2); }
  .btn-primary:hover { background: #102a21; transform: translateY(-2px); }
  .table-container { background: #fff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; overflow: hidden; }
  .filament-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
  .filament-table th { background: #f9fafb; padding: 12px 24px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
  .filament-table td { padding: 16px 24px; border-bottom: 1px solid #f3f4f6; color: #4b5563; vertical-align: middle; }
  .filament-table tr:last-child td { border-bottom: none; }
  .filament-table tr:hover { background: #f9fafb; }
  .badge-percent { background: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; display: inline-block; }
  .table-actions { display: flex; gap: 8px; justify-content: flex-end; }
  .action-icon-btn { background: transparent; border: none; color: #6b7280; cursor: pointer; padding: 6px; border-radius: 6px; transition: all 0.2s; }
  .action-icon-btn:hover { background: #f3f4f6; color: #111827; }
  .action-icon-btn.edit:hover { color: #3b82f6; background: #eff6ff; }
  .action-icon-btn.delete:hover { color: #ef4444; background: #fef2f2; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(11, 31, 24, 0.4); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-content { background: #fff; border-radius: 24px; width: 100%; max-width: 500px; position: relative; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
  .modal-header { padding: 24px 32px; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; }
  .modal-title { margin: 0; font-size: 20px; font-weight: 700; }
  .modal-close { background: #f3f4f6; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #6b7280; transition: background 0.2s; }
  .modal-close:hover { background: #e5e7eb; color: #111827; }
  .modal-body { padding: 32px; }
  .modal-footer { padding: 24px 32px; border-top: 1px solid #f3f4f6; display: flex; justify-content: flex-end; gap: 12px; background: #f9fafb; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px;}
  .form-group { margin-bottom: 24px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; }
  .form-input { width: 100%; padding: 12px 16px; border-radius: 10px; border: 1px solid #d1d5db; font-size: 14px; transition: border-color 0.2s, box-shadow 0.2s; }
  .form-input:focus { outline: none; border-color: #1a3c30; box-shadow: 0 0 0 3px rgba(26, 60, 48, 0.1); }
  .btn-secondary { background: #fff; border: 1px solid #d1d5db; padding: 10px 16px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; color: #374151; }
  .btn-secondary:hover { background: #f3f4f6; }
`;

export default function AdminDataNagariPage() {
  const [items, setItems] = useState<DataNagari[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nama: "", jumlah: 0 });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/data-nagari");
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.jumlah, 0);
  }, [items]);

  const openCreateModal = () => {
    setFormData({ nama: "", jumlah: 0 });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: DataNagari) => {
    setFormData({ nama: item.nama, jumlah: item.jumlah });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingId ? `/api/data-nagari/${editingId}` : "/api/data-nagari";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: formData.nama,
          jumlah: Number(formData.jumlah)
        })
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        alert("Error: " + err.error);
      }
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data nagari ini?")) return;
    try {
      const res = await fetch(`/api/data-nagari/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="admin-page">
      <style>{CSS}</style>
      <div className="page-header">
        <div>
          <h1 className="page-title">Data Nagari</h1>
          <p className="page-subtitle">Kelola data demografi dan kependudukan Nagari.</p>
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
                <th>Nama Jorong</th>
                <th>Jumlah Penduduk</th>
                <th>Persentase</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
                    Belum ada data nagari.
                  </td>
                </tr>
              ) : (
                items.map(item => {
                  const percentage = total === 0 ? 0 : (item.jumlah / total) * 100;
                  return (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>{item.nama}</td>
                      <td>{item.jumlah} Jiwa</td>
                      <td>
                        <span className="badge-percent">{percentage.toFixed(1)}%</span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="action-icon-btn edit" onClick={() => openEditModal(item)}><Pencil size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
              <div className="modal-header">
                <h2 className="modal-title">Edit Data</h2>
                <button className="modal-close" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Nama Jorong</label>
                    <input 
                      type="text" className="form-input" placeholder="Misal: Simawang"
                      value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} required 
                      disabled={true} style={{ background: "#f3f4f6", cursor: "not-allowed" }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Jumlah Penduduk (Jiwa)</label>
                    <input 
                      type="number" className="form-input" min="0" placeholder="0"
                      value={formData.jumlah} onChange={e => setFormData({...formData, jumlah: parseInt(e.target.value) || 0})} required 
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Batal</button>
                  <button type="submit" className="btn-primary" disabled={isSaving}>
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : "Simpan Data"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
