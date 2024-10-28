import { peoples } from "../schemas/schema";
import { db } from "../db/config/db";
import { User } from "../types/types";
import { eq } from "drizzle-orm";

export async function getUsers(): Promise<User[]> {
  return (await db.select().from(peoples)) as User[];
}

export async function doesUserExistByEmail(email: string): Promise<boolean> {
  const user = await db.query.peoples.findFirst({
    columns: { id: true },
    where: eq(peoples.email, email),
  });

  return user !== undefined && user !== null;
}

export async function insertUserByEmail(email: string): Promise<User[]> {
  const userExists = await doesUserExistByEmail(email);

  if (userExists) {
    throw new Error(`User with email ${email} already exists.`);
  }

  const newUser = await db
    .insert(peoples)
    .values({
      email,
      created_at: new Date().toISOString(),
      name: "",
      university_id: "",
      upi: "",
      year_of_study: "",
      study_field: "",
      is_member: false,
      status: "",
      institution: "",
    })
    .returning() as User[];

  return newUser;
}

export async function deleteUserByEmail(): Promise<User[]> {
  //get the users' email

  //search db for email

  //if exists: delete
  //if not exists: return error

  //modify below
  return (await db.select().from(peoples)) as User[];
}
