import { db } from "../db/config/db";
import { peoples, user_tickets, events } from "../schemas/schema";

const main = async () => {
  try {
    // Delete data
    console.log("Deleting data in database");
    await db.delete(peoples);
    await db.delete(events);
    await db.delete(user_tickets);

    // Add users
    console.log("Seeding database");

    await db.insert(peoples).values([
      {
        id: 0,
        email: "gury@go.at",
        upi: "gmat123",
        university_id: "12345",
        name: "Gury",
        is_member: true,
        member_expiry_date: new Date().toLocaleDateString(),
        institution: "UoA",
        year_of_study: "4",
      },
      {
        id: 2,
        email: "naren@go.at",
        upi: "nrnr123",
        university_id: "23456",
        name: "Naren",
        is_member: true,
        member_expiry_date: new Date().toLocaleDateString(),
        institution: "UoA",
        year_of_study: "4",
      },
    ]);

    // Add events
    await db.insert(events).values([
      {
        id: 0,
        title: "Dance Series: Shawn Thomas",
        description: "Special dance series led by the goat himself, Guryash.",
        event_date_start: new Date().toLocaleString(),
        event_date_end: new Date().toLocaleString(),
        event_capacity: 20,
        is_live: true,
        event_capacity_remaining: 1,
      },
      {
        id: 1,
        title: "Naren's Tech Workshop",
        description:
          "Informative workshop where Naren walksthrough the architecture of the AUIS App. Plenty of opportunity to network with sponsor companies and pizza is served. No pineapple pizzas.",
        event_date_start: new Date().toLocaleString(),
        event_date_end: new Date().toLocaleString(),
        event_capacity: 5,
        is_live: true,
        event_capacity_remaining: 2,
      },
      {
        id: 2,
        title: "Gury's Cookout",
        description: "Let him COOK",
        event_date_start: new Date().toLocaleString(),
        event_date_end: new Date().toLocaleString(),
        event_capacity: 20,
        is_live: true,
        event_capacity_remaining: 20,
      },
    ]);

    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
