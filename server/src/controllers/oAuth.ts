import { Request, Response } from "express";

import User from "../models/user";
import setTokenCookie from "../utils/setCookie";

const OAuth = async (req: Request, res: Response): Promise<void> => {
  const { username, email, profilePicture, token, isOAuth } = req.body;

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    existingUser.tokens.push({ token: req.body.token });

    await existingUser.save();

    setTokenCookie(res, "token", token);

    res.status(200).send(existingUser);

    return;
  }

  const user = new User({
    username,
    email,
    // generate random password
    password: Math.random().toString(36).slice(-8),
    profilePicture,
    isOAuth,
  });

  user.tokens.push({ token });

  await user.save();

  setTokenCookie(res, "token", token);

  res.status(201).send(user);
};

export default OAuth;
