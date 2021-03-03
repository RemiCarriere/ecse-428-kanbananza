import columnService from "../services/column";

const create = async (req, res, next) => {
  try {
    const column = await columnService.createColumn({
      name: req.body.name,
      boardId: req.body.boardId,
      order: req.body.order,
    });
    res.status(201).json(column.toDTO()); // convert to dto
  } catch (e) {
    return next(e); // handle downstream
  }
};

const select = async (req, res, next) => {
  let columns = [];
  try {
    if (req.query.name !== undefined) {
      console.log(req.query.name);
      columns = await columnService.findColumnsByName(req.query.name);
    } else {
      columns = await columnService.findAllColumns();
    }
  } catch (e) {
    return next(e);
  }
  res.status(200).json(columns.map((column) => column.toDTO()));
};

// const selectCards = async (req, res, next) => {
//   let cards = [];
//   try {
//     if (req.query.name !== undefined) {
//       cards = await cardService.findColumnCardsByName(
//         req.params.id,
//         req.query.name
//       );
//     } else {
//       cards = await cardService.findAllColumnCards(req.params.id);
//     }
//   } catch (e) {
//     next(e);
//   }
//   res.status(200).json(cards.map((card) => card.toDTO()));
// };

const index = async (req, res, next) => {
  try {
    const column = await columnService.findColumnById(req.params.id);
    res.status(200).json(column.toDTO());
  } catch (e) {
    return next(e);
  }
};

export default { create, select, index };
