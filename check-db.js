const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sanitasi = await prisma.dataSanitasi.findMany();
  const kesehatan = await prisma.dataKesehatan.findMany();
  const nagari = await prisma.dataNagari.findMany();
  const umkm = await prisma.dataUmkm.findMany();

  console.log("Sanitasi:", sanitasi);
  console.log("Kesehatan:", kesehatan);
  console.log("Nagari:", nagari);
  console.log("UMKM:", umkm);
}

main().catch(console.error).finally(() => prisma.$disconnect());
