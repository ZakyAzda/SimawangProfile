import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DUMMY_AGENDA = [
  {
    title: "Musyawarah Perencanaan Pembangunan Nagari (Musrenbang)",
    slug: "agenda-musrenbang-2026",
    content: "Pembahasan rancangan pembangunan tahunan dan serap aspirasi bersama para tokoh masyarakat, niniak mamak, dan bundo kanduang.",
    category: "Agenda Nagari",
    image: "https://images.unsplash.com/photo-1577415124269-b9140d420bf3?q=80&w=1200",
    authorName: "Sekretariat Nagari",
    views: 45,
    // Set 5 hari dari sekarang
    publishedAt: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Gotong Royong Massal Persiapan Menyambut Ramadhan",
    slug: "agenda-goro-ramadhan",
    content: "Kegiatan gotong royong massal membersihkan area pemakaman umum dan masjid/mushalla di setiap jorong.",
    category: "Agenda Nagari",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200",
    authorName: "Pemuda Nagari",
    views: 120,
    // Set 12 hari dari sekarang
    publishedAt: new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Penyaluran Bantuan Langsung Tunai (BLT) Tahap IV",
    slug: "agenda-penyaluran-blt-tahap-4",
    content: "Diharapkan kepada seluruh Kepala Keluarga penerima manfaat untuk membawa fotokopi KK dan KTP asli saat pencairan.",
    category: "Agenda Nagari",
    image: "https://images.unsplash.com/photo-1593113589914-075992080dd7?q=80&w=1200",
    authorName: "Kasi Kesejahteraan",
    views: 330,
    // Set 22 hari dari sekarang
    publishedAt: new Date(new Date().getTime() + 22 * 24 * 60 * 60 * 1000)
  }
];

async function main() {
  console.log("Menghapus data lama dengan kategori 'Agenda Nagari'...");
  await prisma.post.deleteMany({
    where: { category: "Agenda Nagari" }
  });
  
  console.log("Menambahkan data dummy Agenda Nagari...");
  for (const post of DUMMY_AGENDA) {
    await prisma.post.create({
      data: post
    });
  }
  
  console.log("Selesai! 3 data Agenda Nagari berhasil dimasukkan.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
