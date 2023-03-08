import { postsCollection } from "../db";
import { IPost } from "../types/IPost";
import { blogsRepository } from "./blogsRepository";

export const postsRepository = {
  async deleteAllPosts(): Promise<void> {
    await postsCollection.deleteMany({});
  },

  async getPosts(): Promise<IPost[]> {
    const posts = await postsCollection.find({}).project<IPost>({ _id: 0 }).toArray();
    return posts;
  },

  async getPostById(id: string): Promise<IPost | null> {
    const post = await postsCollection.findOne({ id }, { projection: { _id: 0 }});
    return post;
  },

  async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<IPost> {
    const blog = await blogsRepository.getBlogById(blogId);
    const newPost: IPost = {
      id: Date.now().toString(),
      title,
      shortDescription,
      content,
      blogId,
      createdAt: new Date().toISOString(),
      blogName: blog!.name,
    };
    await postsCollection.insertOne(newPost);
    return {
      id: newPost.id,
      title: newPost.title,
      shortDescription: newPost.shortDescription,
      content: newPost.content,
      blogId: newPost.blogId,
      createdAt: newPost.createdAt,
      blogName: newPost.blogName,
    };
  },

  async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
    const blog = await blogsRepository.getBlogById(blogId);
    const result = await postsCollection.updateOne({ id }, { $set: { title, shortDescription, content, blogId, blogName: blog!.name }});
    return result.matchedCount === 1;
  },

  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({ id })
    return result.deletedCount === 1;
  },
};
