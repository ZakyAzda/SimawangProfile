import { NextRequest } from "next/server";
import { pengaduanController } from "@/controllers/pengaduan.controller";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  return pengaduanController.getById(id);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return pengaduanController.updateStatus(req, id);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  return pengaduanController.delete(id);
}
