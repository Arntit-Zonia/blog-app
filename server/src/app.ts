import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Serving Blog App");
});

export default app;
