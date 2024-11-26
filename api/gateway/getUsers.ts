import { peoples } from "../schemas/schema";
import { db } from "../db/config/db";
import { User, UpdateUserInfoBody } from "../types/types";
import { eq } from "drizzle-orm";

export async function getUserMembershipExpiryDate(
  userEmail: string
): Promise<string> {
  let returnDate = "-1";

  if (userEmail === "" || userEmail === undefined || userEmail === null) {
    throw new Error(
      "getUserMembershipExpiryDate: received invalid type for userEmail: " +
        userEmail
    );
  }

  let membershipExpiryDate = await db
    .select({ memberExpiryDate: peoples.memberExpiryDate })
    .from(peoples)
    .where(eq(peoples.email, userEmail));

  if (membershipExpiryDate !== undefined || membershipExpiryDate !== null) {
  }

  console.log("getUserMembershipExpiryDate: ", membershipExpiryDate[0]);

  if (membershipExpiryDate.length == 0) {
    returnDate = "-1";
  } else if (membershipExpiryDate.length == 1) {
    returnDate = membershipExpiryDate[0].memberExpiryDate!;
  }

  return returnDate;
}

export async function insertUserBySuperToken(
  data: UpdateUserInfoBody
): Promise<User[]> {
  /*const userExists = await doesUserExistByEmail(email);

  if (userExists) {
    throw new Error(`User with email ${email} already exists.`);
  }*/

  console.log(
    "Status and institution for user info sign up is not inserted into peoples database table"
  );
  console.log("insertUserBySuperToken: received: ", data);

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
