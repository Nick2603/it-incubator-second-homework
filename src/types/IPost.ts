import { ObjectId } from "mongodb";

export interface IPost{
  _id?: ObjectId;
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};
