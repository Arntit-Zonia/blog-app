import { Response } from "express";

import { IAuthenticatedRequest } from "../interfaces/middleware";
import { IUserDocument } from "../interfaces/user";

const updateUser = async ({ user, body }: IAuthenticatedRequest, res: Response): Promise<void> => {
  const allowedUpdates = ["username", "email", "password", "profilePicture"];
  const updates = Object.keys(body).filter((update) => update !== "isOAuth");
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send("Invalid update");

    return;
  }

  updates.forEach((update) => ((user as IUserDocument & { [key: string]: any })[update] = body[update]));

  await user!.save();

  res.status(200).send(user);
};

export default updateUser;
