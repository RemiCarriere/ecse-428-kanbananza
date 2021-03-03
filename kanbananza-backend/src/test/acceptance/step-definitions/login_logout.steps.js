import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";
import { givenUserLoggedIn, givenUserExists } from "./shared-steps";

const login = loadFeature("src/test/acceptance/features/ID0029_Login.feature");
const logout = loadFeature(
  "src/test/acceptance/features/ID0030_Logout.feature"
);

let errMsg = "";
let responseStatus = "";
let authHeader = "";

const whenUserAttemptsLogin = (when) => {
  when(
    /^the user attempts to login with email "(.*)" and password "(.*)"$/,
    async (email, pass) => {
      // console.log("Logging in with " +email+ ", " +pass)
      const res = await request.post("/login").send({
        email,
        password: pass,
      });
      responseStatus = res.statusCode;
      errMsg = res.body.errors;
      authHeader = { authorization: "Token " + res.body.token };
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
    givenUserExists(given);

    whenUserAttemptsLogin(when);

    then(
      /^the user with email "(.*)" shall be logged into the system$/,
      async (email) => {
        expect(responseStatus).toEqual(201); // login succeeded
        // Verify if token is valid
        const res = await request.get("/login").set(authHeader);
        expect(res.statusCode).toEqual(200);
      }
    );
  });

  test("User unsuccessfully logs in with incorrect password for the given email (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenUserExists(given);

    whenUserAttemptsLogin(when);

    then("the system shall report that the password is incorrect", async () => {
      expect(errMsg).toBe("Invalid email or password");
    });

    then(
      /^the user with email "(.*)" shall not be logged into the system$/,
      async (email) => {
        expect(responseStatus).toEqual(401);
        const res = await request.get("/login").set(authHeader);
        expect(res.statusCode).toEqual(401);
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
    givenUserExists(given);

    givenUserLoggedIn(given);

    when(/^the user attempts to logout$/, () => {
      authHeader = { authorization: "Token " + "" }; // In practice, the browser removes the token from local storage
    });

    then(
      /^the user with email "(.*)" shall be logged out of the system$/,
      async (email) => {
        expect(responseStatus).toEqual(401);
        const res = await request.get("/login").set(authHeader);
        expect(res.statusCode).toEqual(401);
      }
    );
  });
});
