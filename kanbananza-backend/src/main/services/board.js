import boardDB from "../models/board";

const createBoard = async ({ label, user }) => {
  try {
    const newBoard = await boardDB.insertOne({ label, user });
    return newBoard;
  } catch (e) {
    throw Error("Error while adding board");
  }
};

export default { createBoard };
