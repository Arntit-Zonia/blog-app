import { Request, Response } from "express";

import User from "../models/user";
import setTokenCookie from "../utils/setCookie";

const register = async (req: Request, res: Response): Promise<void> => {
  const user = new User(req.body);
  const token = await user.generateAuthToken();

  await user.save();

  setTokenCookie(res, "token", token);

  res.status(201).send({ user });
};

export default register;
