import { prisma } from ".";

interface mediaDataProps {
  url: string;
  providerPublicId: string;
  UserId: string;
  tweetId: string;
}

export const createMediaFile = (mediaFile: mediaDataProps) => {
  return prisma.mediaFile.create({
    data: mediaFile,
  });
};
