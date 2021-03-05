import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID005_Add_A_Card_To_A_Column.feature"
);
const errMsg = "";
let responseStatus = "";
let userID = "";
let selectedBoard = "";
let colID = "";
let numCards = 0;

//TODO: Implement the step definitions and remove .skip
defineFeature(feature, (test) => {
  test("Successfully add a card with a valid name to an existing column (Normal Flow)", ({
    given,
    when,
    then,
    and,
  }) => {
    given("user with username Fizbin is logged in", async () => {
      await request.post("/user").send({
        email: "fiz@bin.com",
        firstName: "fiz",
        lastName: "bin",
        password: "password",
      });
      const res = await request
        .post("/login")
        .send({ email: "fiz@bin.com", password: "password" });
      userID = res.body.id;
    });

    given("the user has one board", async () => {
      const res = await request
        .post("/board")
        .send({ ownerId: userID, name: "test-board-name" });
      selectedBoard = res.body.id;
    });

    given("the user has selected that board", () => {
      selectedBoard = selectedBoard; //rendundant step for our implementation
    });

    given(/^the board has one column with name "(.*)"$/, async (colName) => {
      const res = await request
        .post("/column")
        .send({ name: colName, boardId: selectedBoard, order: 1 });
      colID = res.body.id;
    });

    given(
      /^the column with name "(.*)" does not include an existing card with name (.*)$/,
      async (colName, cardName) => {
        //delete card must be implemented to do this correctly, for now, just check there are no cards with name
        const res = await request.get(`/columns/${colID}/cards`);
        expect(res.body.filter((card) => card.name === cardName).length).toBe(
          0
        );
        numCards = res.body.length;
      }
    );

    when(
      /^the user attempts to add a card with name (.*) to the column with name "(.*)"$/,
      async (cardName, colName) => {
        const res = await request
          .post("/card")
          .send({ name: cardName, columnId: colID, order: 1 });
      }
    );

    then(
      /^one card with name (.*) shall be included in the column with name "(.*)"$/,
      async (cardName, colName) => {
        const res = await request.get(`/columns/${colID}/cards`);
        expect(res.body.filter((card) => card.name === cardName).length).toBe(
          1
        );
      }
    );

    and(
      /^the number of cards included in the column with name "(.*)" shall increase by one$/,
      async (colName) => {
        const res = await request.get(`/columns/${colID}/cards`);
        expect(res.body.length).toBe(numCards + 1);
      }
    );

    and(
      "the number of cards in the board shall increase by one",
      (table) => {}
    );
  });

  test("Successfully add a card with a valid but existing name to an existing column (Alternate Flow)", ({
    given,
    when,
    then,
    and,
  }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(/^the board has one column with name "(.*)"$/, (arg0) => {});

    given(
      /^the column with name "(.*)" includes an existing card with name "(.*)"$/,
      (arg0, arg1) => {}
    );

    when(
      /^the user attempts to add a card with name "(.*)" to the column with name "(.*)"$/,
      (arg0, arg1) => {}
    );

    then(
      /^two cards with name "(.*)" shall be included in the column with name "(.*)"$/,
      (arg0, arg1) => {}
    );

    and(
      /^the number of cards included in the column with name "(.*)" shall increase by one$/,
      (arg0) => {}
    );

    and("the number of cards in the board shall increase by one", () => {});
  });

  test("Unsuccessfully add a card with an invalid name comprising only whitespace to an existing column (Error Flow)", ({
    given,
    when,
    then,
    and,
  }) => {
    given("user with username Fizbin is logged in", () => {});

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(/^the board has one column with name "(.*)"$/, (arg0) => {});

    given(
      /^the column with name "(.*)" includes no existing cards$/,
      (arg0) => {}
    );

    when(
      /^the user attempts to add a card with name "(.*)" to the column with name "(.*)"$/,
      (arg0, arg1) => {}
    );

    then(/^the system shall report "(.*)"$/, (arg0) => {});

    and(
      /^a card with name "(.*)" shall not be included in the column with name "(.*)"$/,
      (arg0, arg1) => {}
    );

    and(
      /^the number of cards included in the column with name "(.*)" shall remain zero$/,
      (arg0) => {}
    );

    and("the number of cards in the board shall remain the same", () => {});
  });
});
