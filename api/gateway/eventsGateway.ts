import { randomInt } from "crypto";
import { and, eq, sql, gt } from "drizzle-orm";
import { db } from "../db/config/db";
import {
  events,
  peoples,
  userTickets,
  tickets,
  ticketsEventIdLinks,
  tickets,
} from "../schemas/schema";
import { stripe } from "../stripe/stripe";
import { sendEmail } from "../mailer/mailer";
import { generateQRCode } from "../mailer/qrCode";

// Check to make sure the session is valid Ticket is live, event is live, ticket left, event amount left, event is NOT over - done
// If it is memeer ticket - make sure that the ticket is not already purchased AND PAID - TODO:
// if it isnt, then its ok
export async function isTicketAvailableByPriceId(
  priceId: string
): Promise<boolean> {
  // set
  let isTicketAvailable = false;
  const eventId = await getEventIdFromPriceId(priceId);

  if (eventId) {
    const remainingTickets = await db.query.events.findFirst({
      columns: { eventCapacityRemaining: true },
      // Event must be LIVE (true) for reserve and sales to go through.
      where: and(
        and(
          and(eq(events.id, eventId), eq(events.isLive, true)),
          gt(events.eventCapacityRemaining, 0)
          // TODO: Check for event start date, and invalid checkout if the event is started already.
          // and(
          //   and(
          //     eq(tickets.stripeLink, priceId),
          //     eq(tickets.isTicketLive, true)
          //   ),
          //   gt(tickets.numberTicketsLeft, 0)
          // )
        )
      ),
    });

    const remainingTicketTickets = await db.query.tickets.findFirst({
      columns: { numberTicketsLeft: true },
      // Event must be LIVE (true) for reserve and sales to go through.
      where: and(
        and(
          and(eq(tickets.stripeLink, priceId), eq(tickets.isTicketLive, true)),
          gt(tickets.numberTicketsLeft, 0)
          // TODO: Check for event start date, and invalid checkout if the event is started already.
          // and(
          //   and(
          //     eq(tickets.stripeLink, priceId),
          //     eq(tickets.isTicketLive, true)
          //   ),
          //   gt(tickets.numberTicketsLeft, 0)
          // )
        )
      ),
    });
    // Handle the case where remainingTickets or eventCapacityRemaining is undefined or null
    if (
      remainingTickets &&
      remainingTicketTickets &&
      remainingTickets.eventCapacityRemaining != null
    ) {
      isTicketAvailable = remainingTickets.eventCapacityRemaining > 0;
    }
  }

  return isTicketAvailable;
}

export async function getEventIdFromPriceId(priceId: string) {
  let ticketId = await db
    .select()
    .from(tickets)
    .where(eq(tickets.stripeLink, priceId));
  if (ticketId.length == 0) {
    return null;
  }
  let eventId = await db
    .select({ eventId: ticketsEventIdLinks.eventId })
    .from(ticketsEventIdLinks)
    .where(eq(ticketsEventIdLinks.ticketId, ticketId[0].id))
    .limit(1);
  return eventId[0].eventId;
}

// @Ratchet7x5: Reserve one ticket

// reserve ticket from EVENT, and also Ticket
export async function reserveTicket(priceId: string) {
  let canReserveTicket = await isTicketAvailableByPriceId(priceId);
  let reservedTicket;
  let reservedTicketTicket;
  const eventId = await getEventIdFromPriceId(priceId);

  if (eventId) {
    //if ticket available, reduce by 1
    if (canReserveTicket === true) {
      // sql for reserving statement EVENT
      console.log("WHY AM I RUNNING TWICE");
      reservedTicket = await db
        .update(events)
        .set({
          eventCapacityRemaining: sql`${events.eventCapacityRemaining} - 1`,
        })
        .where(eq(events.id, eventId))
        .returning();

      // reserve ticket
      reservedTicketTicket = await db
        .update(tickets)
        .set({
          numberTicketsLeft: sql`${tickets.numberTicketsLeft} - 1`,
        })
        .where(eq(tickets.stripeLink, priceId))
        .returning();
    }
  }
  return reservedTicket;
}

