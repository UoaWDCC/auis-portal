import { db } from "../db/config/db";
import { events, user_tickets, peoples } from "../schemas/schema";

const isTicketAvailableForReserve = (eventId: any) => {
  // Event must be LIVE (true) for reserve and sales to go through.
  // Check if event_remaining_ticket > 1

  return null;
};

// @Ratchet7x5: Reserve one ticket
const reserveTicket = (eventId: any) => {
  // reduce event_remaining_ticket
};

// @Ratchet7x5: Release one ticket
const releaseReservedTicket = (eventId: any) => {
  // increment event_remaining_ticket by 1
};

const emailCustomerAboutFailedPayment = (session: any) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
};
