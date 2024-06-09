import express, { Router, Request, Response } from "express";

import errorHandler from "../controllers/errorHandler";
import User from "../models/users";

const router: Router = express.Router();

router.post(
  "/signup",
  errorHandler(async (req: Request, res: Response) => {
    const user = new User(req.body);

    await user.save();

    res.status(201).send(user);
  })
);

export default router;
