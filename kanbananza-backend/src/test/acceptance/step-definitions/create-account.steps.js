import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('src/test/acceptance/features/Example.feature');

defineFeature(feature, (test) => {
  let accountCreated = false;
  
  afterEach(() => {
      accountCreated = false;
  });

  test('Successfully create an account with a valid and unused email (Normal Flow)', ({ given, when, then }) => {
    given(/^an account with email "(.*)" does not exist in the system$/, (arg0) => {

    });

    when(/^the user attempts to create an account with name "(.*)", email "(.*)", and (.*) "password"$/, (arg0, arg1, arg2) => {

    });

    then(/^an account with name "(.*)", email "(.*)", and (.*) "password" shall exist in the system$/, (arg0, arg1, arg2) => {

    });

    then('the number of accounts in the system shall increase by one', () => {

    });
  });

  test('Unsuccessfully create an account with a valid but existing email (Error Flow)', ({ given, when, then }) => {
    given(/^an account with email "(.*)" exists in the system$/, (arg0) => {

    });

    when(/^the user attempts to create an account with email "(.*)"$/, (arg0) => {

    });

    then(/^the system shall report "(.*)"$/, (arg0) => {

    });

    then(/^an account with email "(.*)" shall exist in the system$/, (arg0) => {

    });

    then('the number of accounts shall remain the same', () => {

    });
  });

  test('Unsuccessfully create an account with an invalid yet unused email (Error Flow)', ({ given, when, then }) => {
    given('there exist no accounts in the system', () => {

    });

    when(/^the user attempts to create an account with email (.*)$/, (arg0) => {

    });

    then(/^the system shall report "Email '(.*)' is invalid'"$/, (arg0) => {

    });

    then(/^an account with email "(.*)" shall not exist in the system$/, (arg0) => {

    });

    then('the number of accounts shall remain zero', () => {

    });
  });

});