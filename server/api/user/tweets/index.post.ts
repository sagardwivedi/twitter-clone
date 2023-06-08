import { Tweet } from ".prisma/client";
import formidable, { Fields, Files } from "formidable";
import { createTweet } from "../../../db/tweets";
import { createMediaFile } from "../../../db/mediaFile";

interface Response {
  fields: Fields;
  files: Files;
}

export type TweetData = Partial<Omit<Tweet, "id" | "createdAt" | "updatedAt">>;

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise<Response>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;

  const UserId = event.context?.auth?.user?.id;

  const tweetData: TweetData = {
    authorId: UserId,
    text: Array.isArray(fields.text) ? fields.text[0] : fields.text,
  };

  const replyTo = Array.isArray(fields.replyTo)
    ? fields.replyTo[0]
    : fields.replyTo;

  if (replyTo !== null && replyTo !== undefined) {
    tweetData.replyToId = replyTo;
  }

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key];

    const cloudinaryResource = await uploadToCloudinary(file.filepath);

    return createMediaFile({
      url: cloudinaryResource?.secure_url ?? "",
      providerPublicId: cloudinaryResource?.public_id ?? "",
      UserId: UserId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises);

  return {
    tweet: exclude(tweet, ["authorId", "createdAt", "replyToId", "updatedAt"]),
  };
});
