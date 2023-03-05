import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const customValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      message: error.msg,
      field: error.param,
    };
  },
});

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errorsMessages: errors.array() });
  } else {
    next();
  };
};
