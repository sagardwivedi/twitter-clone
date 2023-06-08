import { MediaFile, Tweet, User } from ".prisma/client";
import { getTweets } from "../../db/tweets";
import {
  excludedAuthorFields,
  excludedMediaFileFields,
  excludedTweetFields,
} from "../../utils/exclude";
import human from "humanize-duration";

export default defineEventHandler(async (event) => {
  // Fetch tweets from the database
  const tweets = await getTweets({
    include: {
      mediaFile: true,
      author: true,
      replies: { include: { author: true } },
      replyTo: { include: { author: true } },
    },
    orderBy: [{ createdAt: "desc" }],
  });

  // Format the tweets
  const formattedTweets = tweets.map((tweet) => {
    // Exclude specified fields from the author object
    const excludeAuthor = (
      author: (User & { handle?: string }) | undefined
    ) => {
      if (author) {
        const excludedAuthor = exclude(author, excludedAuthorFields);
        excludedAuthor.handle = `@${author.username}`;
        return excludedAuthor;
      }
      return null;
    };

    // Exclude specified fields from media files array
    const excludeMediaFiles = (mediaFiles: MediaFile[] | undefined) => {
      if (mediaFiles) {
        return mediaFiles.map((file) => exclude(file, excludedMediaFileFields));
      }
      return [];
    };

    // Exclude specified fields from replies array and include excluded author
    const excludeReplies = (replies: Tweet[]) => {
      if (replies) {
        return replies.map((reply) => ({
          ...exclude(reply, excludedTweetFields),
          author: excludeAuthor(tweet.author),
        }));
      }
      return [];
    };

    // Exclude specified fields from replyTo object and include excluded author
    const excludeReplyTo = (replyTo: Tweet | null | undefined) => {
      if (replyTo) {
        return {
          ...exclude(replyTo, excludedTweetFields),
          author: excludeAuthor(tweet.author),
        };
      }
      return null;
    };

    // Format the current tweet object
    const formattedTweet = {
      ...exclude(tweet, excludedTweetFields), // Exclude specified fields from the tweet
      mediaFile: excludeMediaFiles(tweet.mediaFile), // Exclude specified fields from media files array
      author: excludeAuthor(tweet.author), // Exclude specified fields from the author
      replies: excludeReplies(tweet.replies), // Exclude specified fields from replies array
      replyTo: excludeReplyTo(tweet.replyTo), // Exclude specified fields from replyTo object
      repliesCount: tweet.replies ? tweet.replies.length : 0, // Set repliesCount to the length of replies array
      postedAtHuman: human(tweet.createdAt.getTime() - new Date().getTime(), {
        largest: 1,
        round: true,
      }), // Format the time duration
    };

    return formattedTweet;
  });

  return {
    tweets: formattedTweets, // Return the formatted tweets
  };
});
