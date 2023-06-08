import { NitroFetchOptions, NitroFetchRequest } from "nitropack";

export default (
  url: NitroFetchRequest,
  options?: NitroFetchOptions<NitroFetchRequest>
) => {
  const { useAuthToken } = useAuth();

  return useFetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  });
};
