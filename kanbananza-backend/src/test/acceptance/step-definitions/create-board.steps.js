import { defineFeature, loadFeature } from "jest-cucumber";
import { givenUserIsLoggedIn, systemShallReport } from "./background.steps";

const feature = loadFeature(
  "src/test/acceptance/features/ID002_Create_Board.feature"
);

const whenUserCreatesBoardWithName = (when) => {
  when(
    /^the logged-in user attempts to create a new board with name "(.*)"$/,
    (name) => {}
  );
};

const userShallHaveBoardWithName = (then) => {
  then(
    /^the logged-in user shall have a board with name "(.*)"$/,
    (name) => {}
  );
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
    givenUserIsLoggedIn(given);

    given(
      /^the logged-in user has no existing boards with name "(.*)"$/,
      (name) => {}
    );

    whenUserCreatesBoardWithName(when);

    userShallHaveBoardWithName(then);

    then(
      /^the logged-in user shall be authorized to view the board with name "(.*)"$/,
      (name) => {}
    );

    then(
      "the number of boards the logged-in user has shall increase by one",
      () => {}
    );
  });

  test("Unsuccessfully create a board with a valid but existing name (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenUserIsLoggedIn(given);

    given(
      /^the logged-in user has an existing board with name "(.*)"$/,
      (name) => {}
    );

    whenUserCreatesBoardWithName(when);

    systemShallReport(then);

    userShallHaveBoardWithName(then);

    then(
      /^the logged-in user shall be authorized to view the board with name "(.*)"$/,
      (name) => {}
    );

    then(
      "the number of boards the logged-in user has shall remain the same",
      () => {}
    );
  });

  test("Unsuccessfully create a board with an invalid name comprising only whitespace (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenUserIsLoggedIn(given);

    given(/^the logged-in user has no existing boards$/, () => {});

    whenUserCreatesBoardWithName(when);

    systemShallReport(then);

    then(
      /^the logged-in user shall not have a board with name "(.*)"$/,
      (name) => {}
    );

    then(
      "the number of boards the logged-in user has shall remain zero",
      () => {}
    );
  });
});