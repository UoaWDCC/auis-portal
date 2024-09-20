import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  isTicketAvailableByEventId,
  reserveTicket,
  releaseReservedTicket,
  completeTicketPurchase,
} from "../gateway/eventsGateway";
import Stripe from "stripe"; //Types and Interfaces
import { stripe } from "../stripe/stripe";

// Create a checkout session based on priceId. Send a client secret back (cs_ABCD123)
export const createEventCheckoutSession = asyncHandler(
  async (req: Request, res: Response) => {
    const { priceId, eventId } = req.body;

    // if priceId is undefined, send a 404 back.
    if (priceId == undefined || priceId == "") {
      return res
        .send({
          error:
            "This event does not exist, or is not available for sale at the moment.",
        })
        .status(404);
    }

    //check eventId validity
    if (!eventId || eventId == "") {
      return res
        .send({
          error:
            "This event does not exist, or is not available for sale at the moment.",
        })
        .status(404);
    }

    let ticketAvailable = await isTicketAvailableByEventId(eventId);

    if (ticketAvailable == false) {
      return res.send({
        error:
          "There are no tickets available for this event. Please come back later to see if more tickets become available.",
      });
    } else {
      reserveTicket(0);
    }

    // epoch time in seconds, 30mins timeout
    let session_expiry = Math.floor(new Date().getTime() / 1000 + 30 * 60);

    try {
      const session = await stripe.checkout.sessions.create({
        //do not change anything below
        ui_mode: "embedded",
        expires_at: session_expiry,
        line_items: [
          {
            // Provide the exact Price ID (pr_1234) of the product on sale
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        currency: "NZD",
        return_url: `${process.env.DOMAIN_FRONTEND}return?session_id={CHECKOUT_SESSION_ID}`,

        //changeable below:
        // use metadata property
        metadata: { eventId: `${eventId}` },
      });

      res.send({ clientSecret: session.client_secret });
    } catch (error) {
      res.send({ error }).status(404);
    }
  }
);

export const getSessionStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id as string
    );

    res.send({
      status: session.status,
      customer_email: session.customer_details?.email,
    });
  }
);

export const templateFunction = asyncHandler(
  async (req: Request, res: Response) => {
    throw new Error("Not implemented yet");
  }
);
