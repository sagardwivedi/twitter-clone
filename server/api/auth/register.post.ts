import { createUser } from "../../db/users";
import { exclude } from "../../utils/exclude";

export type RegisterBody = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  profileImage: string;
};

export default defineEventHandler(async (event) => {
  const body: RegisterBody = await readBody(event);

  const { username, email, password, repeatPassword, name, profileImage } =
    body;

  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  if (password !== repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Password do not match" })
    );
  }

  const userData = {
    username,
    email,
    password,
    name,
    profileImage: "https://picsum.photos/200/200",
  };

  const user = await createUser(userData);

  return {
    body: exclude(user, ["password", "createdAt", "updatedAt"]),
  };
});
