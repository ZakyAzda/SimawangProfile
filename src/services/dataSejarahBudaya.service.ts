import { dataSejarahBudayaRepository } from "@/repositories/dataSejarahBudaya.repository";
import { CreateDataSejarahBudayaInput, UpdateDataSejarahBudayaInput } from "@/lib/validations";

export const dataSejarahBudayaService = {
  async getAll() {
    return dataSejarahBudayaRepository.findAll();
  },

  async getById(id: string) {
    const item = await dataSejarahBudayaRepository.findById(id);
    if (!item) throw new Error("Data sejarah budaya tidak ditemukan");
    return item;
  },

  async create(data: CreateDataSejarahBudayaInput) {
    return dataSejarahBudayaRepository.create(data);
  },

  async update(id: string, data: UpdateDataSejarahBudayaInput) {
    await dataSejarahBudayaService.getById(id);
    return dataSejarahBudayaRepository.update(id, data);
  },

  async delete(id: string) {
    await dataSejarahBudayaService.getById(id);
    return dataSejarahBudayaRepository.delete(id);
  },
};
