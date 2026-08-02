"use client";

import { usePathname } from "next/navigation";

export default function AdminPageTitle() {
  const pathname = usePathname();
  
  let title = "Ringkasan Dasbor";
  if (pathname.includes("/galeri")) title = "Kelola Galeri";
  else if (pathname.includes("/berita")) title = "Kelola Berita & Artikel";
  else if (pathname.includes("/kesehatan")) title = "Kelola Data Kesehatan";
  else if (pathname.includes("/potensi-alam")) title = "Kelola Potensi Alam";
  else if (pathname.includes("/sanitasi")) title = "Kelola Data Sanitasi";
  else if (pathname.includes("/sejarah")) title = "Kelola Sejarah & Budaya";
  else if (pathname.includes("/umkm")) title = "Kelola Data UMKM";
  else if (pathname.includes("/pengaduan")) title = "Daftar Pengaduan Warga";
  else if (pathname.includes("/pengaturan")) title = "Pengaturan Sistem";

  return (
    <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", margin: 0 }}>
      {title}
    </h2>
  );
}
