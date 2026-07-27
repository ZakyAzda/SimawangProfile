import { postRepository } from "@/repositories/post.repository";
import { CreatePostInput, UpdatePostInput } from "@/lib/validations";

// Generate slug dari title (lowercase, spasi jadi dash, strip karakter spesial)
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Pastikan slug unik: jika sudah ada, tambahkan suffix angka
async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base;
  let counter = 1;

  while (true) {
    const existing = await postRepository.findBySlug(slug);
    if (!existing || existing.id === excludeId) break;
    slug = `${base}-${counter++}`;
  }

  return slug;
}

export const postService = {
  async getAll() {
    return postRepository.findAll();
  },

  async getById(id: string) {
    const post = await postRepository.findById(id);
    if (!post) throw new Error("Post tidak ditemukan");
    return post;
  },

  async getBySlug(slug: string) {
    const post = await postRepository.findBySlug(slug);
    if (!post) throw new Error("Post tidak ditemukan");
    return post;
  },

  async create(data: CreatePostInput) {
    const baseSlug = generateSlug(data.title);
    const slug = await uniqueSlug(baseSlug);
    return postRepository.create({ ...data, slug });
  },

  async update(id: string, data: UpdatePostInput) {
    await postService.getById(id); // validasi keberadaan
    let slug: string | undefined;
    if (data.title) {
      const baseSlug = generateSlug(data.title);
      slug = await uniqueSlug(baseSlug, id);
    }
    return postRepository.update(id, { ...data, ...(slug ? { slug } : {}) });
  },

  async delete(id: string) {
    await postService.getById(id); // validasi keberadaan
    return postRepository.delete(id);
  },

  async incrementViews(id: string) {
    return postRepository.incrementViews(id);
  },
};
