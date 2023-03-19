import { ParsedQs } from "qs";
import { postsCollection } from "../db";
import { IPost } from "../types/IPost";

export const postsQueryRepository = {
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
};
