import express, { Express } from "express";

import userRouter from "./routes/user";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

export default app;
