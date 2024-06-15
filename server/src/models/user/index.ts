import { Schema, Model, model } from "mongoose";

import validator from "validator";

import { IUserDocument } from "../../interfaces/user";

import "./methods";
import "./statics";
import "./hooks";

interface IUserModel extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): IUserDocument;
}

export const userSchema = new Schema<IUserDocument>(
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
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
);

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
