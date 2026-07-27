import db from "@/lib/db";
import { CreateDataSejarahBudayaInput, UpdateDataSejarahBudayaInput } from "@/lib/validations";

export const dataSejarahBudayaRepository = {
  findAll() {
    return db.dataSejarahBudaya.findMany();
  },

  findById(id: string) {
    return db.dataSejarahBudaya.findUnique({ where: { id } });
  },

  create(data: CreateDataSejarahBudayaInput) {
    return db.dataSejarahBudaya.create({ data });
  },

  update(id: string, data: UpdateDataSejarahBudayaInput) {
    return db.dataSejarahBudaya.update({ where: { id }, data });
  },

  delete(id: string) {
    return db.dataSejarahBudaya.delete({ where: { id } });
  },
};
