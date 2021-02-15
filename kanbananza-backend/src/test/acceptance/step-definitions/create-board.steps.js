import { defineFeature, loadFeature } from "jest-cucumber";
import { givenUserLoggedIn, givenExistsUser } from "./common.steps";
import request from "../../support/request";
import dbHandler from "../../support/database_handler";

const feature = loadFeature(
  "src/test/acceptance/features/ID002_Create_Board.feature"
);

const whenUserCreatesBoardWithName = (when) => {
  when(
    /^the user attempts to create a new board with name "(.*)"$/,
    (name) => {}
  );
};

const userShallHaveBoardWithName = (then) => {
  then(/^the user shall have a board with name "(.*)"$/, (name) => {});
};

defineFeature(feature, (test) => {
  let boardCreated = false;

  afterEach(() => {
    boardCreated = false;
  });

  test("Successfully create a board with a valid board name (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);

    given(/^the user has no existing boards with name "(.*)"$/, (name) => {});

    whenUserCreatesBoardWithName(when);

    userShallHaveBoardWithName(then);

    then(
      /^the user shall be authorized to view the board with name "(.*)"$/,
      (name) => {}
    );

    then("the number of boards the user has shall increase by one", () => {});
  });

  test("Unsuccessfully create a board with a valid but existing name (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);

    given(/^the user has an existing board with name "(.*)"$/, (name) => {});

    whenUserCreatesBoardWithName(when);

    then(
      /^the system shall report that the board name "(.*)" is already in use$/,
      (arg0) => {}
    );

    userShallHaveBoardWithName(then);

    then(
      /^the user shall be authorized to view the board with name "(.*)"$/,
      (name) => {}
    );

    then("the number of boards the user has shall remain the same", () => {});
  });

  test("Unsuccessfully create a board with an invalid name comprising only whitespace (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);

    given(/^the user has no existing boards$/, () => {});

    whenUserCreatesBoardWithName(when);

    then(
      "the system shall report that the board name cannot be empty",
      () => {}
    );

    then(/^the user shall not have a board with name "(.*)"$/, (name) => {});

    then("the number of boards the user has shall remain zero", () => {});
  });
});
