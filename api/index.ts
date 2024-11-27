import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";

//supertokens
import supertokens from "supertokens-node";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import { middleware, errorHandler } from "supertokens-node/framework/express";

// Import Routers
import userRoutes from "./routes/userRoutes";
import stripeRoutes from "./routes/stripeRoutes";

import { notFound } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";

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
  recipeList: [
    EmailPassword.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,

            // override the email password sign up function
            signUp: async function (input) {
              // TODO: some pre sign up logic

              let response = await originalImplementation.signUp(input);

              if (
                response.status === "OK" &&
                response.user.loginMethods.length === 1 &&
                input.session === undefined
              ) {
                // TODO: some post sign up logic
                await UserMetadata.updateUserMetadata(response.user.id, {
                  bIsUserInfoComplete: false,
                  bIsMembershipPaymentComplete: false,
                });
              }

              return response;
            },
          };
        },
      },
    }),
    ThirdParty.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            signInUp: async function (input) {
              let response = await originalImplementation.signInUp(input);

              if (response.status === "OK") {
                if (input.session === undefined) {
                  if (
                    response.createdNewRecipeUser &&
                    response.user.loginMethods.length === 1
                  ) {
                    // TODO: some post sign up logic
                    await UserMetadata.updateUserMetadata(response.user.id, {
                      bIsUserInfoComplete: false,
                      bIsMembershipPaymentComplete: false,
                    });
                  }
                }
              }

              return response;
            },
          };
        },
      },
      signInAndUpFeature: {
        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
                  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
                },
              ],
            },
          },
        ],
      },
    }),
    Session.init(), // initializes session features
    Dashboard.init(),
    UserMetadata.init(),
  ],
});

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
app.use("/hello", helloRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/credits", creditRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/photos", photoRoutes);
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
