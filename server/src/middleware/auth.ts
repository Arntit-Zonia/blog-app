import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";

import { IUserDocument } from "../interfaces/user";

import User from "../models/user";

interface IAuthReq extends Request {
  body: IUserDocument;
  user?: IUserDocument;
  token?: string;
}

const auth = async (req: IAuthReq, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET as Secret;

    if (!token || !secret) throw new Error(!token ? "No token provided" : "No secret provided");

    let user: IUserDocument | null = null;

    if (req.body.isOAuth) {
      user = await User.findOne({ email: req.body.email, "tokens.token": token });
    } else {
      const verifiedToken = jwt.verify(token, secret) as JwtPayload;

      if (!verifiedToken) {
        throw new Error("Invalid token");
      }

      user = await User.findOne({ _id: verifiedToken._id, "tokens.token": token });
    }

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
