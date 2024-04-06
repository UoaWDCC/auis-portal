import { Request, Response } from 'express';
import asyncHandler from "../middleware/asyncHandler";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
});

export const logIn = asyncHandler(async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
});
