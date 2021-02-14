import { Error } from "mongoose";
import HttpError from "../http_error";
import User from "../models/user";

const createUser = async ({ email, password, firstName, lastName }) => {
  if (await User.exists({ email })) {
    throw new HttpError({
      code: 400,
      message: `User with email '${email}' aready exists.`,
    });
  }

  User.create(
    {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    },
    (e, user) => {
      if (e) {
        if (e instanceof Error.ValidationError) {
          throw new HttpError({
            code: 400,
            message: "Invalid field(s)",
            body: Object.values(e.errors).map((error) => error.message),
          });
        } else {
          console.error(e);
          throw e;
        }
      }
      return user;
    }
  );
};

export default { createUser };
