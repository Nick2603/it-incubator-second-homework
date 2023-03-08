import { blogsCollection } from "../db";
import { postsCollection } from "../db";
import { IPost } from "../types/IPost";

export const postsRepository = {
  // async deleteAllPosts(): void {
  //   posts.length = 0;
  // },

  async getPosts(): Promise<IPost[]> {
    return postsCollection.find({}).toArray();
  },

  // async getPostById(id: string): IPost | undefined {
  //   const post = posts.find(p => p.id === id);
  //   return post;
  // },

  // async createPost(title: string, shortDescription: string, content: string, blogId: string): IPost | undefined {
  //   const blog = blogsRepository.getBlogById(blogId);
  //   const newPost: IPost = {
  //     id: Date.now().toString(),
  //     title,
  //     shortDescription,
  //     content,
  //     blogId,
  //     blogName: blog!.name,
  //   };
  //   posts.unshift(newPost);
  //   return newPost;
  // },

  // async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): IPost | undefined {
  //   const blog = blogsRepository.getBlogById(blogId);
  //   const post = posts.find(p => p.id === id);
  //   if (post) {
  //     post.title = title;
  //     post.shortDescription = shortDescription;
  //     post.content = content;
  //     post.blogId = blogId;
  //     post.blogName = blog!.name;
  //     return post;
  //   };
  //   return;
  // },

  // async deletePost(id: string): boolean {
  //   for (let i = 0; i < posts.length; i++) {
  //     if (posts[i].id === id) {
  //       posts.splice(i, 1);
  //       return true;
  //     };
  //   };
  //   return false;
  // },
};
