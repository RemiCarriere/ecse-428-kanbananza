import mongoose from "mongoose";

const Schema = mongoose.Schema;

const columnSchema = new Schema({
  label: { type: String, required: true, maxLength: 100 },
  board: { type: Schema.ObjectId, required: true, ref: "Board" }
});

export default mongoose.model("Column", columnSchema);
