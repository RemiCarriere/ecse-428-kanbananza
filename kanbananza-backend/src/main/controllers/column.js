import { command } from "yargs";
import HttpError from "../http_error";
import columnService from "../services/column";

const index = async (req, res) => {
  try {
    const column = await columnService.createcolumn({
        label: req.body.label,
        board: req.body.board
    });
    console.log(column);
    res.status(201).json(column); // convert to dto
  } catch (e) {
    throw new HttpError({ code: 400, message: e.message });
  }
};

export default { index };
