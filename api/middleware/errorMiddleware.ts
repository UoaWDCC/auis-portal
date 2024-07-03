import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: Error & { name?: string; kind?: string },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
  let message: string = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
