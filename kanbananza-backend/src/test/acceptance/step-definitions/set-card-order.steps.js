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
      "the selected board has one with two cards ordered as follows:",
      (table) => {}
    );

    when(
      /^the user attempts to move card with name "(.*)" to index (\d+)$/,
      (arg0, arg1) => {}
    );

    then("the board will look as follows:", (table) => {});
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
      "the selected board has one with two cards ordered as follows:",
      (table) => {}
    );

    when(
      /^the user attempts to move card with name "(.*)" to index (\d+)$/,
      (arg0, arg1) => {}
    );

    then("the board will look as follows:", (table) => {});
  });

  test.skip("Move a non-existent card (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user owns one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has one with two cards ordered as follows:",
      (table) => {}
    );

    when(
      /^the user attempts to move card with name "(.*)" to index (\d+)$/,
      (arg0, arg1) => {}
    );

    then(/^the system shall report "(.*)"$/, (arg0) => {});
  });
});
