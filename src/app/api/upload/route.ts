import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { okResponse, errResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(errResponse("Tidak ada file yang diunggah"), { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Bikin nama file unik berdasarkan waktu saat ini
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.name) || ".jpg";
    const filename = uniqueSuffix + extension;

    // Tentukan path penyimpanan ke public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filepath = path.join(uploadDir, filename);

    // Simpan file ke sistem
    await writeFile(filepath, buffer);

    // Return URL lokal yang dapat diakses publik
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json(okResponse({ url: fileUrl }), { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Terjadi kesalahan saat mengunggah";
    return NextResponse.json(errResponse(msg), { status: 500 });
  }
}
