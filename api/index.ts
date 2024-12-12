import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";

//supertokens
import supertokens from "supertokens-node";
import {
  createRoles,
  getConfiguredRecipeList,
} from "./supertokens/supertokens";
import { middleware, errorHandler } from "supertokens-node/framework/express";

// Import Routers
import userRoutes from "./routes/userRoutes";
import stripeRoutes from "./routes/stripeRoutes";
import eventRoutes from "./routes/execRoutes";

import { notFound } from "./middleware/errorMiddleware";

const app = express();
config();

try {
  supertokens.init({
    // debug: true,
    framework: "express",
    supertokens: {
      connectionURI: `${process.env.DOMAIN_SUPERTOKENS}`,
      apiKey: `${process.env.SUPERTOKENS_API_KEY}`,
    },
    appInfo: {
      appName: "AUIS",
      apiDomain: `${process.env.DOMAIN_API}`,
      websiteDomain: `${process.env.DOMAIN_FRONTEND}`,
      apiBasePath: "/api/auth",
      websiteBasePath: "/signup",
    },
    recipeList: getConfiguredRecipeList(),
  });
} catch (error) {
  console.log(error);
}

//init user and admin roles in supertokens
createRoles();

// CORS config.
app.use(
  cors({
    origin: [
      `${process.env.DOMAIN_FRONTEND}`, //FE
      `${process.env.DOMAIN_STRAPI}`, //Strapi
      `${process.env.DOMAIN_SUPERTOKENS}`, //ST user Dashboard
      `${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`, //DB
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Origin",
      "Access-Control-Allow-Origin",
      "Accept",
      "Options",
      "X-Requested-With",
      "st-auth-mode",
      ...supertokens.getAllCORSHeaders(),
    ],
    credentials: true,
  })
);

// Supertokens middleware.
app.use(middleware());
app.use(express.static("public"));

// @Ratchet7x5: INFO: Use JSON parser for all non-webhook routes
//              otherwise, webhook and db entries will fail
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (req.originalUrl === "/api/stripe/webhook") {
      //console.log(req.originalUrl);
      next();
    } else {
      express.json()(req, res, next);
    }
  }
);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/stripe", stripeRoutes);

// The custom handlers in /middleware need to be below Routes
app.use(notFound);
app.use(errorHandler());

const port = Number.parseInt(process.env.PORT || "3000");

// Specify the host parameter as '0.0.0.0' to listen on all network interfaces
app.listen(port, "0.0.0.0", () => {
  console.log(`Backend is now listening on port :${port}`);
  console.log(`Backend env vars : 
     NODE_ENV=${process.env.NODE_ENV}
     PORT=${process.env.PORT},
     DATABASE_URL=${process.env.DATABASE_URL},
     DATABASE_HOST=${process.env.DATABASE_HOST},
     DATABASE_PORT=${process.env.DATABASE_PORT},
     DATABASE_USERNAME=${process.env.DATABASE_USERNAME},
     DATABASE_PASSWORD=${process.env.DATABASE_PASSWORD},
     DATABASE_DB=${process.env.DATABASE_DB},
     DOMAIN_API=${process.env.DOMAIN_API},
     DOMAIN_FRONTEND=${process.env.DOMAIN_FRONTEND},
     DOMAIN_STRAPI=${process.env.DOMAIN_STRAPI},
     DOMAIN_SUPERTOKENS=${process.env.DOMAIN_SUPERTOKENS},
     DOMAIN_DB=${process.env.DOMAIN_DB},
     SUPERTOKENS_PORT=${process.env.SUPERTOKENS_PORT},
     STRIPE_SECRET_KEY=${process.env.STRIPE_SECRET_KEY},
     STRIPE_WEBHOOK_ENDPOINT=${process.env.STRIPE_WEBHOOK_ENDPOINT},
     GOOGLE_CLIENT_ID=${process.env.GOOGLE_CLIENT_ID},
     GOOGLE_CLIENT_SECRET=${process.env.GOOGLE_CLIENT_SECRET},
     SUPERTOKENS_API_KEY=${process.env.SUPERTOKENS_API_KEY},
     SMTP_HOST=${process.env.SMTP_HOST},
     SMTP_PORT=${process.env.SMTP_PORT},
     SMTP_USER=${process.env.SMTP_USER},
     SMTP_PASS=${process.env.SMTP_PASS}`);
});
