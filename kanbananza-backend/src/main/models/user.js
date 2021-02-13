import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  fist_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
});

UserSchema.virtual("name").get(function () {
  return this.last_name + ", " + this.first_name;
});

export default mongoose.model("User", UserSchema);
