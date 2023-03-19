import { InsertOneResult } from "mongodb";
import { postsCollection } from "../db";
import { IPost } from "../types/IPost";
import { blogsQueryRepository } from "./blogsQueryRepository";

export const postsRepository = {
  async deleteAllPosts(): Promise<void> {
    await postsCollection.deleteMany({});
  },

  async createPost(newPost: IPost): Promise<InsertOneResult<IPost>> {
    return await postsCollection.insertOne(newPost);
  },

  async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
    const blog = await blogsQueryRepository.getBlogById(blogId);
    const result = await postsCollection.updateOne({ id }, { $set: { title, shortDescription, content, blogId, blogName: blog!.name }});
    return result.matchedCount === 1;
  },

  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({ id })
    return result.deletedCount === 1;
  },
};
