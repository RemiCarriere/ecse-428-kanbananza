/**
 * @see https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/separateexpress.md
 */

import app from "./app";
import config from "./config";
import { connectDb } from "./database";

const port = config.port;

app.listen(port, (e) => {
  if (e) {
    console.error(e);
  }

  console.log(`Listening on port ${port}.`);
});

const db = connectDb();

db.on("error", console.error.bind(console, "mongoDB connection error:"));
db.once("open", () => {
  console.log("connected to database");
});
