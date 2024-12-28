import { db } from "../db/config/db";
import {
  peoples,
  userTickets,
  events,
  purchasableMemberships,
} from "../schemas/schema";

const main = async () => {
  try {
    // Delete data
    console.log("Deleting data in database");
    await db.delete(peoples);
    await db.delete(events);
    await db.delete(userTickets);
    await db.delete(purchasableMemberships);

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
        id: 1,
        title: "Gury's Cookout",
        description: "Learn how to cook authentic indian meals.",
        location: "Chef's kitchen",
        eventDateStart: new Date().toLocaleString(),
        eventDateEnd: new Date().toLocaleString(),
        eventCapacity: 20,
        isLive: true,
        eventCapacityRemaining: 20,
        termsAndConditions: "No refunds.",
        publishedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Dance Series: Shawn Thomas",
        description: "Special dance series led by the goat himself, Guryash.",
        location: "Dance Studio",
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
        id: 3,
        title: "Pub Quiz: India Series",
        description:
          "Join this unique members only event to test your knowledge on Indian culture and win amazing prizes.",
        location: "Pub",
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
    ]);

    await db.insert(purchasableMemberships).values([
      {
        id: 1,
        stripeLink: "price_1PSHXPP464csY2Up4aKoSw6r",
        membershipLinkBypass: false,
        bypassMembershipLink: "",
        title: "1x Semester Membership",
        description: "One Semester long membership.",
        expiry: new Date(
          new Date().setMonth(new Date().getMonth() + 6)
        ).toLocaleDateString(),
        price: "8.00",
        publishedAt: new Date().toISOString(),
      },
      {
        id: 2,
        stripeLink: "price_1Q1NimP464csY2Up7A7BwMcS",
        membershipLinkBypass: false,
        bypassMembershipLink: "",
        title: "2x Semester Membership",
        description: "Two Semester long membership.",
        expiry: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toLocaleDateString(),
        price: "15.00",
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
