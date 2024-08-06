import { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Authentication and authorization logic here
    // If user is authenticated and authorized, call next()
    // Otherwise, respond wit an error
    next();
  }
);

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Authorization logic here
    // Check if the authenticated user's role is in the allowed roles
    // If so, call next()
    // Otherwise, respond with an error
    next();
  };
};
