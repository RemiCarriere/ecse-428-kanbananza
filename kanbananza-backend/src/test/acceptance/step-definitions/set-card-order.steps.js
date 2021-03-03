import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID006-set-order-of-a-card-in-a-column.feature"
);
const errMsg = "";
let responseStatus = "";

//TODO: Implement the step definitions and remove .skip
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
      "the selected board has one column with two cards ordered as follow",
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
      "the selected board has one column with two cards ordered as follow",
      (table) => {}
    );

    when(
      /^the user attempts to the user attempts to swap card with index (.*) with card at index (.*)$/,
      (arg0, arg1, table) => {}
    );

    then("the board is unchanged", (table) => {});
  });

  test.skip("Move a card outside the board (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user owns one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has one column with two cards ordered as follow",
      (table) => {}
    );

    when("the user attempts to move a card outside the board", () => {});

    then(/^an error "(.*)" is issued$/, (arg0) => {});
  });
});
