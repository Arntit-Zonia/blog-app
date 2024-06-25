import { Request, Response } from "express";

import User from "../models/user";

const OAuthLogin = async (req: Request, res: Response): Promise<void> => {
  console.log("body", req.body);

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    res.status(404).send("User already exists");

    return;
  }

  const { username, email, tokens, profilePicture } = req.body;

  const user = new User({
    username,
    email,
    // initial google account password
    password: Math.random().toString(36).slice(-8),
    tokens,
    profilePicture,
  });

  await user.save();

  res.status(201).send(user);
};

export default OAuthLogin;
