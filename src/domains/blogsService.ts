import { ParsedQs } from "qs";
import { blogsRepository } from "../repositories/blogsRepository";
import { IBlog } from "../types/IBlog";

export const blogsService = {
  async deleteAllBlogs(): Promise<void> {
    await blogsRepository.deleteAllBlogs();
  },

  async getBlogs(name: string | string[] | ParsedQs | ParsedQs[] | undefined): Promise<IBlog[]> {
    return await blogsRepository.getBlogs(name);
  },

  async getBlogById(id: string): Promise<IBlog | null> {
    return await blogsRepository.getBlogById(id);
  },

  async createBlog(name: string, description: string, websiteUrl: string): Promise<IBlog> {
    const newBlog: IBlog = {
      id: Date.now().toString(),
      name,
      description,
      websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    await blogsRepository.createBlog(newBlog);
    return {
      id: newBlog.id,
      name: newBlog.name,
      description: newBlog.description,
      websiteUrl: newBlog.websiteUrl,
      createdAt: newBlog.createdAt,
      isMembership: newBlog.isMembership,
    };
  },

  async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
    return blogsRepository.updateBlog(id, name, description, websiteUrl);
  },

  async deleteBlog(id: string): Promise<boolean> {
    return blogsRepository.deleteBlog(id);
  },
};
