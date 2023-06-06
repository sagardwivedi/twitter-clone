import { prisma } from ".";
import { RegisterBody } from "../api/auth/register.post";

import { hashSync } from "bcrypt";

type UserDataProps = Omit<RegisterBody, "repeatPassword">;

export const createUser = (userData: UserDataProps) => {
  const finalUserData = {
    ...userData,
    password: hashSync(userData.password, 10),
  };

  return prisma.user.create({
    data: finalUserData,
  });
};

export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username: username,
    },
  });
};
