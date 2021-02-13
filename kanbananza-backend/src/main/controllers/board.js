import { command } from "yargs";
import HttpError from "../http_error";
import boardService from "../services/board";

const index = async (req, res) => {
  try {
    const board = await boardService.createboard({
        label: "Project Mars"
        //TODO: add ref for user
    });
    console.log(board);
    res.status(201).json(board); // convert to dto
  } catch (e) {
    throw new HttpError({ code: 400, message: e.message });
  }
};

export default { index };
