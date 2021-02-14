import { Error } from "mongoose";
import HttpError from "../http_error";
import User from "../models/user";
import ValidationError from "../validation_error";

const createUser = async ({ email, password, firstName, lastName }) => {
  if (await User.exists({ email })) {
    throw new HttpError({
      code: 400,
      message: "Uniqueness violation.",
      errors: [
        new ValidationError({
          path: "email",
          reason: "email is already in use.",
          data: email,
        }),
      ],
    });
  }

  try {
    return await User.create({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      throw new HttpError({
        code: 400,
        message: `Invalid field${
          Object.values(e.errors).length > 1 ? "s" : ""
        }.`,
        errors: Object.values(e.errors).map(
          (error) =>
            new ValidationError({
              path: error.path,
              reason: error.message,
              data: error.value,
            })
        ),
      });
    } else {
      throw e;
    }
  }
};

export default { createUser };
