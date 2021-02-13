import { command } from "yargs";
import HttpError from "../http_error";
import userService from "../services/user";

const index = async (req, res) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });
    console.log(user);
    res.status(201).json(user); // convert to dto
  } catch (e) {
    throw new HttpError({ code: 400, message: e.message });
  }
};

export default { index };
