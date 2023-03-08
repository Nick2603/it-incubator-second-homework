import { blogsCollection } from "../db";
import { IBlog } from "../types/IBlog";

export const blogsRepository = {
  // async deleteAllBlogs(): void {
  //   blogs.length = 0;
  // },

  async getBlogs(): Promise<IBlog[]> {
    return blogsCollection.find({}).toArray();
  },

  // async getBlogById(id: string): IBlog | undefined {
  //   const blog = blogs.find(b => b.id === id);
  //   return blog;
  // },

  async createBlog(name: string, description: string, websiteUrl: string): Promise<IBlog> {
    const newBlog: IBlog = {
      id: Date.now().toString(),
      name,
      description,
      websiteUrl,
    };
    const result = await blogsCollection.insertOne(newBlog);
    return { ...newBlog, _id: result.insertedId };
  },

  // async updateBlog(id: string, name: string, description: string, websiteUrl: string): IBlog | undefined {
  //   const blog = blogs.find(b => b.id === id);
  //   if (blog) {
  //     blog.name = name;
  //     blog.description = description;
  //     blog.websiteUrl = websiteUrl;
  //     return blog;
  //   };
  //   return;
  // },

  // async deleteBlog(id: string): boolean {
  //   for (let i = 0; i < blogs.length; i++) {
  //     if (blogs[i].id === id) {
  //       blogs.splice(i, 1);
  //       return true;
  //     };
  //   };
  //   return false;
  // },
};
