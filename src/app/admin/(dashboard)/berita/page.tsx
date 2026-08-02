"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Pencil, Trash2, Image as ImageIcon, Loader2, Info } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  image: string | null;
  authorName: string;
  publishedAt: string;
  views: number;
};

const CSS = `
  .admin-page {
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-body), sans-serif;
  }
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }
  .page-title {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
  .page-subtitle {
    color: #6b7280;
    margin: 4px 0 0 0;
  }
  .btn-primary {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #1a3c30;
    color: #fff;
    padding: 12px 20px;
    border-radius: 12px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(26, 60, 48, 0.2);
  }
  .btn-primary:hover {
    background: #102a21;
    transform: translateY(-2px);
  }
  .table-container {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
    border: 1px solid #e5e7eb;
    overflow: hidden;
  }
  .filament-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 14px;
  }
  .filament-table th {
    background: #f9fafb;
    padding: 12px 24px;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.05em;
  }
  .filament-table td {
    padding: 16px 24px;
    border-bottom: 1px solid #f3f4f6;
    color: #4b5563;
    vertical-align: middle;
  }
  .filament-table tr:last-child td {
    border-bottom: none;
  }
  .filament-table tr:hover {
    background: #f9fafb;
  }
  .table-img {
    width: 60px;
    height: 48px;
    border-radius: 6px;
    object-fit: cover;
    background: #f3f4f6;
    display: block;
  }
  .table-title {
    font-weight: 600;
    color: #111827;
    margin: 0 0 4px 0;
    font-size: 15px;
  }
  .table-desc {
    margin: 0;
    color: #6b7280;
    font-size: 13px;
  }
  .badge {
    background: #fef3c7;
    color: #d97706;
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
  }
  .badge.pengumuman {
    background: #dbeafe;
    color: #1d4ed8;
  }
  .table-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
  .action-icon-btn {
    background: transparent;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: all 0.2s;
  }
  .action-icon-btn:hover { background: #f3f4f6; color: #111827; }
  .action-icon-btn.edit:hover { color: #3b82f6; background: #eff6ff; }
  .action-icon-btn.delete:hover { color: #ef4444; background: #fef2f2; }
  
  .ql-container {
    font-size: 14px;
    font-family: var(--font-body), sans-serif;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-color: #d1d5db !important;
  }
  .ql-toolbar {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-color: #d1d5db !important;
    background: #f9fafb;
  }
  .ql-editor {
    min-height: 200px;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(11, 31, 24, 0.4);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .modal-content {
    background: #fff;
    border-radius: 24px;
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  }
  .modal-header {
    padding: 24px 32px;
    border-bottom: 1px solid #f3f4f6;
    position: sticky;
    top: 0;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(12px);
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modal-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
  }
  .modal-close {
    background: #f3f4f6;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #6b7280;
    transition: background 0.2s;
  }
  .modal-close:hover { background: #e5e7eb; color: #111827; }
  .modal-body {
    padding: 32px;
  }
  .modal-footer {
    padding: 24px 32px;
    border-top: 1px solid #f3f4f6;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    background: #f9fafb;
    position: sticky;
    bottom: 0;
  }
  
  .form-group { margin-bottom: 24px; }
  .form-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .form-input:focus {
    outline: none;
    border-color: #1a3c30;
    box-shadow: 0 0 0 3px rgba(26, 60, 48, 0.1);
  }
  
  .dropzone {
    border: 2px dashed #d1d5db;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    background: #f9fafb;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .dropzone:hover {
    border-color: #c9943a;
    background: #fffbeb;
  }
  .dropzone-img-preview {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 12px;
  }
  
  .btn-secondary {
    background: #fff;
    border: 1px solid #d1d5db;
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    color: #374151;
  }
  .btn-secondary:hover { background: #f3f4f6; }
`;

