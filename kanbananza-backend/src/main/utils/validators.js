import mongoose from "mongoose";

export const isValidMongooseObjectId = (idString) => {
  if (
    mongoose.isValidObjectId(idString) &&
    mongoose.Types.ObjectId.isValid(idString)
  ) {
    try {
      mongoose.Types.ObjectId(idString);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};
