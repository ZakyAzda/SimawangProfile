import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const { id } = await params;
    const data = await prisma.dataNagari.update({
      where: { id: id },
      data: {
        nama: body.nama,
        jumlah: body.jumlah
      }
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal mengupdate data" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.dataNagari.delete({
      where: { id: id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal menghapus data" }, { status: 500 });
  }
}
