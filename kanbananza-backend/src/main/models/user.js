import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    maxLength: 100,
  },
  salt: { type: String },
  hash: { type: String },
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
});

userSchema.virtual("name").get(function () {
  return this.last_name + ", " + this.first_name;
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    config.jwtSecret
  );
};

userSchema.methods.toDTO = function () {
  return {
    id: this._id,
    firstName: this.first_name,
    lastName: this.last_name,
    email: this.email,
    token: this.generateJWT(),
  };
};

export default mongoose.model("User", userSchema);
