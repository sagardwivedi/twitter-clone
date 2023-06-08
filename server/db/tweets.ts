import { prisma } from ".";
import { TweetData } from "../api/user/tweets/index.post";

type GetTweetsParams = {
  include?: {
    mediaFile?: boolean;
    author?: boolean;
    replies?: {
      include?: {
        author?: boolean;
      };
    };
    replyTo?: {
      include?: {
        author?: boolean;
      };
    };
  };
  orderBy?: {
    createdAt: "desc" | "asc";
  }[];
};

export const createTweet = (data: TweetData) => {
  return prisma.tweet.create({
    data: {
      text: data.text ?? "",
      authorId: data.authorId ?? "",
      replyToId: data.replyToId ?? "",
    },
  });
};

export const getTweets = (params?: GetTweetsParams) => {
  return prisma.tweet.findMany({
    include: {
      ...params?.include,
      replies: {
        include: {
          ...params?.include?.replies?.include,
        },
      },
    },
    orderBy: params?.orderBy ? [...params.orderBy] : undefined,
  });
};
