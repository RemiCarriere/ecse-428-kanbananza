import request from "../../support/request";

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
