import { IBlog } from "../types/IBlog";

const blogs: IBlog[] = [];

export const blogsRepository = {
  deleteAllBlogs(): void {
    blogs.length = 0;
  },

  getBlogs(): IBlog[] {
    return blogs;
  },

  getBlogById(id: string): IBlog | undefined {
    const blog = blogs.find(b => b.id === id);
    return blog;
  },

  createBlog(name: string, description: string, websiteUrl: string): IBlog {
    const newBlog: IBlog = {
      id: Date.now().toString(),
      name,
      description,
      websiteUrl,
    };
    blogs.unshift(newBlog);
    return newBlog;
  },

  updateBlog(id: string, name: string, description: string, websiteUrl: string): IBlog | undefined {
    const blog = blogs.find(b => b.id === id);
    if (blog) {
      blog.name = name;
      blog.description = description;
      blog.websiteUrl = websiteUrl;
      return blog;
    };
    return;
  },

  deleteBlog(id: string): boolean {
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].id === id) {
        blogs.splice(i, 1);
        return true;
      };
    };
    return false;
  },
};
