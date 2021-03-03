import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  label: { type: String, required: true, maxLength: 100 },
  column: { type: Schema.ObjectId, required: true, ref: "Column" },
  order: { type: Number, required: true, min: 0 },
});

export default mongoose.model("Card", cardSchema);
