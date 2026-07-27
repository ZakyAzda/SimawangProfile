import { dataUmkmRepository } from "@/repositories/dataUmkm.repository";
import { CreateDataUmkmInput, UpdateDataUmkmInput } from "@/lib/validations";

export const dataUmkmService = {
  async getAll() {
    return dataUmkmRepository.findAll();
  },

  async getById(id: string) {
    const item = await dataUmkmRepository.findById(id);
    if (!item) throw new Error("Data UMKM tidak ditemukan");
    return item;
  },

  async create(data: CreateDataUmkmInput) {
    return dataUmkmRepository.create(data);
  },

  async update(id: string, data: UpdateDataUmkmInput) {
    await dataUmkmService.getById(id);
    return dataUmkmRepository.update(id, data);
  },

  async delete(id: string) {
    await dataUmkmService.getById(id);
    return dataUmkmRepository.delete(id);
  },
};
