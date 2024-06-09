import { Request, Response, NextFunction } from "express";

interface IErrorHandler {
  (err: Error, req: Request, res: Response, next: NextFunction): void;
}

interface ICustomError extends Error {
  status?: number;
}

/**
 * Catches errors originating from other middleware functions
 *
 * @param {Error} err - error obj
 * @param {Object} _req - req obj (not used)
 * @param {Object} res - sends the error response
 * @param {Function} _next - next middleware function in the stack (not used)
 */
const errorHandler: IErrorHandler = (err: ICustomError, _req, res, _next) => {
  const errorMessage = err.message || "Internal Server Error";

  console.error(errorMessage);

  res.status(err.status || 500).send({ error: errorMessage });
};

export default errorHandler;
