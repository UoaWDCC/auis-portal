import { randomInt } from "crypto";
import { and, eq, sql, gt } from "drizzle-orm";
import { db } from "../db/config/db";
import {
  events,
  peoples,
  userTickets,
  userTicketsTicketIdLinks,
  ticketsEventIdLinks,
} from "../schemas/schema";
import Stripe from "stripe";
import { stripe } from "../stripe/stripe";
import { ticketsEventIdLinksRelations } from "../schemas/relations";
import { sendEmail } from "../mailer/mailer";
import { generateQRCode } from "../mailer/qrCode";

export async function isTicketAvailableByPriceId(
  priceId: string
): Promise<boolean> {
  let isTicketAvailable = false;

  const remainingTickets = await db.query.events.findFirst({
    columns: { eventCapacityRemaining: true },
    // Event must be LIVE (true) for reserve and sales to go through.
    where: and(
      and(eq(events.stripePriceId, priceId), eq(events.isLive, true)),
      gt(events.eventCapacityRemaining, 0)
    ),
  });

  // Handle the case where remainingTickets or eventCapacityRemaining is undefined or null
  if (remainingTickets && remainingTickets.eventCapacityRemaining != null) {
    isTicketAvailable = remainingTickets.eventCapacityRemaining > 0;
  }

  return isTicketAvailable;
}

// @Ratchet7x5: Reserve one ticket
export async function reserveTicket(priceId: string) {
  let canReserveTicket = await isTicketAvailableByPriceId(priceId);
  let reservedTicket;

  //if ticket available, reduce by 1
  if (canReserveTicket === true) {
    // sql for reserving statement
    reservedTicket = await db
      .update(events)
      .set({
        eventCapacityRemaining: sql`${events.eventCapacityRemaining} - 1`,
      })
      .where(eq(events.stripePriceId, priceId))
      .returning();
  }

  return reservedTicket;
}

// @Ratchet7x5: Release one reserved ticket
export async function releaseReservedTicket(priceId: string) {
  let releasedTicket;

  // increment event_remaining_ticket by 1
  releasedTicket = await db
    .update(events)
    .set({
      eventCapacityRemaining: sql`${events.eventCapacityRemaining} + 1`,
    })
    .where(eq(events.stripePriceId, priceId))
    .returning();

  return releasedTicket;
}

export async function completeTicketPurchase(sessionId: string) {
  //retrieve session from API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  // Check the Checkout Session's payment_status property
  // to determine if fulfillment should be peformed
  if (checkoutSession.payment_status !== "unpaid") {
    console.log("completeTicketPurchase: received: ", checkoutSession);
    console.log(
      "completeTicketPurchase: customer_email: ",
      checkoutSession.customer_details?.email
    );
    console.log("completeTicketPurchase: metadata: ", checkoutSession.metadata);

    //since this is for memberships, get the current user by their email id
    let customer = await db
      .select()
      .from(peoples)
      .where(eq(peoples.email, checkoutSession.customer_details!.email!))
      .limit(1);

    let event = await db
      .select()
      .from(events)
      .where(eq(events.stripePriceId, checkoutSession.metadata!["priceId"]))
      .limit(1);

    let updatedTicket = await db
      .update(userTickets)
      .set({
        paid: true,
        peopleTicketCode: `${randomInt(100000, 999999)}`,
      })
      .where(
        eq(userTickets.id, parseInt(checkoutSession.metadata!["userTicketId"]))
      )
      .returning();

    //email the user ticket
    //turn this off locally. Staging and Prod is fine.
    sendEmail(
      await generateQRCode(updatedTicket[0].peopleTicketCode!),
      checkoutSession.customer_details!.email!,
      customer[0].name!,
      event[0].title!,
      updatedTicket[0].peopleTicketCode!
    );
  }
}

export async function isPriceIdForEvent(priceId: string) {
  let isPriceIdUsedForEventOrMembership = false;

  if (priceId === "" || priceId === undefined || priceId === null) {
    throw new Error(
      "received invalid type for isPriceIdForEvent() in eventsGateway" + priceId
    );
  }

  // search for this priceId
  let isUsedForEvent = await db
    .select()
    .from(events)
    .where(eq(events.stripePriceId, priceId));

  // if array is 1, true. If 0, set to false.
  if (isUsedForEvent.length == 1) {
    isPriceIdUsedForEventOrMembership = true;
  } else if (isUsedForEvent.length == 0) {
    isPriceIdUsedForEventOrMembership = false;
  }

  return isPriceIdUsedForEventOrMembership;
}

export async function getUserTickets(eventId: number) {
  console.log("I WAS CALLED");
  console.log(eventId);
  if (eventId < 0 || eventId === undefined || eventId === null) {
    throw new Error(
      "received invalid type for getUserTickets() in eventsGateway" + eventId
    );
  }

  // search for this priceId
  let eventTickets = await db
    .select({
      id: userTickets.id,
      userTicketCode: userTickets.peopleTicketCode,
      name: userTickets.name,
    })
    .from(ticketsEventIdLinks)
    .where(eq(ticketsEventIdLinks.eventId, eventId))
    .leftJoin(
      userTicketsTicketIdLinks,
      eq(ticketsEventIdLinks.ticketId, userTicketsTicketIdLinks.ticketId)
    )
    .leftJoin(
      userTickets,
      eq(userTicketsTicketIdLinks.userTicketId, userTickets.id)
    );

  console.log(eventTickets);

  // if array is 1, true. If 0, set to false.

  return eventTickets;
}

export async function updateUserTicket() {
  console.log("I WAS CALLED");
  // if (eventId < 0 || eventId === undefined || eventId === null) {
  //   throw new Error(
  //     "received invalid type for getUserTickets() in eventsGateway" + eventId
  //   );
  // }

  let eventTickets = await db
    .select({
      id: userTickets.id,
      userTicketCode: userTickets.peopleTicketCode,
      name: userTickets.name,
    })
    .from(ticketsEventIdLinks)
    .where(eq(ticketsEventIdLinks.eventId, 3))
    .leftJoin(
      userTicketsTicketIdLinks,
      eq(ticketsEventIdLinks.ticketId, userTicketsTicketIdLinks.ticketId)
    )
    .leftJoin(
      userTickets,
      eq(userTicketsTicketIdLinks.userTicketId, userTickets.id)
    );

  console.log(eventTickets);

  return eventTickets;
}
