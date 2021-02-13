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
    throw Error("Error while adding user");
  }
};

export default { createUser };
