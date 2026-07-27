import { NextRequest, NextResponse } from "next/server";
import { galleryService } from "@/services/gallery.service";
import { CreateGalleryItemSchema, UpdateGalleryItemSchema } from "@/lib/validations";
import { okResponse, errResponse } from "@/types";

export const galleryController = {
  async getAll() {
    try {
      const items = await galleryService.getAll();
      return NextResponse.json(okResponse(items));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      return NextResponse.json(errResponse(msg), { status: 500 });
    }
  },

  async getById(id: string) {
    try {
      const item = await galleryService.getById(id);
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
      const parsed = CreateGalleryItemSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(errResponse(parsed.error.issues[0].message), { status: 400 });
      }
      const item = await galleryService.create(parsed.data);
      return NextResponse.json(okResponse(item), { status: 201 });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      return NextResponse.json(errResponse(msg), { status: 500 });
    }
  },

  async update(req: NextRequest, id: string) {
    try {
      const body = await req.json();
      const parsed = UpdateGalleryItemSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(errResponse(parsed.error.issues[0].message), { status: 400 });
      }
      const item = await galleryService.update(id, parsed.data);
      return NextResponse.json(okResponse(item));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      const status = msg.includes("tidak ditemukan") ? 404 : 500;
      return NextResponse.json(errResponse(msg), { status });
    }
  },

  async delete(id: string) {
    try {
      await galleryService.delete(id);
      return NextResponse.json(okResponse({ message: "Item galeri berhasil dihapus" }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
      const status = msg.includes("tidak ditemukan") ? 404 : 500;
      return NextResponse.json(errResponse(msg), { status });
    }
  },
};
