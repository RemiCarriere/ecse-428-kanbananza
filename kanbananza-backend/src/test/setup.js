import dbHandler from "./support/database_handler";

beforeEach(async (done) => {
  await dbHandler.connect();
  done();
});

afterEach(async (done) => {
  await dbHandler.clear();
  done();
});

afterAll(async (done) => {
  await dbHandler.close();
  done();
});
