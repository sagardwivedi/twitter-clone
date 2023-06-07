import jwt_decode from "jwt-decode";

import { User } from ".prisma/client";

type UserType = Omit<User, "password" | "createdAt" | "updatedAt"> | undefined;
type TokenBody = {
  userId: string;
  exp: number;
  iat: number;
};

export default () => {
  const useAuthToken = () => useState<string>("auth_token");
  const useAuthUser = () => useState<UserType>("auth_user");
  const useAuthLoading = () => useState<boolean>("auth_loading", () => true);

  const setToken = (newToken: string) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: UserType) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setLoading = (state: boolean) => {
    const authLoading = useAuthLoading();
    authLoading.value = state;
  };

  const login = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });

        setUser(data.user);
        setToken(data.access_token);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshToken = () => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");

        setToken(data.accessToken);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = () => {
    const headers = {
      Authorization: `Bearer ${useAuthToken().value}`,
    };
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await useFetch("/api/auth/user", { headers });

        setUser(data.value?.user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshAccessToken = () => {
    const authToken = useAuthToken()

    if (!authToken.value) {
      return
    }

    const jwt:TokenBody = jwt_decode(authToken.value)

    const newRefreshTime = jwt.exp - 60000

    setTimeout(async () => {
      await refreshToken()
      refreshAccessToken()
    }, newRefreshTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      try {
        await refreshToken();
        await getUser();

        refreshAccessToken()

        resolve(true);
      } catch (error) {
        console.log(error);
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  return {
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading,
  };
};
