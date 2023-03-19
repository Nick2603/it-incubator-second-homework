import { CustomValidator } from 'express-validator';
import { blogsQueryRepository } from '../repositories/blogsQueryRepository';

export const isValidBlogId: CustomValidator = async blogId => {

  const blog = await blogsQueryRepository.getBlogById(blogId);
  if (blog) {
    return true;
  } else {
    throw new Error('Incorrect value for blogId');
  };
};
