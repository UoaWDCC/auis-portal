import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getUsers } from "../gateway/getUsers";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { UpdateUserInfoBody } from "../types/types";
import { getUser } from "supertokens-node";
import { insertUserBySuperToken } from "../gateway/getUsers";
import { db } from "../db/config/db";
import { peoples } from "../schemas/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await getUsers());
});

export const updateUserInfo = asyncHandler(
  async (req: Request<{}, {}, UpdateUserInfoBody>, res: Response) => {
    try {
      const {
        name,
        universityId,
        upi,
        yearOfStudy,
        fieldOfStudy,
        isDomestic,
        institution,
      } = req.body;

      if (
        !name ||
        !universityId ||
        !upi ||
        !yearOfStudy ||
        !fieldOfStudy ||
        !isDomestic ||
        !institution
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const session = req.session!;
      const userId = session.getUserId();

      //get user email
      const user = await getUser(userId);
      const email = user?.emails[0];

      await UserMetadata.updateUserMetadata(userId, {
        bIsUserInfoComplete: true,
      });

      const payload = {
        email,
        name,
        universityId,
        upi,
        yearOfStudy,
        fieldOfStudy,
        isDomestic,
        institution,
      };

      //insert user into peoples table here
      await insertUserBySuperToken(payload as UpdateUserInfoBody);

      res.status(200).json({
        message: "successfully updated user info",
      });
    } catch (error) {
      res.status(500).json({
        message: "Unknown error occurred while trying to update user info",
      });
    }
  }
);

export const updateUserMetadata = asyncHandler(
  async (req: Express.Request, res: Response) => {
    try {
      const session = req.session!;
      const userId = session.getUserId();

      res.status(200).json({ message: "successfully updated user metadata" });
    } catch (error) {
      res.status(500).json({
        message: "Unknown error occurred while trying to get User Metadata",
      });
    }
  }
);

// NEED TO ENSURE USER IS LOGGED IN
export const getTest = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      // const session = req.session!;
      // const userId = session.getUserId();
      const idk = await db
  .select()
	.from(peoples)
	.where(eq(peoples.email, "a@a.com"))

      // const { metadata } = await UserMetadata.getUserMetadata(userId);
      res.status(200).json(idk);
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
