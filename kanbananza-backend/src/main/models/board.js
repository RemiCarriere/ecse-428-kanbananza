import mongoose from "mongoose";

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  owner: { type: Schema.ObjectId, required: true, ref: "User" },
});

export default mongoose.model("Board", boardSchema);
