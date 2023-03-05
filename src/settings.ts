import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { videosRouter } from "./routes/videosRouter";
import { videosRepository } from "./repositories/videosRepository";
import { CodeResponsesEnum } from "./types/CodeResponsesEnum";

export const app = express();

const parserMiddleware = bodyParser.json();

app.use(cors());

app.use(parserMiddleware);

app.delete('/testing/all-data', (req: Request, res: Response) => {
  videosRepository.deleteAllVideos();
  res.sendStatus(CodeResponsesEnum.No_content_204);
});

app.use("/videos", videosRouter);
