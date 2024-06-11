import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

import db from "../db/config/db";
import { users } from "../models/users";
import { sql } from "drizzle-orm";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet");
});

export const logIn = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet");
});

export const clerkSignUp = asyncHandler(async (req: Request, res: Response) => {
  try {
    console.log("Webhook received:", req.body);
    const email = req.body.data.email_addresses[0].email_address;

    const newUser = await db
      .insert(users)
      .values({
        email,
        uoa_id: "", // default value
        upi: "", // default value
        institution: "Unknown", // default value
        year: "Unknown", // default value
        study_field: "", // default value
        name: "Unknown", // default value
        is_admin: false,
        is_paid: false,
        is_info_confirmed: false,
      })
      .returning({
        user_id: users.user_id,
        email: users.email,
        uoa_id: users.uoa_id,
        upi: users.upi,
        institution: users.institution,
        year: users.year,
        study_field: users.study_field,
        name: users.name,
        is_admin: users.is_admin,
        is_paid: users.is_paid,
        is_info_confirmed: users.is_info_confirmed,
        created_at: users.created_at,
      });

    res.json(newUser[0]);
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});
