import { db } from "../db/config/db";
import { peoples, userTickets, events } from "../schemas/schema";

const main = async () => {
  try {
    // Delete data
    console.log("Deleting data in database");
    await db.delete(peoples);
    await db.delete(events);
    await db.delete(userTickets);

    // Add users
    console.log("Seeding database");

    await db.insert(peoples).values([
      {
        id: 0,
        email: "gury@go.at",
        upi: "gmat123",
        universityId: "12345",
        name: "Gury",
        isMember: true,
        memberExpiryDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toLocaleDateString(),
        institution: "UoA",
        yearOfStudy: "4",
        status: "Domestic",
      },
      {
        id: 2,
        email: "naren@go.at",
        upi: "nrnr123",
        universityId: "23456",
        name: "Naren",
        isMember: true,
        memberExpiryDate: new Date(
          new Date().setMonth(new Date().getMonth() + 6)
        ).toLocaleDateString(),
        institution: "UoA",
        yearOfStudy: "4",
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
        eventDateStart: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toLocaleDateString(),
        eventDateEnd: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toLocaleString(),
        eventCapacity: 20,
        isLive: true,
        eventCapacityRemaining: 1,
        termsAndConditions: "No refunds.",
        publishedAt: new Date().toISOString(),
      },
      {
        id: 1,
        title: "Naren's Tech Workshop",
        description:
          "Informative workshop where Naren walksthrough the architecture of the AUIS App. Plenty of opportunity to network with sponsor companies and pizza is served. No pineapple pizzas.",
        location: "Remotely from Naren's billion dollar bunker.",
        eventDateStart: new Date(
          new Date().setMonth(new Date().getMonth() + 6)
        ).toLocaleDateString(),
        eventDateEnd: new Date(
          new Date().setMonth(new Date().getMonth() + 6)
        ).toLocaleString(),
        eventCapacity: 5,
        isLive: true,
        eventCapacityRemaining: 2,
        termsAndConditions: "No refunds.",
        publishedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Gury's Cookout",
        description: "Let him COOK",
        location: "Chef's kitchen. ",
        eventDateStart: new Date().toLocaleString(),
        eventDateEnd: new Date().toLocaleString(),
        eventCapacity: 20,
        isLive: true,
        eventCapacityRemaining: 20,
        termsAndConditions: "No refunds.",
        publishedAt: new Date().toISOString(),
      },
    ]);

    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
