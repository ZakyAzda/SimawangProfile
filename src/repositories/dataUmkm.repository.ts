import db from "@/lib/db";
import { CreateDataUmkmInput, UpdateDataUmkmInput } from "@/lib/validations";

export const dataUmkmRepository = {
  findAll() {
    return db.dataUmkm.findMany();
  },

  findById(id: string) {
    return db.dataUmkm.findUnique({ where: { id } });
  },

  create(data: CreateDataUmkmInput) {
    return db.dataUmkm.create({ data });
  },

  update(id: string, data: UpdateDataUmkmInput) {
    return db.dataUmkm.update({ where: { id }, data });
  },

  delete(id: string) {
    return db.dataUmkm.delete({ where: { id } });
  },
};
