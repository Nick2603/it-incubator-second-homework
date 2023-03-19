import { InsertOneResult } from "mongodb";
import { ParsedQs } from "qs";
import { postsCollection } from "../db";
import { IPost } from "../types/IPost";
import { blogsRepository } from "./blogsRepository";

export const postsRepository = {
  async deleteAllPosts(): Promise<void> {
    await postsCollection.deleteMany({});
  },

  async getPosts(title: string | string[] | ParsedQs | ParsedQs[] | undefined): Promise<IPost[]> {
    const filter: any = {};
    
    if (title) {
      filter.title = { $regex: title };
    };
    return await postsCollection.find(filter).project<IPost>({ _id: 0 }).toArray();
  },

  async getPostById(id: string): Promise<IPost | null> {
    return await postsCollection.findOne({ id }, { projection: { _id: 0 }});
  },

  async createPost(newPost: IPost): Promise<InsertOneResult<IPost>> {
    return await postsCollection.insertOne(newPost);
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
