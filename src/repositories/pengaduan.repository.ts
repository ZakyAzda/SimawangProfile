import prisma from "@/lib/db";
import { CreatePengaduanInput } from "@/lib/validations";

export const pengaduanRepository = {
  async create(data: CreatePengaduanInput) {
    return await prisma.pengaduan.create({ data });
  },

  async getAll() {
    return await prisma.pengaduan.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: string) {
    return await prisma.pengaduan.findUnique({
      where: { id },
    });
  },
};
