import { CustomValidator } from 'express-validator';
import { blogsRepository } from '../repositories/blogsRepository';

export const isValidBlogId: CustomValidator = blogId => {
  // const blog = blogsRepository.getBlogById(blogId);
  // if (blog) {
  //   return true;
  // } else {
  //   throw new Error('Incorrect value for blogId');
  // };
  return true;
};
