import { User } from ".prisma/client";
import { H3Event } from "h3";
import jwt from "jsonwebtoken";

const generateAccessTokens = (user: User) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtAccessToken, {
    expiresIn: "10m",
  });
};

const generateRefreshTokens = (user: User) => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtAccessToken, {
    expiresIn: "4h",
  });
};

export const generateTokens = (user: User) => {
  const accessToken = generateAccessTokens(user);
  const refreshToken = generateRefreshTokens(user);

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const sendRefreshToken = (event: H3Event, token: string) => {
  setCookie(event, "refreshToken", token, {
    httpOnly: true,
    sameSite: true,
  });
};
