import { MediaFile, Tweet, User } from ".prisma/client";

export function exclude<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj as Omit<T, K>;
}

// Excluded fields for different objects
export const excludedTweetFields: (keyof Tweet)[] = [
  "authorId",
  "createdAt",
  "replyToId",
  "updatedAt",
];

export const excludedMediaFileFields: (keyof MediaFile)[] = [
  "UserId",
  "createdAt",
  "providerPublicId",
  "tweetId",
  "updatedAt",
];

export const excludedAuthorFields: (keyof User)[] = [
  "password",
  "createdAt",
  "updatedAt",
];
