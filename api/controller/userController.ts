import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  doesUserExistByEmail,
  getUserMembershipExpiryDate,
  insertUserTicket,
} from "../gateway/userGateway";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { UpdateUserInfoBody } from "../types/types";
import { getUser } from "supertokens-node";
import { insertUserBySuperToken } from "../gateway/userGateway";

export const updateUserTicketInfo = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, email, phoneNumber, ticketId, answers } = req.body;

      if (!name || !email || !phoneNumber || !ticketId || !answers) {
        return res.status(400).json({ message: "All fields are required" });
      }

      let userTicketId = await insertUserTicket(req.body);

      res.status(200).json({
        updateUserInfoOrNewUser: userTicketId,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
);

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

      //only updat metadata if it worked properly
      await UserMetadata.updateUserMetadata(userId, {
        bIsUserInfoComplete: true,
      });

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

export const getUserMembershipExpiry = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const session = req.session!;
      const userId = session.getUserId();

      //get user email
      const user = await getUser(userId);
      const email = user?.emails[0];

      let userExpiryDate = await getUserMembershipExpiryDate(email as string);

      res.status(200).json({ userExpiryDate: userExpiryDate });
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
