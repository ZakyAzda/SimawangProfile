import { NextRequest } from "next/server";
import { pengaduanController } from "@/controllers/pengaduan.controller";

export async function GET() {
  return pengaduanController.getAll();
}

export async function POST(req: NextRequest) {
  return pengaduanController.create(req);
}
