import { db } from "../db/config/db";
import { events, user_tickets, peoples } from "../schemas/schema";

function isTicketAvailableForReserve(eventId: any) {
  // Event must be LIVE (true) for reserve and sales to go through.
  // Check if event_remaining_ticket > 1

  return null;
}

// @Ratchet7x5: Reserve one ticket
function reserveTicket(eventId: any) {
  // reduce event_remaining_ticket
}

// @Ratchet7x5: Release one ticket
function releaseReservedTicket(eventId: any) {
  // increment event_remaining_ticket by 1
}

function emailCustomerAboutFailedPayment(session: any) {
  // TODO: fill me in
  console.log("Emailing customer", session);
}
