import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID033_Set_the_description_for_a_card.feature"
);
const errMsg = "";
let responseStatus = "";

//TODO: Implement the step definitions and remove .skip
defineFeature(feature, (test) => {
  test.skip("Set a valid description for a card with an existing description (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged into the system", () => {});

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(/^the board has one column with name "(.*)"$/, (arg0) => {});

    given(
      /^that column has one and only one card with name "(.*)"$/,
      (arg0) => {}
    );

    given(
      /^the card with name "(.*)" has a description "(.*)"$/,
      (arg0, arg1) => {}
    );

    when(
      /^the user sets the description of the card with name "(.*)" to "(.*)"$/,
      (arg0, arg1) => {}
    );

    then(
      /^the card with name "(.*)" has description "(.*)"$/,
      (arg0, arg1) => {}
    );
  });

  test.skip("Set the description for a card with no description to whitespace (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged into the system", () => {});

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(/^the board has one column with name "(.*)"$/, (arg0) => {});

    given(
      /^that column has one and only one card with name "(.*)"$/,
      (arg0) => {}
    );

    given(
      /^the card with name "(.*)" has a description "(.*)"$/,
      (arg0, arg1) => {}
    );

    when(
      /^the user sets the description of the card with name "(.*)" to "(.*)"$/,
      (arg0, arg1) => {}
    );

    then(/^a message "(.*)" is issued$/, (arg0) => {});

    then(
      /^the card with name "(.*)" has description "(.*)"$/,
      (arg0, arg1) => {}
    );
  });

  test.skip("Set a valid description for a card with no description (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged into the system", () => {});

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(/^the board has one column with name "(.*)"$/, (arg0) => {});

    given(
      /^that column has one and only one card with name "(.*)"$/,
      (arg0) => {}
    );

    given(
      /^the card with name "(.*)" does not have a description$/,
      (arg0) => {}
    );

    when(
      /^the user sets the description of the card with name "(.*)" to (.*)$/,
      (arg0, arg1) => {}
    );

    then(
      /^the card with name "(.*)" has description (.*)$/,
      (arg0, arg1, table) => {}
    );
  });
});
