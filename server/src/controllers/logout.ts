import { Request, Response } from "express";

import User from "../models/user";

const logout = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).send("User not found");

    return;
  }

  user.tokens = user.tokens.filter((token) => token.token !== req.body.currentToken);

  await user.save();

  res.status(200).send({ loggedOutUser: user });
};

export default logout;
