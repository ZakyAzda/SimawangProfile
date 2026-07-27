import { dataKesehatanRepository } from "@/repositories/dataKesehatan.repository";
import { CreateDataKesehatanInput, UpdateDataKesehatanInput } from "@/lib/validations";

export const dataKesehatanService = {
  async getAll() {
    return dataKesehatanRepository.findAll();
  },

  async getById(id: string) {
    const item = await dataKesehatanRepository.findById(id);
    if (!item) throw new Error("Data kesehatan tidak ditemukan");
    return item;
  },

  async create(data: CreateDataKesehatanInput) {
    return dataKesehatanRepository.create(data);
  },

  async update(id: string, data: UpdateDataKesehatanInput) {
    await dataKesehatanService.getById(id);
    return dataKesehatanRepository.update(id, data);
  },

  async delete(id: string) {
    await dataKesehatanService.getById(id);
    return dataKesehatanRepository.delete(id);
  },
};
