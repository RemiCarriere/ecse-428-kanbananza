import { defineFeature, loadFeature } from "jest-cucumber";
import { systemShallReport } from "./background.steps";

const feature = loadFeature(
  "src/test/acceptance/features/ID001_Create_an_Account.feature"
);

defineFeature(feature, (test) => {
  let accountCreated = false;

  afterEach(() => {
    accountCreated = false;
  });

  test("Successfully create an account with a valid and unused email (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    given(
      /^an account with email "(.*)" does not exist in the system$/,
      (email) => {}
    );

    when(
      /^the user attempts to create an account with name "(.*)", email "(.*)", and (.*) "password"$/,
      (name, email, pass) => {}
    );

    then(
      /^an account with name "(.*)", email "(.*)", and (.*) "password" shall exist in the system$/,
      (name, email, pass) => {}
    );

    then(
      "the number of accounts in the system shall increase by one",
      () => {}
    );
  });

  test("Unsuccessfully create an account with a valid but existing email (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given(/^an account with email "(.*)" exists in the system$/, (email) => {});

    when(
      /^the user attempts to create an account with email "(.*)"$/,
      (arg0) => {}
    );

    systemShallReport(then);

    then(
      /^an account with email "(.*)" shall exist in the system$/,
      (email) => {}
    );

    then("the number of accounts shall remain the same", () => {});
  });

  test("Unsuccessfully create an account with an invalid yet unused email (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given("there exist no accounts in the system", () => {});

    when(
      /^the user attempts to create an account with email (.*)$/,
      (arg0) => {}
    );

    then(/^the system shall report "Email '(.*)' is invalid'"$/, (email) => {});

    then(
      /^an account with email "(.*)" shall not exist in the system$/,
      (email) => {}
    );

    then("the number of accounts shall remain zero", () => {});
  });
});
