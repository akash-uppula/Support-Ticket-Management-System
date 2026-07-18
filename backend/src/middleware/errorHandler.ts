import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import apiResponse from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(apiResponse(false, err.message));

    return;
  }

  console.error(err);

  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json(apiResponse(false, "Internal Server Error"));
};

export default errorHandler;
