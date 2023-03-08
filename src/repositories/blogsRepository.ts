import { blogsCollection } from "../db";
import { IBlog } from "../types/IBlog";

export const blogsRepository = {
  async deleteAllBlogs(): Promise<void> {
    await blogsCollection.deleteMany({});
  },

  async getBlogs(): Promise<IBlog[]> {
    const blogs = await blogsCollection.find({}).project<IBlog>({ _id: 0 }).toArray();
    return blogs;
  },

  async getBlogById(id: string): Promise<IBlog | null> {
    const blog = await blogsCollection.findOne({ id });
    return blog;
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
    await blogsCollection.insertOne(newBlog);
    return newBlog;
  },

  async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
    const result = await blogsCollection.updateOne({ id }, { $set: { name, description, websiteUrl }});
    return result.matchedCount === 1;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({ id })
    return result.deletedCount === 1;
  },
};
