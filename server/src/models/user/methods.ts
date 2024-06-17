import jwt, { Secret } from "jsonwebtoken";

import { IUserDocument } from "../../interfaces/user";

import userSchema from "./schema";

userSchema.methods.toJSON = function () {
  const user = this as IUserDocument;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this as IUserDocument;
  const secret = process.env.JWT_SECRET as Secret;

  const token = jwt.sign({ _id: user._id.toString() }, secret);

  user.tokens.push({ token });

  await user.save();

  return token;
};

export default userSchema;
