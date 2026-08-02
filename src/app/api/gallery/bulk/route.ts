import { NextRequest, NextResponse } from "next/server";
import { galleryService } from "@/services/gallery.service";
import { CreateGalleryBulkSchema } from "@/lib/validations";
import { okResponse, errResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateGalleryBulkSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(errResponse(parsed.error.issues[0].message), { status: 400 });
    }

    const { category, items } = parsed.data;
    
    // Map items to include the shared category
    const galleryItems = items.map(item => ({
      ...item,
      category,
    }));

    const result = await galleryService.createMany(galleryItems);
    
    return NextResponse.json(okResponse({
      message: `${result.count} foto berhasil ditambahkan ke kategori ${category}`,
      count: result.count
    }), { status: 201 });
    
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
    return NextResponse.json(errResponse(msg), { status: 500 });
  }
}
