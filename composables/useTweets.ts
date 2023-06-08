import { Tweet } from ".prisma/client";
import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { FetchError } from "ofetch";

interface formDataProps {
  text: string;
  mediaFiles: string[];
}

export default () => {
  const postTweet = (formData: formDataProps) => {
    const form = new FormData();

    form.append("text", formData.text);

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append("media_file_" + index, mediaFile);
    });

    return useFetchApi("/api/user/tweets", { method: "POST", body: form });
  };

  const getTweets = () => {
    const { useAuthToken } = useAuth();
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetch("/api/tweets", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${useAuthToken().value}`,
          },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { postTweet, getTweets };
};
