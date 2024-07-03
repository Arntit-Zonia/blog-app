import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Response, NextFunction } from "express";

import User from "../models/user";
import { IRouteHandler } from "../interfaces/controllers";
import { IAuthenticatedRequest } from "../interfaces/middleware";

const auth: IRouteHandler = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET as Secret;

    if (!token || !secret) throw new Error(!token ? "No token provided" : "No secret provided");

    const verifiedToken = jwt.verify(token, secret) as JwtPayload;
    const user = await User.findOne({ _id: verifiedToken._id, "tokens.token": token });

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send({ error: "Please authenticate" });
  }
};

export default auth;
