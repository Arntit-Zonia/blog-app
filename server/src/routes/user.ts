import express, { Router, Request, Response } from "express";

import errorHandler from "../controllers/errorHandler";

const router: Router = express.Router();

router.get(
  "/",
  errorHandler(async (req: Request, res: Response) => {
    res.send("Hello, World!");
  })
);

export default router;
