import { Response, NextFunction } from "express";

import { IAuthenticatedRequest } from "./middleware";

export interface IRouteHandler {
  (req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}
