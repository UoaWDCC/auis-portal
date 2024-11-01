import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";

// Import Routers
import helloRoutes from "./routes/hello";
import eventRoutes from "./routes/eventRoutes";
import authRoutes from "./routes/authRoutes";
import creditRoutes from "./routes/creditRoutes";
import adminRoutes from "./routes/adminRoutes";
import photoRoutes from "./routes/photoRoutes";
import stripeRoutes from "./routes/stripeRoutes";

import { errorHandler, notFound } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";

const app = express();
config();

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

app.use(cors());
app.use(express.static("public"));

// Routes
app.use("/hello", helloRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/credits", creditRoutes);
// We are yet to add middleware for authenication and authorization to protect admin routes
app.use("/api/admin", adminRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api", userRoutes); //Demo Route on how to work with Drizzle

//StripeJS
app.use("/api/stripe", stripeRoutes);

// The custom handlers in /middleware need to be below Routes
app.use(notFound);
app.use(errorHandler);

//const port = Number.parseInt(process.env.PORT || "4000");
const port = 3000; // Or whichever port your application listens on

// Specify the host parameter as '0.0.0.0' to listen on all network interfaces
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port ${port}`);
});
