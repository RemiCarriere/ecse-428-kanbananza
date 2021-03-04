import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID001_Create_an_Account.feature"
);
let numberOfAccounts = 0;
const errMsg = "";
let responseStatus = "";

defineFeature(feature, (test) => {
  let accountCreated = false;

  afterEach(() => {
    accountCreated = false;
  });

  test("Successfully create an account with a valid and unused email (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    given(
      /^an account with email "(.*)" does not exist in the system$/,
      async (email) => {
        const { body } = await request.get(`/user/email/${email}`).expect(404);
      }
    );

    when(
      /^the user attempts to create an account with name "(.*)", email "(.*)", and (.*) "password"$/,
      async (name, email, pass) => {
        const res = await request.get("/users/").expect(200);
        numberOfAccounts = res.body.length;
        const { body } = await request
          .post("/user")
          .send({
            email,
            password: pass,
            firstName: name,
            lastName: name,
          })
          .expect(201);
      }
    );

    then(
      /^an account with name "(.*)", email "(.*)", and (.*) "password" shall exist in the system$/,
      async (name, email, pass) => {
        const res = await request.get(`/user/email/${email}`);
        expect(res.body.firstName).toEqual(name);
        expect(res.body.lastName).toEqual(name);
        expect(res.body.email).toEqual(email);
      }
    );

    then(
      "the number of accounts in the system shall increase by one",
      async () => {
        const { body } = await request.get("/users");
        expect(body.length).toEqual(numberOfAccounts + 1);
      }
    );
  });

  test("Unsuccessfully create an account with a valid but existing email (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given(
      /^an account with email "(.*)" exists in the system$/,
      async (email) => {
        const res = await request.post("/user").send({
          email,
          password: "123445",
          firstName: "name",
          lastName: "name",
        });
        const { body } = await request.get(`/user/email/${email}`).expect(200);
      }
    );

    when(
      /^the user attempts to create an account with email "(.*)"$/,
      async (email) => {
        const res = await request
          .post("/user")
          .send({
            email,
            password: "123456",
            firstName: "test",
            lastName: "test",
          })
          .expect(400);
        responseStatus = res.statusCode;
      }
    );

    then(
      "the system shall report that the email is already in use",
      async () => {
        const { body } = await request.get("/users/");
        numberOfAccounts = body.length;
        expect(responseStatus).toEqual(400);
      }
    );

    then(
      /^an account with email "(.*)" shall exist in the system$/,
      async (email) => {
        const { body } = await request.get(`/user/email/${email}`).expect(200);
      }
    );

    then("the number of accounts shall remain the same", async () => {
      const { body } = await request.get("/users/");
      expect(numberOfAccounts).toEqual(body.length);
    });
  });

  test("Unsuccessfully create an account with an invalid yet unused email (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given("there exist no accounts in the system", async () => {
      const { body } = await request.get("/users/");
      expect(body.length).toEqual(0);
    });

    when(
      /^the user attempts to create an account with email (.*)$/,
      async (email) => {
        const res = await request
          .post("/user")
          .send({
            email,
            password: "123456",
            firstName: "test",
            lastName: "test",
          })
          .expect(400);
        responseStatus = res.statusCode;
      }
    );

    then("the system shall report that the email is invalid", () => {
      expect(responseStatus).toEqual(400);
    });

    then(
      /^an account with email "(.*)" shall not exist in the system$/,
      async (email) => {
        const { body } = await request.get(`/user/email/${email}`).expect(404);
      }
    );

    then("the number of accounts shall remain zero", async () => {
      const { body } = await request.get("/users");
      expect(body.length).toEqual(0);
    });
  });
});
