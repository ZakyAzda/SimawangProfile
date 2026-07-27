import { NextRequest } from "next/server";
import { galleryController } from "@/controllers/gallery.controller";

type Params = { params: Promise<{ id: string }> };

/**
 * @swagger
 * /api/gallery/{id}:
 *   get:
 *     summary: Dapatkan galeri berdasarkan ID
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil
 */
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  return galleryController.getById(id);
}

/**
 * @swagger
 * /api/gallery/{id}:
 *   patch:
 *     summary: Update galeri
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *     responses:
 *       200:
 *         description: Berhasil diupdate
 */
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return galleryController.update(req, id);
}

/**
 * @swagger
 * /api/gallery/{id}:
 *   delete:
 *     summary: Hapus galeri
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil dihapus
 */
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  return galleryController.delete(id);
}
