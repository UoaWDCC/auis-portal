import express, { Request, Response, Router, json } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  isTicketAvailableByPriceId,
  reserveTicket,
  releaseReservedTicket,
  completeTicketPurchase,
  isPriceIdForEvent,
} from "../gateway/eventsGateway";
import { updateUserMembershipExpiryDate } from "../gateway/userGateway";
import Stripe from "stripe"; //Types and Interfaces
import { stripe } from "../stripe/stripe";
import { getUser } from "supertokens-node";

const endpointSecret: string = process.env.STRIPE_WEBHOOK_ENDPOINT as string;

export const createCheckout = asyncHandler(
  async (req: Request, res: Response) => {
    const { priceId, userTicketId } = req.body;
    const session = req.session!;
    let email;

    if (session) {
      const user = await getUser(session.getUserId());
      email = user?.emails[0];
    } else {
      // set to undefined so user manually fills out their email
      email = undefined;
    }

    // if priceId is undefined, send a 404 back.
    if (!priceId) {
      return res
        .send({
          error:
            "This event does not exist, or is not available for sale at the moment.",
        })
        .status(404);
    }

    //check if priceId is for event. If not, then set isEventTicket to 'n'.
    let isEventTicket = (await isPriceIdForEvent(priceId)) ? "y" : "n";

    if (isEventTicket === "y") {
      if (!userTicketId) {
        return res.send({
          error: "UserTicketId provided was invalid.",
        });
      } else {
        let ticketAvailable = await isTicketAvailableByPriceId(priceId);
        if (!ticketAvailable) {
          return res.status(400).send({
            error:
              "There are no tickets available for this event. Please come back later to see if more tickets become available.",
          });
        } else {
          reserveTicket(priceId);
        }
      }
    } else if (isEventTicket === "n") {
      // do nothing
    }

    // epoch time in seconds, 30mins timeout
    let session_expiry = Math.floor(new Date().getTime() / 1000 + 30 * 60);

    try {
      const session = await stripe.checkout.sessions.create({
        //do not change anything below
        ui_mode: "embedded",
        customer_email: email,
        expires_at: session_expiry,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        currency: "NZD",
        return_url: `${process.env.DOMAIN_FRONTEND}/return?session_id={CHECKOUT_SESSION_ID}`,
        allow_promotion_codes: true,

        //changeable below:
        metadata: {
          priceId: `${priceId}`,
          isEventTicket: `${isEventTicket}`,
          userTicketId: userTicketId,
        },
      });

      res.send({ clientSecret: session.client_secret });
    } catch (error) {
      res.send({ error }).status(404);
      return;
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

export const handleWebhook = asyncHandler(
  async (req: express.Request, res: express.Response): Promise<void> => {
    const sig = req.headers["stripe-signature"] as string | string[] | Buffer;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

      if (event.type === "checkout.session.completed") {
        const session: Stripe.Checkout.Session = event.data.object;
        if (
          !(
            !session.metadata &&
            !session.metadata!["priceId"] &&
            !session.metadata!["isEventTicket"]
          )
        ) {
          if (session.metadata!["isEventTicket"] === "y") {
            completeTicketPurchase(session.id);
          } else if (session.metadata!["isEventTicket"] === "n") {
            updateUserMembershipExpiryDate(session.id);
          }
        }
      } else if (event.type === "checkout.session.expired") {
        const session = event.data.object;

        if (
          !session.metadata &&
          !session.metadata!["priceId"] &&
          !session.metadata!["isEventTicket"]
        ) {
          if (session.metadata!["isEventTicket"] === "y") {
            releaseReservedTicket(session.metadata!["priceId"]);
          }
        }
      }
    } catch (err) {
      console.log(`Webhook Error: ${err}`);
      res.status(400).send(`Webhook Error: ${err}`);
      return;
    }

    res.json({ received: true });
  }
);
