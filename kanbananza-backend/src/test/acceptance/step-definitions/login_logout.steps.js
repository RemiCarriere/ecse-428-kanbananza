import { defineFeature, loadFeature } from "jest-cucumber";
import { systemShallReport } from "./background.steps";

const login = loadFeature("src/test/acceptance/features/ID0029_Login.feature");
const logout = loadFeature(
  "src/test/acceptance/features/ID0030_Logout.feature"
);

const givenUserExists = (given) => {
  given(
    /^a user with email "(.*)" and password "(.*)" exists in the system$/,
    (email, pass) => {}
  );
};

const whenUserAttemptsLogin = (when) => {
  when(
    /^user attempts to login with email "(.*)" and password "(.*)"$/,
    (email, pass) => {}
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
      (email) => {}
    );
  });

  test("User unsuccessfully logs in with incorrect password for the given email (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenUserExists(given);

    whenUserAttemptsLogin(when);

    systemShallReport(then);

    then(
      /^the user with email "(.*)" shall not be logged into the system$/,
      (email) => {}
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

    given(/^user with email "(.*)" is logged in to the system$/, (email) => {});

    when(/^the logged-in user attempts to logout$/, () => {});

    then(
      /^the user with email "(.*)" shall be logged out of the system$/,
      (email) => {}
    );
  });
});
