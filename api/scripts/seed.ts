import { users } from "../schemas/User";
import { db } from "../db/config/db";

const main = async () => {
  try {
    console.log("Seeding database");
    // Delete all data
    await db.delete(users);
    await db.insert(users).values([
      {
        name: "Harsheel Singh",
        email: "hsin212@aucklanduni.ac.nz",
        year_of_study: 4,
      },
      {
        name: "Guryash Matharu",
        email: "gmat222@aucklanduni.ac.nz",
        year_of_study: 4,
      },
      {
        name: "Naren Rohan",
        email: "nroh555@aucklanduni.ac.nz",
        year_of_study: 4,
      },
    ]);
    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
