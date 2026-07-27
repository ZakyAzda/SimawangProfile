import { NextRequest } from "next/server";
import { galleryController } from "@/controllers/gallery.controller";

/**
 * @swagger
 * /api/gallery:
 *   get:
 *     summary: Mendapatkan semua item galeri
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar galeri
 */
export async function GET() {
  return galleryController.getAll();
}

/**
 * @swagger
 * /api/gallery:
 *   post:
 *     summary: Membuat item galeri baru
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Berhasil dibuat
 */
export async function POST(req: NextRequest) {
  return galleryController.create(req);
}
