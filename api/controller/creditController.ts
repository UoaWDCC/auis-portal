import { Request, Response } from "express"
import asyncHandler from "../middleware/asyncHandler"
export const getTeamInfo = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet")
})

export const getCredits = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet")
})

export const getOurPurpose = asyncHandler(
  async (req: Request, res: Response) => {
    throw new Error("Not implemented yet")
  }
)
