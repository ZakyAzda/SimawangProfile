import db from "@/lib/db";
import { CreatePostInput, UpdatePostInput } from "@/lib/validations";

export const postRepository = {
  findAll() {
    return db.post.findMany({ orderBy: { publishedAt: "desc" } });
  },

  findById(id: string) {
    return db.post.findUnique({ where: { id } });
  },

  findBySlug(slug: string) {
    return db.post.findUnique({ where: { slug } });
  },

  create(data: CreatePostInput & { slug: string }) {
    return db.post.create({ data });
  },

  update(id: string, data: UpdatePostInput & { slug?: string }) {
    return db.post.update({ where: { id }, data });
  },

  delete(id: string) {
    return db.post.delete({ where: { id } });
  },

  incrementViews(id: string) {
    return db.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  },
};
