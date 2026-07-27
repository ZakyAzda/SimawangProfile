import { NextRequest } from "next/server";
import { dataSejarahBudayaController } from "@/controllers/dataSejarahBudaya.controller";

type Params = { params: Promise<{ id: string }> };

/**
 * @swagger
 * /api/data-sejarah-budaya/{id}:
 *   get:
 *     summary: Dapatkan data sejarah budaya berdasarkan ID
 *     tags: [Data Sejarah Budaya]
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
  return dataSejarahBudayaController.getById(id);
}

/**
 * @swagger
 * /api/data-sejarah-budaya/{id}:
 *   patch:
 *     summary: Update data sejarah budaya
 *     tags: [Data Sejarah Budaya]
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
 *               jenisKesenian:
 *                 type: string
 *               jumlah:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Berhasil diupdate
 */
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return dataSejarahBudayaController.update(req, id);
}

/**
 * @swagger
 * /api/data-sejarah-budaya/{id}:
 *   delete:
 *     summary: Hapus data sejarah budaya
 *     tags: [Data Sejarah Budaya]
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
  return dataSejarahBudayaController.delete(id);
}
