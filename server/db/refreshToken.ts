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
