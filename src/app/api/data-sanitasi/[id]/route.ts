import { NextRequest } from "next/server";
import { dataSanitasiController } from "@/controllers/dataSanitasi.controller";

type Params = { params: Promise<{ id: string }> };

/**
 * @swagger
 * /api/data-sanitasi/{id}:
 *   get:
 *     summary: Dapatkan data sanitasi berdasarkan ID
 *     tags: [Data Sanitasi]
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
  return dataSanitasiController.getById(id);
}

/**
 * @swagger
 * /api/data-sanitasi/{id}:
 *   patch:
 *     summary: Update data sanitasi
 *     tags: [Data Sanitasi]
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
 *               sumber:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Berhasil diupdate
 */
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return dataSanitasiController.update(req, id);
}

/**
 * @swagger
 * /api/data-sanitasi/{id}:
 *   delete:
 *     summary: Hapus data sanitasi
 *     tags: [Data Sanitasi]
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
  return dataSanitasiController.delete(id);
}
