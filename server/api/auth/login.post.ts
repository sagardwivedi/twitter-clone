import { compare } from "bcrypt";
import { getUserByUsername } from "../../db/users";
import { generateTokens, sendRefreshToken } from "../../utils/jwt";
import { createRefreshToken } from "../../db/refreshToken";
import { exclude } from "../../utils/exclude";

type LoginBody = {
  username: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const body: LoginBody = await readBody(event);

  const { password, username } = body;

  if (!password || !username) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Inavlid Params",
      })
    );
  }

  // Is the user registered
  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // Compare passwords
  const doesThePasswordsMatch = await compare(password, user.password);

  if (!doesThePasswordsMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Save it inside db
  await createRefreshToken({ token: refreshToken, userId: user.id });

  // Add http only cookie
  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: exclude(user, ["password"]),
  };
});
