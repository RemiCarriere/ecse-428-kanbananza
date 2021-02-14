import userService from "../services/user";
import UserDTO from "../DTO/user";

const create = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await userService.createUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });
    console.log(user);
    res.status(201).json(UserDTO.fromDocument(user));
  } catch (e) {
    next(e);
  }
};

export default { create };
