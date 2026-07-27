import { galleryRepository } from "@/repositories/gallery.repository";
import { CreateGalleryItemInput, UpdateGalleryItemInput } from "@/lib/validations";

export const galleryService = {
  async getAll() {
    return galleryRepository.findAll();
  },

  async getById(id: string) {
    const item = await galleryRepository.findById(id);
    if (!item) throw new Error("Item galeri tidak ditemukan");
    return item;
  },

  async create(data: CreateGalleryItemInput) {
    return galleryRepository.create(data);
  },

  async update(id: string, data: UpdateGalleryItemInput) {
    await galleryService.getById(id);
    return galleryRepository.update(id, data);
  },

  async delete(id: string) {
    await galleryService.getById(id);
    return galleryRepository.delete(id);
  },
};
