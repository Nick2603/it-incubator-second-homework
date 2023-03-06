import { blogsRepository } from './blogsRepository';
import { IPost } from "../types/IPost";

const posts: IPost[] = [];

export const postsRepository = {
  deleteAllPosts(): void {
    posts.length = 0;
  },

  getPosts(): IPost[] {
    return posts;
  },

  getPostById(id: string): IPost | undefined {
    const post = posts.find(p => p.id === id);
    return post;
  },

  createPost(title: string, shortDescription: string, content: string, blogId: string): IPost | undefined {
    const blog = blogsRepository.getBlogById(blogId);
    const newPost: IPost = {
      id: Date.now().toString(),
      title,
      shortDescription,
      content,
      blogId,
      blogName: blog!.name,
    };
    posts.unshift(newPost);
    return newPost;
  },

  updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): IPost | undefined {
    const blog = blogsRepository.getBlogById(blogId);
    const post = posts.find(p => p.id === id);
    if (post) {
      post.title = title;
      post.shortDescription = shortDescription;
      post.content = content;
      post.blogId = blogId;
      post.blogName = blog!.name;
      return post;
    };
    return;
  },

  deletePost(id: string): boolean {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        posts.splice(i, 1);
        return true;
      };
    };
    return false;
  },
};
