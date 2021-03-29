import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";
import { givenExistsUser } from "./shared-steps";

const feature = loadFeature(
  "src/test/acceptance/features/ID035_Select_a_board.feature"
);
let errMsg = "";
let userID = "";
let selectedBoard = "";

const givenUserLoggedIn = (given) => {
  given(
    /^the user with email "(.*)" is logged into the system$/,
    async (email) => {
      const res = await request
        .post("/login")
        .send({ email, password: "foobar" });
      userID = res.body.id;
    }
  );
};

const givenUserHasBoard = (given) => {
    given(/^the user with email "(.*)" has a board with name "(.*)"$/, async (email, name) => {
      const user = (await request
        .get("/users")).body.filter((user) => user.email === email)[0].id;
      await request
        .post("/board")
        .send({ ownerId: user, name: name })
        .expect(201);
    });
  };

const givenBoardHasFollowingColumns = (given) => {
    given(
      /^the board with name "(.*)" contains columns with names and order as following:$/,
      async (name, table) => {
        let board = (await request.get(`/boards`)).body.filter((board) => board.name === name)[0].id;

        for (const row of table) {
          await request.post("/column").send({
            name: row.name,
            boardId: board,
            order: parseInt(row.order),
          });
        }
      }
    );
  };


const whenUserAttemptsToSelectBoard = (when) => {
    when(
      /^the user attempts to select the board with name "(.*)"$/,
      async (name) => {
        const boards = (await request.get("/boards")).body;
        selectedBoard = boards.filter((board) => board.name === name)[0];

        if(selectedBoard.ownerId == userID) selectedBoard = selectedBoard.id;
        else selectedBoard = "";
      }
    );
  };

const userShallHaveBoardWithName = (then) => {
    then(/^the selected board will have the name "(.*)"$/, 
    async (name) => {
      const userBoards = (await request.get(`/boards/${selectedBoard}`)).body;
      expect(userBoards.name).toBe(name);
    });
  };



defineFeature(feature, (test) => {
test("Select a board that is owned by the user (Normal Flow)", ({
    given,
    when,
    then,
  }) => {

    givenExistsUser(given);
    givenUserLoggedIn(given);

    givenUserHasBoard(given)
    givenBoardHasFollowingColumns(given)
    givenUserHasBoard(given)
    givenBoardHasFollowingColumns(given)
    whenUserAttemptsToSelectBoard(when)
    userShallHaveBoardWithName(then)

    then('the selected board will have the following columns:', async (table) => {
      const res = (await request.get(`/board/${selectedBoard}/columns`)).body;
      for (const row of table) {
        expect(res.filter((column) => column.name === row.name).length).toBe(1);
      }
    });

  });

test("Select a board that is owned by another user (Error Flow)", ({
    given,
    when,
    then,
  }) => {

    givenExistsUser(given);
    givenUserLoggedIn(given);
    
    givenUserHasBoard(given)
    givenBoardHasFollowingColumns(given)

    givenExistsUser(given);
    givenUserHasBoard(given)
    givenBoardHasFollowingColumns(given)
    whenUserAttemptsToSelectBoard(when)
    then('there shall be no selected board', () => {
      expect(selectedBoard).toBe("");
    });
    then('the system shall report that the user is not authorized to select the board', () => {

    });
  });
});

 
  