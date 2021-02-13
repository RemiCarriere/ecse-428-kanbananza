import HttpError from "../http_error";
import userService from "../services/user";

const create = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userService.createUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });
    console.log(user);
    res.status(201).json(user); // convert to dto
  } catch (e) {
    res.status(400);
    res.json({ message: "user could not be created" });
  }
};

export default { create };
