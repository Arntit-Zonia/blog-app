import { Request, Response } from "express";

import User from "../models/users";

const signup = async (req: Request, res: Response): Promise<void> => {
  const user = new User(req.body);

  await user.save();

  res.status(201).send(user);
};

export default signup;
