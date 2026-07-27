import { NextRequest } from "next/server";
import { dataSanitasiController } from "@/controllers/dataSanitasi.controller";

/**
 * @swagger
 * /api/data-sanitasi:
 *   get:
 *     summary: Mendapatkan semua data sanitasi
 *     tags: [Data Sanitasi]
 *     responses:
 *       200:
 *         description: Berhasil
 */
export async function GET() {
  return dataSanitasiController.getAll();
}

/**
 * @swagger
 * /api/data-sanitasi:
 *   post:
 *     summary: Membuat data sanitasi baru
 *     tags: [Data Sanitasi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jorong:
 *                 type: string
 *               sumber:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Berhasil dibuat
 */
export async function POST(req: NextRequest) {
  return dataSanitasiController.create(req);
}