export default function AdminBeritaPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "berita-nagari",
    image: ""
  });

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      if (session?.user?.name) {
        setAdminName(session.user.name);
      }
    } catch (e) {
      console.error("Gagal memuat sesi:", e);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/posts");
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "berita-nagari",
      image: ""
    });
    setEditingId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: Post) => {
    const validCategory = ["berita-nagari", "pengumuman"].includes(item.category) 
      ? item.category 
      : "berita-nagari";
      
    setFormData({
      title: item.title,
      content: item.content,
      category: validCategory,
      image: item.image || ""
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (file: File) => {
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setFormData({ ...formData, image: json.data.url });
      } else {
        alert("Upload gagal: " + json.error);
      }
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan saat mengunggah gambar");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const url = editingId ? `/api/posts/${editingId}` : "/api/posts";
      const method = editingId ? "PATCH" : "POST";
      
      const payload = { ...formData, authorName: adminName };
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
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
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
    
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="admin-page">
      <style>{CSS}</style>
      
      <div className="page-header">
        <div>
          <h1 className="page-title">Kelola Berita & Artikel</h1>
          <p className="page-subtitle">Tulis pengumuman dan berita terbaru untuk warga nagari.</p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          <Plus size={18} /> Tambah Tulisan
        </button>
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
                <th style={{ width: "80px" }}>Sampul</th>
                <th>Judul & Penulis</th>
                <th>Kategori</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
                    <ImageIcon size={48} style={{ margin: "0 auto 12px auto", opacity: 0.5 }} />
                    <p>Belum ada berita atau pengumuman.</p>
                  </td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.title} className="table-img" />
                      ) : (
                        <div className="table-img" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <ImageIcon size={20} color="#9ca3af" />
                        </div>
                      )}
                    </td>
                    <td>
                      <h3 className="table-title">{item.title}</h3>
                      <p className="table-desc">Oleh: <strong>{item.authorName}</strong> &bull; {new Date(item.publishedAt).toLocaleDateString("id-ID")}</p>
                    </td>
                    <td>
                      <span className={`badge ${item.category === 'pengumuman' ? 'pengumuman' : ''}`}>
                        {item.category === "pengumuman" ? "Pengumuman" : "Berita Nagari"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="action-icon-btn edit" title="Edit" onClick={() => openEditModal(item)}>
                          <Pencil size={18} />
                        </button>
                        <button className="action-icon-btn delete" title="Hapus" onClick={() => handleDelete(item.id)}>
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

      {/* Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            >
              <div className="modal-header">
                <h2 className="modal-title">{editingId ? "Edit Tulisan" : "Tulis Baru"}</h2>
                <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Judul Tulisan</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: Pembagian Bansos Tahap II"
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kategori</label>
                    <select 
                      className="form-input" 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="berita-nagari">Berita Nagari</option>
                      <option value="pengumuman">Pengumuman</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gambar Sampul (Thumbnail)</label>
                    <div 
                      className="dropzone"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleFileUpload(e.dataTransfer.files[0]);
                        }
                      }}
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.onchange = (e) => {
                          const target = e.target as HTMLInputElement;
                          if (target.files && target.files[0]) {
                            handleFileUpload(target.files[0]);
                          }
                        };
                        input.click();
                      }}
                    >
                      {!formData.image ? (
                        <>
                          <ImageIcon size={32} color="#9ca3af" style={{ margin: "0 auto 8px auto" }} />
                          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                            Klik atau tarik gambar sampul ke sini
                          </p>
                        </>
                      ) : (
                        <img src={formData.image} alt="Preview" className="dropzone-img-preview" />
                      )}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Isi Konten Berita</label>
                    <div style={{ background: "#fff", borderRadius: "10px" }}>
                      <ReactQuill 
                        theme="snow" 
                        value={formData.content} 
                        onChange={(val) => setFormData({...formData, content: val})} 
                        placeholder="Tuliskan isi berita di sini..."
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Batal</button>
                  <button type="submit" className="btn-primary" disabled={isSaving}>
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : (editingId ? "Simpan Perubahan" : "Publikasikan")}
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
