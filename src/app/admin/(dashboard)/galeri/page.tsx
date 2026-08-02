"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Pencil, Trash2, Image as ImageIcon, Loader2, Link as LinkIcon, Info } from "lucide-react";
import Image from "next/image";

type GalleryItem = {
  id: string;
  title: string;
  image: string;
  description: string | null;
  category: string | null;
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
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
  
  /* Modal Overlay */
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
    max-width: 700px;
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
  
  .photo-block {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    position: relative;
  }
  .photo-block-number {
    position: absolute;
    top: -12px;
    left: -12px;
    background: #c9943a;
    color: #fff;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 12px;
    box-shadow: 0 4px 6px rgba(201, 148, 58, 0.3);
  }
  .remove-photo-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #fee2e2;
    color: #ef4444;
    border: none;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s;
  }
  .remove-photo-btn:hover { background: #fca5a5; color: #991b1b; }
  
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
  .dropzone.drag-active {
    border-color: #c9943a;
    background: #fffbeb;
  }
  .dropzone-img-preview {
    width: 100%;
    height: 120px;
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
  
  .modal-footer {
    padding: 24px 32px;
    border-top: 1px solid #f3f4f6;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    background: #f9fafb;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }
`;

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Bulk Create State
  const [bulkCategory, setBulkCategory] = useState("");
  const [bulkItems, setBulkItems] = useState([
    { title: "", image: "", description: "" }
  ]);
  
  // Edit State
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleAddPhotoField = () => {
    setBulkItems([...bulkItems, { title: "", image: "", description: "" }]);
  };
  
  const handleRemovePhotoField = (index: number) => {
    setBulkItems(bulkItems.filter((_, i) => i !== index));
  };
  
  const handleBulkChange = (index: number, field: string, value: string) => {
    const newItems = [...bulkItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setBulkItems(newItems);
  };

  const handleFileUpload = async (file: File, index?: number) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      
      if (json.success) {
        if (typeof index === "number") {
          handleBulkChange(index, "image", json.data.url);
        } else if (editingItem) {
          setEditingItem({ ...editingItem, image: json.data.url });
        }
      } else {
        alert("Upload gagal: " + json.error);
      }
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan saat mengunggah gambar");
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const payload = { category: bulkCategory, items: bulkItems };
      const res = await fetch("/api/gallery/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setIsCreateModalOpen(false);
        setBulkCategory("");
        setBulkItems([{ title: "", image: "", description: "" }]);
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSaving(true);
    
    try {
      const res = await fetch(`/api/gallery/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem)
      });
      
      if (res.ok) {
        setIsEditModalOpen(false);
        setEditingItem(null);
        fetchData();
      } else {
        const err = await res.json();
        alert("Error: " + err.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto ini?")) return;
    
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
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
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Kelola Galeri</h1>
          <p className="page-subtitle">Unggah, edit, dan hapus foto dokumentasi nagari.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={20} />
          Tambah Galeri
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
          <Loader2 className="animate-spin" size={40} color="#c9943a" />
        </div>
      ) : (
        /* Data Table (Filament Style) */
        <div className="table-container">
          <table className="filament-table">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>Foto</th>
                <th>Detail Informasi</th>
                <th>Kategori</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
                    <ImageIcon size={48} style={{ margin: "0 auto 12px auto", opacity: 0.5 }} />
                    <p>Belum ada data galeri.</p>
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
                      <p className="table-desc">{item.description || "-"}</p>
                    </td>
                    <td>
                      <span className="badge">{item.category || "Umum"}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="action-icon-btn edit" title="Edit" onClick={() => { setEditingItem(item); setIsEditModalOpen(true); }}>
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

      {/* Create Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            >
              <div className="modal-header">
                <h2 className="modal-title">Unggah Foto (Bulk)</h2>
                <button className="modal-close" onClick={() => setIsCreateModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleCreateSubmit}>
                <div className="modal-body">
                  <div className="form-group" style={{ background: "#eff6ff", padding: "20px", borderRadius: "16px", border: "1px solid #bfdbfe" }}>
                    <label className="form-label" style={{ color: "#1e3a8a", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Info size={16} /> Nama Kategori (Berlaku untuk semua foto di bawah)
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: Acara 17 Agustus 2026" 
                      value={bulkCategory}
                      onChange={e => setBulkCategory(e.target.value)}
                      required
                    />
                  </div>

                  {bulkItems.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="photo-block"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="photo-block-number">{index + 1}</div>
                      {bulkItems.length > 1 && (
                        <button type="button" className="remove-photo-btn" onClick={() => handleRemovePhotoField(index)}>
                          <Trash2 size={14} /> Hapus
                        </button>
                      )}
                      
                      <div className="form-group">
                        <label className="form-label">Judul Foto</label>
                        <input type="text" className="form-input" value={item.title} onChange={e => handleBulkChange(index, "title", e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Foto</label>
                        <div 
                          className="dropzone"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              handleFileUpload(e.dataTransfer.files[0], index);
                            }
                          }}
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = (e) => {
                              const target = e.target as HTMLInputElement;
                              if (target.files && target.files[0]) {
                                handleFileUpload(target.files[0], index);
                              }
                            };
                            input.click();
                          }}
                        >
                          {!item.image ? (
                            <>
                              <ImageIcon size={32} color="#9ca3af" style={{ margin: "0 auto 8px auto" }} />
                              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                                Klik atau tarik gambar ke sini
                              </p>
                            </>
                          ) : (
                            <img src={item.image} alt="Preview" className="dropzone-img-preview" />
                          )}
                        </div>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Deskripsi (Opsional)</label>
                        <textarea className="form-input" rows={2} value={item.description} onChange={e => handleBulkChange(index, "description", e.target.value)}></textarea>
                      </div>
                    </motion.div>
                  ))}

                  <button type="button" className="btn-secondary" onClick={handleAddPhotoField} style={{ width: "100%", borderStyle: "dashed" }}>
                    + Tambah Slot Foto
                  </button>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setIsCreateModalOpen(false)}>Batal</button>
                  <button type="submit" className="btn-primary" disabled={isSaving}>
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : "Simpan Semua Foto"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingItem && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content" style={{ maxWidth: "500px" }}
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
            >
              <div className="modal-header">
                <h2 className="modal-title">Edit Foto</h2>
                <button className="modal-close" onClick={() => { setIsEditModalOpen(false); setEditingItem(null); }}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Kategori</label>
                    <input type="text" className="form-input" value={editingItem.category || ""} onChange={e => setEditingItem({...editingItem, category: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Judul Foto</label>
                    <input type="text" className="form-input" value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} required />
                  </div>
                  <div className="form-group">
                        <label className="form-label">Foto</label>
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
                          {!editingItem.image ? (
                            <>
                              <ImageIcon size={32} color="#9ca3af" style={{ margin: "0 auto 8px auto" }} />
                              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                                Klik atau tarik gambar ke sini
                              </p>
                            </>
                          ) : (
                            <img src={editingItem.image} alt="Preview" className="dropzone-img-preview" />
                          )}
                        </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Deskripsi</label>
                    <textarea className="form-input" rows={3} value={editingItem.description || ""} onChange={e => setEditingItem({...editingItem, description: e.target.value})}></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => { setIsEditModalOpen(false); setEditingItem(null); }}>Batal</button>
                  <button type="submit" className="btn-primary" disabled={isSaving}>
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : "Simpan Perubahan"}
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
