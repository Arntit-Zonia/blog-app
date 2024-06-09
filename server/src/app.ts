import express, { Express } from "express";

import userRouter from "./routes/user";
import errorHandler from "./middleware/errorHandler";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

app.use(errorHandler);

export default app;
