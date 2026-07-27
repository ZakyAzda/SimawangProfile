import { NextRequest, NextResponse } from "next/server";
import { dataKesehatanService } from "@/services/dataKesehatan.service";
import { CreateDataKesehatanSchema, UpdateDataKesehatanSchema } from "@/lib/validations";
import { okResponse, errResponse } from "@/types";

export const dataKesehatanController = {
  async getAll() {
    try {
      const data = await dataKesehatanService.getAll();
      return NextResponse.json(okResponse(data));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      return NextResponse.json(errResponse(msg), { status: 500 });
    }
  },

  async getById(id: string) {
    try {
      const item = await dataKesehatanService.getById(id);
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
      const parsed = CreateDataKesehatanSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(errResponse(parsed.error.issues[0].message), { status: 400 });
      }
      const item = await dataKesehatanService.create(parsed.data);
      return NextResponse.json(okResponse(item), { status: 201 });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      return NextResponse.json(errResponse(msg), { status: 500 });
    }
  },

  async update(req: NextRequest, id: string) {
    try {
      const body = await req.json();
      const parsed = UpdateDataKesehatanSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(errResponse(parsed.error.issues[0].message), { status: 400 });
      }
      const item = await dataKesehatanService.update(id, parsed.data);
      return NextResponse.json(okResponse(item));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      const status = msg.includes("tidak ditemukan") ? 404 : 500;
      return NextResponse.json(errResponse(msg), { status });
    }
  },

  async delete(id: string) {
    try {
      await dataKesehatanService.delete(id);
      return NextResponse.json(okResponse({ message: "Data kesehatan berhasil dihapus" }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      const status = msg.includes("tidak ditemukan") ? 404 : 500;
      return NextResponse.json(errResponse(msg), { status });
    }
  },
};
