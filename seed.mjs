import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  console.log("Sedang menghapus data Post lama...");
  await prisma.post.deleteMany({});
  
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
  
  console.log("Selesai! 10 data dummy Post berhasil dimasukkan.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
