import { z } from "zod";

// ─── Post ────────────────────────────────────────────────────────────────────
export const CreatePostSchema = z.object({
  title: z.string().min(1, "Title wajib diisi"),
  content: z.string().min(1, "Content wajib diisi"),
  category: z.enum(["berita-nagari", "pengumuman"], {
    error: () => "Category harus 'berita-nagari' atau 'pengumuman'",
  }),
  image: z.string().optional(),
  authorName: z.string().min(1, "Nama penulis wajib diisi"),
});

export const UpdatePostSchema = CreatePostSchema.partial();

// ─── GalleryItem ─────────────────────────────────────────────────────────────
export const CreateGalleryItemSchema = z.object({
  title: z.string().min(1, "Title wajib diisi"),
  image: z.string().min(1, "URL gambar wajib diisi"),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const CreateGalleryBulkSchema = z.object({
  category: z.string().min(1, "Kategori wajib diisi"),
  items: z.array(z.object({
    title: z.string().min(1, "Title wajib diisi"),
    image: z.string().min(1, "URL gambar wajib diisi"),
    description: z.string().optional(),
  })).min(1, "Minimal harus ada satu foto"),
});

export const UpdateGalleryItemSchema = CreateGalleryItemSchema.partial();

// ─── DataKesehatan ───────────────────────────────────────────────────────────
export const CreateDataKesehatanSchema = z.object({
  jorong: z.string().min(1, "Jorong wajib diisi"),
  jumlahStunting: z.number().int().min(0, "Jumlah tidak boleh negatif"),
});

export const UpdateDataKesehatanSchema = CreateDataKesehatanSchema.partial();

// ─── DataSejarahBudaya ───────────────────────────────────────────────────────
export const CreateDataSejarahBudayaSchema = z.object({
  jorong: z.string().min(1, "Jorong wajib diisi"),
  namaTempat: z.string().min(1, "Nama tempat wajib diisi"),
});

export const UpdateDataSejarahBudayaSchema = CreateDataSejarahBudayaSchema.partial();

// ─── DataPotensiAlam ─────────────────────────────────────────────────────────
export const CreateDataPotensiAlamSchema = z.object({
  kategori: z.string().min(1, "Kategori wajib diisi"),
  jumlah: z.number().int().min(0, "Jumlah tidak boleh negatif"),
});

export const UpdateDataPotensiAlamSchema = CreateDataPotensiAlamSchema.partial();

// ─── DataUmkm ────────────────────────────────────────────────────────────────
export const CreateDataUmkmSchema = z.object({
  productUmkm: z.string().min(1, "Nama produk wajib diisi"),
  jumlah: z.number().min(0, "Jumlah tidak boleh negatif"),
});

export const UpdateDataUmkmSchema = CreateDataUmkmSchema.partial();

// ─── DataSanitasi ────────────────────────────────────────────────────────────
export const CreateDataSanitasiSchema = z.object({
  jorong: z.string().min(1, "Jorong wajib diisi"),
  sampahMS: z.number().min(0, "Nilai tidak valid"),
  spalMS: z.number().min(0, "Nilai tidak valid"),
  jambanSehat: z.number().min(0, "Nilai tidak valid"),
  aksesAir: z.number().min(0, "Nilai tidak valid"),
});

export const UpdateDataSanitasiSchema = CreateDataSanitasiSchema.partial();


// ─── Exported types ──────────────────────────────────────────────────────────
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;

export type CreateGalleryItemInput = z.infer<typeof CreateGalleryItemSchema>;
export type CreateGalleryBulkInput = z.infer<typeof CreateGalleryBulkSchema>;
export type UpdateGalleryItemInput = z.infer<typeof UpdateGalleryItemSchema>;

export type CreateDataKesehatanInput = z.infer<typeof CreateDataKesehatanSchema>;
export type UpdateDataKesehatanInput = z.infer<typeof UpdateDataKesehatanSchema>;

export type CreateDataSejarahBudayaInput = z.infer<typeof CreateDataSejarahBudayaSchema>;
export type UpdateDataSejarahBudayaInput = z.infer<typeof UpdateDataSejarahBudayaSchema>;

export type CreateDataPotensiAlamInput = z.infer<typeof CreateDataPotensiAlamSchema>;
export type UpdateDataPotensiAlamInput = z.infer<typeof UpdateDataPotensiAlamSchema>;

export type CreateDataUmkmInput = z.infer<typeof CreateDataUmkmSchema>;
export type UpdateDataUmkmInput = z.infer<typeof UpdateDataUmkmSchema>;

export type CreateDataSanitasiInput = z.infer<typeof CreateDataSanitasiSchema>;
export type UpdateDataSanitasiInput = z.infer<typeof UpdateDataSanitasiSchema>;

// ─── Pengaduan ────────────────────────────────────────────────────────────────
export const CreatePengaduanSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  noWa: z.string().optional(),
  kategori: z.string().min(1, "Kategori wajib diisi"),
  laporan: z.string().min(1, "Isi laporan wajib diisi"),
});

export const UpdatePengaduanSchema = z.object({
  status: z.string().min(1, "Status wajib diisi"),
});

export type CreatePengaduanInput = z.infer<typeof CreatePengaduanSchema>;
export type UpdatePengaduanInput = z.infer<typeof UpdatePengaduanSchema>;
