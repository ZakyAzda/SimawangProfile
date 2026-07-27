import { dataPotensiAlamRepository } from "@/repositories/dataPotensiAlam.repository";
import { CreateDataPotensiAlamInput, UpdateDataPotensiAlamInput } from "@/lib/validations";

export const dataPotensiAlamService = {
  async getAll() {
    return dataPotensiAlamRepository.findAll();
  },

  async getById(id: string) {
    const item = await dataPotensiAlamRepository.findById(id);
    if (!item) throw new Error("Data potensi alam tidak ditemukan");
    return item;
  },

  async create(data: CreateDataPotensiAlamInput) {
    return dataPotensiAlamRepository.create(data);
  },

  async update(id: string, data: UpdateDataPotensiAlamInput) {
    await dataPotensiAlamService.getById(id);
    return dataPotensiAlamRepository.update(id, data);
  },

  async delete(id: string) {
    await dataPotensiAlamService.getById(id);
    return dataPotensiAlamRepository.delete(id);
  },
};
