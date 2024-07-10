import { Response } from "express";

import { IAuthenticatedRequest } from "../interfaces/middleware";

const logout = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
  const user = req.user;

  if (!user) {
    res.status(404).send("User not found");

    return;
  }

  user.tokens = user.tokens.filter((token) => token.token !== req.token);

  await user.save();

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).send({ loggedOutUser: user });
};

export default logout;
