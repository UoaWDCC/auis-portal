import { and, eq, sql, gt } from "drizzle-orm";
import { db } from "../db/config/db";
import { events, user_tickets, peoples, tickets } from "../schemas/schema";
import Stripe from "stripe";
import { stripe } from "../stripe/stripe";

export async function isTicketAvailableByEventId(
  eventId: any
): Promise<boolean> {
  let isTicketAvailable = false;

  const remainingTickets = await db.query.events.findFirst({
    columns: { event_capacity_remaining: true },
    // Event must be LIVE (true) for reserve and sales to go through.
    where: and(
      and(eq(events.id, eventId), eq(events.is_live, true)),
      gt(events.event_capacity_remaining, eventId)
    ),
  });

  // Handle the case where remainingTickets or event_capacity_remaining is undefined or null
  if (remainingTickets && remainingTickets.event_capacity_remaining != null) {
    isTicketAvailable = remainingTickets.event_capacity_remaining > 0;
  }

  return isTicketAvailable;
}

// @Ratchet7x5: Reserve one ticket
export async function reserveTicket(eventId: number) {
  let canReserveTicket = await isTicketAvailableByEventId(eventId);
  let reservedTicket;

  //if ticket available, reduce by 1
  if (canReserveTicket === true) {
    // sql for reserving statement
    reservedTicket = await db
      .update(events)
      .set({
        event_capacity_remaining: sql`${events.event_capacity_remaining} - 1`,
      })
      .where(eq(events.id, eventId))
      .returning();
  }

  return reservedTicket;
}

// @Ratchet7x5: Release one reserved ticket
export async function releaseReservedTicket(eventId: number) {
  let releasedTicket;

  // increment event_remaining_ticket by 1
  releasedTicket = await db
    .update(events)
    .set({
      event_capacity_remaining: sql`${events.event_capacity_remaining} + 1`,
    })
    .where(eq(events.id, eventId))
    .returning();

  return releasedTicket;
}

export async function completeTicketPurchase(sessionId: string) {
  // TODO: Make this function safe to run multiple times,
  // even concurrently, with the same session ID

  // TODO: Make sure fulfillment hasn't already been
  // peformed for this Checkout Session

  //retrieve session from API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  // Check the Checkout Session's payment_status property
  // to determine if fulfillment should be peformed
  if (checkoutSession.payment_status !== "unpaid") {
    db.insert(tickets).values({});
  }
}
