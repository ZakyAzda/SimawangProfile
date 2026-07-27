import { NextRequest } from "next/server";
import { dataKesehatanController } from "@/controllers/dataKesehatan.controller";

type Params = { params: Promise<{ id: string }> };

/**
 * @swagger
 * /api/data-kesehatan/{id}:
 *   get:
 *     summary: Dapatkan data kesehatan berdasarkan ID
 *     tags: [Data Kesehatan]
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
  return dataKesehatanController.getById(id);
}

/**
 * @swagger
 * /api/data-kesehatan/{id}:
 *   patch:
 *     summary: Update data kesehatan
 *     tags: [Data Kesehatan]
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
 *               jenisFasilitas:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Berhasil diupdate
 */
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return dataKesehatanController.update(req, id);
}

/**
 * @swagger
 * /api/data-kesehatan/{id}:
 *   delete:
 *     summary: Hapus data kesehatan
 *     tags: [Data Kesehatan]
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
  return dataKesehatanController.delete(id);
}
