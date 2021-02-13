import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  label: { type: String, required: true, maxLength: 100 },
  column: { type: Schema.ObjectId, required: true, ref: "Column" }
});

export default mongoose.model("Task", taskSchema);
