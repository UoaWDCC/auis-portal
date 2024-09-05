import { and, eq, sql, gt } from "drizzle-orm";
import { db } from "../db/config/db";
import { events, user_tickets, peoples } from "../schemas/schema";

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
export async function reserveTicket(eventId: any) {
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
    console.log("reserveTicket: returnValue: ", reservedTicket);
  }

  return reservedTicket;
}

// @Ratchet7x5: Release one ticket
// TODO: Problem: We don't know how to check which event should have its ticket released...
export async function releaseReservedTicket(eventId: any) {
  let releasedTicket;

  // increment event_remaining_ticket by 1
  releasedTicket = await db
    .update(events)
    .set({
      event_capacity_remaining: sql`${events.event_capacity_remaining} + 1`,
    })
    .where(eq(events.id, eventId))
    .returning();
  console.log("reserveTicket: returnValue: ", releasedTicket);

  return releasedTicket;
}

export async function emailCustomerAboutFailedPayment(session: any) {
  // TODO: fill me in
  console.log("Emailing customer", session);
}
