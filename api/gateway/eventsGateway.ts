import { randomInt } from "crypto";
import { and, eq, sql, gt } from "drizzle-orm";
import { db } from "../db/config/db";
import {
  events,
  peoples,
  userTickets,
  tickets,
  ticketsEventIdLinks,
} from "../schemas/schema";
import { stripe } from "../stripe/stripe";
import { sendEmail } from "../mailer/mailer";
import { generateQRCode } from "../mailer/qrCode";

/**
 * Check if an event ticket is available for sale or not. Returns false if the Events' remaining capacity is greater than 0.
 * @param priceId The stripe priceId for the event ticket.
 * @returns A boolean representing if tickets available for sale or not.
 */
export async function isTicketAvailableByPriceId(
  priceId: string
): Promise<boolean> {
  let isTicketAvailable = false;

  const ticketsCapacityRemaining = await db
    .select()
    .from(tickets)
    .where(
      and(
        and(eq(tickets.stripeLink, priceId)),
        gt(tickets.numberTicketsLeft, 0)
      )
    )
    .limit(1)
    .catch((error) => {
      throw new Error(
        `isTicketAvailableByPriceId: Ran into error while query tickets table for numberTicketsLeft: ${error}`
      );
    });

  //get eventId by using the ticketsEventIdLinks table.
  let eventId = await db
    .select()
    .from(ticketsEventIdLinks)
    .where(eq(ticketsEventIdLinks.eventId, ticketsCapacityRemaining[0].id))
    .catch((error) => {
      throw new Error(
        `isTicketAvailableByPriceId: Ran into error while query ticketsEventIdLinks table: ${error}`
      );
    });

  //check events' capacity
  let eventCapacityRemaining = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.id, eventId[0].eventId!),
        gt(events.eventCapacityRemaining, 0)
      )
    )
    .limit(1)
    .catch((error) => {
      throw new Error(
        `isTicketAvailableByPriceId: Ran into error while query events table: ${error}`
      );
    });

  // Handle the case where remainingTickets or eventCapacityRemaining is undefined or null
  if (
    eventCapacityRemaining &&
    eventCapacityRemaining[0].eventCapacityRemaining !== null
  ) {
    isTicketAvailable = eventCapacityRemaining[0].eventCapacityRemaining > 0;
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
      .update(tickets)
      .set({
        numberTicketsLeft: sql`${tickets.numberTicketsLeft} - 1`,
      })
      .where(eq(tickets.stripeLink, priceId))
      .returning();

    //get eventId by using the ticketsEventIdLinks table. Then reduce the events' ticket capacity too
    let eventId = await db
      .select()
      .from(ticketsEventIdLinks)
      .where(eq(ticketsEventIdLinks.eventId, reservedTicket[0].id));

    //decrement event ticket capacity
    let eventReservedTicket = await db
      .update(events)
      .set({
        eventCapacityRemaining: sql`${events.eventCapacityRemaining} - 1`,
      })
      .where(eq(events.id, eventId[0].id))
      .returning();
  }

  return reservedTicket;
}

// @Ratchet7x5: Release one reserved ticket
export async function releaseReservedTicket(priceId: string) {
  let releasedTicket;

  // increment event_remaining_ticket by 1
  releasedTicket = await db
    .update(tickets)
    .set({
      numberTicketsLeft: sql`${tickets.numberTicketsLeft} + 1`,
    })
    .where(eq(tickets.stripeLink, priceId))
    .returning();

  // get eventId by using the ticketsEventIdLinks table.
  let eventId = await db
    .select()
    .from(ticketsEventIdLinks)
    .where(eq(ticketsEventIdLinks.eventId, releasedTicket[0].id));

  // increment event ticket capacity
  let eventReleasedTicket = await db
    .update(events)
    .set({
      eventCapacityRemaining: sql`${events.eventCapacityRemaining} + 1`,
    })
    .where(eq(events.id, eventId[0].id))
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

    // retrieve ticket
    let ticket = await db
      .select()
      .from(tickets)
      .where(eq(tickets.stripeLink, checkoutSession.metadata!["priceId"]))
      .limit(1);

    // update the ticket details: paid, people ticket code
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
      ticket[0].name!,
      updatedTicket[0].peopleTicketCode!
    );
  }
}

export async function isPriceIdForEvent(priceId: string) {
  let isEventPriceId = false;

  if (priceId === "" || priceId === undefined || priceId === null) {
    throw new Error(
      "received invalid type for isPriceIdForEvent() in eventsGateway" + priceId
    );
  }

  // search for this priceId
  let isUsedForEvent = await db
    .select()
    .from(tickets)
    .where(eq(tickets.stripeLink, priceId));

  console.log("isPriceIdForEvent: isUsedForEvent: ", isUsedForEvent);

  // if array is 1, true. If 0, set to false.
  if (isUsedForEvent.length !== 0) {
    isEventPriceId = true;
  } else if (isUsedForEvent.length === 0) {
    isEventPriceId = false;
  }

  return isEventPriceId;
}
