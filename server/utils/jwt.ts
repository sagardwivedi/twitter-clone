import { User } from ".prisma/client";
import { H3Event } from "h3";
import jwt from "jsonwebtoken";

const generateAccessTokens = (user: User | null): string => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user?.id }, config.jwtAccessToken, {
    expiresIn: "10m",
  });
};

const generateRefreshTokens = (user: User | null): string => {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user?.id }, config.jwtRefreshToken, {
    expiresIn: "4h",
  });
};

export const decodeAccessToken = (token?: string) => {
  const config = useRuntimeConfig();

  try {
    if (token) {
      return jwt.verify(token, config.jwtAccessToken);
    }
  } catch (error) {
    return null;
  }
};

export const decodeRefreshToken = (token?: string) => {
  const config = useRuntimeConfig();

  try {
    if (token) {
      return jwt.verify(token, config.jwtRefreshToken);
    }
  } catch (error) {
    return null;
  }
};

export const generateTokens = (user: User | null) => {
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
