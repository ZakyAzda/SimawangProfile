import db from "@/lib/db";
import { CreateDataKesehatanInput, UpdateDataKesehatanInput } from "@/lib/validations";

export const dataKesehatanRepository = {
  findAll() {
    return db.dataKesehatan.findMany();
  },

  findById(id: string) {
    return db.dataKesehatan.findUnique({ where: { id } });
  },

  create(data: CreateDataKesehatanInput) {
    return db.dataKesehatan.create({ data });
  },

  update(id: string, data: UpdateDataKesehatanInput) {
    return db.dataKesehatan.update({ where: { id }, data });
  },

  delete(id: string) {
    return db.dataKesehatan.delete({ where: { id } });
  },
};
