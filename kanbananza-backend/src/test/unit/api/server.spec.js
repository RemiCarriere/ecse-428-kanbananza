import request from "../../support/request";
import dbHandler from "../../support/database_handler";

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clear());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.close());

test("GET /", (done) => {
  request
    .get("/")
    .expect(200)
    .then((res) => {
      console.log(res.body);
      done();
    })
    .catch((err) => done(err));
});

test("async GET /", async (done) => {
  const res = await request.get("/");
  expect(res.status).toBe(200);
  done();
});
