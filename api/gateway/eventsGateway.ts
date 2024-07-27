import { and, eq, sql } from "drizzle-orm";
import { db } from "../db/config/db";
import { events, user_tickets, peoples } from "../schemas/schema";

async function isTicketAvailableForReserve(eventId: any) {
  // Event must be LIVE (true) for reserve and sales to go through.
  // Check if event_remaining_ticket > 1
  let isTicketAvailable = false;
  /*const remainingTickets = await db
    .select({ remainingTickets: events.event_capacity_remaining })
    .from(events)
    .where(and(eq(events.id, eventId), eq(events.is_live, true)));*/

  const remainingTickets = await db.query.events.findFirst({
    columns: { event_capacity_remaining: true },
    where: eq(events.event_capacity_remaining, eventId),
  });

  console.log(remainingTickets);

  // @Ratchet7x5: TODO: Fix the code fragment below. We need the final output to be a number.
  if (remainingTickets > 1) {
    console.log("remainingTickets > 1");
    isTicketAvailable = true;
  }

  //isTicketAvailable
  return isTicketAvailable;
}

// @Ratchet7x5: Reserve one ticket
export function reserveTicket(eventId: any) {
  // reduce event_remaining_ticket by 1
  let canReserveTicket = isTicketAvailableForReserve(eventId);

  // sql for reserving statement
  db.update(events)
    .set({
      event_capacity_remaining: sql`$events.event_capacity_remaining - 1`,
    })
    .where(eq(events.id, eventId))
    .returning();
}

// @Ratchet7x5: Release one ticket
export function releaseReservedTicket(eventId: any) {
  // increment event_remaining_ticket by 1
}

export function emailCustomerAboutFailedPayment(session: any) {
  // TODO: fill me in
  console.log("Emailing customer", session);
}
