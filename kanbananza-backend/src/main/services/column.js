import ColumnDB from "../models/column";

const createColumn = async ({ label, board }) => {
  try {
    const newCol = await ColumnDB.insertOne({ label, board });
    return newCol;
  } catch (e) {
    throw Error("Error while adding column");
  }
};

export default { createColumn };
