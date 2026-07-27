export interface Jorong {
  slug: string;
  nama: string;
  deskripsi: string;
  foto: string;
  kepalaNama: string;
  kepalaFoto: string;
}

export const dataJorong: Jorong[] = [
  {
    slug: "jorong-satu",
    nama: "Jorong Satu",
    deskripsi: "Ini adalah deskripsi untuk Jorong Satu. Sebuah tempat yang asri dengan pemandangan alam yang indah.",
    foto: "/images/dummy-jorong-1.jpg",
    kepalaNama: "Bapak Budi",
    kepalaFoto: "/images/dummy-kepala-1.jpg",
  },
  {
    slug: "jorong-dua",
    nama: "Jorong Dua",
    deskripsi: "Ini adalah deskripsi untuk Jorong Dua. Terkenal dengan UMKM dan hasil perkebunan yang melimpah.",
    foto: "/images/dummy-jorong-2.jpg",
    kepalaNama: "Bapak Santoso",
    kepalaFoto: "/images/dummy-kepala-2.jpg",
  }
];
