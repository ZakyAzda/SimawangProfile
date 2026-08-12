export interface KepalaJorong {
  nama: string;
  periode: string;
  visi: string;
  telepon?: string;
  foto?: string;
}

export interface JorongStat {
  label: string;
  value: string;
  unit?: string;
}

export interface JorongHighlight {
  title: string;
  description: string;
}

export interface Jorong {
  slug: string;
  nama: string;
  kategori: string;
  etimologi?: string;
  ringkasan: string;
  karakteristik: string;
  potensi: string;
  fokusKonten: string;
  highlights: JorongHighlight[];
  stats: JorongStat[];
  aktivitas: string[];
  kepala: KepalaJorong;
}

export const dataJorong: Jorong[] = [
  {
    slug: "ombilin",
    nama: "Jorong Ombilin",
    kategori: "Wisata & Alam",
    etimologi:
      "Nama \"Ombilin\" diambil dari Sungai Ombilin yang mengalir dari hulu Danau Singkarak, membentuk jalur hidup dan pergerakan masyarakat sejak dahulu.",
    ringkasan:
      "Jorong ikonik di tepi Danau Singkarak — persimpangan antara perairan dan hulu sungai, dengan pemandangan alam, sejarah kereta api, dan kuliner khas yang menjadi daya tarik utama.",
    karakteristik:
      "Jorong ini sangat ikonik dan strategis karena merupakan titik temu antara Danau Singkarak dan hulu Sungai Ombilin. Topografinya berupa dataran rendah di tepi danau dengan akses transportasi yang relatif mudah, sehingga menjadi salah satu pintu masuk wisata alam Nagari Simawang.",
    potensi:
      "Potensi wisata alam dan kuliner sangat besar. Keberadaan danau, jembatan, serta jalur sejarah kereta api peninggalan Belanda memberi nilai tambah bagi pengembangan pariwisata berkelanjutan dan ekonomi kreatif berbasis lokal.",
    fokusKonten:
      "Pemandangan Danau Singkarak, Jembatan Ombilin, wisata kuliner khas (Ikan Bilih), dan jejak sejarah jalur kereta api peninggalan Belanda.",
    highlights: [
      {
        title: "Danau Singkarak",
        description:
          "Pemandangan danau terbesar kedua di Sumatera yang membentang luas di sisi jorong, ideal untuk foto alam, rekreasi keluarga, dan observasi ekosistem perairan.",
      },
      {
        title: "Jembatan Ombilin",
        description:
          "Landmark arsitektur yang menghubungkan kawasan tepian danau dengan pemukiman, menjadi titik foto favorit wisatawan dan simbol konektivitas wilayah.",
      },
      {
        title: "Kuliner Ikan Bilih",
        description:
          "Ikan endemik Danau Singkarak yang diolah menjadi aneka masakan tradisional — keripik, pepes, dan gulai — menjadi identitas kuliner khas yang wajib dicicipi.",
      },
      {
        title: "Jalur Kereta Api Belanda",
        description:
          "Rel dan struktur peninggalan kolonial yang melintasi kawasan ini menyimpan nilai sejarah transportasi dan industri, relevan untuk wisata edukasi dan heritage.",
      },
    ],
    stats: [
      { label: "Keluarga", value: "142", unit: "KK" },
      { label: "Penduduk", value: "518", unit: "Jiwa" },
      { label: "Luas", value: "1,8", unit: "Ha" },
      { label: "Objek Wisata", value: "4", unit: "Titik" },
    ],
    aktivitas: [
      "Festival kuliner Ikan Bilih tahunan",
      "Gotong royong pembersihan tepian danau",
      "Pelatihan homestay dan guide wisata lokal",
      "Pelestarian jalur sejarah kereta api",
    ],
    kepala: {
      nama: "Yogi Harian Nanda",
      periode: "Aktif",
      visi: "Membangun jorong Ombilin yang lebih baik dan terdepan.",
      telepon: "-",
      foto: "/images/kepala/1.jpg"
    },
  },
  {
    slug: "pincuran-gadang",
    nama: "Jorong Pincuran Gadang",
    kategori: "Sumber Air & Alam",
    etimologi:
      "Secara etimologi Minangkabau, \"Pincuran\" berarti pancuran atau sumber air, dan \"Gadang\" berarti besar — merujuk pada sumber mata air alami yang menjadi pusat kehidupan masyarakat.",
    ringkasan:
      "Jorong yang identitasnya erat dengan sumber air alami. Sejarah penamaan, tradisi pemanfaatan mata air, dan potensi wisata alam menjadi narasi utama wilayah ini.",
    karakteristik:
      "Kemungkinan besar memiliki atau secara historis dikenal dengan sumber mata air alami yang menjadi pusat aktivitas masyarakat — mulai dari pemandian tradisional, irigasi pertanian, hingga ritual adat terkait air.",
    potensi:
      "Pelestarian sumber air dan pengembangan wisata alam berbasis mata air. Nilai edukatif tentang konservasi air dan tata kelola irigasi tradisional sangat relevan untuk generasi muda.",
    fokusKonten:
      "Sejarah penamaan tempat, pelestarian sumber air, dan wisata alam atau pemandian tradisional jika masih terawat.",
    highlights: [
      {
        title: "Mata Air Pincuran Gadang",
        description:
          "Sumber air alami yang menjadi pusat kehidupan sosial masyarakat — tempat bertemu, mandi tradisional, dan sumber irigasi sawah sekitarnya.",
      },
      {
        title: "Sejarah Penamaan",
        description:
          "Etimologi Minangkabau \"Pincuran Gadang\" mencerminkan skala dan pentingnya sumber air bagi masyarakat, menjadi bagian dari memori kolektif jorong.",
      },
      {
        title: "Pelestarian Sumber Air",
        description:
          "Program gotong royong penjagaan mata air dan batas penghijauan di sekitar sumber, menjaga kualitas air untuk pertanian dan kebutuhan sehari-hari.",
      },
      {
        title: "Wisata Alam & Pemandian",
        description:
          "Kawasan sekitar mata air yang masih alami menawarkan pemandangan hijau dan udara sejuk, potensial sebagai destinasi wisata ringan dan edukasi lingkungan.",
      },
    ],
    stats: [
      { label: "Keluarga", value: "98", unit: "KK" },
      { label: "Penduduk", value: "362", unit: "Jiwa" },
      { label: "Sumber Air", value: "3", unit: "Titik" },
      { label: "Lahan Sawah", value: "12", unit: "Ha" },
    ],
    aktivitas: [
      "Penjagaan mata air bersama masyarakat",
      "Penanaman pohon di batas sumber air",
      "Edukasi konservasi air untuk pelajar",
      "Kerja bakti saluran irigasi tradisional",
    ],
    kepala: {
      nama: "Mira Karmila",
      periode: "Aktif",
      visi: "Menjaga kelestarian sumber air sebagai warisan jorong.",
      telepon: "-",
      foto: "/images/kepala/2.jpg"
    },
  },
  {
    slug: "koto-gadang",
    nama: "Jorong Koto Gadang",
    kategori: "Budaya & Adat",
    etimologi:
      "\"Koto\" merujuk pada klan Koto Piliang — salah satu dari empat suku penyusun adat Minangkabau — menandakan akar sejarah adat yang sangat kental di jorong ini.",
    ringkasan:
      "Pusat profil budaya dengan keberadaan Rumah Gadang, struktur pemangku adat, dan tradisi persukuan yang masih hidup dalam kehidupan sehari-hari masyarakat.",
    karakteristik:
      "Penamaan \"Koto\" merujuk pada klan Koto Piliang dari sistem suku Minangkabau. Jorong ini memiliki struktur adat formal dengan Niniak Mamak, Randai, dan Bodi Caniago yang berperan dalam pengambilan keputusan adat.",
    potensi:
      "Sangat cocok dijadikan pusat profil budaya nagari. Rumah Gadang, silsilah pemangku adat, dan tradisi lokal dapat dikembangkan sebagai wisata budaya dan edukasi adat.",
    fokusKonten:
      "Rumah Gadang, struktur pemangku adat (Niniak Mamak), sejarah persukuan, dan tradisi lokal yang masih dilestarikan.",
    highlights: [
      {
        title: "Rumah Gadang",
        description:
          "Rumah adat dengan arsitektur khas Minangkabau — atap gonjong, ukiran, dan ruang serba guna — menjadi simbol identitas dan pusat pertemuan adat.",
      },
      {
        title: "Niniak Mamak & Pemangku Adat",
        description:
          "Struktur kepemimpinan adat yang mengelola urusan persukuan, tanah ulayat, dan penyelesaian masalah masyarakat berdasarkan musyawarah.",
      },
      {
        title: "Sejarah Persukuan",
        description:
          "Jejak Koto Piliang sebagai salah satu suku penyusun nagari, tercermin dalam penamaan tempat, garis keturunan, dan tradisi yang diwariskan.",
      },
      {
        title: "Tradisi Lokal",
        description:
          "Rangkaian adat — dari pernikahan, peletakan tonggak sejarah, hingga ritual tahunan — yang masih dipraktikkan dan menjadi daya tarik budaya.",
      },
    ],
    stats: [
      { label: "Keluarga", value: "115", unit: "KK" },
      { label: "Penduduk", value: "428", unit: "Jiwa" },
      { label: "Rumah Gadang", value: "2", unit: "Unit" },
      { label: "Pemangku Adat", value: "12", unit: "Orang" },
    ],
    aktivitas: [
      "Perawatan Rumah Gadang bersama suku",
      "Pelestarian tarian dan musik tradisional",
      "Dokumentasi silsilah dan sejarah adat",
      "Kunjungan edukasi budaya untuk pelajar",
    ],
    kepala: {
      nama: "Data Belum Tersedia",
      periode: "-",
      visi: "Memperkuat identitas budaya Koto Gadang sebagai pusat adat Nagari Simawang.",
      telepon: "-",
      foto: "/images/kepala/3.jpg"
    },
  },
  {
    slug: "piliang-bendang",
    nama: "Jorong Piliang Bendang",
    kategori: "Budaya & Adat",
    etimologi:
      "\"Piliang\" merujuk pada klan Koto Piliang, sedangkan \"Bendang\" berarti sawah — menandakan hubungan erat antara identitas suku dan lahan pertanian masyarakat.",
    ringkasan:
      "Jorong dengan akar adat kuat yang sekaligus menjadi kawasan agraris. Profil budaya dan tatanan persukuan hidup berdampingan dengan aktivitas pertanian.",
    karakteristik:
      "Seperti Koto Gadang, penamaan \"Piliang\" menandakan keterkaitan dengan suku Koto Piliang. Kawasan bendang (sawah) mengelilingi pemukiman, membentuk lanskap agraris khas nagari.",
    potensi:
      "Kombinasi wisata budaya dan agrowisata. Rumah Gadang, pemangku adat, dan hamparan sawah memberi konten kaya untuk profil jorong dan pengembangan ekonomi kreatif.",
    fokusKonten:
      "Profil budaya, Rumah Gadang, Niniak Mamak, sejarah persukuan, tradisi lokal, serta potensi agrowisata di lahan bendang.",
    highlights: [
      {
        title: "Rumah Gadang & Adat",
        description:
          "Pusat kegiatan adat suku Piliang dengan arsitektur tradisional dan ruang musyawarah yang masih aktif digunakan masyarakat.",
      },
      {
        title: "Hamparan Bendang",
        description:
          "Sawah produktif yang membentuk pemandangan hijau luas, menjadi latar belakang kehidupan agraris dan potensi agrowisata.",
      },
      {
        title: "Silsilah & Persukuan",
        description:
          "Dokumentasi garis keturunan dan peran suku dalam tatanan nagari, penting untuk edukasi identitas dan pelestarian adat.",
      },
      {
        title: "Tradisi Pertanian",
        description:
          "Sistem tanam padi tradisional, gotong royong musim tanam, dan pengetahuan lokal tentang irigasi yang diwariskan antargenerasi.",
      },
    ],
    stats: [
      { label: "Keluarga", value: "108", unit: "KK" },
      { label: "Penduduk", value: "395", unit: "Jiwa" },
      { label: "Lahan Sawah", value: "18", unit: "Ha" },
      { label: "Rumah Gadang", value: "1", unit: "Unit" },
    ],
    aktivitas: [
      "Musyawarah adat suku Piliang",
      "Gotong royong musim tanam padi",
      "Festival budaya dan pertanian",
      "Pelatihan UMKM olahan hasil bumi",
    ],
    kepala: {
      nama: "Firman Hidayat, S.Sos",
      periode: "Aktif",
      visi: "Menyatukan kekuatan adat dan pertanian sebagai identitas Piliang Bendang.",
      telepon: "-",
      foto: "/images/kepala/5.jpg"
    },
  },
  {
    slug: "darek",
    nama: "Jorong Darek",
    kategori: "Agrowisata & Pertanian",
    etimologi:
      "Kata \"Darek\" berarti daratan atau wilayah atas — pusat asal — yang biasanya merujuk pada kawasan agraris atau perkebunan di struktur nagari.",
    ringkasan:
      "Kawasan agraris di dataran nagari dengan potensi agrowisata, hasil bumi pertanian dan perkebunan, serta pemandangan hamparan sawah dan ladang yang produktif.",
    karakteristik:
      "Wilayah darek di nagari umumnya menjadi pusat pertanian dan perkebunan masyarakat. Topografi relatif datar hingga landai, dengan akses lahan yang luas untuk budidaya tanaman pangan dan hortikultura.",
    potensi:
      "Agrowisata, edukasi pertanian, dan pengembangan produk olahan hasil bumi. Pemandangan sawah dan ladang menjadi daya tarik visual sekaligus basis ekonomi warga.",
    fokusKonten:
      "Potensi agrowisata, hasil bumi pertanian dan perkebunan, serta pemandangan hamparan sawah atau ladang.",
    highlights: [
      {
        title: "Agrowisata",
        description:
          "Program kunjungan ke lahan pertanian dan perkebunan, memperkenalkan proses tanam, panen, dan olahan hasil bumi langsung dari petani lokal.",
      },
      {
        title: "Hasil Bumi",
        description:
          "Beragam produk pertanian — padi, palawija, sayuran, dan tanaman perkebunan — menjadi tulang punggung ekonomi rumah tangga jorong.",
      },
      {
        title: "Hamparan Sawah",
        description:
          "Pemandangan sawah hijau yang membentang luas, indah saat musim tanam maupun menjelang panen, menjadi ikon lanskap Darek.",
      },
      {
        title: "Kelompok Tani",
        description:
          "Organisasi petani yang mengkoordinasikan budidaya, pemasaran, dan pelatihan teknologi pertanian ramah lingkungan.",
      },
    ],
    stats: [
      { label: "Keluarga", value: "124", unit: "KK" },
      { label: "Penduduk", value: "456", unit: "Jiwa" },
      { label: "Lahan Pertanian", value: "22", unit: "Ha" },
      { label: "Kelompok Tani", value: "4", unit: "Unit" },
    ],
    aktivitas: [
      "Musim tanam dan panen gotong royong",
      "Pelatihan pertanian organik",
      "Pasar tani mingguan produk lokal",
      "Kunjungan agrowisata untuk pelajar",
    ],
    kepala: {
      nama: "Harfani, SE.I, M.E",
      periode: "Aktif",
      visi: "Mengembangkan Darek sebagai lumbung pangan nagari sekaligus destinasi agrowisata.",
      telepon: "-",
      foto: "/images/kepala/6.jpg"
    },
  },
  {
    slug: "padang-data",
    nama: "Jorong Padang Data",
    kategori: "Pusat Kegiatan & Ekonomi",
    etimologi:
      "\"Padang Data\" (Padang Datar) merujuk pada topografi tanah datar yang luas — biasanya kawasan pemukiman padat atau area persawahan produktif.",
    ringkasan:
      "Pusat kegiatan masyarakat dengan fasilitas umum dan potensi ekonomi warga melalui UMKM serta kerajinan tangan yang berkembang di lingkungan pemukiman.",
    karakteristik:
      "Topografi datar dan luas membuat jorong ini menjadi area pemukiman yang padat dan strategis. Dekat dengan akses jalan nagari, fasilitas umum, dan pusat interaksi sosial warga.",
    potensi:
      "Pengembangan UMKM, kerajinan tangan, dan layanan ekonomi kreatif. Sebagai pusat kegiatan, jorong ini ideal untuk showcase produk lokal dan fasilitas pelayanan masyarakat.",
    fokusKonten:
      "Pusat kegiatan masyarakat, fasilitas umum, dan potensi ekonomi warga (UMKM atau kerajinan tangan).",
    highlights: [
      {
        title: "Pusat Kegiatan Masyarakat",
        description:
          "Balai jorong dan ruang pertemuan warga menjadi titik koordinasi gotong royong, musyawarah, dan acara adat maupun kemasyarakatan.",
      },
      {
        title: "Fasilitas Umum",
        description:
          "Akses jalan, posyandu, musholla, dan fasilitas pendidikan dasar mendukung kualitas hidup dan pelayanan warga sehari-hari.",
      },
      {
        title: "UMKM Lokal",
        description:
          "Usaha mikro — warung, olahan makanan, jahit, dan perdagangan — menopang ekonomi rumah tangga dan sirkulasi uang di nagari.",
      },
      {
        title: "Kerajinan Tangan",
        description:
          "Produk anyaman, ukiran kayu, dan kerajinan lain yang dihasilkan pengrajin lokal, berpotensi dipasarkan sebagai souvenir nagari.",
      },
    ],
    stats: [
      { label: "Keluarga", value: "156", unit: "KK" },
      { label: "Penduduk", value: "572", unit: "Jiwa" },
      { label: "UMKM", value: "34", unit: "Unit" },
      { label: "Fasilitas Umum", value: "6", unit: "Titik" },
    ],
    aktivitas: [
      "Bazar UMKM dan kerajinan lokal",
      "Pelatihan kewirausahaan untuk ibu-ibu",
      "Kerja bakti fasilitas umum rutin",
      "Posyandu dan pelayanan kesehatan warga",
    ],
    kepala: {
      nama: "Ramli",
      periode: "Aktif",
      visi: "Menjadikan Padang Data sebagai pusat pelayanan dan ekonomi kreatif nagari.",
      telepon: "-",
      foto: "/images/kepala/7.jpg"
    },
  },
  {
    slug: "batu-limbak",
    nama: "Jorong Batu Limbak",
    kategori: "Sosial & Perkebunan",
    etimologi:
      "\"Batu Limbak\" kemungkinan merujuk pada formasi batu atau lahan limbak (rawa/redam) di kawasan ini — ciri topografi yang membentuk karakter pemukiman dan perkebunan.",
    ringkasan:
      "Area pemukiman dan perkebunan yang menopang kehidupan ekonomi nagari, dengan kehidupan sosial aktif, gotong royong, dan bentang alam lokal yang khas.",
    karakteristik:
      "Merupakan kawasan hunian dan perkebunan yang terintegrasi dengan sistem ekonomi nagari. Masyarakat hidup dalam tatanan gotong royong kuat dengan kelompok tani dan organisasi kemasyarakatan aktif.",
    potensi:
      "Pengembangan kehidupan sosial sebagai contoh kemandirian masyarakat, dokumentasi gotong royong, dan potensi perkebunan serta agroforestry.",
    fokusKonten:
      "Kehidupan sosial masyarakat, kegiatan gotong royong, kelompok tani, dan bentang alam lokal.",
    highlights: [
      {
        title: "Kehidupan Sosial",
        description:
          "Tatanan masyarakat yang solid dengan tradisi saling bantu, musyawarah rutin, dan partisipasi aktif warga dalam urusan jorong.",
      },
      {
        title: "Gotong Royong",
        description:
          "Kerja bakti, bantuan saat pernikahan atau duka, dan proyek infrastruktur kecil yang dikerjakan bersama tanpa ganti upah.",
      },
      {
        title: "Kelompok Tani",
        description:
          "Organisasi petani dan pekebun yang mengelola lahan, pemupukan, panen, dan pemasaran hasil perkebunan secara kolektif.",
      },
      {
        title: "Bentang Alam Lokal",
        description:
          "Lanskap perbukitan, perkebunan, dan vegetasi lokal yang membentuk karakter visual jorong dan habitat flora fauna setempat.",
      },
    ],
    stats: [
      { label: "Keluarga", value: "89", unit: "KK" },
      { label: "Penduduk", value: "328", unit: "Jiwa" },
      { label: "Lahan Perkebunan", value: "15", unit: "Ha" },
      { label: "Kelompok Tani", value: "3", unit: "Unit" },
    ],
    aktivitas: [
      "Kerja bakti jalan dan drainase",
      "Panen perkebunan gotong royong",
      "Arisan dan simpan pinjam warga",
      "Penanaman pohon di batas jorong",
    ],
    kepala: {
      nama: "Wandes Eviken",
      periode: "Aktif",
      visi: "Memperkuat kebersamaan sosial Batu Limbak sebagai fondasi pembangunan.",
      telepon: "-",
      foto: "/images/kepala/8.jpg"
    },
  },
  {
    slug: "baduih",
    nama: "Jorong Baduih",
    kategori: "Sosial & Perkebunan",
    etimologi:
      "Nama \"Baduih\" berasal dari tradisi lokal yang melekat pada masyarakat setempat — menjadi identitas pemukiman yang hidup berdampingan dengan lahan perkebunan.",
    ringkasan:
      "Kawasan pemukiman dan perkebunan penopang ekonomi nagari, dengan dinamika sosial aktif dan lanskap alam yang menjadi bagian dari kehidupan sehari-hari warga.",
    karakteristik:
      "Seperti Batu Limbak, jorong ini merupakan area hunian dan perkebunan integral bagi ekonomi nagari. Masyarakat mengandalkan hasil kebun dan pertanian, dengan jaringan sosial yang erat antarkeluarga.",
    potensi:
      "Pengembangan produk olahan perkebunan, penguatan organisasi tani, dan promosi nilai gotong royong sebagai keunggulan sosial jorong.",
    fokusKonten:
      "Kehidupan sosial masyarakat, gotong royong, kelompok tani, dan bentang alam lokal.",
    highlights: [
      {
        title: "Komunitas Warga",
        description:
          "Ikatan sosial kuat antarwarga dengan partisipasi tinggi dalam acara adat, kemasyarakatan, dan pembangunan infrastruktur kecil.",
      },
      {
        title: "Gotong Royong",
        description:
          "Tradisi kerja bersama yang masih hidup — dari gotong royong tanam, panen, hingga perbaikan fasilitas umum jorong.",
      },
      {
        title: "Perkebunan & Tani",
        description:
          "Lahan perkebunan dan tamanan yang menghasilkan produk untuk konsumsi sendiri maupun dijual ke pasar nagari dan sekitarnya.",
      },
      {
        title: "Alam Sekitar",
        description:
          "Vegetasi lokal, udara sejuk, dan pemandangan perbukitan yang menciptakan lingkungan huni nyaman dan potensi wisata ringan.",
      },
    ],
    stats: [
      { label: "Keluarga", value: "94", unit: "KK" },
      { label: "Penduduk", value: "341", unit: "Jiwa" },
      { label: "Lahan Perkebunan", value: "13", unit: "Ha" },
      { label: "Kelompok Tani", value: "2", unit: "Unit" },
    ],
    aktivitas: [
      "Gotong royong perkebunan musiman",
      "Pengolahan hasil kebun bersama",
      "Pemuda jorong dan kegiatan olahraga",
      "Penghijauan lingkungan pemukiman",
    ],
    kepala: {
      nama: "Syafrianto",
      periode: "Aktif",
      visi: "Mewujudkan Baduih sebagai jorong yang produktif dan harmonis.",
      telepon: "-",
      foto: "/images/kepala/9.jpg"
    },
  },
];

export function getJorongBySlug(slug: string): Jorong | undefined {
  const normalized = slug.replace(/_/g, "-").toLowerCase();
  return dataJorong.find((j) => j.slug === normalized);
}

export function getAllJorongSlugs(): string[] {
  return dataJorong.map((j) => j.slug);
}
