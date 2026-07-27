import { NextRequest } from "next/server";
import { postController } from "@/controllers/post.controller";

type Params = { params: Promise<{ id: string }> };

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Dapatkan post berdasarkan ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil
 *       404:
 *         description: Tidak ditemukan
 */
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  return postController.getById(id);
}

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Update post
 *     tags: [Posts]
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
 *     responses:
 *       200:
 *         description: Berhasil diupdate
 */
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return postController.update(req, id);
}

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Hapus post
 *     tags: [Posts]
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
  return postController.delete(id);
}
