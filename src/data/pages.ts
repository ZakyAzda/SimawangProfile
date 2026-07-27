export interface PageData {
  title: string;
  content: string;
  image: string;
}

export const staticPages: Record<string, PageData> = {
  "wilayah-nagari": {
    title: "Wilayah Nagari",
    content: "Konten penjelasan tentang wilayah nagari. Terdiri dari beberapa jorong dan batas wilayah alam yang membentang luas.",
    image: "/images/dummy-wilayah.jpg"
  },
  "sejarah-nagari": {
    title: "Sejarah Nagari",
    content: "Sejarah berdirinya nagari ini dari masa ke masa. Berbagai cerita dari para tetua dan tokoh adat yang terus dilestarikan.",
    image: "/images/dummy-sejarah.jpg"
  },
  "wali-nagari": {
    title: "Profil Wali Nagari",
    content: "Profil lengkap Wali Nagari yang sedang menjabat beserta visi, misi, dan program kerja unggulan untuk kemajuan nagari.",
    image: "/images/dummy-wali.jpg"
  }
};
