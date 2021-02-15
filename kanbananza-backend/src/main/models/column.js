import mongoose from "mongoose";

const Schema = mongoose.Schema;

const columnSchema = new Schema({
  label: { type: String, required: true, maxLength: 100 },
  boardId: { type: Schema.ObjectId, required: true, ref: "Board" },
  order: { type: Number, required: true, min: 0 },
});

export default mongoose.model("Column", columnSchema);
