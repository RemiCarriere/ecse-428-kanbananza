import request from "../../support/request";

test("GET /", async (done) => {
  await request
    .get("/")
    .expect(200)
    .then((res) => {
      done();
    })
    .catch((err) => done(err));
});
