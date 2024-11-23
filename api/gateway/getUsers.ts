import { peoples } from "../schemas/schema";
import { db } from "../db/config/db";
import { User, UpdateUserInfoBody } from "../types/types";
import { eq } from "drizzle-orm";

export async function getUsers(): Promise<User[]> {
  return (await db.select().from(peoples)) as User[];
}

export async function insertUserBySuperToken(
  data: UpdateUserInfoBody
): Promise<User[]> {
  /*const userExists = await doesUserExistByEmail(email);

  if (userExists) {
    throw new Error(`User with email ${email} already exists.`);
  }*/

  const newUser = (await db
    .insert(peoples)
    .values({
      email: data.email,
      createdAt: new Date().toISOString(),
      name: data.name,
      universityId: data.universityId,
      upi: data.upi,
      yearOfStudy: data.yearOfStudy,
      studyField: data.fieldOfStudy,
      isMember: false,
      status: data.isDomestic,
      institution: data.institution,
    })
    .returning()) as User[];

  return newUser;
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

  const newUser = (await db
    .insert(peoples)
    .values({
      email,
      createdAt: new Date().toISOString(),
      name: "",
      universityId: "",
      upi: "",
      yearOfStudy: "",
      studyField: "",
      isMember: false,
      status: "",
      institution: "",
    })
    .returning()) as User[];

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
