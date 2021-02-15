import request from "../../support/request";
import { defineFeature, loadFeature } from "jest-cucumber";
import { givenUserLoggedIn, givenExistsUser } from "./common.steps";

const login = loadFeature("src/test/acceptance/features/ID0029_Login.feature");
const logout = loadFeature(
  "src/test/acceptance/features/ID0030_Logout.feature"
);

var numberOfAccounts = 0;
var errMsg = "";
var responseStatus = "";

const whenUserAttemptsLogin = (when) => {
  when(
    /^the user attempts to login with email "(.*)" and password "(.*)"$/,
    async (email, pass) => {
      const res = await request
      .post('/user/').send({email: email, password: pass, firstName: "fdsf", lastName: "fdsjf"})
      .expect(201);
      responseStatus = res.statusCode
    }
  );
};

defineFeature(login, (test) => {
  let loggedIn = false;

  afterEach(() => {
    loggedIn = false;
  });

  test("User successfully logs in to account successfully (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);

    whenUserAttemptsLogin(when);

    then(
      /^the user with email "(.*)" shall be logged into the system$/,
      async (email) => {
        const res = await request
        .get('/login')
        .expect(200)
      }
    );
  });

  test("User unsuccessfully logs in with incorrect password for the given email (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);

    whenUserAttemptsLogin(when);

    then("the system shall report that the password is incorrect", async () => {
      expect(responseStatus).toEqual(400)
    });

    then(
      /^the user with email "(.*)" shall not be logged into the system$/,
      async (email) => {
        const {body} = await request.get('login').expect(400)
      }
    );
  });
});

defineFeature(logout, (test) => {
  let loggedIn = false;

  afterEach(() => {
    loggedIn = false;
  });

  test("User successfully logs out of account", ({ given, when, then }) => {
    givenExistsUser(given);

    givenUserLoggedIn(given);

    when(/^the user attempts to logout$/, () => {});

    then(
      /^the user with email "(.*)" shall be logged out of the system$/,
      (email) => {}
    );
  });
});
