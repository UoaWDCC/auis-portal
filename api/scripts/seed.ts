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
        member_expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
        institution: "UoA",
        year_of_study: "4",
        status: "Domestic",
      },
      {
        id: 2,
        email: "naren@go.at",
        upi: "nrnr123",
        university_id: "23456",
        name: "Naren",
        is_member: true,
        member_expiry_date: new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString(),
        institution: "UoA",
        year_of_study: "4",
        status: "International",
      },
    ]);

    // Add events
    await db.insert(events).values([
      {
        id: 3,
        title: "Dance Series: Shawn Thomas",
        description: "Special dance series led by the goat himself, Guryash.",
        location: "The dance floor baby. ",
        event_date_start: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
        event_date_end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
        event_capacity: 20,
        is_live: true,
        event_capacity_remaining: 1,
        terms_and_conditions: "No refunds. Gotta have moves like jagger.",
      },
      {
        id: 1,
        title: "Naren's Tech Workshop",
        description:
          "Informative workshop where Naren walksthrough the architecture of the AUIS App. Plenty of opportunity to network with sponsor companies and pizza is served. No pineapple pizzas.",
        location: "Remotely from Naren's billion dollar bunker.",
        event_date_start: new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString(),
        event_date_end: new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString(),
        event_capacity: 5,
        is_live: true,
        event_capacity_remaining: 2,
        terms_and_conditions: "Ain't no refunds out here cuz it's free.",
      },
      {
        id: 2,
        title: "Gury's Cookout",
        description: "Let him COOK",
        location: "Chef's kitchen. ",
        event_date_start: new Date().toLocaleString(),
        event_date_end: new Date().toLocaleString(),
        event_capacity: 20,
        is_live: true,
        event_capacity_remaining: 20,
        terms_and_conditions:
          "Ain't no refunds out here. Don't tell health and safety if you get food poisoning.",
      },
    ]);

    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
