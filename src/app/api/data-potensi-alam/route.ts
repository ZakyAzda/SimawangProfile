import { NextRequest } from "next/server";
import { dataPotensiAlamController } from "@/controllers/dataPotensiAlam.controller";

/**
 * @swagger
 * /api/data-potensi-alam:
 *   get:
 *     summary: Mendapatkan semua data potensi alam
 *     tags: [Data Potensi Alam]
 *     responses:
 *       200:
 *         description: Berhasil
 */
export async function GET() {
  return dataPotensiAlamController.getAll();
}

/**
 * @swagger
 * /api/data-potensi-alam:
 *   post:
 *     summary: Membuat data potensi alam baru
 *     tags: [Data Potensi Alam]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               potensiAlam:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Berhasil dibuat
 */
export async function POST(req: NextRequest) {
  return dataPotensiAlamController.create(req);
}
