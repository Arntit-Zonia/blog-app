import { Request, Response } from "express";

import User from "../models/user";

const register = async (req: Request, res: Response): Promise<void> => {
  const user = new User(req.body);
  const token = await user.generateAuthToken();

  await user.save();

  res.status(201).send({ user, token });
};

export default register;
