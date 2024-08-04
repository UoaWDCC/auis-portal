import { and, eq, sql } from "drizzle-orm";
import { db } from "../db/config/db";
import { events, user_tickets, peoples } from "../schemas/schema";

async function isTicketAvailableForReserve(eventId: any) {
  let isTicketAvailable = false;

  const remainingTickets = await db!.query.events.findFirst({
    columns: { event_capacity_remaining: true },
    // Event must be LIVE (true) for reserve and sales to go through.
    where: and(eq(events.id, eventId), eq(events.is_live, true)),
  });

  console.log(
    "isTicketAvailableForReserve: remainingTickets?.event_capacity_remaining: ",
    remainingTickets?.event_capacity_remaining
  );

  //TODO: Fix the following error for this line of code:
  //remainingTickets.event_capacity_remaining > 1
  //Errors:
  //TS2533: Object is possibly 'null' or 'undefined'?
  //'remainingTickets' is possibly 'null' or 'undefined'

  // Check if event_remaining_ticket > 1
  if (
    remainingTickets?.event_capacity_remaining === undefined ||
    remainingTickets?.event_capacity_remaining === null
  ) {
    isTicketAvailable = false;
    throw new Error("remainingTickets: undefined or null" + remainingTickets);
  } else {
    //assume that remainingTickets.event_capacity_remaining is not
    isTicketAvailable = true;
  }

  //isTicketAvailable
  return isTicketAvailable;
}

// @Ratchet7x5: Reserve one ticket
export async function reserveTicket(eventId: any) {
  let canReserveTicket = await isTicketAvailableForReserve(eventId);
  let returnValue;

  //if ticket available, reduce by 1
  if (canReserveTicket === true) {
    // sql for reserving statement
    returnValue = await db
      .update(events)
      .set({
        event_capacity_remaining: sql`${events.event_capacity_remaining} - 1`,
      })
      .where(eq(events.id, eventId))
      .returning();
    console.log("reserveTicket: returnValue: ", returnValue);
  } else {
    throw new Error(
      "Not enough tickets available. canReserveTicket: " + canReserveTicket
    );
  }

  return returnValue;
}

// @Ratchet7x5: Release one ticket
// TODO: Problem: We don't know how to check which event should have its ticket released...
export async function releaseReservedTicket(eventId: any) {
  // increment event_remaining_ticket by 1
}

export async function emailCustomerAboutFailedPayment(session: any) {
  // TODO: fill me in
  console.log("Emailing customer", session);
}
