import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID013_Move_a_card_to_another_column.feature"
);

defineFeature(feature, (test) => {
  test("Move a card to the end of another existing column with existing cards (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    given(
      /^there exists a user with first name "(.*)", last name "(.*)", and email "(.*)" in the system$/,
      async (arg0, arg1, arg2) => {
        await new Promise((r) =>
          setTimeout(r, Math.random() * (300 - 100) + 100)
        );
      }
    );

    given(
      /^the user with email "(.*)" is logged into the system$/,
      (arg0) => {}
    );

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has three columns ordered as follows:",
      (table) => {}
    );

    given(
      /^the column with name "(.*)" has cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    given(
      /^the column with name "(.*)" has cards with names and order as follows:$/,
      (arg0, table) => {}
    );

    when(
      /^the user attempts to move the card with name "(.*)" from column with name "(.*)" to column with name "(.*)" at order (\d+)$/,
      (arg0, arg1, arg2, arg3) => {}
    );

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then("the board shall have three columns", () => {});
  });

  test("Move a card to the middle of another existing column with exisiting cards (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    given(
      /^there exists a user with first name "(.*)", last name "(.*)", and email "(.*)" in the system$/,
      async (arg0, arg1, arg2) => {
        await new Promise((r) =>
          setTimeout(r, Math.random() * (300 - 100) + 100)
        );
      }
    );

    given(
      /^the user with email "(.*)" is logged into the system$/,
      (arg0) => {}
    );

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has three columns ordered as follows:",
      (table) => {}
    );

    given(
      /^the column with name "(.*)" has cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    given(
      /^the column with name "(.*)" has cards with names and order as follows:$/,
      (arg0, table) => {}
    );

    when(
      /^the user attempts to move the card with name "(.*)" from column with name "(.*)" to column with name "(.*)" at order (\d+)$/,
      (arg0, arg1, arg2, arg3) => {}
    );

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then("the board shall have three columns", () => {});
  });

  test("Move a card to another existing column with no existing cards (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    given(
      /^there exists a user with first name "(.*)", last name "(.*)", and email "(.*)" in the system$/,
      async (arg0, arg1, arg2) => {
        await new Promise((r) =>
          setTimeout(r, Math.random() * (300 - 100) + 100)
        );
      }
    );

    given(
      /^the user with email "(.*)" is logged into the system$/,
      (arg0) => {}
    );

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has three columns ordered as follows:",
      (table) => {}
    );

    given(
      /^the column with name "(.*)" has cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    given(/^the column with name "(.*)" has no cards$/, (arg0) => {});

    when(
      /^the user attempts to move the card with name "(.*)" from column with name "(.*)" to column with name "(.*)" at order (\d+)$/,
      (arg0, arg1, arg2, arg3) => {}
    );

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then("the board shall have three columns", () => {});
  });

  test("Move the only card in a column to another existing column (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    given(
      /^there exists a user with first name "(.*)", last name "(.*)", and email "(.*)" in the system$/,
      async (arg0, arg1, arg2) => {
        await new Promise((r) =>
          setTimeout(r, Math.random() * (300 - 100) + 100)
        );
      }
    );

    given(
      /^the user with email "(.*)" is logged into the system$/,
      (arg0) => {}
    );

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has three columns ordered as follows:",
      (table) => {}
    );

    given(/^the column with name "(.*)" has no cards$/, (arg0) => {});

    given(
      /^the column with name "(.*)" has cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    when(
      /^the user attempts to move the card with name "(.*)" from column with name "(.*)" to column with name "(.*)" at order (\d+)$/,
      (arg0, arg1, arg2, arg3) => {}
    );

    then(/^the column with name "(.*)" shall have no Cards$/, (arg0) => {});

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then("the board shall have three columns", () => {});
  });

  test("Move a card to a column that does not exist (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given(
      /^there exists a user with first name "(.*)", last name "(.*)", and email "(.*)" in the system$/,
      async (arg0, arg1, arg2) => {
        await new Promise((r) =>
          setTimeout(r, Math.random() * (300 - 100) + 100)
        );
      }
    );

    given(
      /^the user with email "(.*)" is logged into the system$/,
      (arg0) => {}
    );

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has three columns ordered as follows:",
      (table) => {}
    );

    given(
      /^the column with name "(.*)" has cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    when(
      /^the user attempts to move the card with name "(.*)" from column with name "(.*)" to column with name "(.*)" at order (-?\d+)$/,
      (arg0, arg1, arg2, arg3) => {}
    );

    then(
      /^the system shall report that the column with name "(.*)" does not exist$/,
      (arg0) => {}
    );

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then("the board shall have three columns", () => {});
  });

  test("Move a card to another existing column at an invalid negative order (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    given(
      /^there exists a user with first name "(.*)", last name "(.*)", and email "(.*)" in the system$/,
      async (arg0, arg1, arg2) => {
        await new Promise((r) =>
          setTimeout(r, Math.random() * (300 - 100) + 100)
        );
      }
    );

    given(
      /^the user with email "(.*)" is logged into the system$/,
      (arg0) => {}
    );

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(
      "the selected board has three columns ordered as follows:",
      (table) => {}
    );

    given(
      /^the column with name "(.*)" has cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    given(
      /^the column with name "(.*)" has cards with names and order as follows:$/,
      (arg0, table) => {}
    );

    when(
      /^the user attempts to move the card with name "(.*)" from column with name "(.*)" to column with name "(.*)" at order (-?\d+)$/,
      (arg0, arg1, arg2, arg3) => {}
    );

    then("the system shall report that the order cannot be negative", () => {});

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then(
      /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      (arg0, table) => {}
    );

    then("the board shall have three columns", () => {});
  });
});
