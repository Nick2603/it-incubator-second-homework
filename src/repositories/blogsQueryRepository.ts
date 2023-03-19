import { ParsedQs } from "qs";
import { blogsCollection } from "../db";
import { IBlog } from "../types/IBlog";

export const blogsQueryRepository = {
  async getBlogs(name: string | string[] | ParsedQs | ParsedQs[] | undefined): Promise<IBlog[]> {
    const filter: any = {};
    
    if (name) {
      filter.name = { $regex: `(?i)${name}(?-i)` };
    };
  
    return await blogsCollection.find(filter).project<IBlog>({ _id: 0 }).toArray();
  },

  async getBlogById(id: string): Promise<IBlog | null> {
    return await blogsCollection.findOne({ id }, { projection: { _id: 0 }});
  },
};
