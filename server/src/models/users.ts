import { Document, Schema, Model, model } from "mongoose";

interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

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
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
