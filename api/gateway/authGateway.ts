import { and, eq, sql, gt } from "drizzle-orm";
import { db } from "../db/config/db";
import {
  events,
  userTickets,
  peoples,
  tickets,
  thirdpartyUsers,
  emailpasswordUsers,
} from "../schemas/schema";
import Stripe from "stripe";
import { stripe } from "../stripe/stripe";

//get user email by the suptertokens id
export async function getUserEmailById(userId: string): Promise<string> {
  return "-1";
}

// get user email by email string
export async function getUserEmail(email: string): Promise<string> {
  let returnEmail = "";
  //check the thirdparty_users table
  let thirdParty = await db
    .select()
    .from(thirdpartyUsers)
    .where(eq(thirdpartyUsers.email, email));

  console.log("getUserEmail: thirdParty", thirdParty);

  if (thirdParty.length == 1) {
    returnEmail = thirdParty[0].email;
  }

  //check the emailpassword_users table
  let emailPass = await db
    .select()
    .from(emailpasswordUsers)
    .where(eq(emailpasswordUsers.email, email));

  if (emailPass.length == 1) {
    returnEmail = emailPass[0].email;
  }

  console.log("getUserEmail: emailPassUser", emailPass);

  return returnEmail;
}

// get user id by email string
export async function getUserIdByEmail(email: string): Promise<string> {
  //check the thirdparty_users table
  let userId = "";
  let thirdParty = await db
    .select()
    .from(thirdpartyUsers)
    .where(eq(thirdpartyUsers.email, email));

  if (thirdParty.length == 1) {
    userId = thirdParty[0].userId;
  }

  console.log("getUserEmail: thirdParty", thirdParty);

  //check the emailpassword_users table
  let emailPass = await db
    .select()
    .from(emailpasswordUsers)
    .where(eq(emailpasswordUsers.email, email));

  if (emailPass.length == 1) {
    userId = emailPass[0].userId;
  }

  console.log("getUserEmail: emailPassUser", emailPass);

  return userId;
}
