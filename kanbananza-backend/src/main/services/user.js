import ajv from "ajv";
import { Error } from "mongoose";
import HttpError from "../http_error";
import User from "../models/user";

const createUser = async ({ email, password, firstName, lastName }) => {
  try {
    const newUser = await User.create({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    return newUser;
  } catch (e) {
    if (e instanceof Error.ValidationError)
      throw new HttpError({
        code: 400,
        message: "Invalid field(s)",
        body: Object.values(e.errors).map((error) => error.message),
      });
  }
};

export default { createUser };
