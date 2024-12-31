import { db } from "../db/config/db";
import {
  peoples,
  userTickets,
  events,
  purchasableMemberships,
  tickets,
  ticketsEventIdLinks,
} from "../schemas/schema";

const main = async () => {
  try {
    // Delete data
    console.log("Deleting data in database");
    await db.delete(peoples);
    await db.delete(events);
    await db.delete(userTickets);
    await db.delete(tickets);
    await db.delete(ticketsEventIdLinks);
    await db.delete(purchasableMemberships);

    // Add data
    console.log("Seeding database");

    // Add events
    await db.insert(events).values([
      {
        id: 1,
        title: "Gury's Cookout",
        description: "Learn how to cook authentic indian meals.",
        location: "Chef's kitchen",
        eventDateStart: new Date().toLocaleString(),
        eventDateEnd: new Date().toLocaleString(),
        eventCapacity: 999,
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
        eventCapacity: 30,
        isLive: true,
        eventCapacityRemaining: 30,
        termsAndConditions: "No refunds.",
        publishedAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: "Dance Ball",
        description: "Special dance series led by the goat himself, Guryash.",
        location: "Dance Studio",
        eventDateStart: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toLocaleDateString(),
        eventDateEnd: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toLocaleString(),
        eventCapacity: 350,
        isLive: true,
        eventCapacityRemaining: 350,
        termsAndConditions: "No refunds.",
        publishedAt: new Date().toISOString(),
      },
      {
        id: 4,
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

    await db.insert(tickets).values([
      {
        id: 1,
        stripeLink: "price_1Pwg1ZP464csY2Up9hCiwrhp",
        name: "Gury's Cookout - Single Entry",
        ticketDescription: "A single entry ticket for everyone.",
        isDouble: false,
        isMemberOnly: false,
        isTicketLive: true,
        maxNumberTickets: 999,
        numberTicketsLeft: 999,
        price: "0.00",
        ticketLinkBypass: false,
        startDateTicketSales: new Date().toLocaleString(),
        publishedAt: new Date().toLocaleString(),
        bypassTicketLink: null,
      },
      {
        id: 2,
        stripeLink: "price_1PSHWRP464csY2UpYpxvB2tk",
        name: "Dance Series: Shawn Thomas (Single Entry - Members Only)",
        ticketDescription: "A single entry ticket for members only.",
        isDouble: false,
        isMemberOnly: true,
        isTicketLive: true,
        maxNumberTickets: 25,
        numberTicketsLeft: 25,
        price: "15.00",
        ticketLinkBypass: false,
        startDateTicketSales: new Date().toLocaleString(),
        publishedAt: new Date().toLocaleString(),
        bypassTicketLink: null,
      },
      {
        id: 3,
        stripeLink: "price_1QbvgLP464csY2UpjsrFgW9L",
        name: "Dance Series: Shawn Thomas (Double Entry - Members Only)",
        ticketDescription: "A double entry ticket for members only.",
        isDouble: true,
        isMemberOnly: true,
        isTicketLive: true,
        maxNumberTickets: 25,
        numberTicketsLeft: 25,
        price: "28.00",
        ticketLinkBypass: false,
        startDateTicketSales: new Date().toLocaleString(),
        publishedAt: new Date().toLocaleString(),
        bypassTicketLink: null,
      },
      {
        id: 4,
        stripeLink: "price_1QbvjJP464csY2UpygSQe65A",
        name: "Ball (Single Entry - Members Only)",
        ticketDescription: "A double entry ticket for members only.",
        isDouble: false,
        isMemberOnly: true,
        isTicketLive: true,
        maxNumberTickets: 100,
        numberTicketsLeft: 100,
        price: "28.00",
        ticketLinkBypass: false,
        startDateTicketSales: new Date().toLocaleString(),
        publishedAt: new Date().toLocaleString(),
        bypassTicketLink: null,
      },
      {
        id: 5,
        stripeLink: "price_1QbvkIP464csY2UpOshxO9RY",
        name: "Ball (Double Entry - Members Only)",
        ticketDescription: "A double entry ticket for members only.",
        isDouble: true,
        isMemberOnly: true,
        isTicketLive: true,
        maxNumberTickets: 190,
        numberTicketsLeft: 190,
        price: "28.00",
        ticketLinkBypass: false,
        startDateTicketSales: new Date().toLocaleString(),
        publishedAt: new Date().toLocaleString(),
        bypassTicketLink: null,
      },
      {
        id: 6,
        stripeLink: "price_1QbzpKP464csY2UpdWSHGXgb",
        name: "Ball (Single Entry - Non-Members)",
        ticketDescription: "A double entry ticket for members only.",
        isDouble: false,
        isMemberOnly: false,
        isTicketLive: true,
        maxNumberTickets: 130,
        numberTicketsLeft: 130,
        price: "28.00",
        ticketLinkBypass: false,
        startDateTicketSales: new Date().toLocaleString(),
        publishedAt: new Date().toLocaleString(),
        bypassTicketLink: null,
      },
    ]);

    /**
     * Event ID: 1 (Gury's Cookout)
     * Event ID: 2 (Dance Series: Shawn Thomas)
     * Event ID: 3 (Dance Ball)
     * Event ID: 4 (Pub Quiz: India Series)
     */

    await db.insert(ticketsEventIdLinks).values([
      //Gury's Cookout
      {
        id: 1,
        eventId: 1,
        ticketId: 1,
      },
      // Dance Series: Shawn Thomas
      {
        id: 2,
        eventId: 2,
        ticketId: 2,
      },
      {
        id: 3,
        eventId: 2,
        ticketId: 3,
      },
      // Dance Ball
      {
        id: 4,
        eventId: 3,
        ticketId: 4,
      },
      {
        id: 5,
        eventId: 3,
        ticketId: 5,
      },
      {
        id: 6,
        eventId: 3,
        ticketId: 6,
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
