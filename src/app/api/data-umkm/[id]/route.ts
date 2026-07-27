import { NextRequest } from "next/server";
import { dataUmkmController } from "@/controllers/dataUmkm.controller";

type Params = { params: Promise<{ id: string }> };

/**
 * @swagger
 * /api/data-umkm/{id}:
 *   get:
 *     summary: Dapatkan data UMKM berdasarkan ID
 *     tags: [Data UMKM]
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
  return dataUmkmController.getById(id);
}

/**
 * @swagger
 * /api/data-umkm/{id}:
 *   patch:
 *     summary: Update data UMKM
 *     tags: [Data UMKM]
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
 *               productUmkm:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Berhasil diupdate
 */
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return dataUmkmController.update(req, id);
}

/**
 * @swagger
 * /api/data-umkm/{id}:
 *   delete:
 *     summary: Hapus data UMKM
 *     tags: [Data UMKM]
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
  return dataUmkmController.delete(id);
}
