import { Document } from "mongoose";

export interface IUserDocument extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  tokens: { token: string }[];
  generateAuthToken(): Promise<string>;
}
