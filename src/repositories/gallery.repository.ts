import db from "@/lib/db";
import { CreateGalleryItemInput, UpdateGalleryItemInput } from "@/lib/validations";

export const galleryRepository = {
  findAll() {
    return db.galleryItem.findMany();
  },

  findById(id: string) {
    return db.galleryItem.findUnique({ where: { id } });
  },

  create(data: CreateGalleryItemInput) {
    return db.galleryItem.create({ data });
  },

  createMany(data: CreateGalleryItemInput[]) {
    return db.galleryItem.createMany({ data });
  },

  update(id: string, data: UpdateGalleryItemInput) {
    return db.galleryItem.update({ where: { id }, data });
  },

  delete(id: string) {
    return db.galleryItem.delete({ where: { id } });
  },
};
