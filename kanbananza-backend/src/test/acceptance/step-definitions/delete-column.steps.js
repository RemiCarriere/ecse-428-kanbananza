import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID0010-delete-a-column.feature"
);
const errMsg = "";
let responseStatus = "";

//TODO: Implement the step definitions and remove .skip
defineFeature(feature, (test) => {
  test.skip("Delete a column from a board with one column (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user owns one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has three columns ordered as follows:",
      (table) => {}
    );

    given(
      /^the selected board has only one column with name "(.*)"$/,
      (arg0) => {}
    );

    when(/^the user attempts to delete column with name "(.*)"$/, (arg0) => {});

    then(/^a warning "(.*)" will be issued$/, (arg0) => {});
  });

  test.skip("Delete column that does not exist (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user owns one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has three columns ordered as follows:",
      (table) => {}
    );

    when(/^the user attempts to delete column with name "(.*)"$/, (arg0) => {});

    then(/^an error "(.*)" is issued$/, (arg0) => {});
  });

  test.skip("Delete a column from the board (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user owns one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has three columns ordered as follows:",
      (table) => {}
    );

    when(/^the user attempts to delete column with name (.*)$/, (arg0) => {});

    then("the board will only contain two columns", () => {});
  });
});
