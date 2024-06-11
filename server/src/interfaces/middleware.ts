import { Request } from "express";

import { IUserDocument } from "../interfaces/user";

export interface IAuthenticatedRequest extends Request {
  user?: IUserDocument;
  token?: string;
}
