import { Request, Response, NextFunction } from "express";

import { IRouteHandler } from "../interfaces/controllers";

/**
 * Wraps route handler to catch and handle errors.
 * @param {Function} routeHandler - Function that is wrapped with the error handling.
 * @returns {Function} Middleware function with error handling.
 */
const errorHandler = (routeHandler: IRouteHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await routeHandler(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default errorHandler;
