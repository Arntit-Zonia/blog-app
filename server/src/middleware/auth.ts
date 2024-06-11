import jwt, { JwtPayload, Secret } from "jsonwebtoken";

import User from "../models/users";

import { IRouteHandler } from "../interfaces/controllers";

const auth: IRouteHandler = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET as Secret;

    if (!token || !secret) throw new Error(!token ? "No token provided" : "No secret provided");

    const verifiedToken = jwt.verify(token, secret) as JwtPayload;
    const user = await User.findOne({ _id: verifiedToken, "tokens.token": token });

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
