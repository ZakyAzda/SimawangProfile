import { NextRequest } from "next/server";
import { dataKesehatanController } from "@/controllers/dataKesehatan.controller";

/**
 * @swagger
 * /api/data-kesehatan:
 *   get:
 *     summary: Mendapatkan semua data kesehatan
 *     tags: [Data Kesehatan]
 *     responses:
 *       200:
 *         description: Berhasil
 */
export async function GET() {
  return dataKesehatanController.getAll();
}

/**
 * @swagger
 * /api/data-kesehatan:
 *   post:
 *     summary: Membuat data kesehatan baru
 *     tags: [Data Kesehatan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jorong:
 *                 type: string
 *               jenisFasilitas:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Berhasil dibuat
 */
export async function POST(req: NextRequest) {
  return dataKesehatanController.create(req);
}
