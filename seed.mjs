import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DUMMY_GALLERY = [
  {
    title: "Panen Raya Padi Organik",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1200",
    description: "Kegiatan panen raya padi organik di Jorong Simawang.",
    category: "Pertanian"
  },
  {
    title: "Sosialisasi Pencegahan Stunting",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200",
    description: "Penyuluhan dan pemeriksaan kesehatan di posyandu.",
    category: "Kesehatan"
  },
  {
    title: "Pembangunan Jalan Wisata",
    image: "https://images.unsplash.com/photo-1541888001640-3023ebc44fb7?q=80&w=1200",
    description: "Akses jalan baru menuju titik wisata air terjun.",
    category: "Infrastruktur"
  },
  {
    title: "Festival Budaya Suku",
    image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=1200",
    description: "Pameran pusaka kuno dan pertunjukan randai.",
    category: "Acara Adat"
  },
  {
    title: "Kerajinan Tangan UMKM",
    image: "https://images.unsplash.com/photo-1582736199413-5807ebda528a?q=80&w=1200",
    description: "Hasil karya anyaman bambu ibu-ibu PKK.",
    category: "Ekonomi"
  },
  {
    title: "Rapat Koordinasi Nagari",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    description: "Musyawarah bersama Bamus di kantor Wali Nagari.",
    category: "Kegiatan Desa"
  },
  {
    title: "Sanitasi Lingkungan",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=1200",
    description: "Fasilitas MCK umum yang baru dibangun.",
    category: "Infrastruktur"
  },
  {
    title: "Turnamen Bola Voli",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200",
    description: "Kemeriahan pertandingan final voli antar jorong.",
    category: "Olahraga"
  },
  {
    title: "Gotong Royong Irigasi",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200",
    description: "Masyarakat bahu-membahu membersihkan saluran air.",
    category: "Kegiatan Desa"
  },
  {
    title: "Penyaluran BLT",
    image: "https://images.unsplash.com/photo-1593113589914-075992080dd7?q=80&w=1200",
    description: "Pembagian Bantuan Langsung Tunai (BLT) tahap III.",
    category: "Bantuan Sosial"
  }
];

