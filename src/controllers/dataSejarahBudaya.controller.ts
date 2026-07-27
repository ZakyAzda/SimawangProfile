import { NextRequest, NextResponse } from "next/server";
import { dataSejarahBudayaService } from "@/services/dataSejarahBudaya.service";
import { CreateDataSejarahBudayaSchema, UpdateDataSejarahBudayaSchema } from "@/lib/validations";
import { okResponse, errResponse } from "@/types";

export const dataSejarahBudayaController = {
  async getAll() {
    try {
      const data = await dataSejarahBudayaService.getAll();
      return NextResponse.json(okResponse(data));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      return NextResponse.json(errResponse(msg), { status: 500 });
    }
  },

  async getById(id: string) {
    try {
      const item = await dataSejarahBudayaService.getById(id);
      return NextResponse.json(okResponse(item));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      const status = msg.includes("tidak ditemukan") ? 404 : 500;
      return NextResponse.json(errResponse(msg), { status });
    }
  },

  async create(req: NextRequest) {
    try {
      const body = await req.json();
      const parsed = CreateDataSejarahBudayaSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(errResponse(parsed.error.issues[0].message), { status: 400 });
      }
      const item = await dataSejarahBudayaService.create(parsed.data);
      return NextResponse.json(okResponse(item), { status: 201 });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      return NextResponse.json(errResponse(msg), { status: 500 });
    }
  },

  async update(req: NextRequest, id: string) {
    try {
      const body = await req.json();
      const parsed = UpdateDataSejarahBudayaSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(errResponse(parsed.error.issues[0].message), { status: 400 });
      }
      const item = await dataSejarahBudayaService.update(id, parsed.data);
      return NextResponse.json(okResponse(item));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      const status = msg.includes("tidak ditemukan") ? 404 : 500;
      return NextResponse.json(errResponse(msg), { status });
    }
  },

  async delete(id: string) {
    try {
      await dataSejarahBudayaService.delete(id);
      return NextResponse.json(okResponse({ message: "Data sejarah budaya berhasil dihapus" }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      const status = msg.includes("tidak ditemukan") ? 404 : 500;
      return NextResponse.json(errResponse(msg), { status });
    }
  },
};
