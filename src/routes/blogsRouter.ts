import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";
import { blogsRepository } from "../repositories/blogsRepository";
import { CodeResponsesEnum } from "../types/CodeResponsesEnum";

export const blogsRouter = Router({});

const nameValidationMiddleware = body("name").isString().trim().isLength({ min: 2, max: 15 }).withMessage("Incorrect value for name");

const descriptionValidationMiddleware = body("description").isString().trim().isLength({ min: 2, max: 500 }).withMessage("Incorrect value for description");

const websiteUrlValidationMiddleware = body("websiteUrl").isString().trim().isLength({ min: 2, max: 100 }).matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$").withMessage("Incorrect value for websiteUrl");

blogsRouter.get('/', (req: Request, res: Response) => {
  const blogs = blogsRepository.getBlogs();
  res.status(200).send(blogs);
});

blogsRouter.get('/:id', (req: Request, res: Response) => {
  const blogId = req.params.id;
  const blog = blogsRepository.getBlogById(blogId);
  if (blog) {
    res.status(200).send(blog);
    return;
  };
  res.sendStatus(CodeResponsesEnum.Not_found_404);
});

blogsRouter.post('/',
  authMiddleware,
  nameValidationMiddleware,
  descriptionValidationMiddleware,
  websiteUrlValidationMiddleware,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;

    const newBlog = blogsRepository.createBlog(name, description, websiteUrl);
    res.status(CodeResponsesEnum.Created_201).send(newBlog);
  }
);

blogsRouter.put('/:id',
  authMiddleware,
  nameValidationMiddleware,
  descriptionValidationMiddleware,
  websiteUrlValidationMiddleware,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const blogId = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;

    const result = blogsRepository.updateBlog(blogId, name, description, websiteUrl);
    if (result) {
      res.sendStatus(CodeResponsesEnum.No_content_204);
    } else {
      res.sendStatus(CodeResponsesEnum.Not_found_404);
    };
  }
);

blogsRouter.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = req.params.id;
  const result = blogsRepository.deleteBlog(id);
  if (result) {
    res.sendStatus(CodeResponsesEnum.No_content_204);
    return;
  }
  res.sendStatus(CodeResponsesEnum.Not_found_404);
});
