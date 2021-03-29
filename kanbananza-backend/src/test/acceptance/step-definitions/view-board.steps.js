import { defineFeature, loadFeature } from "jest-cucumber";
import { givenExistsUser } from "./shared-steps";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID034_View_boards.feature"
);
let errMsg = "";
let userID = "";
let selectedBoard = "";
let userBoards = "";

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

const givenUserHasFollowingBoards = (given) => {
  given("the user has boards with names as following:", async (table) => {
    for (const row of table) {
      await request
        .post("/board")
        .send({
          name: row.boardName,
          ownerId: userID,
        })
        .expect(201);
    }
  });
};

const theUserHasFollowingBoards = (then) => {
  then("the boards with names as following are returned:", async (table) => {
    //const userBoards = (await request.get(/user/${user.id}/boards)).body;
    for (const row of table) {
      expect(
        userBoards.filter((board) => board.name === row.boardName).length
      ).toBe(1);
    }
  });
};

const givenUserHasNoBoards = (given) => {
  given(/^the user has no boards$/, async () => {
    const { body } = await request.get(`/user/${userID}/boards`).expect(200);

    expect(body.length).toBe(0);
  });
};

const whenUserViewsBoards = (when) => {
  when(/^the user attempts to view their boards$/, async () => {
    userBoards = (await request.get(`/user/${userID}/boards`)).body;
  });
};

const thenNoBoardsAreReturned = (then) => {
  then(/^no boards are returned$/, async () => {
    expect(userBoards.length).toBe(0);
  });
};

defineFeature(feature, (test) => {
  test("View boards of a user with multiple boards (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);

    givenUserLoggedIn(given);

    givenUserHasFollowingBoards(given);
    whenUserViewsBoards(when);
    theUserHasFollowingBoards(then);
  });

  test("View boards of a new user with no boards (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);

    givenUserLoggedIn(given);

    givenUserHasNoBoards(given);
    whenUserViewsBoards(when);
    thenNoBoardsAreReturned(then);
  });
});
