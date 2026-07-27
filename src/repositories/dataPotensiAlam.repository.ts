import db from "@/lib/db";
import { CreateDataPotensiAlamInput, UpdateDataPotensiAlamInput } from "@/lib/validations";

export const dataPotensiAlamRepository = {
  findAll() {
    return db.dataPotensiAlam.findMany();
  },

  findById(id: string) {
    return db.dataPotensiAlam.findUnique({ where: { id } });
  },

  create(data: CreateDataPotensiAlamInput) {
    return db.dataPotensiAlam.create({ data });
  },

  update(id: string, data: UpdateDataPotensiAlamInput) {
    return db.dataPotensiAlam.update({ where: { id }, data });
  },

  delete(id: string) {
    return db.dataPotensiAlam.delete({ where: { id } });
  },
};
