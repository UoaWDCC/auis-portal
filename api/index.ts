import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { config } from 'dotenv';

// Import Routers
import helloRoutes from './routes/hello';
import eventRoutes from './routes/eventRoutes';
import authRoutes from "./routes/authRoutes";
import creditRoutes from "./routes/creditRoutes";
import adminRoutes from "./routes/adminRoutes";
import photoRoutes from "./routes/photoRoutes";

import {errorHandler, notFound} from "./middleware/errorMiddleware";

const app = express();
config();

// const databaseUrl: string = process.env.DATABASE_URL!;
// connect(databaseUrl);

app.use(json());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/hello', helloRoutes);
app.use('/api/events',eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/credits', creditRoutes);
// We are yet to add middleware for authenication and authorization to protect admin routes
app.use('/api/admin', adminRoutes);
app.use('/api/photos', photoRoutes);

// The custom handlers in /middleware need to be below Routes
app.use(notFound);
app.use(errorHandler);


const port = Number.parseInt(process.env.PORT || '4000');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
