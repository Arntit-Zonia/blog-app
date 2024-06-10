import { Schema, Model, model } from "mongoose";

import validator from "validator";
import bcrypt from "bcryptjs";

import { IUserDocument } from "../interfaces/user";

interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Please provide a valid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain 'password'");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.pre<IUserDocument>("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 8);

    user.password = hashedPassword;
  }

  next();
});

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
