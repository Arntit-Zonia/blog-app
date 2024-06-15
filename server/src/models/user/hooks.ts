import bcrypt from "bcryptjs";

import { IUserDocument } from "../../interfaces/user";

import userSchema from "./schema";

userSchema.pre<IUserDocument>("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 8);

    user.password = hashedPassword;
  }

  next();
});

export default userSchema;
