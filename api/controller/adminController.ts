import { Request, Response } from 'express';
import asyncHandler from "../middleware/asyncHandler";

export const createNewEvent = asyncHandler(async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
});

export const getStagingEvents = asyncHandler(async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
});

export const getEventInformation = asyncHandler(async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
});

export const updateEventInformation = asyncHandler(async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
});

export const getMembers = asyncHandler(async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
});
