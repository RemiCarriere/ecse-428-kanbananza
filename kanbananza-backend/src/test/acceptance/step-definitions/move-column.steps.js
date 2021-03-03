import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID009-move-a-column.feature"
);
const errMsg = "";
let responseStatus = "";

defineFeature(feature, (test) => {
  test.skip("Move the card in the board (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user owns one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has one with two cards ordered as follow",
      (table) => {}
    );

    when(
      /^the user attempts to swap card with index (.*) with card at index (.*)$/,
      (arg0, arg1, table) => {}
    );

    then("the board will look as follow", (table) => {});
  });

  test.skip("Move a card to the same position (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user owns one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has one with two cards ordered as follow",
      (table) => {}
    );

    when(
      /^the user attempts to the user attempts to swap card with index (.*) with card at index (.*)$/,
      (arg0, arg1, table) => {}
    );

    then("the board is unchanged", (table) => {});
  });

  test.skip("M (Error Flow)", ({ given, when, then }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user owns one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has one with two cards ordered as follow",
      (table) => {}
    );

    when(
      /^the user attempts to delete a (.*) that does not exist$/,
      (arg0, table) => {}
    );

    then(/^an error "(.*)" is issued$/, (arg0) => {});
  });
});
