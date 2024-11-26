import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

export const signOut = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet");
});
