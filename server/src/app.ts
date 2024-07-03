import express, { Express } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user";
import errorHandler from "./middleware/errorHandler";

const app: Express = express();

const CLIENT_URL = process.env.CLIENT_URL || process.env.DEV_CLIENT_URL;

const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

app.use(errorHandler);

export default app;
