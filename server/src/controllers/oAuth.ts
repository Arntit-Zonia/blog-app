import { Request, Response } from "express";

import User from "../models/user";
import setTokenCookie from "../utils/setCookie";

const OAuth = async (req: Request, res: Response): Promise<void> => {
  console.log("body", req.body);

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    console.log("testing existingUser ====>", {
      existingUserTokens: existingUser.tokens,
      token: req.body.token,
    });

    existingUser.tokens.push({ token: req.body.token });

    await existingUser.save();

    res.status(200).send(existingUser);

    return;
  }

  const { username, email, profilePicture, token, isOath } = req.body;

  const user = new User({
    username,
    email,
    // generate random password
    password: Math.random().toString(36).slice(-8),
    profilePicture,
    isOath,
  });

  user.tokens.push({ token });

  await user.save();

  setTokenCookie(res, "token", token);

  res.status(201).send(user);
};

export default OAuth;
