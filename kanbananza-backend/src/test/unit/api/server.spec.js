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
