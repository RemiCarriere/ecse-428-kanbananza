import mongoose from "mongoose";
import config from "./config";

const databaseUrl = config.databaseURL[process.env.NODE_ENV];

const connectDb = () => {
  mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  return db;
};

export { connectDb };
