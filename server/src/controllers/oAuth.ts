import { Request, Response } from "express";

import User from "../models/user";

const OAuth = async (req: Request, res: Response): Promise<void> => {
  console.log("body", req.body);

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    console.log("testing existingUser ====>", {
      existingUserTokens: existingUser.tokens,
      currentToken: req.body.currentToken,
    });

    existingUser.tokens.push({ token: req.body.currentToken });

    await existingUser.save();

    res.status(200).send(existingUser);

    return;
  }

  const { username, email, tokens, profilePicture } = req.body;

  const user = new User({
    username,
    email,
    // generate random password
    password: Math.random().toString(36).slice(-8),
    tokens,
    profilePicture,
  });

  await user.save();

  res.status(201).send(user);
};

export default OAuth;
