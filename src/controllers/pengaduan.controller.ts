import { NextRequest, NextResponse } from "next/server";
import { pengaduanService } from "@/services/pengaduan.service";
import { okResponse, errResponse } from "@/types";

export const pengaduanController = {
  async getAll() {
    try {
      const data = await pengaduanService.getAll();
      return NextResponse.json(okResponse(data));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      return NextResponse.json(errResponse(msg), { status: 500 });
    }
  },

  async create(req: NextRequest) {
    try {
      const body = await req.json();
      const result = await pengaduanService.create(body);
      return NextResponse.json(okResponse(result), { status: 201 });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Data tidak valid";
      return NextResponse.json(errResponse(msg), { status: 400 });
    }
  },
};
