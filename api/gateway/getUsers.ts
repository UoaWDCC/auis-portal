import { peoples } from "../schemas/schema";
import { db } from "../db/config/db";
import { User } from "../types/types";

export async function getUsers(): Promise<User[]> {
  return (await db.select().from(peoples)) as User[];
}
