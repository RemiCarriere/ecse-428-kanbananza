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
        message: "Invalid field(s)",
        body: Object.values(e.errors).map((error) => error.message),
      });
    } else {
      throw e;
    }
  }
};
const findUserByEmail = async ({ email }) => {
  if (!(await User.exists({ email }))) {
    throw new HttpError({
      code: 404,
      message: `User with email '${email}' does not exist.`,
    });
  }

  try {
    return await User.findOne({ email });
  } catch (e) {
    throw new HttpError({
      code: 400,
      message: "sadsd field(s)",
      body: Object.values(e.errors).map((error) => error.message),
    });
  }
};

export default { createUser, findUserByEmail };
