import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isValidBlogId } from "../middlewares/blogIdValidationMiddleware";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";
import { postsRepository } from "../repositories/postsRepository";
import { CodeResponsesEnum } from "../types/CodeResponsesEnum";

export const postsRouter = Router({});

const titleValidationMiddleware = body("title").isString().trim().isLength({ min: 2, max: 30 }).withMessage("Incorrect value for title");

const shortDescriptionValidationMiddleware = body("shortDescription").isString().trim().isLength({ min: 2, max: 100 }).withMessage("Incorrect value for shortDescription");

const contentDescriptionValidationMiddleware = body("content").isString().trim().isLength({ min: 2, max: 1000 }).withMessage("Incorrect value for content");

const blogIdValidationMiddleware = body("blogId").custom(isValidBlogId);

postsRouter.get('/', (req: Request, res: Response) => {
  const posts = postsRepository.getPosts();
  res.status(200).send(posts);
});

postsRouter.get('/:id', (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = postsRepository.getPostById(postId);
  if (post) {
    res.status(200).send(post);
    return;
  };
  res.sendStatus(CodeResponsesEnum.Not_found_404);
});

postsRouter.post('/',
  authMiddleware,
  titleValidationMiddleware,
  shortDescriptionValidationMiddleware,
  contentDescriptionValidationMiddleware,
  blogIdValidationMiddleware,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;

    const newPost = postsRepository.createPost(title, shortDescription, content, blogId);
    res.status(CodeResponsesEnum.Created_201).send(newPost);
  }
);

postsRouter.put('/:id',
  authMiddleware,
  titleValidationMiddleware,
  shortDescriptionValidationMiddleware,
  contentDescriptionValidationMiddleware,
  blogIdValidationMiddleware,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const postId = req.params.id;
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;

    const result = postsRepository.updatePost(postId, title, shortDescription, content, blogId);
    if (result) {
      res.sendStatus(CodeResponsesEnum.No_content_204);
    } else {
      res.sendStatus(CodeResponsesEnum.Not_found_404);
    };
  }
);

postsRouter.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  const id = req.params.id;
  const result = postsRepository.deletePost(id);
  if (result) {
    res.sendStatus(CodeResponsesEnum.No_content_204);
    return;
  }
  res.sendStatus(CodeResponsesEnum.Not_found_404);
});
