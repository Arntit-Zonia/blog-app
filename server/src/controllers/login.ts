import { Request, Response } from "express";

import User from "../models/user";
import setTokenCookie from "../utils/setCookie";

const login = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  const token = await user.generateAuthToken();

  if (!user) {
    res.status(404).send("User not found");

    return;
  }

  setTokenCookie(res, "token", token);

  res.status(200).send({ user });
};

export default login;
