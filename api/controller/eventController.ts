import { Request, Response } from "express";
import Events from "../db/sampleEvents";
import asyncHandler from "../middleware/asyncHandler";
import {
  ticketsEventIdLinks,
  userTickets,
  userTicketsTicketIdLinks,
} from "../schemas/schema";
import { eq } from "drizzle-orm";
import { db } from "../db/config/db";

const getEvents = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json(Events);
  }
);

const getEventById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const event = Events.find((event) => event._id === id);

    if (event) {
      res.json(event);
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  }
);

const getEventAttendanceById = asyncHandler(
  async (req: Request<{}, {}, { eventId: number }>, res: Response) => {
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    try {
      let { eventId: eventId } = req.query;

      if (!eventId) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // const session = req.session!;
      // const userId = session.getUserId();

      //get user email
      // const user = await getUser(userId);
      // const email = user?.emails[0];

      // let payload = {
      //   email,
      //   name,
      //   universityId,
      //   upi,
      //   yearOfStudy,
      //   fieldOfStudy,
      //   isDomestic,
      //   institution,
      // };

      // //insert user into peoples table here
      // await insertUserBySuperToken(payload as UpdateUserInfoBody);

      // //only updat metadata if it worked properly
      // await UserMetadata.updateUserMetadata(userId, {
      //   bIsUserInfoComplete: true,
      // });
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

      // if array is 1, true. If 0, set to false.

      // return eventTickets;

      res.status(200).json({
        message: "successfully found event tickets",
        eventTickets: eventTickets,
      });
    } catch (error) {
      res.status(500).json({
        message: "Unknown error occurred while trying to update user info",
      });
    }
  }
);

export { getEvents, getEventById, getEventAttendanceById };

// export async function updateUserTicket() {
//   console.log("I WAS CALLED")
//   // if (eventId < 0 || eventId === undefined || eventId === null) {
//   //   throw new Error(
//   //     "received invalid type for getUserTickets() in eventsGateway" + eventId
//   //   );
//   // }

//   // search for this priceId
//   let eventTickets = await db
//     .select({
//       id: userTickets.id,
//       userTicketCode: userTickets.peopleTicketCode,
//       name: userTickets.name,

//     })
//     .from(ticketsEventIdLinks)
//     .where(eq(ticketsEventIdLinks.eventId, 3))
//     .leftJoin(
//       userTicketsTicketIdLinks,
//       eq(ticketsEventIdLinks.ticketId, userTicketsTicketIdLinks.ticketId)
//     )
//     .leftJoin(userTickets, eq(userTicketsTicketIdLinks.userTicketId, userTickets.id));

//   console.log(eventTickets)

//   // if array is 1, true. If 0, set to false.

//   return eventTickets;
// }
