import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { insertUserByEmail, deleteUserByEmail } from "../gateway/getUsers";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet");
});

export const logIn = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet");
});

export const handleWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      console.log("Webhook received:", req.body);

      if (req.body.type == "user.created") {
        const newUserEmail: string =
          req.body.data.email_addresses[0].email_address;
        const newUser = await insertUserByEmail(newUserEmail);
        res.json({ received: true });
      } else if (req.body.type == "user.deleted") {
        res.json({ received: true });
      } else if (req.body.type == "user.updated") {
        res.json({ received: true });
      }
    } catch (error) {
      res.status(500).send(`Webhook error: ${error}`);
    }
  }
);
