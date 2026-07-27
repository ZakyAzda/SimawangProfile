import { NextRequest } from "next/server";
import { dataUmkmController } from "@/controllers/dataUmkm.controller";

/**
 * @swagger
 * /api/data-umkm:
 *   get:
 *     summary: Mendapatkan semua data UMKM
 *     tags: [Data UMKM]
 *     responses:
 *       200:
 *         description: Berhasil
 */
export async function GET() {
  return dataUmkmController.getAll();
}

/**
 * @swagger
 * /api/data-umkm:
 *   post:
 *     summary: Membuat data UMKM baru
 *     tags: [Data UMKM]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productUmkm:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Berhasil dibuat
 */
export async function POST(req: NextRequest) {
  return dataUmkmController.create(req);
}