// @Ratchet7x5: Release one reserved ticket
// relese ticket and also event
export async function releaseReservedTicket(priceId: string) {
  let releasedTicket;
  let releasedTicketTicket;

  const eventId = await getEventIdFromPriceId(priceId);

  if (eventId) {
    // increment event_remaining_ticket by 1
    releasedTicket = await db
      .update(events)
      .set({
        eventCapacityRemaining: sql`${events.eventCapacityRemaining} + 1`,
      })
      .where(eq(events.id, eventId))
      .returning();

    releasedTicketTicket = await db
      .update(tickets)
      .set({
        numberTicketsLeft: sql`${tickets.numberTicketsLeft} + 1`,
      })
      .where(eq(events.id, eventId))
      .returning();
  }
  return releasedTicket;
}

export async function completeTicketPurchase(
  sessionId: string,
  userTicketId: string
) {
  //retrieve session from API with line_items expanded
  console.log("I RAN");
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  console.log(checkoutSession);
  // Check the Checkout Session's payment_status property
  // to determine if fulfillment should be peformed
  // check for something here idk : ()
  if (checkoutSession.payment_status !== "unpaid") {
    console.log("completeTicketPurchase: received: ", checkoutSession);
    console.log(
      "completeTicketPurchase: customer_email: ",
      checkoutSession.customer_details?.email
    );
    console.log("completeTicketPurchase: metadata: ", checkoutSession.metadata);

    //since this is for memberships, get the current user by their email id
    // let customer = await db
    //   .select()
    //   .from(peoples)
    //   .where(eq(peoples.email, checkoutSession.customer_details!.email!))
    //   .limit(1);

    let customer = await db
      .select()
      .from(userTickets)
      .where(eq(userTickets.id, parseInt(userTicketId)))
      .limit(1);

    let ticketId = await db
      .selectDistinct()
      .from(tickets)
      .where(eq(tickets.stripeLink, checkoutSession.metadata!["priceId"]));

    let eventId = await db
      .select()
      .from(ticketsEventIdLinks)
      .where(eq(ticketsEventIdLinks.ticketId, ticketId[0].id))
      .limit(1);

    // retrieve ticket
    let ticket = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId[0].id))
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

// export async function isEventMemberOnly(priceId: string) {
//   let isMemberOnly = false;

//   if (priceId === "" || priceId === undefined || priceId === null) {
//     throw new Error(
//       "received invalid type for isPriceIdForEvent() in eventsGateway" + priceId
//     );
//   }

//   // search for this priceId

//   let ticketMember = await db
//     .select()
//     .from(tickets)
//     .where(eq(tickets.stripeLink, priceId));

//   if (ticketMember.length == 1){
//     if(ticketMember[0].isMemberOnly == true){
//       isMemberOnly = true
//     }
//   } else {
//     isMemberOnly = false
//   }
//   console.log("Member Only Ticket")
//   return isMemberOnly;
// }

export async function isPriceIdForEvent(priceId: string) {
  let isEventPriceId = false;

  if (priceId === "" || priceId === undefined || priceId === null) {
    throw new Error(
      "received invalid type for isPriceIdForEvent() in eventsGateway" + priceId
    );
  }

  // search for this priceId
  const eventId = await getEventIdFromPriceId(priceId);
  console.log(eventId);
  if (eventId) {
    let isUsedForEvent = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId));

    // if array is 1, true. If 0, set to false.
    if (isUsedForEvent.length == 1) {
      isPriceIdUsedForEventOrMembership = true;
    } else if (isUsedForEvent.length == 0) {
      isPriceIdUsedForEventOrMembership = false;
    }
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
    .where(eq(ticketsEventIdLinks.eventId, 3)) // TODO WTF IS THIS
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
