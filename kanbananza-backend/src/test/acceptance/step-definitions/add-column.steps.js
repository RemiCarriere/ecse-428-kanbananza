import { defineFeature, loadFeature } from "jest-cucumber";
import { givenUserLoggedIn, givenExistsUser } from "./common.steps";

const feature = loadFeature(
  "src/test/acceptance/features/ID007_Add-Column.feature"
);

const givenUserHasOneBoard = (given) => {
  given("the user has one board", () => {});
};

const givenBoardIsSelected = (given) => {
  given("the user has selected that board", () => {});
};

const givenBoardHasNoColumns = (given) => {
  given(/^the selected board has no columns$/, () => {});
};

defineFeature(feature, (test) => {
  let columnCreated = false;

  afterEach(() => {
    columnCreated = false;
  });

  test("Successfully add a column with a valid name to an empty board (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);

    when(
      /^the user attempts to create a column with name "(.*)"$/,
      (name) => {}
    );

    then(/^the board contains a column with name "(.*)"$/, (name) => {});

    then("the board contains one column", () => {});
  });

  test("Successfully add a column with a valid name to a board with existing columns (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);

    given(
      "the board contains columns with names and order as following:",
      () => {}
    );

    when(
      /^the user attempts to create a column with name "(.*)"$/,
      (name) => {}
    );

    then(/^the board contains a column with name "(.*)"$/, (name) => {});

    then("^the board contains 4 columns", () => {});

    then(
      "the columns in the board shall have the following names and order:",
      () => {}
    );
  });

  test("Unsuccessfully add a column with an empty name (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);

    when(
      "the user attempts to create a column without entering a name",
      () => {}
    );

    // then(/^the system shall report (.*)$/, (arg0) => {});

    // then(/^the system shall report "Email '(.*)' is invalid'"$/, (email) => {});

    then("the number of columns in the board shall remain zero", () => {});
  });

  test("Unsuccessfully add a column with an invalid name comprising only whitespace (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);

    when(
      /^the user attempts to create a column with name "(.*)"$/,
      (name) => {}
    );

    // systemShallReport(then);

    then("the number of columns in the board shall remain zero", () => {});
  });

  test("Unsuccessfully add a column with the name of an existing column (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);

    given(
      "the board contains the columns with names and order as following:",
      () => {}
    );
    when(
      /^the user attempts to create a column with name"(.*)"$/,
      (name) => {}
    );
    // systemShallReport(then);

    then("the number of columns in the board shall remain three", () => {});
    then(
      "the columns in the board shall have the following names and order:",
      () => {}
    );
  });
});
