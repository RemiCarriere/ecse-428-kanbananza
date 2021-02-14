import boardService from "../services/board";

const create = async (req, res) => {
  try {
    const board = await boardService.createboard({
      label: req.body.label,
      user: req.body.board,
    });
    console.log(board);
    res.status(201).json(board); // convert to dto
  } catch (e) {
    res.status(400);
    res.json({ message: "board could not be created" });
  }
};

export default { create };
