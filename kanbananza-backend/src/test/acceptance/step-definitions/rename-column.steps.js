import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID008-rename-a-column.feature"
);
const errMsg = "";
let responseStatus = "";

//TODO: Implement the step definitions and remove .skip
defineFeature(feature, (test) => {
  test.skip("Rename a column with a valid name (Normal Flow)", ({
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

    when(
      /^the user attempts to update column "(.*)" with name "(.*)"$/,
      (arg0, arg1) => {}
    );

    then("the board will look as follows:", (table) => {});
  });

  test.skip("Rename column to an already existing name (Alternate Flow)", ({
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

    when(
      /^the user attempts to update column "(.*)" with name "(.*)"$/,
      (arg0, arg1) => {}
    );

    then(/^the system shall report "(.*)"$/, (arg0) => {});

    then("the board will look as follows:", (table) => {});
  });

  test.skip("Rename a column to empty name (Error Flow)", ({
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

    when(
      /^the user attempts to update column "(.*)" with name ""$/,
      (arg0) => {}
    );

    then(/^the system shall report "(.*)"$/, (arg0) => {});

    then("the board will look as follows:", (table) => {});
  });
});
