import { Request, Response } from "express";

import User from "../models/user";
import setTokenCookie from "../utils/setCookie";

const OAuth = async (req: Request, res: Response): Promise<void> => {
  const { email, token } = req.body;

  if (!email || !token) {
    !email ? res.status(400).send("Email is required") : res.status(400).send("Token is required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    existingUser.tokens.push({ token });

    await existingUser.save();

    setTokenCookie(res, "token", token);

    res.status(200).send(existingUser);

    return;
  }

  const user = new User({
    username: req.body.username,
    email,
    // generate random password
    password: Math.random().toString(36).slice(-8),
    profilePicture: req.body.profilePicture,
    isOAuth: req.body.isOAuth,
  });

  user.tokens.push({ token });

  await user.save();

  setTokenCookie(res, "token", token);

  res.status(201).send(user);
};

export default OAuth;
