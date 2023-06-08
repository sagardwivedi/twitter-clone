import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt.js";
import { sendError } from "h3";
import { getUserById } from "../db/users";
import { User } from ".prisma/client";

type AuthSession = {
  user: User;
};

declare module "h3" {
  interface H3EventContext {
    auth: AuthSession;
  }
}

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/auth/user", "/api/user/tweets", "/api/tweets"];

  const isHandledByThisMiddleware = endpoints.some((endopoint) => {
    const pattern = new UrlPattern(endopoint);

    return pattern.match(event.node.req.url ?? "");
  });

  if (!isHandledByThisMiddleware) {
    return;
  }

  const token = event.node.req.headers["authorization"]?.split(" ")[1];

  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }

  try {
    const userId = decoded.userId;

    const user = await getUserById(userId);

    if (user !== null) {
      event.context.auth = { user };
    }
  } catch (error) {
    return;
  }
});
