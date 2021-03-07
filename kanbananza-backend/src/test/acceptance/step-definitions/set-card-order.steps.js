import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID006-set-order-of-a-card-in-a-column.feature"
);

let errMsg = "";
let columnId;
let responseStatus = "";

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
    "the selected board has one with two cards ordered as follows",
    async (table) => {
  
      let res = await request.post("/column").send({
        name: "TODO",
        boardId: selectedBoard,
        order: 1,
      }).expect(201);

      columnId = res.body.id;

      for (const row of table) {
        await request.post("/cards?").send({
          name: row.Cards,
          columnId: columnId,
          order: row.CardIndex,
          description: "test card",
          priority: 1
        }).expect(201);
      }
    }
  );
};

const whenUserAttemptsToMoveCard = (when) => {
  when(
    /^the user attempts to move card with name "(.*)" to index (\d+)$/,
    async (name, index) => {
      let res = await request.get(`/columns?/${columnId}/cards`);
      let cardId = res.body.filter((card) => card.name === name)[0];
      if (cardId) {
        cardId = cardId.id;
      } else {
        cardId = "non-existent column";
      }
      res = await request.put(`/cards?/${cardId}`)
      .send({ order: index })
      .expect(201);

      if (res.body.errors) {
        errMsg = res.body.errors[0].reason;
      }
    }
  );
};

const thenBoardLooksAsFollows = (then) => {
  then(
    "the board will look as follows:",
    async (table) => {
      let res = await request.get(`/columns?/${columnId}/cards`);
      for (const row of table) {
        let ord = res.body.filter((card) => card.name === row.Cards)[0];

        if (ord) {
          ord = ord.order;
        } else {
          ord = -1;
        }

        expect(ord).toBe(row.CardIndex)
      }
    }
  );
};

const thenSystemShallReport = (then) => {
  then(
    /^the system shall report "(.*)"$/,
    async(msg) => {  
      expect(errMsg).toBe(msg);
    }
  );
};

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
