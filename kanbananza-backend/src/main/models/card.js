import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  columnId: { type: Schema.ObjectId, required: true, ref: "Column" },
  order: { type: Number, required: true, min: 0 },
  description: { type: String },
  priority: { type: String, enum: ["HIGH", "MEDIUM", "LOW"] },
});

cardSchema.methods.toDTO = function () {
  return {
    id: this._id,
    name: this.name,
    columnId: this.columnId,
    order: this.order,
    description: this.description,
    priority: this.priority,
  };
};
export default mongoose.model("Card", cardSchema);
