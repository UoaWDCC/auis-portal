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
import { sendEmail } from "../mailer/mailer";
import { generateQRCode } from "../mailer/qrCode";

const getEvents = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json(Events);
  }
);

const getEventById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const event = Events.find((event: { _id: string }) => event._id === id);

    if (event) {
      res.json(event);
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  }
);

function isInt(value: any) {
  return (
    !isNaN(value) &&
    (function (x) {
      return (x | 0) === x;
    })(parseFloat(value))
  );
}

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
      if (!isInt(eventId)) {
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
      const temp = await db
        .select()
        .from(userTickets)
        .where(eq(userTickets.paid, true))
        .as("temp");
      console.log(temp);

      const eventTickets = await db
        .select({
          id: temp.id,
          userTicketCode: temp.peopleTicketCode,
          name: temp.name,
          attendance: temp.attendance,
        })
        .from(ticketsEventIdLinks)
        .where(eq(ticketsEventIdLinks.eventId, parseInt(eventId.toString())))
        .leftJoin(
          userTicketsTicketIdLinks,
          eq(ticketsEventIdLinks.ticketId, userTicketsTicketIdLinks.ticketId)
        )
        .rightJoin(temp, eq(userTicketsTicketIdLinks.userTicketId, temp.id));

      console.log(eventTickets);

      console.log();
      // console.log(`${"<img src=\"" + await generateQRCode("ABC12345") + "\"/>"}`)
      // sendEmail(await generateQRCode("testing123"), "gmat224@aucklanduni.ac.nz", "Gury", "Gury's Dance Workshop", "ABC12345")
      console.log("SENT EMAIL");

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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const updateAttendanceById = asyncHandler(
  async (
    req: Request<
      {},
      {},
      { data: { peopleTicketId: number; attendance: boolean } }
    >,
    res: Response
  ) => {
    console.log(req.body);
    try {
      let { data } = req.body;

      if (!data) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // await delay(1000); // 1-second delay

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

      const updateUserInfoOrNewUser = await db
        .update(userTickets)
        .set({
          // ticketId: data.ticketId,
          attendance: data.attendance,
        })
        .where(eq(userTickets.id, data.peopleTicketId))
        .returning({ name: userTickets.name });

      console.log(updateUserInfoOrNewUser[0].name);

      // if array is 1, true. If 0, set to false.

      // return eventTickets;

      res.status(200).json({
        message: "successfully updated user",
        name: updateUserInfoOrNewUser[0].name,
      });
    } catch (error) {
      res.status(500).json({
        message: "Unknown error occurred while trying to update user info",
      });
    }
  }
);

export {
  getEvents,
  getEventById,
  getEventAttendanceById,
  updateAttendanceById,
};

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

// <body style="background-image: linear-gradient(#07242F, #0F4A57); color: rgb(255 255 255);">
// <h2 style="font-size: 1.25rem;
// line-height: 1.75rem; text-align: center; padding-bottom: 0.5rem; padding-top: 2rem; font-weight:400;">(NAME), here is your ticket for: </h2>
// <h1 style="text-align:center; padding-top:1rem; padding-bottom:1rem; font-size:1.5rm; line-height:2rm; font-weight:400;">(EVENT)</h1>
// <div >
//   <h3 style="text-align:center; padding-bottom:0.5rem; font-weight:400;">Your ticket</h3>
//   <table width="100%" border="0" cellspacing="0" cellpadding="0">
// <tbody>
// <tr>
// <td align="center">

//    <img style="border-radius:0.75rem;" height="200" width="200" src=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOnSURBVO3BQY4jSQIDQWdA//+ybx3mwFMAQkrV07M0iz+Y+cdhphxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmvHgoCb9J5SYJTaUloam0JNyotCQ0lZaE36TyxGGmHGbKYaa8+DCVT0rCO1RaEm6S0FTeofIOlU9KwicdZsphphxmyosvS8I7VH6TyjuS0FSeSMI7VL7pMFMOM+UwU178xyThRqUloam0JPw/OcyUw0w5zJQXf7kkNJV3qNyo3CShqfzNDjPlMFMOM+XFl6l8k0pLwhMqLQlNpak8ofJvcpgph5lymCkvPiwJvykJTaUloam0JDyRhKZyk4R/s8NMOcyUw0x58ZDKv5lKS8JNEprKEyp/k8NMOcyUw0yJP/iiJNyo3CThN6m0JDSVmyTcqLQkNJU/6TBTDjPlMFNefJlKS8I7VG6ScKPSktBUWhKaSktCU7lRaUloKi0JTaUloal80mGmHGbKYabEH3xQEm5UWhLeofJJSXiHyk0SblRaEt6h8k2HmXKYKYeZ8uLDVG6S0FTekYSm8kkqN0loKr8pCU3lkw4z5TBTDjMl/uCBJDSVloSm0pLQVFoSmkpLQlNpSbhRaUloKjdJaCotCU3lHUl4h8oTh5lymCmHmRJ/8EFJaCotCU2lJaGp/E2S0FRuknCj0pJwo/LEYaYcZsphprz4siQ0lZaEptKS8A6VloSm0pLQVFoSmso7knCjcpOEG5VPOsyUw0w5zJT4gweS0FT+pCQ0lZaEpvKOJDSVPykJTeWJw0w5zJTDTIk/+KIk3Ki0JNyovCMJNyotCTcqLQmfpNKS0FS+6TBTDjPlMFPiD/5iSbhRaUl4h8pNEprKO5LQVG6ScKPyxGGmHGbKYaa8eCgJv0nlRqUloam0JDSVloQnktBU/s0OM+UwUw4z5cWHqXxSEm5UWhLeodKS8Ekq70hCU2kqLQmfdJgph5lymCkvviwJ71B5QqUloSWhqdyotCTcJOEJlZskNJVPOsyUw0w5zJQXf7kkPJGEptKS8IRKS0JTuUlCU2lJaCpPHGbKYaYcZsqL/xiVloQbld+k0pLQVG6S0FQ+6TBTDjPlMFNefJnKN6m0JNyo3CThCZUnknCj8k2HmXKYKYeZ8uLDkvAnqdwkoak8odKS8A6VloSbJNyoPHGYKYeZcpgp8Qcz/zjMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyU/wF0BL/l7v3TCgAAAABJRU5ErkJggg==></img>
//    </td>
// </tr>
// </tbody>
// </table>

//   <h3 style="text-align:center; padding-top:1rem; padding-bottom:1rem; font-weight:400">Ticket code: (TICKET CODE)</h3>
// </div>
// <p style="text-align:center;font-size: 1.125rem;
// line-height: 1.75rem; font-weight:400; padding-bottom:1rem">
//   Show this QR code at the entrance, where it will be scanned, to gain
//   entry to the event
// </p>
// <p style="text-align:center;font-size: 1.125rem;
// line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:0.5rem">Vist the AUIS Website for details about the event</p>
// <table width="100%" border="0" cellspacing="0" cellpadding="0">
// <tbody>
// <tr>
// <td align="center">

//    <a href="www.auis.co.nz" style="color:#3b82f6; padding-top:0.5rem; padding-bottom:0.5rem;">www.auis.co.nz</a>
//    </td>
// </tr>
// </tbody>
// </table>

// <p style="text-align:center;font-size: 1.125rem;
// line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:0.5rem">If you have any questions feel free to reach out to auindiansociety@gmail.com</p>
// <p style="text-align:center;font-size: 1.125rem;
// line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:5rem">This mailbox is not monitored so please do not reply to this email</p>
//     <p style="text-align:center;font-size: 1.125rem;
// line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:3rem">Kind Regards,<br/>AUIS</p>
// </body>
