/**
 * @see https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/separateexpress.md
 */

import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, (e) => {
  if (e) {
    console.error(e);
  }

  console.log(`Listening on port ${port}.`);
});
