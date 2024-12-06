import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  doesUserExistByEmail,
  getUserMembershipExpiryDate,
} from "../gateway/userGateway";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { UpdateUserInfoBody } from "../types/types";
import { getUser } from "supertokens-node";
import { insertUserBySuperToken } from "../gateway/userGateway";
import { db } from "../db/config/db";
import {
  answers,
  userTickets,
  userTicketsTicketIdLinks,
} from "../schemas/schema";
import { userTicketsTicketIdLinksRelations } from "../schemas/relations";

// FIX THIS MESS ->
export const updateUserTicketInfo = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      // check user session
      const session = req.session!;
      const userId = session.getUserId();

      const { name, email, phoneNumber, ticketId, answers } = req.body;

      if (!name || !email || !phoneNumber || !ticketId || !answers) {
        return res.status(400).json({ message: "All fields are required" });
      }

      console.log(req.body);
      console.log(userId);
      let updateUserInfoOrNewUser = await insertUserTicket(req.body);

      // TODO: Get clarification from Gury on what needs to be done here.
      // ex: database inserts into a table? Update a db record?
      res.status(200).json({
        updateUserInfoOrNewUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Unknown error occurred for user ticket info",
      });
    }
  }
);

export interface temp {
  ticketId: number;
  name: string;
  email: string;
  phoneNumber: string;
  answers: {
    questionId: number;
    answer: string;
  };
}

export async function insertUserTicket(data: {
  ticketId: number;
  name: string;
  email: string;
  phoneNumber: string;
  answers: {
    questionId: number;
    answer: string;
  }[];
}): Promise<{ userTicketId: number }> {
  let updateUserInfoOrNewUser: { userTicketId: number }[];
  updateUserInfoOrNewUser = await db
    .insert(userTickets)
    .values({
      // ticketId: data.ticketId,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
    })
    .returning({ userTicketId: userTickets.id });

  const tempID = updateUserInfoOrNewUser[0].userTicketId;

  const tempa: any = await db
    .insert(userTicketsTicketIdLinks)
    .values({
      userTicketId: updateUserInfoOrNewUser[0].userTicketId,
      ticketId: data.ticketId,
    })
    .returning({ id: userTicketsTicketIdLinks.id });
  console.log(tempa.id);

  const ticketId = userTickets.id;
  if (data.answers.length > 0) {
    const answerRecords = data.answers.map((answerData) => ({
      ticketId: ticketId,
      questionId: answerData.questionId,
      answer: answerData.answer,
    }));

    await db.insert(answers).values(answerRecords);
  }
  return updateUserInfoOrNewUser[0];
}

// FIX THIS MESS ^^^^^^^^^^^^^^^^^^^ sorry Tarun

export const updateUserInfo = asyncHandler(
  async (req: Request<{}, {}, UpdateUserInfoBody>, res: Response) => {
    try {
      let {
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

      let payload = {
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
