import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { okResponse, errResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(errResponse("Tidak ada file yang diunggah"), { status: 400 });
    }

    // Batasan ukuran maksimal 2MB
    const MAX_SIZE_MB = 2;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(errResponse(`Ukuran file maksimal adalah ${MAX_SIZE_MB}MB`), { status: 400 });
    }

    // Vercel Blob tidak butuh buffer conversion, bisa langsung pakai File object, 
    // tapi kalau mau baca dari buffer juga bisa. Pakai File lebih gampang!
    const blob = await put(`uploads/${file.name}`, file, {
      access: "public",
      addRandomSuffix: true, // otomatis bikin nama file unik
    });

    // Return URL yang dihosting oleh Vercel Blob
    return NextResponse.json(okResponse({ url: blob.url }), { status: 201 });
  } catch (e: unknown) {
    console.error("Upload error:", e);
    const msg = e instanceof Error ? e.message : "Terjadi kesalahan saat mengunggah";
    return NextResponse.json(errResponse(msg), { status: 500 });
  }
}
