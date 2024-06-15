import { userSchema } from ".";

import jwt from "jsonwebtoken";

import { IUserDocument } from "../../interfaces/user";

userSchema.methods.generateAuthToken = async function () {
  const user = this as IUserDocument;
  const secret = process.env.JWT_SECRET as jwt.Secret;

  const token = jwt.sign({ _id: user._id.toString() }, secret);

  user.tokens.push({ token });

  await user.save();

  return token;
};

export default userSchema;
