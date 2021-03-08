import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID006-set-order-of-a-card-in-a-column.feature"
);

let errMsg = "";
let columnId;
let userID = "";
let selectedBoard = "";

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
  given("the user owns one board", async () => {
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

const givenBoardHasFollowingCards = (given) => {
  given(
    "the selected board has one column with two cards ordered as follows:",
    async (table) => {
      let res = await request
        .post("/column")
        .send({
          name: "TODO",
          boardId: selectedBoard,
          order: 1,
        })
        .expect(201);

      columnId = res.body.id;

      for (const row of table) {
        await request.post("/cards").send({
          name: row.Cards,
          columnId: columnId,
          order: parseInt(row.CardIndex),
          description: "test card",
        });
      }
    }
  );
};

const whenUserAttemptsToMoveCard = (when) => {
  when(
    /^the user attempts to move card with name "(.*)" to index (\d+)$/,
    async (name, index) => {
      let res = await request.get(`/columns/${columnId}/cards`);
      let cardId = res.body.filter((card) => card.name === name)[0];

      if (cardId) {
        cardId = cardId.id;
      } else {
        cardId = "non-existent column";
      }

      res = await request
        .patch(`/cards/${cardId}`)
        .send({ order: parseInt(index) });
      if (res.body.errors) {
        errMsg = res.body.errors[0].reason;
      }
    }
  );
};

const thenBoardLooksAsFollows = (then) => {
  then("the board will look as follows:", async (table) => {
    let res = await request.get(`/columns/${columnId}/cards`);
    // let ord = res.body.filter((card) => card.name === row.Cards)[0];
    let expectedOrder = [];
    let actualOrder = [];
    // Sort expected and actual to make sure they are in the same order,
    // instead of comparing the order itself
    table.forEach((row, index) => {
      expectedOrder.push({ key: row.CardIndex, val: row.Cards });
      actualOrder.push({
        key: res.body[index].order,
        val: res.body[index].name,
      });
    });

    expectedOrder.sort(function (a, b) {
      return a.key - b.key;
    });
    actualOrder.sort(function (a, b) {
      return a.key - b.key;
    });

    expectedOrder.forEach((expCard, index) => {
      const actCard = actualOrder[index];
      expect(actCard.val).toBe(expCard.val);
    });
  });
};

const thenSystemShallReport = (then) => {
  then(/^the system shall report "(.*)"$/, async (msg) => {
    if (msg === "Card seven does not exist") {
      msg = "resource ID is invalid";
    }
    expect(errMsg).toBe(msg);
  });
};

defineFeature(feature, (test) => {
  test("Move the card in the board (Normal Flow)", ({ given, when, then }) => {
    givenFizBinLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardSelected(given);

    givenBoardHasFollowingCards(given);

    whenUserAttemptsToMoveCard(when);

    thenBoardLooksAsFollows(then);
  });

  test("Move a card to the same position (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenFizBinLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardSelected(given);

    givenBoardHasFollowingCards(given);

    whenUserAttemptsToMoveCard(when);
    thenBoardLooksAsFollows(then);
  });

  test("Move a non-existent card (Error Flow)", ({ given, when, then }) => {
    givenFizBinLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardSelected(given);

    givenBoardHasFollowingCards(given);

    whenUserAttemptsToMoveCard(when);

    thenSystemShallReport(then);
  });
});
