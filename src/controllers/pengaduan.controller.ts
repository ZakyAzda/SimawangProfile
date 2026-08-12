import prisma from "@/lib/db";
import { CreatePengaduanSchema, UpdatePengaduanSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export const pengaduanController = {
  async getAll() {
    try {
      const data = await prisma.pengaduan.findMany({
        orderBy: { createdAt: "desc" }
      });
      return NextResponse.json({ success: true, data });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, error: "Gagal mengambil data pengaduan" },
        { status: 500 }
      );
    }
  },

  async getById(id: string) {
    try {
      const data = await prisma.pengaduan.findUnique({
        where: { id }
      });
      if (!data) {
        return NextResponse.json(
          { success: false, error: "Data pengaduan tidak ditemukan" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, error: "Gagal mengambil data pengaduan" },
        { status: 500 }
      );
    }
  },

  async create(req: Request) {
    try {
      const body = await req.json();
      const validation = CreatePengaduanSchema.safeParse(body);

      if (!validation.success) {
        return NextResponse.json(
          { success: false, error: validation.error.issues[0].message },
          { status: 400 }
        );
      }

      const data = await prisma.pengaduan.create({
        data: validation.data
      });

      return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, error: "Gagal mengirim pengaduan" },
        { status: 500 }
      );
    }
  },

  async updateStatus(req: Request, id: string) {
    try {
      const body = await req.json();
      const validation = UpdatePengaduanSchema.safeParse(body);

      if (!validation.success) {
        return NextResponse.json(
          { success: false, error: validation.error.issues[0].message },
          { status: 400 }
        );
      }

      const data = await prisma.pengaduan.update({
        where: { id },
        data: { status: validation.data.status }
      });

      return NextResponse.json({ success: true, data });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, error: "Gagal mengupdate status pengaduan" },
        { status: 500 }
      );
    }
  },

  async delete(id: string) {
    try {
      await prisma.pengaduan.delete({
        where: { id }
      });
      return NextResponse.json({ success: true, message: "Pengaduan berhasil dihapus" });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, error: "Gagal menghapus pengaduan" },
        { status: 500 }
      );
    }
  }
};
