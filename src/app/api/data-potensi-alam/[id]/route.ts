import { NextRequest } from "next/server";
import { dataPotensiAlamController } from "@/controllers/dataPotensiAlam.controller";

type Params = { params: Promise<{ id: string }> };

/**
 * @swagger
 * /api/data-potensi-alam/{id}:
 *   get:
 *     summary: Dapatkan data potensi alam berdasarkan ID
 *     tags: [Data Potensi Alam]
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
  return dataPotensiAlamController.getById(id);
}

/**
 * @swagger
 * /api/data-potensi-alam/{id}:
 *   patch:
 *     summary: Update data potensi alam
 *     tags: [Data Potensi Alam]
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
 *               potensiAlam:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Berhasil diupdate
 */
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return dataPotensiAlamController.update(req, id);
}

/**
 * @swagger
 * /api/data-potensi-alam/{id}:
 *   delete:
 *     summary: Hapus data potensi alam
 *     tags: [Data Potensi Alam]
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
  return dataPotensiAlamController.delete(id);
}
