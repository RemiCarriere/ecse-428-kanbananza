import { command } from "yargs";
import HttpError from "../http_error";
import taskService from "../services/task";

const index = async (req, res) => {
  try {
    const task = await taskService.createtask({
      label: "bob"
      //TODO needs to ref to column
    });
    console.log(task);
    res.status(201).json(task); // convert to dto
  } catch (e) {
    throw new HttpError({ code: 400, message: e.message });
  }
};

export default { index };