const DUMMY_POSTS = [
  {
    title: "Panen Raya Padi Organik di Jorong Simawang Bukik Kanduang",
    slug: "panen-raya-padi-organik-simawang",
    content: "Masyarakat Jorong Simawang Bukik Kanduang mengadakan panen raya padi organik yang dihadiri oleh wali nagari dan perangkat desa setempat. Hasil panen tahun ini mengalami peningkatan sebesar 20% dibandingkan tahun lalu berkat penerapan sistem irigasi baru.",
    category: "Pertanian",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1200",
    authorName: "Humas Nagari",
    views: 450,
  },
  {
    title: "Sosialisasi Pencegahan Stunting oleh Bidan Desa",
    slug: "sosialisasi-stunting-bidan-desa",
    content: "Untuk meningkatkan kesadaran warga akan pentingnya gizi balita, posyandu Nagari Simawang mengadakan penyuluhan pencegahan stunting. Acara ini dibarengi dengan pembagian makanan bergizi gratis bagi ibu hamil dan balita.",
    category: "Kesehatan",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200",
    authorName: "Kader Kesehatan",
    views: 890,
  },
  {
    title: "Pembangunan Akses Jalan Baru Menuju Titik Potensi Wisata",
    slug: "pembangunan-akses-jalan-wisata",
    content: "Pemerintah Nagari mulai melakukan betonisasi akses jalan menuju air terjun di perbukitan Simawang. Diharapkan perbaikan infrastruktur ini dapat menarik lebih banyak wisatawan dan menggerakkan ekonomi warga.",
    category: "Infrastruktur",
    image: "https://images.unsplash.com/photo-1541888001640-3023ebc44fb7?q=80&w=1200",
    authorName: "Admin Pembangunan",
    views: 1200,
  },
  {
    title: "Festival Budaya Suku dan Pusaka Adat Minangkabau",
    slug: "festival-budaya-suku-pusaka",
    content: "Dalam rangka melestarikan nilai adat, para pemangku adat dan datuak dari 6 suku di Nagari Simawang menyelenggarakan festival budaya. Acara ini menampilkan randai, silek, dan pameran pusaka kuno.",
    category: "Budaya",
    image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=1200",
    authorName: "Pemangku Adat",
    views: 1560,
  },
  {
    title: "Pembinaan UMKM Kerajinan Tangan Ibu-Ibu PKK",
    slug: "pembinaan-umkm-kerajinan-pkk",
    content: "Kelompok ibu-ibu PKK mengikuti pelatihan anyaman bambu dan kerajinan tangan lainnya. Program ini bekerja sama dengan dinas koperasi kabupaten untuk membuka pasar online bagi produk-produk lokal nagari.",
    category: "Ekonomi",
    image: "https://images.unsplash.com/photo-1582736199413-5807ebda528a?q=80&w=1200",
    authorName: "Humas Nagari",
    views: 320,
  },
  {
    title: "Rapat Koordinasi Persiapan Pemilihan Wali Nagari 2026",
    slug: "rakor-persiapan-pilwana-2026",
    content: "Badan Musyawarah Nagari (Bamus) menggelar rapat persiapan awal untuk pembentukan panitia pemilihan Wali Nagari. Pemilihan serentak diharapkan dapat berjalan damai dan transparan.",
    category: "Pemerintahan",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    authorName: "Sekretariat Bamus",
    views: 675,
  },
  {
    title: "Program Sanitasi Lingkungan: Pembuatan MCK Umum Terpadu",
    slug: "program-sanitasi-mck-umum",
    content: "Menindaklanjuti program nagari sehat, telah diselesaikan pembangunan 2 unit MCK umum di Jorong Piliang. Program ini didanai melalui dana desa dan swadaya masyarakat.",
    category: "Infrastruktur",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=1200",
    authorName: "Admin Pembangunan",
    views: 410,
  },
  {
    title: "Turnamen Bola Voli Antar Jorong Perebutkan Piala Wali Nagari",
    slug: "turnamen-voli-antar-jorong",
    content: "Sore ini lapangan utama Nagari Simawang dipenuhi warga yang antusias menonton final turnamen bola voli. Tim dari Jorong Simawang berhasil menaklukkan tim Koto Gadang dengan skor sengit 3-2.",
    category: "Olahraga",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200",
    authorName: "Karang Taruna",
    views: 950,
  },
  {
    title: "Gotong Royong Massal Membersihkan Irigasi Sawah",
    slug: "goro-membersihkan-irigasi",
    content: "Menyambut musim tanam, puluhan petani melakukan aksi gotong royong membersihkan saluran irigasi utama yang sempat tersumbat material sedimen akibat curah hujan tinggi minggu lalu.",
    category: "Kemasyarakatan",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200",
    authorName: "Ketua Kelompok Tani",
    views: 290,
  },
  {
    title: "Penyaluran Bantuan Langsung Tunai (BLT) Tahap III",
    slug: "penyaluran-blt-tahap-3",
    content: "Pemerintah Nagari hari ini resmi menyalurkan Bantuan Langsung Tunai (BLT) tahap ketiga kepada 150 Keluarga Penerima Manfaat (KPM). Proses penyaluran berjalan tertib dan lancar di aula kantor wali nagari.",
    category: "Sosial",
    image: "https://images.unsplash.com/photo-1593113589914-075992080dd7?q=80&w=1200",
    authorName: "Kasi Kesejahteraan",
    views: 1050,
  }
];

