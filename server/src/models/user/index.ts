import { Model, model } from "mongoose";

import { IUserDocument } from "../../interfaces/user";

import userSchema from "./schema";

import "./methods";
import "./statics";
import "./hooks";

interface IUserModel extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): IUserDocument;
}

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
