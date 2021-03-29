import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID035_Select_a_board.feature"
);
let errMsg = "";
let userID = "";
let selectedBoard = "";

const givenUserLoggedIn = (given) => {
  given(
    /^the user with email "john.smith@mail.com" is logged into the system$/,
    async (email) => {
      const res = await request
        .post("/login")
        .send({ email, password: "foobar" });
      userID = res.body.id;
    }
  );
};

const givenExistsUserJohn = (given) => {
    given(
      /^there exists a user with first name "John", last name "Smith", and email "John.smith@mail.com" in the system$/,
      async (firstName, lastName, email) => {
        await request
          .post("/user")
          .send({ email, firstName, lastName, password: "foobar" });
      }
    );
  };

  const givenExistsUserJane = (given) => {
    given(
      /^there exists a user with first name "Jane", last name "Doe", and email "jane.doe@mail.com" in the system$/,
      async (firstName, lastName, email) => {
        await request
          .post("/user")
          .send({ email, firstName, lastName, password: "foobar" });
      }
    );
  };

const givenJohnHasMyBoard = (given) => {
    given("the user has board name My Board", async () => {
      const res = await request
        .post("/board")
        .send({ ownerId: userID, name: "My Board" });
      selectedBoard = res.body.id;
    });
  };

const givenJaneHasMyBoard = (given) => {
    given("the user has board name Not Your Board", async () => {
      const res = await request
        .post("/board")
        .send({ ownerId: userID, name: "Not Your Board" });
      selectedBoard = res.body.id;
    });
  };

const givenBoardHasFollowingColumns = (given) => {
    given(
      "the My Board board has three columns named and ordered as follows:",
      async (table) => {
        for (const row of table) {
          await request.post("/column").send({
            name: row.columnName,
            boardId: selectedBoard,
            order: parseInt(row.columnOrder),
          });
        }
      }
    );
  };

const givenUserHasMyOtherBoard = (given) => {
    given("the user has board name My Other Board", async () => {
      const res = await request
        .post("/board")
        .send({ ownerId: userID, name: "My Other Board" });
      selectedBoard2 = res.body.id;
    });
  };

const givenOtherBoardHasFollowingColumns = (given) => {
    given(
      "the My Other Board board has three columns named and ordered as follows:",
      async (table) => {
        for (const row of table) {
          await request.post("/column").send({
            name: row.columnName,
            boardId: selectedBoard2,
            order: parseInt(row.columnOrder),
          });
        }
      }
    );
  };

const whenUserAttemptsToSelectBoard = (when) => {
    when(
      /^the user attempts to Select Column with Name "(.*)"$/,
      async () => {
        const res = await request.get(`/board/${selectedBoard}`);
      }
    );
  };

  const whenUserAttemptsToSelectBoard = (when) => {
    when(
      /^the user attempts to Select Column with Name "(.*)"$/,
      async () => {
        const res = await request.get(`/board/${selectedBoard}`);
      }
    );
  };

const userShallHaveBoardWithName = (then) => {
    then(/^the user shall have a board with name "(.*)"$/, 
    async () => {
      const userBoards = (await request.get(`/user/${userID}/boards`)).body;
      expect(userBoards.filter((board) => board.name === selectedBoard.name).length).toBe(1);
    });
  };


test("Select a board that is owned by the user (Normal Flow)", ({
    given,
    when,
    then,
  }) => {

    givenExistsUser(given);
    givenUserLoggedIn(given);

    givenUserHasMyBoard(given)
    givenBoardHasFollowingColumns(given)
    givenUserHasMyOtherBoard(given)
    givenOtherBoardHasFollowingColumns(given)
    whenUserAttemptsToSelectBoard(when)
    userShallHaveBoardWithName(then)

    then("the board will have the following columns:", async (table) => {
        const res = await request.get(`/board/${selectedBoard}/columns`);
        expect(res.body.length).toBe(table.length);
      });

  });

test("Select a board that is owned by another user (Error Flow)", ({
    given,
    when,
    then,
  }) => {

    givenExistsUser(given);
    givenUserLoggedIn(given);
    
    givenUserHasMyBoard(given)
    givenBoardHasFollowingColumns(given)

    givenExistsUser2(given);
    givenJaneHasMyBoard(given)
    givenUserHasMyOtherBoard(given)
    givenOtherBoardHasFollowingColumns(given)
    whenUserAttemptsToSelectBoard(when)
    userShallHaveBoardWithName(then)

    then("the board will have the following columns:", async (table) => {
        const res = await request.get(`/board/${selectedBoard}/columns`);
        expect(res.body.length).toBe(table.length);
      });

  });


 
  