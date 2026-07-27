import { pengaduanRepository } from "@/repositories/pengaduan.repository";
import { CreatePengaduanInput, CreatePengaduanSchema } from "@/lib/validations";

export const pengaduanService = {
  async create(data: CreatePengaduanInput) {
    // Validate input
    const parsed = CreatePengaduanSchema.parse(data);
    return await pengaduanRepository.create(parsed);
  },

  async getAll() {
    return await pengaduanRepository.getAll();
  },

  async getById(id: string) {
    const item = await pengaduanRepository.getById(id);
    if (!item) {
      throw new Error("Pengaduan tidak ditemukan");
    }
    return item;
  },
};
