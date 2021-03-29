import { defineFeature, loadFeature } from "jest-cucumber";
import { givenExistsUser } from "./shared-steps";
import request from "../../support/request";

let response;
const feature = loadFeature(
  "src/test/acceptance/features/ID036_Update_the_name_of_a_board.feature"
);

let userID = "";
let selectedBoard = "";
let status = 0;

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

const givenUserHasOneBoard = (given) => {
  given(/^the user has only one board with name "(.*)"$/, async (name) => {
    const res = await request
      .post("/board")
      .send({ ownerId: userID, name: name });
    selectedBoard = res.body.id;
  });
};

const whenUserUpdatesBoardWithName = (when) => {
  when(
    /^the user attempts to update the name of the board with name "(.*)" to "(.*)"$/,
    async (name, newName) => {
      const userBoards = (await request.get(`/user/${userID}/boards`)).body;
      let board = userBoards.filter((board) => board.name === name)[0].id;

      const res = await request
        .patch(`/boards/${board}`)
        .send({ name: newName });
      status = res.status;
    }
  );
};

const userShallHaveBoardWithName = (then) => {
  then(/^the user shall have a board with name "(.*)"$/, async (name) => {
    const userBoards = (await request.get(`/user/${userID}/boards`)).body;
    expect(userBoards.filter((board) => board.name === name).length).toBe(1);
  });
};

const userShallHaveOneBoard = (then) => {
  then("the user shall have one board", async () => {
    expect((await request.get(`/user/${userID}/boards`)).body.length).toBe(1);
  });
};

defineFeature(feature, (test) => {
  test("Update the name of the user's only board to a new valid name (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);

    givenUserLoggedIn(given);

    givenUserHasOneBoard(given);

    whenUserUpdatesBoardWithName(when);

    userShallHaveBoardWithName(then);
    userShallHaveOneBoard(then);
  });

  test("Update the name of one of the user's boards to a new valid name (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);

    given("the user has boards with names as following:", async (table) => {
      for (const row of table) {
        await request.post("/boards").send({
          name: row.boardName,
          ownerId: userID,
        });
      }
    });

    whenUserUpdatesBoardWithName(when);

    then(
      "the user shall have boards with names as following:",
      async (table) => {
        const userBoards = (await request.get(`/user/${userID}/boards`)).body;
        for (const row of table) {
          expect(
            userBoards.filter((board) => board.name === row.boardName).length
          ).toBe(1);
        }
      }
    );

    then("the user shall have three boards", () => {
      async () => {
        expect((await request.get(`/user/${userID}/boards`)).body.length).toBe(
          3
        );
      };
    });
  });

  test("Update the name of a board to the same name (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);

    givenUserLoggedIn(given);

    givenUserHasOneBoard(given);

    whenUserUpdatesBoardWithName(when);

    userShallHaveBoardWithName(then);

    userShallHaveOneBoard(then);
  });

  test("Update the name of a board to a new invalid name comprising only whitespace (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);

    givenUserLoggedIn(given);

    givenUserHasOneBoard(given);

    whenUserUpdatesBoardWithName(when);

    then("the system shall report that the board name cannot be empty", () => {
      expect(status).toBeGreaterThanOrEqual(400);
    });

    userShallHaveBoardWithName(then);

    userShallHaveOneBoard(then);
  });
});
