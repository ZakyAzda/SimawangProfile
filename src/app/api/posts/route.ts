import { NextRequest } from "next/server";
import { postController } from "@/controllers/post.controller";
import { okResponse, errResponse } from "@/types";

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Mendapatkan semua postingan berita/pengumuman
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar post
 *       500:
 *         description: Server Error
 */
export async function GET() {
  return postController.getAll();
}

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Membuat postingan baru
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [berita-nagari, pengumuman]
 *               authorName:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post berhasil dibuat
 *       400:
 *         description: Validasi error
 */
export async function POST(req: NextRequest) {
  return postController.create(req);
}
