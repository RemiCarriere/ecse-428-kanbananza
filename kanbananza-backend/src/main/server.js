/**
 * @see https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/separateexpress.md
 */

import app from "./app";
import { connectDb } from "./database";

import config from "./config";

const port = config.port;

app.listen(port, (e) => {
  if (e) {
    console.error(e);
  }

  console.log(`Listening on port ${port}.`);
});

const databaseURL = config.databaseURL[process.env.NODE_ENV];

const db = connectDb(databaseURL);

db.on("error", console.error.bind(console, "mongoDB connection error:"));
db.once("open", () => {
  console.log(`Connected to ${process.env.NODE_ENV} database.`);
});
