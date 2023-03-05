import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";
import { videosRepository } from "../repositories/videosRepository";
import { CodeResponsesEnum } from "../types/CodeResponsesEnum";
import { ErrorType } from "../types/ErrorType";
import { IVideo, Resolutions } from "../types/IVideo";

export const videosRouter = Router({});

const titleValidationMiddleware = body("title").isString().trim().isLength({ min: 2, max: 40 }).withMessage("Incorrect value for title");

const authorValidationMiddleware = body("author").isString().trim().isLength({ min: 2, max: 20 }).withMessage("Incorrect value for author");

videosRouter.get('/', (req: Request, res: Response) => {
  let videos: IVideo[];
  const title = req.query.title;
  if (title) {
    videos = videosRepository.getVideos(title.toString());
    res.send(videos);
    return;
  };
  videos = videosRepository.getVideos();
  res.status(200).send(videos);
});

videosRouter.get('/:id', (req: Request, res: Response) => {
  const videoId = +req.params.id;
  const video = videosRepository.getVideoById(videoId);
  if (video) {
    res.status(200).send(video);
    return;
  };
  res.sendStatus(CodeResponsesEnum.Not_found_404);
});

videosRouter.post('/',
  titleValidationMiddleware,
  authorValidationMiddleware,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;

    const newVideo = videosRepository.createVideo(title, author, availableResolutions);
    res.status(CodeResponsesEnum.Created_201).send(newVideo);
  }
);

videosRouter.put('/:id', (req: Request, res: Response) => {
  const errors: ErrorType[] = [];

  const title = req.body.title;
  if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
    const errorMessage: ErrorType = {
      message: "Incorrect value for title",
      field: "title",
    }
    errors.push(errorMessage);
  }

  const author = req.body.author;
  if (!author || typeof author !== "string" || !author.trim() || author.length > 20) {
    const errorMessage: ErrorType = {
      message: "Incorrect value for author",
      field: "author",
    }
    errors.push(errorMessage);
  }

  const availableResolutions = req.body.availableResolutions;
  if (availableResolutions) {
    for (let i = 0; i < availableResolutions.length; i++) {
      if (!Object.values(Resolutions).includes(availableResolutions[i] as Resolutions)) {
        const errorMessage: ErrorType = {
        message: "Incorrect value for availableResolutions",
        field: "availableResolutions",
        }
        errors.push(errorMessage);
        break;
      }
    }
  };

  const minAgeRestriction = req.body.minAgeRestriction;
  if (minAgeRestriction && (typeof minAgeRestriction !== "number" || minAgeRestriction < 1 || minAgeRestriction > 18)) {
    const errorMessage: ErrorType = {
      message: "Incorrect value for minAgeRestriction",
      field: "minAgeRestriction",
    }
    errors.push(errorMessage);
  }

  const canBeDownloaded = req.body.canBeDownloaded;
  if (canBeDownloaded && typeof canBeDownloaded !== "boolean") {
    const errorMessage: ErrorType = {
      message: "Incorrect value for canBeDownloaded",
      field: "canBeDownloaded",
    }
    errors.push(errorMessage);
  }

  const publicationDate = req.body.publicationDate;
  if (publicationDate && typeof publicationDate !== "string") {
    const errorMessage: ErrorType = {
      message: "Incorrect value for publicationDate",
      field: "publicationDate",
    }
    errors.push(errorMessage);
  }

  if (errors.length) {
    res.status(CodeResponsesEnum.Incorrect_values_400).send({
    errorsMessages: errors,
    });
    return;
  }

  const videoId = +req.params.id;
  const result = videosRepository.updateVideo(videoId, title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate);
  if (result) {
    res.sendStatus(CodeResponsesEnum.No_content_204);
  } else {
    res.sendStatus(CodeResponsesEnum.Not_found_404);
  };
});

videosRouter.delete('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const result = videosRepository.deleteVideo(id);
  if (result) {
    res.sendStatus(CodeResponsesEnum.No_content_204);
    return;
  }
  res.sendStatus(CodeResponsesEnum.Not_found_404);
});
