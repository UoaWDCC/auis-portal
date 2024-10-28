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
        console.log(newUser);
        res.json({ received: true });
      } else if (req.body.type == "user.deleted") {
        console.log("received a user delete request");
        res.json({ received: true });
      } else if (req.body.type == "user.updated") {
        console.log("received a user update request");
        res.json({ received: true });
      }
    } catch (error) {
      console.error("Error handling webhook:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);
