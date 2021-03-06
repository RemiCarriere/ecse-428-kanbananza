import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID005_Add_A_Card_To_A_Column.feature"
);
let errMsg = "";
let responseStatus = "";
let userID = "";
let selectedBoard = "";
let colID = "";
let numCards = 0;

const givenFizBinLoggedIn = (given) => {
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
};

const givenUserHasOneBoard = (given) => {
  given("the user has one board", async () => {
    const res = await request
      .post("/board")
      .send({ ownerId: userID, name: "test-board-name" });
    selectedBoard = res.body.id;
  });
};

const givenBoardSelected = (given) => {
  given("the user has selected that board", () => {
    selectedBoard = selectedBoard; //rendundant step for our implementation
  });
};

const givenBoardHasColumnWithName = (given) => {
  given(/^the board has one column with name "(.*)"$/, async (colName) => {
    const res = await request
      .post("/column")
      .send({ name: colName, boardId: selectedBoard, order: 1 });
    colID = res.body.id;
  });
};

const givenColumnHasNoTaskWithName = (given) => {
  given(
    /^the column with name "(.*)" does not include an existing card with name (.*)$/,
    async (colName, cardName) => {
      //delete card must be implemented to do this correctly, for now, just check there are no cards with name
      const res = await request.get(`/column/${colID}/cards`);
      expect(res.body.filter((card) => card.name === cardName).length).toBe(0);
      numCards = res.body.length;
    }
  );
};

const whenUserAttemptsToAddCard = (when) => {
  when(
    /^the user attempts to add a card with name "(.*)" to the column with name "(.*)"$/,
    async (cardName, colName) => {
      const res = await request
        .post("/card")
        .send({ name: cardName, columnId: colID, order: 1 });
      if (res.body.errors) {
        errMsg = res.body.errors[0].reason;
      }
    }
  );
};

const thenCardShallBeInColumn = (then) => {
  then(
    /^one card with name "(.*)" shall be included in the column with name "(.*)"$/,
    async (cardName, colName) => {
      const res = await request.get(`/column/${colID}/cards`);
      expect(res.body.filter((card) => card.name === cardName).length).toBe(1);
    }
  );
};

const thenNumCardIncreaseByOne = (then) => {
  then(
    /^the number of cards included in the column with name "(.*)" shall increase by one$/,
    async (colName) => {
      const res = await request.get(`/column/${colID}/cards`);
      expect(res.body.length).toBe(numCards + 1);
    }
  );
};

//TODO: Implement the step definitions and remove .skip
defineFeature(feature, (test) => {
  test("Successfully add a card with a valid name to an existing column (Normal Flow)", ({
    given,
    when,
    then,
    and,
  }) => {
    givenFizBinLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardSelected(given);

    givenBoardHasColumnWithName(given);

    givenColumnHasNoTaskWithName(given);

    whenUserAttemptsToAddCard(when);

    thenCardShallBeInColumn(then);

    thenNumCardIncreaseByOne(and);

    and("the number of cards in the board shall increase by one", () => {});
  });

  test("Successfully add a card with a valid but existing name to an existing column (Alternate Flow)", ({
    given,
    when,
    then,
    and,
  }) => {
    givenFizBinLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardSelected(given);

    givenBoardHasColumnWithName(given);

    given(
      /^the column with name "(.*)" includes an existing card with name "(.*)"$/,
      async (colName, cardName) => {
        const res = await request
          .post("/card")
          .send({ name: cardName, columnId: colID, order: 0 }); // order must be unique within column
        const res1 = await request.get(`/column/${colID}/cards`);
        numCards = res1.body.length;
      }
    );

    whenUserAttemptsToAddCard(when);

    then(
      /^two cards with name "(.*)" shall be included in the column with name "(.*)"$/,
      async (cardName, colName) => {
        const res = await request.get(`/column/${colID}/cards`);
        expect(res.body.filter((card) => card.name === cardName).length).toBe(
          2
        );
      }
    );

    thenNumCardIncreaseByOne(and);

    and("the number of cards in the board shall increase by one", () => {});
  });

  test("Unsuccessfully add a card with an invalid name comprising only whitespace to an existing column (Error Flow)", ({
    given,
    when,
    then,
    and,
  }) => {
    givenFizBinLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardSelected(given);

    givenBoardHasColumnWithName(given);

    given(
      /^the column with name "(.*)" includes no existing cards$/,
      async (colName) => {
        const res = await request.get(`/column/${colID}/cards`);
        expect(res.body.length).toBe(0);
      }
    );

    whenUserAttemptsToAddCard(when);

    then(/^the system shall report "(.*)"$/, (errorMessage) => {
      expect(errMsg).toBe('should pass "isNotEmpty" keyword validation');
    });

    and(
      /^a card with name "(.*)" shall not be included in the column with name "(.*)"$/,
      async (cardName, colName) => {
        const res = await request.get(`/column/${colID}/cards`);
        expect(res.body.filter((card) => card.name === cardName).length).toBe(
          0
        );
      }
    );

    and(
      /^the number of cards included in the column with name "(.*)" shall remain zero$/,
      async (colName) => {
        const res = await request.get(`/column/${colID}/cards`);
        expect(res.body.length).toBe(0);
      }
    );

    and("the number of cards in the board shall remain the same", () => {});
  });
});
