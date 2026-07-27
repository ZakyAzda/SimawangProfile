import db from "@/lib/db";
import { CreateDataSanitasiInput, UpdateDataSanitasiInput } from "@/lib/validations";

export const dataSanitasiRepository = {
  findAll() {
    return db.dataSanitasi.findMany();
  },

  findById(id: string) {
    return db.dataSanitasi.findUnique({ where: { id } });
  },

  create(data: CreateDataSanitasiInput) {
    return db.dataSanitasi.create({ data });
  },

  update(id: string, data: UpdateDataSanitasiInput) {
    return db.dataSanitasi.update({ where: { id }, data });
  },

  delete(id: string) {
    return db.dataSanitasi.delete({ where: { id } });
  },
};
