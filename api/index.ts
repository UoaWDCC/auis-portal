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

import { notFound } from "./middleware/errorMiddleware";

const app = express();
config();

supertokens.init({
  debug: true,
  framework: "express",
  supertokens: {
    connectionURI: `${process.env.DOMAIN_SUPERTOKENS}`,
    apiKey: `${process.env.SUPERTOKENS_API_KEY}`,
  },
  appInfo: {
    appName: "AUIS",
    apiDomain: "http://localhost:3000",
    websiteDomain: `${process.env.DOMAIN_FRONTEND}`,
    apiBasePath: "/api/auth",
    websiteBasePath: "/signup",
  },
  recipeList: getConfiguredRecipeList(),
                });

//init user and admin roles in supertokens
createRoles();

// CORS config.
app.use(
  cors({
    origin: [
      `${process.env.DOMAIN_FRONTEND}`, //FE
      `${process.env.DOMAIN_STRAPI}`, //Strapi
      `${process.env.DOMAIN_SUPERTOKENS}`, //ST user Dashboard
      `${process.env.DOMAIN_DB}`, //DB
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "st-auth-mode",
      "content-type",
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

//StripeJS
app.use("/api/stripe", stripeRoutes);

// The custom handlers in /middleware need to be below Routes
app.use(notFound);
app.use(errorHandler());

const port = Number.parseInt(process.env.PORT || "3000");

// Specify the host parameter as '0.0.0.0' to listen on all network interfaces
app.listen(port, "0.0.0.0", () => {
  console.log(`Backend is now listening on port :${port}`);
});
