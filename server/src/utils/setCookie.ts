import { Response } from "express";

const setTokenCookie = (res: Response, tokenName: string, token: string): void => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });
};

export default setTokenCookie;
