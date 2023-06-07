import { getRefreshTokenByToken } from "../../db/refreshToken";
import { getUserById } from "../../db/users";
import { decodeRefreshToken, generateTokens } from "../../utils/jwt";

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refreshToken");

  if (!refreshToken) {
    sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh Token is not valid",
      })
    );
  }

  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh Token is not valid",
      })
    );
  }

  const token = decodeRefreshToken(refreshToken);
  try {
    const user = await getUserById(token.userId);
    const { accessToken } = generateTokens(user);
    return { accessToken: accessToken };
  } catch (error) {
    sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      })
    );
  }
});
