import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("Serving Blog App");
});

export default router;
