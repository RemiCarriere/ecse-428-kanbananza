import mongoose from "mongoose";

const Schema = mongoose.Schema;

const columnSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  boardId: { type: Schema.ObjectId, required: true, ref: "Board" },
  order: { type: Number, required: true, min: 0 },
});

columnSchema.methods.toDTO = function () {
  return {
    id: this._id,
    name: this.name,
    boardId: this.boardId,
    order: this.order,
  };
};

export default mongoose.model("Column", columnSchema);
