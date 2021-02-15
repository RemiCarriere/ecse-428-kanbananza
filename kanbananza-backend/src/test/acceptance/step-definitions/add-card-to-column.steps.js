import { defineFeature, loadFeature } from "jest-cucumber";
import { systemShallReport } from "./background.steps";

const feature = loadFeature(
  "src/test/acceptance/features/ID005_Add_A_Card_To_A_Column.feature"
);

const givenUserLoggedIn = (given) => {
  given("user with username Fizbin is logged in", () => {});
};

const givenUserHasOneBoard = (given) => {
  given("the user has one board", () => {});
};

const givenBoardIsSelected = (given) => {
  given("the user has selected that board", () => {});
};

const givenBoardHasOneColumn = (given) => {
  given(/^the board has one column with name "(.*)"$/, (name) => {});
};

const whenUserAddsCard = (when) => {
  when(
    /^the user attempts to add a card with name "(.*)" to the column with name "(.*)"$/,
    (card, column) => {}
  );
};

const thenCardsInColumnIncreaseByOne = (then) => {
  then(
    /^the number of cards included in the column with name "(.*)" shall increase by one$/,
    (name) => {}
  );
};

defineFeature(feature, (test) => {
  let cardAdded = false;

  afterEach(() => {
    cardAdded = false;
  });

  test("Successfully add a card with a valid but existing name to an existing column (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenUserLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardIsSelected(given);

    givenBoardHasOneColumn(given);

    given(
      /^the column with name "(.*)" includes an existing card with name "(.*)"$/,
      (column, name) => {}
    );

    whenUserAddsCard(when);

    then(
      /^two cards with name "(.*)" shall be included in the column with name "(.*)"$/,
      (card, column) => {}
    );

    thenCardsInColumnIncreaseByOne(then);

    then("the number of cards in the board shall increase by one", () => {});
  });

  test("Unsuccessfully add a card with an invalid name comprising only whitespace to an existing column (Error Flow)", ({
    given,
    when,
    then,
    and,
  }) => {
    givenUserLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardIsSelected(given);

    givenBoardHasOneColumn(given);

    given(
      /^the column with name "(.*)" includes no existing cards$/,
      (name) => {}
    );

    whenUserAddsCard(when);

    systemShallReport(then);

    then(
      /^a card with name "(.*)" shall not be included in the column with name "(.*)"$/,
      (card, column) => {}
    );

    then(
      /^the number of cards included in the column with name "(.*)" shall remain zero$/,
      (name) => {}
    );

    then("the number of cards in the board shall remain the same", () => {});
  });

  test("Successfully add a card with a valid name to an existing column (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenUserLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardIsSelected(given);

    givenBoardHasOneColumn(given);

    given(
      /^the column with name "(.*)" does not include an existing card with name (.*)$/,
      (column, card) => {}
    );

    whenUserAddsCard(when);

    then(
      /^one card with name (.*) shall be included in the column with name "(.*)"$/,
      (card, column) => {}
    );

    thenCardsInColumnIncreaseByOne(then);

    then(
      "the number of cards in the board shall increase by one",
      (table) => {}
    );
  });
});