async function main() {
  console.log("Sedang menghapus data lama...");
  await prisma.post.deleteMany({});
  await prisma.galleryItem.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.dataNagari.deleteMany({});
  await prisma.dataKesehatan.deleteMany({});
  await prisma.dataPotensiAlam.deleteMany({});
  await prisma.dataSanitasi.deleteMany({});
  await prisma.dataSejarahBudaya.deleteMany({});
  await prisma.dataUmkm.deleteMany({});
  await prisma.pengaduan.deleteMany({});

  console.log("Membuat akun Admin...");
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@simawang.com",
      password: hashedPassword,
      role: "admin",
    }
  });
  
  console.log("Menambahkan data dummy Post...");
  for (const post of DUMMY_POSTS) {
    const publishedAt = new Date();
    // randomize date within last 30 days
    publishedAt.setDate(publishedAt.getDate() - Math.floor(Math.random() * 30));
    
    await prisma.post.create({
      data: {
        ...post,
        publishedAt
      }
    });
  }

  console.log("Menambahkan data dummy Gallery...");
  for (const gallery of DUMMY_GALLERY) {
    await prisma.galleryItem.create({
      data: gallery
    });
  }

  console.log("Menyiapkan struktur Data Statistik Nagari Kosong...");
  const JORONG_LIST = [
    "Batu Limbak",
    "Piliang Bendang",
    "Pincuran Gadang",
    "Koto Gadang",
    "Ombilin",
    "Padang Data",
    "Baduih",
    "Darek"
  ];

  for (const jorong of JORONG_LIST) {
    await prisma.dataNagari.create({ data: { nama: jorong, jumlah: 0 } });
    await prisma.dataKesehatan.create({ data: { jorong: jorong, jumlahStunting: 0 } });
  }

  console.log("Menyiapkan Data Sanitasi...");
  const SANITASI_LIST = [
    { jorong: "Ombilin", sampahMS: 84.95, spalMS: 90.51, jambanSehat: 99.61, aksesAir: 70.69 },
    { jorong: "Padang Data", sampahMS: 89.90, spalMS: 92.70, jambanSehat: 100, aksesAir: 79.85 },
    { jorong: "Pincuran Gadang", sampahMS: 93.58, spalMS: 92.78, jambanSehat: 98.11, aksesAir: 73.03 },
    { jorong: "Darek", sampahMS: 90.63, spalMS: 93.81, jambanSehat: 100, aksesAir: 87.80 },
    { jorong: "Koto Gadang", sampahMS: 80.88, spalMS: 90.53, jambanSehat: 100, aksesAir: 85.89 },
    { jorong: "Batu Limbak", sampahMS: 67.44, spalMS: 93.33, jambanSehat: 91.50, aksesAir: 70.81 },
    { jorong: "Piliang Bendang", sampahMS: 90.38, spalMS: 56.18, jambanSehat: 100, aksesAir: 73.83 },
    { jorong: "Baduih", sampahMS: 88.89, spalMS: 90.48, jambanSehat: 87.76, aksesAir: 87.62 }
  ];
  
  for (const sanitasi of SANITASI_LIST) {
    await prisma.dataSanitasi.create({ data: sanitasi });
  }

  console.log("Menyiapkan Data Sejarah Budaya...");
  const SEJARAH_LIST = [
    { jorong: "Ombilin", namaTempat: "Situs Cagar Budaya Prasasti Ombilin" },
    { jorong: "Darek", namaTempat: "Medan Nan Bapaneh/Batu Sandaran Rajo" },
    { jorong: "Darek", namaTempat: "Kuburan Ulama Syech Abdul Gani" },
    { jorong: "Batu Limbak", namaTempat: "Stasiun Batu Limbak" }
  ];
  for (const sejarah of SEJARAH_LIST) {
    await prisma.dataSejarahBudaya.create({ data: sejarah });
  }

  console.log("Menyiapkan Data Potensi Alam...");
  const POTENSI_LIST = [
    { kategori: "Talago", jumlah: 0 },
    { kategori: "Danau", jumlah: 0 },
    { kategori: "Wisata Alam", jumlah: 0 }
  ];
  for (const potensi of POTENSI_LIST) {
    await prisma.dataPotensiAlam.create({ data: potensi });
  }

  const UMKM_LIST = [
    { productUmkm: "Kasur", jumlah: 16.67 },
    { productUmkm: "Kapuk", jumlah: 8.33 },
    { productUmkm: "Rumah Makan", jumlah: 8.33 },
    { productUmkm: "Ikan Kering", jumlah: 16.67 },
    { productUmkm: "Batiah", jumlah: 8.33 },
    { productUmkm: "Keripik Ubi", jumlah: 16.67 },
    { productUmkm: "Kerupuk Jengkol", jumlah: 8.33 },
    { productUmkm: "Tapai", jumlah: 8.33 },
    { productUmkm: "Buah-buahan", jumlah: 8.33 }
  ];
  for (const umkm of UMKM_LIST) {
    await prisma.dataUmkm.create({ data: umkm });
  }

  console.log("Menyiapkan Data Pengaduan Warga...");
  const PENGADUAN_LIST = [
    { nama: "Budi Santoso", noWa: "081234567890", kategori: "Infrastruktur", laporan: "Jalan menuju Jorong Ombilin banyak yang berlubang akibat hujan deras minggu lalu. Mohon segera diperbaiki karena membahayakan pengendara motor.", status: "Pending" },
    { nama: "Siti Rahmawati", noWa: "085344445555", kategori: "Pelayanan Publik", laporan: "Pengurusan surat keterangan domisili di kantor wali nagari memakan waktu terlalu lama dan petugas tidak ada di tempat saat jam kerja.", status: "Diproses" },
    { nama: "Ahmad Fauzan", noWa: "082211112222", kategori: "Kebersihan & Sanitasi", laporan: "Saluran pembuangan air di sekitar pasar tradisional tersumbat dan menimbulkan bau tidak sedap. Mohon segera dikerahkan petugas gotong royong.", status: "Selesai" },
    { nama: "Ibu Nurhayati", noWa: "", kategori: "Bantuan Sosial", laporan: "Nama saya tidak tercantum dalam daftar penerima BLT tahap ini padahal sebelumnya selalu dapat. Mohon penjelasan dari pihak perangkat nagari terkait kriteria penerima saat ini.", status: "Pending" }
  ];
  for (const aduan of PENGADUAN_LIST) {
    await prisma.pengaduan.create({ data: aduan });
  }
  
  console.log("Selesai! Seluruh data dummy berhasil dimasukkan.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
