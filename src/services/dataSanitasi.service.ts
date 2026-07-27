import { dataSanitasiRepository } from "@/repositories/dataSanitasi.repository";
import { CreateDataSanitasiInput, UpdateDataSanitasiInput } from "@/lib/validations";

export const dataSanitasiService = {
  async getAll() {
    return dataSanitasiRepository.findAll();
  },

  async getById(id: string) {
    const item = await dataSanitasiRepository.findById(id);
    if (!item) throw new Error("Data sanitasi tidak ditemukan");
    return item;
  },

  async create(data: CreateDataSanitasiInput) {
    return dataSanitasiRepository.create(data);
  },

  async update(id: string, data: UpdateDataSanitasiInput) {
    await dataSanitasiService.getById(id);
    return dataSanitasiRepository.update(id, data);
  },

  async delete(id: string) {
    await dataSanitasiService.getById(id);
    return dataSanitasiRepository.delete(id);
  },
};
