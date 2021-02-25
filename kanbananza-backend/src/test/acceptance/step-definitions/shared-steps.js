import request from "../../support/request";

export const givenUserLoggedIn = (given) => {
  given(/^the user with email "(.*)" is logged into the system$/, (arg0) => {});
};

export const givenExistsUser = (given) => {
  given(
    /^there exists a user with first name "(.*)", last name "(.*)", and email "(.*)" in the system$/,
    async (firstName, lastName, email) => {
      await request
        .post("/user")
        .send({ email, firstName, lastName, password: "foobar" });
    }
  );
};
export const givenUserExists = (given) => {
  given(
    /^there exists a user with first name "(.*)", last name "(.*)", email "(.*)", and password "(.*)" in the system$/,
    async (firstName, lastName, email, password) => {
      const res = await request
        .post("/user")
        .send({ email, firstName, lastName, password });
      // console.log("creating user");
      /// console.log(email + " " + password)
      // console.log(res.body)
    }
  );
};
