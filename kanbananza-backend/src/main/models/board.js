import mongoose from "mongoose";

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  label: { type: String, required: true, maxLength: 100 },
  user: { type: Schema.ObjectId, required: true, ref: "User" }
});

export default mongoose.model("Board", boardSchema);
