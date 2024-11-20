import express, { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getUsers } from "../gateway/getUsers";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await getUsers());
});

export const updateUserMetadata = asyncHandler(
  async (req: Express.Request, res: Response) => {
    try {
      const session = req.session!;
      const userId = session.getUserId();

      await UserMetadata.updateUserMetadata(userId, {
        isOnboardingComplete: false,
      });

      res.status(200).json({ message: "successfully updated user metadata" });
    } catch (error) {
      res.status(500).json({
        message: "Unknown error occurred while trying to get User Metadata",
      });
    }
  }
);

export const getUserMetadata = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const session = req.session!;
      const userId = session.getUserId();

      const { metadata } = await UserMetadata.getUserMetadata(userId);

      res.status(200).json(metadata);
    } catch (error) {
      res.status(500).json({
        message: "Unknown error occurred while trying to get User Metadata",
      });
    }
  }
);

export const deleteUserMetadata = asyncHandler(
  async (req: Request, res: Response) => {
    const session = req.session;
    const userId = session!.getUserId();

    await UserMetadata.clearUserMetadata(userId);
    res.status(200).json({ message: "successfully deleted user metadata" });
  }
);
