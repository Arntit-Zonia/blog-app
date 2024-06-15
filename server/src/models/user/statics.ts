import bcrypt from "bcryptjs";

import User from ".";

import { IUserDocument } from "../../interfaces/user";

import userSchema from "./schema";

userSchema.statics.findByCredentials = async (email, password): Promise<IUserDocument> => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Email not found");

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) throw new Error("Password does not match");

  return user;
};

export default userSchema;
