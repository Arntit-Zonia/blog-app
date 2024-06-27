export interface IUser {
  username?: string;
  email: string;
  password?: string;
  profilePicture?: string;
  tokens?: { token: string }[];
  currentToken?: string;
}
