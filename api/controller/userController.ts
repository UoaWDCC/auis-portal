import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getUsers } from "../gateway/getUsers";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await getUsers());
});
