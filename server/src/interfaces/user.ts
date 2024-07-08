import { Document } from "mongoose";

export interface IUserDocument extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  tokens: { token: string }[];
  currentToken: string;
  generateAuthToken(): Promise<string>;
  profilePicture: string;
  isOAuth: boolean;
}
