import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

import { db } from "../db/config/db";
import { peoples } from "../schemas/schema";
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
      .insert(peoples)
      //id, name, email, university_id, upi, year_of_study, study_field, is_member, status, member_expiry_date, institution
      .values({
        name: "",
        email,
        university_id: "",
        upi: "",
        year_of_study: "",
        study_field: "",
        is_member: false,
        status: "",
        institution: "",
      })
      .returning({
        id: peoples.id,
        email: peoples.email,
        is_member: peoples.is_member,
      });

    res.json(newUser[0]);
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});
