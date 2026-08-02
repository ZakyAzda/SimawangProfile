import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const data = await prisma.dataNagari.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await prisma.dataNagari.create({
      data: {
        nama: body.nama,
        jumlah: body.jumlah
      }
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal menyimpan data" }, { status: 500 });
  }
}
