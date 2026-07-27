import { NextRequest } from "next/server";
import { dataSejarahBudayaController } from "@/controllers/dataSejarahBudaya.controller";

/**
 * @swagger
 * /api/data-sejarah-budaya:
 *   get:
 *     summary: Mendapatkan semua data sejarah dan budaya
 *     tags: [Data Sejarah Budaya]
 *     responses:
 *       200:
 *         description: Berhasil
 */
export async function GET() {
  return dataSejarahBudayaController.getAll();
}

/**
 * @swagger
 * /api/data-sejarah-budaya:
 *   post:
 *     summary: Membuat data sejarah budaya baru
 *     tags: [Data Sejarah Budaya]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jorong:
 *                 type: string
 *               jenisKesenian:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Berhasil dibuat
 */
export async function POST(req: NextRequest) {
  return dataSejarahBudayaController.create(req);
}
