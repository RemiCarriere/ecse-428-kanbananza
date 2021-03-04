import mongoose from "mongoose";

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  ownerId: { type: Schema.ObjectId, required: true, ref: "User" },
});

boardSchema.methods.toDTO = function () {
  return {
    id: this._id,
    name: this.name,
    ownerId: this.ownerId,
  };
};

export default mongoose.model("Board", boardSchema);
