import bcrypt from "bcryptjs";

import { userSchema } from ".";
import { IUserDocument } from "../../interfaces/user";

userSchema.pre<IUserDocument>("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 8);

    user.password = hashedPassword;
  }

  next();
});

export default userSchema;
