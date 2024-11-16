import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { insertUserByEmail, deleteUserByEmail } from "../gateway/getUsers";

export const signOut = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet");
});
