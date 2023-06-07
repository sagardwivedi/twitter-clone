import { prisma } from ".";

interface refreshTokenProps {
  token: string;
  userId: string;
}

export const createRefreshToken = ({ token, userId }: refreshTokenProps) => {
  return prisma.refreshToken.create({
    data: {
      token: token,
      userId: userId,
    },
  });
};

export const getRefreshTokenByToken = (token?: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};
