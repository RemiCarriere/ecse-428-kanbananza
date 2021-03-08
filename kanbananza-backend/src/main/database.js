import mongoose from "mongoose";
import config from "./config";

const databaseUrl = config.databaseURL[process.env.NODE_ENV];

const connectDb = (databaseURL) => {
  mongoose.connect(databaseURL, {
    autoIndex: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;
  return db;
};

export { connectDb };
